import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeader from '../ui/SectionHeader'

const EASE = [0.22, 1, 0.36, 1]

const SID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/JRMi27',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/j%C3%A9r%C3%A9my-rouillard-5734892a6/',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

export default function Contact() {
  const [form, setForm] = useState({ from_name: '', from_email: '', message: '' })
  const [status, setStatus] = useState(null)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  const update = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(SID, TID, form, { publicKey: KEY })
      setStatus('success')
      setForm({ from_name: '', from_email: '', message: '' })
    } catch (err) {
      const msg = err?.text ?? err?.message ?? JSON.stringify(err)
      console.error('[EmailJS]', msg)
      setStatus(msg || 'error')
    }
  }

  return (
    <section id="contact" className="py-28 md:py-36 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <SectionHeader number="07" title="Contact" subtitle="Parlons-en" />

        <div ref={ref} className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Info */}
          <div className="space-y-8">
            <div className="overflow-hidden">
              <motion.p
                className="text-zinc-400 text-base md:text-lg leading-relaxed"
                initial={{ y: 30, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
              >
                Tu as un projet en tête ou tu veux simplement discuter ?
                N'hésite pas, je serai ravi d'échanger.
              </motion.p>
            </div>

            <motion.div
              className="space-y-5"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
            >
              <div>
                <p className="text-zinc-700 text-[10px] font-mono uppercase tracking-widest mb-1.5">Email</p>
                <a
                  href="mailto:jeremy.rouillard27@gmail.com"
                  className="text-zinc-200 hover:text-indigo-400 transition-colors duration-200 text-sm"
                >
                  jeremy.rouillard27@gmail.com
                </a>
              </div>
              <div>
                <p className="text-zinc-700 text-[10px] font-mono uppercase tracking-widest mb-1.5">Localisation</p>
                <p className="text-zinc-200 text-sm">Rouen, France</p>
              </div>
            </motion.div>

            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.25, ease: EASE }}
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-800 text-zinc-400 hover:border-indigo-500/50 hover:text-indigo-300 text-sm transition-all duration-300"
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
          >
            {[
              { field: 'from_name',  label: 'Nom',   type: 'text',  placeholder: 'Votre nom' },
              { field: 'from_email', label: 'Email', type: 'email', placeholder: 'votre@email.com' },
            ].map((f) => (
              <div key={f.field}>
                <label className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest block mb-2">
                  {f.label}
                </label>
                <input
                  type={f.type}
                  value={form[f.field]}
                  onChange={update(f.field)}
                  placeholder={f.placeholder}
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-700 focus:border-indigo-500/60 focus:outline-none text-sm transition-colors duration-200"
                />
              </div>
            ))}

            <div>
              <label className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest block mb-2">
                Message
              </label>
              <textarea
                rows={5}
                value={form.message}
                onChange={update('message')}
                placeholder="Votre message..."
                required
                className="w-full px-4 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-700 focus:border-indigo-500/60 focus:outline-none text-sm transition-colors duration-200 resize-none"
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === 'sending' || status === 'success'}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm tracking-wide transition-all duration-300"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {status === 'sending'
                ? 'Envoi en cours...'
                : status === 'success'
                ? '✓ Message envoyé !'
                : 'Envoyer le message'}
            </motion.button>

            {status && status !== 'sending' && status !== 'success' && (
              <p className="text-red-400 text-xs text-center font-mono break-all">
                Erreur : {status}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
