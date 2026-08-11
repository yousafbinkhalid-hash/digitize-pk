import { useState } from 'react'
import emailjs from '@emailjs/browser'
import {
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import './ContactPage.css'

// Set these in a .env file locally (see .env.example) and in your Vercel
// project's Environment Variables for production. All three come from
// your EmailJS dashboard once you've connected your Gmail account and
// created a template — see the setup notes in the project README.
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const PROJECT_TYPES = ['Website', 'App', 'Platform', 'Dedicated Team', 'Not sure yet']
const BUDGETS = ['< $5k', '$5k–$15k', '$15k–$50k', '$50k+']

const INFO_CARDS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@digitize.pk',
    href: 'mailto:hello@digitize.pk',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+92 321 4273257',
    href: 'https://wa.me/923214273257',
  },
  {
    icon: MapPin,
    label: 'Based in',
    value: 'Lahore, Pakistan',
    href: null,
  },
  {
    icon: Clock,
    label: 'Response time',
    value: 'Within 1 business day',
    href: null,
  },
]

const FAQS = [
  {
    q: 'What happens after I submit this?',
    a: "You'll get a confirmation on screen right away, and a real reply from a human — not a bot — within one business day, usually sooner. We'll ask a few clarifying questions before ever pitching a scope.",
  },
  {
    q: 'Do you work with early-stage startups?',
    a: "Yes — a good chunk of our work starts as a rough idea, not a finished spec. If you're pre-funding or pre-product, tell us that in the message and we'll scope accordingly.",
  },
  {
    q: 'Do you sign NDAs?',
    a: "Happy to, before any deep technical discussion. Mention it in your message and we'll send one over ahead of the first call.",
  },
  {
    q: "I'm not sure what I need yet — can I still reach out?",
    a: '"Not sure yet" is a normal starting point, not a problem. Pick that option below and describe the situation — we\'ll help you figure out what\'s actually worth building first.',
  },
]

function FaqItem({ item }) {
  return (
    <details className="contact-faq__item">
      <summary>
        <span>{item.q}</span>
        <ChevronDown className="contact-faq__chevron" size={18} aria-hidden="true" />
      </summary>
      <p>{item.a}</p>
    </details>
  )
}

