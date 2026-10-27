// Utilidades de seguridad del formulario de contacto (sólo servidor).

const RECAPTCHA_ACTION = "contacto";
const MIN_SCORE = Number(process.env.RECAPTCHA_MIN_SCORE ?? 0.5);

type RecaptchaResponse = {
  success: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

export type RecaptchaResult = { ok: true; score?: number } | { ok: false; reason: string; misconfigured?: boolean };

/** Verifica el token de reCAPTCHA v3 contra Google. */
export async function verifyRecaptcha(token: string, ip?: string): Promise<RecaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    // En desarrollo se permite probar sin claves; en producción se bloquea el envío.
    if (process.env.NODE_ENV !== "production") return { ok: true };
    return { ok: false, reason: "RECAPTCHA_SECRET_KEY no configurada", misconfigured: true };
  }
  if (!token) return { ok: false, reason: "sin token" };

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(8000),
    });
    const data = (await res.json()) as RecaptchaResponse;
    if (!data.success) return { ok: false, reason: `token inválido (${(data["error-codes"] ?? []).join(", ")})` };
    if (data.action !== RECAPTCHA_ACTION) return { ok: false, reason: `acción inesperada (${data.action})` };
    if ((data.score ?? 0) < MIN_SCORE) return { ok: false, reason: `puntaje bajo (${data.score})` };
    return { ok: true, score: data.score };
  } catch (e) {
    return { ok: false, reason: `error al verificar (${(e as Error).message})` };
  }
}

// Límite de envíos por IP. Vive en memoria de cada instancia del servidor, por lo que
// es una barrera de mejor esfuerzo que complementa a reCAPTCHA (no la reemplaza).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

/** Primera IP de x-forwarded-for (la del visitante cuando hay proxy/CDN delante). */
export function clientIp(h: Headers): string {
  return (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "desconocida";
}
