'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { site } from '@/lib/data';
import { SocialLinks } from '@/components/social-links';

const HEAD_LEAD = ['I', 'build', 'AI', 'systems', 'that'];
const HEAD_ACCENT = ['ship', 'to', 'production.'];

export function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  };
  const word = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="pt-20 pb-24 sm:pt-28">
      <motion.div initial="hidden" animate="show" variants={container} className="max-w-4xl">
        <motion.p variants={word} className="label-mono">
          {site.role}
        </motion.p>

        <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-7xl">
          <span className="sr-only">{site.tagline}</span>
          <span aria-hidden className="flex flex-wrap gap-x-[0.28em] gap-y-1">
            {HEAD_LEAD.map((w, i) => (
              <motion.span key={i} variants={word} className="inline-block">
                {w}
              </motion.span>
            ))}
          </span>
          <span aria-hidden className="mt-1 flex flex-wrap gap-x-[0.28em] gap-y-1 text-primary">
            {HEAD_ACCENT.map((w, i) => (
              <motion.span key={i} variants={word} className="relative inline-block">
                {w}
                {i === HEAD_ACCENT.length - 1 && (
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[3px] w-full origin-left bg-primary"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.7, delay: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          variants={word}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground"
        >
          {site.bio}
        </motion.p>

        <motion.div variants={word} className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={site.resumeUrl}
            download
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            <Download className="h-4 w-4" />
            Download Résumé
          </a>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-foreground/40 hover:bg-secondary"
          >
            View Work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div variants={word} className="mt-10">
          <SocialLinks />
        </motion.div>
      </motion.div>
    </section>
  );
}