function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }))
  }

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = 'Please tell us your name.'
    if (!form.email.trim()) {
      next.email = 'Please add an email so we can reply.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "That email doesn't look quite right."
    }
    if (!form.message.trim() || form.message.trim().length < 12) {
      next.message = 'Give us at least a sentence or two to work with.'
    }
    return next
  }

  function handleSubmit(e) {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error(
        'EmailJS is not configured — missing VITE_EMAILJS_SERVICE_ID / VITE_EMAILJS_TEMPLATE_ID / VITE_EMAILJS_PUBLIC_KEY. See .env.example.'
      )
      setStatus('error')
      return
    }

    setStatus('submitting')

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      company: form.company || 'Not provided',
      project_type: form.projectType || 'Not specified',
      budget: form.budget || 'Not specified',
      message: form.message,
    }

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, {
        publicKey: EMAILJS_PUBLIC_KEY,
      })
      .then(() => {
        setStatus('success')
      })
      .catch((err) => {
        console.error('EmailJS send failed:', err)
        setStatus('error')
      })
  }

  function resetForm() {
    setForm({ name: '', email: '', company: '', projectType: '', budget: '', message: '' })
    setErrors({})
    setStatus('idle')
  }

  return (
    <section className="contact-page">
      <div className="contact-page__bg" aria-hidden="true">
        <span className="contact-page__blob contact-page__blob--1"></span>
        <span className="contact-page__blob contact-page__blob--2"></span>
        <div className="contact-page__grid"></div>
      </div>

      <div className="contact-page__inner">
        {/* ---------------- intro / info column ---------------- */}
        <div className="contact-page__intro">
          <span className="contact-page__eyebrow">
            <span className="contact-page__eyebrow-dot"></span>
            currently accepting new projects
          </span>

          <h1 className="contact-page__title">
            <span>Tell us what you're building.</span>
            <span className="contact-page__title-accent">We'll tell you how fast.</span>
          </h1>

          <p className="contact-page__subtitle">
            No sales script, no 40-minute discovery call before you get a straight answer.
            Send the details below and a real person on the team will reply — usually the
            same day.
          </p>

          <div className="contact-page__info-grid">
            {INFO_CARDS.map((card) => {
              const Icon = card.icon
              const content = (
                <>
                  <span className="contact-info-card__icon">
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  <span className="contact-info-card__text">
                    <span className="contact-info-card__label">{card.label}</span>
                    <span className="contact-info-card__value">{card.value}</span>
                  </span>
                </>
              )
              return card.href ? (
                <a key={card.label} className="contact-info-card contact-info-card--link" href={card.href}>
                  {content}
                </a>
              ) : (
                <div key={card.label} className="contact-info-card">
                  {content}
                </div>
              )
            })}
          </div>
        </div>

        {/* ---------------- form column ---------------- */}
        <div className="contact-page__form-col">
          <div className="contact-window">
            <div className="contact-window__bar">
              <span className="contact-window__dot"></span>
              <span className="contact-window__dot"></span>
              <span className="contact-window__dot"></span>
              <span className="contact-window__url">new-project.compose</span>
            </div>

            <div className="contact-window__body">
              {status === 'success' ? (
                <div className="contact-success" role="status">
                  <span className="contact-success__icon">
                    <CheckCircle2 size={30} aria-hidden="true" />
                  </span>
                  <h2 className="contact-success__title">Message sent.</h2>
                  <p className="contact-success__text">
                    Thanks{form.name ? `, ${form.name.split(' ')[0]}` : ''} — we've got it.
                    Expect a reply within one business day.
                  </p>
                  <button type="button" className="contact-success__reset" onClick={resetForm}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  {status === 'error' && (
                    <div className="contact-form__banner" role="alert">
                      <AlertCircle size={18} aria-hidden="true" />
                      <span>
                        That didn't go through. You can try again, or email us directly at{' '}
                        <a href="mailto:hello@digitize.pk">hello@digitize.pk</a>.
                      </span>
                    </div>
                  )}

                  <fieldset className="contact-form__field">
                    <legend className="contact-form__label">What are you looking for?</legend>
                    <div className="contact-form__chips" role="group" aria-label="Project type">
                      {PROJECT_TYPES.map((type) => (
                        <button
                          type="button"
                          key={type}
                          className={`contact-chip ${form.projectType === type ? 'contact-chip--active' : ''}`}
                          aria-pressed={form.projectType === type}
                          onClick={() => updateField('projectType', type)}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="contact-form__field">
                    <legend className="contact-form__label">Rough budget</legend>
                    <div className="contact-form__chips" role="group" aria-label="Budget range">
                      {BUDGETS.map((b) => (
                        <button
                          type="button"
                          key={b}
                          className={`contact-chip ${form.budget === b ? 'contact-chip--active' : ''}`}
                          aria-pressed={form.budget === b}
                          onClick={() => updateField('budget', b)}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div className="contact-form__row">
                    <div className="contact-form__field">
                      <label className="contact-form__label" htmlFor="cf-name">
                        Name
                      </label>
                      <input
                        id="cf-name"
                        type="text"
                        className="contact-form__input"
                        value={form.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'cf-name-error' : undefined}
                      />
                      {errors.name && (
                        <span className="contact-form__error" id="cf-name-error">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className="contact-form__field">
                      <label className="contact-form__label" htmlFor="cf-email">
                        Email
                      </label>
                      <input
                        id="cf-email"
                        type="email"
                        className="contact-form__input"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'cf-email-error' : undefined}
                      />
                      {errors.email && (
                        <span className="contact-form__error" id="cf-email-error">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="cf-company">
                      Company <span className="contact-form__optional">(optional)</span>
                    </label>
                    <input
                      id="cf-company"
                      type="text"
                      className="contact-form__input"
                      value={form.company}
                      onChange={(e) => updateField('company', e.target.value)}
                    />
                  </div>

                  <div className="contact-form__field">
                    <div className="contact-form__label-row">
                      <label className="contact-form__label" htmlFor="cf-message">
                        Message
                      </label>
                      <span className="contact-form__count">{form.message.length}/600</span>
                    </div>
                    <textarea
                      id="cf-message"
                      className="contact-form__textarea"
                      rows={5}
                      maxLength={600}
                      value={form.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      placeholder="What are you trying to build, and what's the timeline?"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'cf-message-error' : undefined}
                    />
                    {errors.message && (
                      <span className="contact-form__error" id="cf-message-error">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  <button type="submit" className="contact-form__submit" disabled={status === 'submitting'}>
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="contact-form__spinner" size={17} aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <Send size={16} aria-hidden="true" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- faq ---------------- */}
      <div className="contact-faq">
        <h2 className="contact-faq__title">Common questions</h2>
        <div className="contact-faq__list">
          {FAQS.map((item) => (
            <FaqItem key={item.q} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ContactPage
