import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────

interface SiteFooterProps {
  /** Accent color for the active theme. Defaults to navy blue. */
  accentColor?: string;
}

type SubscribeStatus = 'idle' | 'loading' | 'success' | 'error';

// ─── Data ──────────────────────────────────────────────────────────────────

const usefulLinks = [
  { label: 'University Applications', href: '/university' },
  { label: 'Find Housing', href: '/housing' },
  { label: 'Transport Info', href: '/bahn' },
  { label: 'Food & Dining', href: '/food' },
  { label: 'Entertainment', href: '/entertainment' },
];

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com',
    icon: <Instagram className="w-5 h-5" />,
    hoverColor: 'hover:text-pink-400',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com',
    icon: <Facebook className="w-5 h-5" />,
    hoverColor: 'hover:text-blue-400',
  },
  {
    label: 'X / Twitter',
    href: 'https://www.twitter.com',
    icon: <Twitter className="w-5 h-5" />,
    hoverColor: 'hover:text-sky-400',
  },
];

// ─── Mock async subscribe handler ──────────────────────────────────────────

async function mockSubscribe(email: string): Promise<{ ok: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 1800));
  // Simulate ~90% success rate
  return { ok: email.includes('@') && Math.random() > 0.1 };
}

// ─── Component ─────────────────────────────────────────────────────────────

const SiteFooter: React.FC<SiteFooterProps> = ({ accentColor = '#FFCC00' }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubscribeStatus>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === 'loading') return;
    setStatus('loading');
    const result = await mockSubscribe(email);
    setStatus(result.ok ? 'success' : 'error');
    // Auto-reset after 3 seconds
    setTimeout(() => {
      setStatus('idle');
      if (result.ok) setEmail('');
    }, 3000);
  };

  const isLoading = status === 'loading';

  return (
    <footer style={{ backgroundColor: '#1A2B4C' }} className="text-white">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,204,0,0.15)', border: '1px solid rgba(255,204,0,0.2)' }}>
                <span className="text-2xl">🎓</span>
              </div>
              <span className="text-lg font-semibold tracking-tight">Study in Germany</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Empowering international students with everything they need to thrive in Germany — from universities and housing to food and nightlife.
            </p>
            <p className="text-white/30 text-xs mt-2">
              © {new Date().getFullYear()} Study in Germany Guide. All rights reserved.
            </p>
          </div>

          {/* Col 2 — Useful Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/50 mb-5">
              Useful Links
            </h3>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Follow Us */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/50 mb-5">
              Follow Us
            </h3>
            <p className="text-white/60 text-sm mb-5 leading-relaxed">
              Stay updated with the latest tips, guides, and news for students in Germany.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`p-2.5 rounded-xl bg-white/10 text-white/60 transition-all duration-200 hover:bg-white/20 ${s.hoverColor}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 4 — Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/50 mb-5">
              Newsletter
            </h3>
            <p className="text-white/60 text-sm mb-4 leading-relaxed">
              Get monthly student guides, event listings, and visa tips delivered to your inbox.
            </p>

            {/* Newsletter form with overlay feedback */}
            <form onSubmit={handleSubscribe} className="relative">
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  disabled={isLoading || status === 'success'}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50 transition-all"
                />
                <button
                  type="submit"
                  disabled={isLoading || status === 'success'}
                  style={{ backgroundColor: isLoading || status === 'success' ? undefined : accentColor, color: (isLoading || status === 'success') ? undefined : '#1A2B4C' }}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed
                    ${isLoading || status === 'success' ? 'bg-white/20' : 'hover:opacity-90 active:scale-95'}`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Subscribe
                    </>
                  )}
                </button>
              </div>

              {/* Success / Error overlay — fade in smoothly */}
              {(status === 'success' || status === 'error') && (
                <div
                  className="absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-2 text-center px-4 animate-in fade-in-0 duration-500"
                  style={{ backgroundColor: status === 'success' ? 'rgba(16,185,129,0.92)' : 'rgba(239,68,68,0.92)' }}
                >
                  {status === 'success' ? (
                    <>
                      <CheckCircle className="w-6 h-6 text-white" />
                      <p className="text-white font-semibold text-sm">Subscribed! 🎉</p>
                      <p className="text-white/80 text-xs">Thanks for joining our newsletter.</p>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-6 h-6 text-white" />
                      <p className="text-white font-semibold text-sm">Something went wrong.</p>
                      <p className="text-white/80 text-xs">Please try again in a moment.</p>
                    </>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 text-xs">
          <p>Built with ❤️ for international students navigating life in Germany.</p>
          <div className="flex gap-4">
            <span className="hover:text-white/70 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white/70 cursor-pointer transition-colors">Terms of Use</span>
            <span className="hover:text-white/70 cursor-pointer transition-colors">Contact</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
