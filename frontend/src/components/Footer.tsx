import React, { useState } from 'react';
import { Instagram, Facebook, Twitter, Mail, ExternalLink } from 'lucide-react';

const LOGO_URL =
  'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=100&q=80';

const usefulLinks = [
  { label: 'University Applications', href: '#university' },
  { label: 'Find Housing', href: '#housing' },
  { label: 'Transport Info', href: '#bahn' },
  { label: 'Visa Guides', href: '#visa' },
  { label: 'Contact Us', href: '#contact' },
];

const socialLinks = [
  { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { Icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { Icon: Twitter, href: 'https://twitter.com', label: 'X / Twitter' },
];

type OverlayStatus = 'success' | 'error' | null;

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [overlay, setOverlay] = useState<OverlayStatus>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Mock async request
    await new Promise((res) => setTimeout(res, 1800));

    const isSuccess = Math.random() > 0.15; // 85% success rate for demo
    setOverlay(isSuccess ? 'success' : 'error');
    setLoading(false);

    setTimeout(() => {
      setOverlay(null);
      if (isSuccess) setEmail('');
    }, 3000);
  };

  return (
    <footer className="bg-[#0a2463] text-white">
      <div className="max-w-screen-xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <img
                src={LOGO_URL}
                alt="Study in Germany logo"
                className="w-14 h-14 rounded-full object-cover border-2 border-[#f97316]"
              />
              <span className="text-xl font-bold">Study in Germany</span>
            </div>
            <p className="text-sm text-blue-200 leading-relaxed">
              Empowering international students with everything they need to thrive — from universities to housing, transport, food, and beyond.
            </p>
          </div>

          {/* Column 2: Useful Links */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-[#f97316] uppercase tracking-wide">
              Useful Links
            </h3>
            <ul className="space-y-2">
              {usefulLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="flex items-center gap-1 text-sm text-blue-200 hover:text-white transition-colors group"
                  >
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Follow Us */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-[#f97316] uppercase tracking-wide">
              Follow Us
            </h3>
            <ul className="space-y-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-blue-200 hover:text-white transition-colors group"
                  >
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 group-hover:bg-[#f97316] transition-colors">
                      <Icon className="w-4 h-4" />
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-[#f97316] uppercase tracking-wide">
              Newsletter
            </h3>
            <p className="text-sm text-blue-200 mb-4">
              Get the latest tips and guides for studying in Germany, straight to your inbox.
            </p>
            <div className="relative">
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2 border border-white/20 focus-within:border-[#f97316] transition-colors">
                  <Mail className="w-4 h-4 text-blue-300 shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading || overlay !== null}
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent text-sm text-white placeholder-blue-300 outline-none disabled:opacity-60"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || overlay !== null}
                  className="w-full py-2.5 bg-[#f97316] hover:bg-[#ea6c0a] disabled:opacity-70 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:scale-100"
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>

              {/* Overlay */}
              {overlay && (
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-xl bg-[#0a2463]/95 backdrop-blur-sm animate-fade-in"
                  style={{ animation: 'fadeIn 0.4s ease' }}
                >
                  <p className="text-center text-sm font-semibold px-4">
                    {overlay === 'success' ? (
                      <span className="text-green-300">Subscribed! 🎉<br /><span className="font-normal text-blue-200">Welcome aboard! Check your inbox.</span></span>
                    ) : (
                      <span className="text-red-300">Something went wrong 😔<br /><span className="font-normal text-blue-200">Please try again later.</span></span>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-300">
          <span>© 2026 Study in Germany. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
