
'use client'

import { useState } from 'react'
import type { Page } from '@/payload-types'

type ContactFormBlockProps = Extract<NonNullable<Page['content']>[number], { blockType: 'contactForm' }>

export function ContactFormBlockComponent({ heading, subheading }: ContactFormBlockProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch('/api/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Submission failed')

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '0 auto 3rem',
        padding: '2rem 1.5rem',
        textAlign: 'center',
      }}
    >
      {heading && (
        <h3 style={{ color: '#3d1f2a', fontSize: '1.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>
          {heading}
        </h3>
      )}
      {subheading && (
        <p style={{ color: '#c0849a', marginBottom: '1.5rem' }}>{subheading}</p>
      )}

      {status === 'success' ? (
        <p style={{ color: '#3d1f2a', fontWeight: 500 }}>Thanks — we&apos;ll be in touch soon.</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', textAlign: 'left' }}>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1px solid #f5d0da',
              backgroundColor: '#fffafc',
              color: '#3d1f2a',
              fontSize: '14px',
              outline: 'none',
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1px solid #f5d0da',
              backgroundColor: '#fffafc',
              color: '#3d1f2a',
              fontSize: '14px',
              outline: 'none',
            }}
          />
          <textarea
            name="message"
            placeholder="Your message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1px solid #f5d0da',
              backgroundColor: '#fffafc',
              color: '#3d1f2a',
              fontSize: '14px',
              outline: 'none',
              resize: 'vertical',
            }}
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            style={{
              backgroundColor: '#f9869f',
              color: '#fff',
              fontWeight: 600,
              fontSize: '14px',
              padding: '0.75rem',
              borderRadius: '999px',
              border: 'none',
              cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
              opacity: status === 'submitting' ? 0.7 : 1,
            }}
          >
            {status === 'submitting' ? 'Sending...' : 'Send message'}
          </button>

          {status === 'error' && (
            <p style={{ color: '#c0849a', fontSize: '13px' }}>
              Something went wrong — please try again.
            </p>
          )}
        </form>
      )}
    </div>
  )
}