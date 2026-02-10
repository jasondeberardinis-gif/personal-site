'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ThemeToggle } from '@/components/ThemeToggle'
import { PixelWaves } from '@/components/PixelWaves'

const currentProjects = [
  {
    name: 'Sheath',
    description: 'Premium knife rolls for chefs',
    url: 'https://sheath.store',
    display: 'sheath.store',
    logo: 'https://www.google.com/s2/favicons?domain=sheath.store&sz=32',
  },
  {
    name: 'Spoil',
    description: 'Simple products, built right',
    url: 'https://spoil.co',
    display: 'spoil.co',
    logo: 'https://www.google.com/s2/favicons?domain=spoil.co&sz=32',
  },
]


const socials = [
  { label: 'Instagram', url: 'https://instagram.com/jasonndeb' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/jasondeberardinis' },
  { label: 'GitHub', url: 'https://github.com/jasondeberardinis' },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-20">
      <ThemeToggle />

      <div className="w-full max-w-lg space-y-8">
        {/* Name + Headshot */}
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="shrink-0"
          >
            <PixelWaves />
          </motion.div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Jason DeBerardinis
            </h1>
            <p className="text-sm text-muted">Massachusetts</p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-[15px] leading-relaxed text-foreground">
          I fell in love with the act of building products at a young age, now I
          help grow tech companies at{' '}
          <a
            href="https://www.rivierapartners.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent"
          >
            Riviera Partners
          </a>{' '}
          while building{' '}
          <a
            href="https://sheath.store"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent"
          >
            Sheath
          </a>{' '}
          and{' '}
          <a
            href="https://spoil.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent"
          >
            Spoil
          </a>
          .
        </p>

        {/* Currently Building */}
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Currently Building
          </p>
          <div className="space-y-3">
            {currentProjects.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg bg-card-bg p-4 transition-transform duration-200 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-2.5">
                  <Image
                    src={p.logo}
                    alt={`${p.name} logo`}
                    width={20}
                    height={20}
                    className="rounded-sm"
                    unoptimized
                  />
                  <span className="font-medium text-foreground">{p.name}</span>
                  <span className="text-muted">&mdash;</span>
                  <span className="text-sm text-muted">{p.description}</span>
                </div>
                <span className="mt-0.5 ml-[28px] block text-sm text-muted">
                  {p.display}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Socials */}
        <div className="flex justify-center gap-6 pt-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
