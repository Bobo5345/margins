import { useMemo, useRef, useState } from 'react'
import { ENROLL, SITE, currentBatches } from '../config'
import { submitEnrollment, validateEnrollment } from '../lib/enroll'

const EMPTY = { name: '', branch: '', batch: '', semester: '', phone: '', contribute: [], website: '' }
const FIELD_ORDER = ['name', 'branch', 'batch', 'semester', 'phone', 'contribute']

const SERVER_ERRORS = {
  duplicate: 'This phone number is already enrolled. If you need to change something, message us.',
  invalid: 'Something in the form didn’t look right. Check your details and try again.',
  network: 'Couldn’t reach the server. Check your connection and try again.',
  'not-configured': `Enrolment isn’t open yet. Message ${SITE.contactEmail} and we’ll add you.`,
  server: 'The form couldn’t be saved. Try again in a minute.',
}

export default function EnrollForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done | failed
  const [serverError, setServerError] = useState('')
  const formRef = useRef(null)
  const batches = useMemo(() => currentBatches(), [])

  const update = (field, value) => {
    const next = { ...values, [field]: value }
    setValues(next)
    // Once a field has been left, re-check it as the user types.
    if (touched[field]) setErrors(validateEnrollment(next))
  }

  const blur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors(validateEnrollment(values))
  }

  const toggleContribution = (kind) => {
    const list = values.contribute.includes(kind)
      ? values.contribute.filter((k) => k !== kind)
      : [...values.contribute, kind]
    setTouched((t) => ({ ...t, contribute: true }))
    update('contribute', list)
    setErrors(validateEnrollment({ ...values, contribute: list }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const found = validateEnrollment(values)
    setErrors(found)
    setTouched(Object.fromEntries(FIELD_ORDER.map((f) => [f, true])))
    const first = FIELD_ORDER.find((f) => found[f])
    if (first) {
      formRef.current.querySelector(`[data-field="${first}"]`)?.focus()
      return
    }

    setStatus('sending')
    setServerError('')
    const result = await submitEnrollment(values)
    if (result.ok) {
      setStatus('done')
      setTimeout(() => document.getElementById('enroll')?.focus(), 0)
    }
    else {
      setStatus('failed')
      setServerError(SERVER_ERRORS[result.error] || SERVER_ERRORS.server)
    }
  }

  if (status === 'done') {
    return (
      <div className="enroll enroll--done" role="status" id="enroll" tabIndex={-1}>
        <p className="enroll__thanks">You’re on the list, {values.name.trim().split(/\s+/)[0]}.</p>
        <p className="enroll__thanks-sub">
          We’ll get in touch on {values.phone.trim()} about your page. Start thinking about what goes on it.
        </p>
        <p className="enroll__sign hand">See you on the pages.</p>
      </div>
    )
  }

  const err = (field) => (touched[field] ? errors[field] : undefined)
  const fieldProps = (field) => ({
    id: `enroll-${field}`,
    'data-field': field,
    required: true,
    'aria-invalid': err(field) ? true : undefined,
    'aria-describedby': err(field) ? `enroll-${field}-error` : undefined,
    onBlur: () => blur(field),
  })
  const errorText = (field) =>
    err(field) ? (
      <p className="enroll__error" id={`enroll-${field}-error`}>
        {err(field)}
      </p>
    ) : null

  return (
    <form className="enroll" id="enroll" ref={formRef} onSubmit={onSubmit} noValidate aria-labelledby="enroll-title">
      <h3 className="enroll__title" id="enroll-title">
        Enrol as a contributor
      </h3>
      <p className="enroll__intro">Every course here is B.Tech, so just tell us your branch and batch.</p>

      <div className="enroll__grid">
        <div className="enroll__field enroll__field--wide">
          <label htmlFor="enroll-name">Full name</label>
          <input
            {...fieldProps('name')}
            type="text"
            autoComplete="name"
            maxLength={80}
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
          />
          {errorText('name')}
        </div>

        <div className="enroll__field">
          <label htmlFor="enroll-branch">Branch</label>
          <select {...fieldProps('branch')} value={values.branch} onChange={(e) => update('branch', e.target.value)}>
            <option value="" disabled>
              Choose
            </option>
            {ENROLL.branches.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
          {errorText('branch')}
        </div>

        <div className="enroll__field">
          <label htmlFor="enroll-batch">Batch</label>
          <select {...fieldProps('batch')} value={values.batch} onChange={(e) => update('batch', e.target.value)}>
            <option value="" disabled>
              Choose
            </option>
            {batches.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
          {errorText('batch')}
        </div>

        <div className="enroll__field">
          <label htmlFor="enroll-semester">Semester</label>
          <select
            {...fieldProps('semester')}
            value={values.semester}
            onChange={(e) => update('semester', e.target.value)}
          >
            <option value="" disabled>
              Choose
            </option>
            {ENROLL.semesters.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          {errorText('semester')}
        </div>

        <div className="enroll__field">
          <label htmlFor="enroll-phone">Phone number</label>
          <input
            {...fieldProps('phone')}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="98765 43210"
            maxLength={16}
            value={values.phone}
            onChange={(e) => update('phone', e.target.value)}
          />
          {errorText('phone')}
        </div>

        <fieldset
          className="enroll__field enroll__field--wide enroll__kinds"
          aria-describedby={err('contribute') ? 'enroll-contribute-error' : undefined}
        >
          <legend>What would you like to contribute?</legend>
          <div className="enroll__chips">
            {ENROLL.contributions.map((kind, i) => (
              <label className="chip" key={kind}>
                <input
                  type="checkbox"
                  data-field={i === 0 ? 'contribute' : undefined}
                  checked={values.contribute.includes(kind)}
                  onChange={() => toggleContribution(kind)}
                />
                <span>{kind}</span>
              </label>
            ))}
          </div>
          {errorText('contribute')}
        </fieldset>

        {/* Honeypot: hidden from people, tempting to bots. */}
        <div className="enroll__trap" aria-hidden="true">
          <label>
            Website
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={(e) => update('website', e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="enroll__actions">
        <button className="cta cta--xl cta--ink" type="submit" disabled={status === 'sending'}>
          <span className="cta__label">{status === 'sending' ? 'Enrolling…' : 'Join the magazine'}</span>
          <span className="cta__arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="1em" height="1em">
              <path
                d="M5 12h13M13 6l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
        <p className="enroll__server-error" role="alert">
          {status === 'failed' ? serverError : ''}
        </p>
      </div>
    </form>
  )
}
