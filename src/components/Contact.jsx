import React, { useState } from 'react';
import { Send, Mail, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './icons';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'sent' | 'error'
  const [touched, setTouched] = useState({});

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const validate = {
    name: v => v.trim().length >= 2,
    email: v => isValidEmail(v),
    message: v => v.trim().length >= 10,
  };

  const getFieldState = (field) => {
    if (!touched[field]) return 'idle';
    return validate[field](form[field]) ? 'valid' : 'invalid';
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e) => {
    setTouched(t => ({ ...t, [e.target.name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const allValid = Object.keys(validate).every(k => validate[k](form[k]));
    if (!allValid) return;

    // TODO: replace with your actual form submission (e.g., Formspree, EmailJS, API)
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      setTouched({});
    }, 1200);
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section-tag">05 / Contact</div>

        <div className="contact__layout">
          {/* Left: info */}
          <div className="contact__info">
            <h2 className="headline-xl contact__heading">
              Let's build{' '}
              <span className="contact__heading--accent">something</span>
            </h2>
            <p className="body-lg contact__tagline">
              Open to new opportunities, collaborations, and interesting engineering conversations.
            </p>

            <div className="contact__links">
              {/* Placeholder — replace with actual email, GitHub, LinkedIn, location */}
              <a href="mailto:aayushsinghbgs@gmail.com" className="contact-link" id="contact-email">
                <div className="contact-link__icon"><Mail size={17} strokeWidth={1.5} /></div>
                <div>
                  <div className="label-caps contact-link__label">Email</div>
                  <div className="body-md contact-link__val">aayushsinghbgs@gmail.com</div>
                </div>
              </a>
              <a href="https://github.com/AayushBGS45/" target="_blank" rel="noopener noreferrer" className="contact-link" id="contact-github">
                <div className="contact-link__icon"><GithubIcon size={17} strokeWidth={1.5} /></div>
                <div>
                  <div className="label-caps contact-link__label">GitHub</div>
                  <div className="body-md contact-link__val">github.com/AayushBGS45</div>
                </div>
              </a>
              <a href="https://leetcode.com/u/AayushBGS45/" target="_blank" rel="noopener noreferrer" className="contact-link" id="contact-leetcode">
                <div className="contact-link__icon"><LeetcodeIcon size={17} /></div>
                <div>
                  <div className="label-caps contact-link__label">LeetCode</div>
                  <div className="body-md contact-link__val">leetcode.com/u/AayushBGS45</div>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/aayush-kumar-b3a46b29a/" target="_blank" rel="noopener noreferrer" className="contact-link" id="contact-linkedin">
                <div className="contact-link__icon"><LinkedinIcon size={17} strokeWidth={1.5} /></div>
                <div>
                  <div className="label-caps contact-link__label">LinkedIn</div>
                  <div className="body-md contact-link__val">linkedin.com/in/aayush-kumar</div>
                </div>
              </a>
              <div className="contact-link contact-link--static">
                <div className="contact-link__icon"><MapPin size={17} strokeWidth={1.5} /></div>
                <div>
                  <div className="label-caps contact-link__label">Location</div>
                  <div className="body-md contact-link__val">[Begusarai, Bihar, India]</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="contact__form-wrap glass-card" style={{ pointerEvents: 'auto' }}>
            {status === 'sent' ? (
              <div className="contact__success">
                <div className="contact__success-icon">✓</div>
                <h3 className="headline-md">Message sent!</h3>
                <p className="body-md" style={{ color: 'var(--text-secondary)' }}>
                  Thanks for reaching out. I'll get back to you shortly.
                </p>
                <button className="btn-ghost" onClick={() => setStatus(null)} style={{ marginTop: '1.5rem' }}>
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact__form" noValidate>
                {/* Name */}
                <div className={`field field--${getFieldState('name')}`}>
                  <label htmlFor="contact-name" className="field__label label-caps">Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="field__input"
                    aria-required="true"
                    aria-invalid={getFieldState('name') === 'invalid'}
                  />
                  {getFieldState('name') === 'invalid' && (
                    <span className="field__error label-code">Please enter your name.</span>
                  )}
                </div>

                {/* Email */}
                <div className={`field field--${getFieldState('email')}`}>
                  <label htmlFor="contact-email-field" className="field__label label-caps">Email</label>
                  <input
                    id="contact-email-field"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="field__input"
                    aria-required="true"
                    aria-invalid={getFieldState('email') === 'invalid'}
                  />
                  {getFieldState('email') === 'invalid' && (
                    <span className="field__error label-code">Enter a valid email address.</span>
                  )}
                </div>

                {/* Message */}
                <div className={`field field--${getFieldState('message')}`}>
                  <label htmlFor="contact-message" className="field__label label-caps">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about the project, opportunity, or question..."
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="field__input field__input--textarea"
                    aria-required="true"
                    aria-invalid={getFieldState('message') === 'invalid'}
                  />
                  {getFieldState('message') === 'invalid' && (
                    <span className="field__error label-code">Message must be at least 10 characters.</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-primary contact__submit"
                  id="contact-submit-btn"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                  <Send size={15} strokeWidth={2} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
