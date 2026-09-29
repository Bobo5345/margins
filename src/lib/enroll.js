import { SITE } from '../config'

/**
 * Accepts "98765 43210", "+91 98765-43210", "09876543210" etc.
 * Returns "+919876543210", or null if it isn't a valid Indian mobile number.
 */
export function normalizePhone(raw) {
  let digits = String(raw).replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2)
  else if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1)
  return /^[6-9]\d{9}$/.test(digits) ? `+91${digits}` : null
}

/** Returns { field: message } for every problem; empty object means valid. */
export function validateEnrollment(v) {
  const errors = {}
  const name = v.name.trim()
  if (name.length < 2) errors.name = 'Enter your full name.'
  else if (name.length > 80) errors.name = 'Keep your name under 80 characters.'
  if (!v.branch) errors.branch = 'Choose your branch.'
  if (!v.batch) errors.batch = 'Choose your batch.'
  if (!v.semester) errors.semester = 'Choose your semester.'
  if (!normalizePhone(v.phone)) errors.phone = 'Enter a 10-digit mobile number, like 98765 43210.'
  if (v.contribute.length === 0) errors.contribute = 'Pick at least one thing you’d like to contribute.'
  return errors
}

/**
 * Sends the entry to the Apps Script web app.
 * Form-encoded body = a "simple" CORS request, so the browser skips the
 * preflight that Apps Script can't answer.
 */
export async function submitEnrollment(v) {
  if (!SITE.enrollEndpoint) return { ok: false, error: 'not-configured' }

  const body = new URLSearchParams({
    name: v.name.trim(),
    branch: v.branch,
    batch: v.batch,
    semester: v.semester,
    phone: normalizePhone(v.phone),
    contribute: v.contribute.join(', '),
    website: v.website, // honeypot: real people leave this empty
  })

  try {
    const res = await fetch(SITE.enrollEndpoint, { method: 'POST', body })
    const data = await res.json()
    return data.ok ? { ok: true } : { ok: false, error: data.error || 'server' }
  } catch {
    return { ok: false, error: 'network' }
  }
}
