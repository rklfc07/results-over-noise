import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ArrowRight, X, Menu, ChevronDown, ChevronRight } from 'lucide-react';

const marketingLinks = [
  { label: 'Marketing Strategy', href: '/services/marketing-strategy' },
  { label: 'SEO & Organic', href: '/services/seo' },
  { label: 'Paid Advertising', href: '/services/paid-advertising' },
  { label: 'Social Media', href: '/services/social-media' },
  { label: 'Lead Generation', href: '/services/lead-generation' },
  { label: 'Content Marketing', href: '/services/content-marketing' },
];

const navLinks = [
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
];

const Layout = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false); // desktop dropdown
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false); // mobile accordion
  const [scrolled, setScrolled] = useState(false);

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!servicesOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#services-dropdown-wrapper')) setServicesOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [servicesOpen]);

  return (
    <>
      {/* ── Navbar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled ? 'bg-ron-dark/95 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="w-full px-5 lg:px-[5vw] h-16 lg:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-display font-bold text-lg text-white hover:text-ron-yellow transition-colors">
            Results Over Noise
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.label} id="services-dropdown-wrapper" className="relative">
                  <button
                    onClick={() => setServicesOpen((v) => !v)}
                    className={`flex items-center gap-1 text-sm transition-colors ${
                      isActive(link.href) ? 'text-ron-yellow' : 'text-ron-text-secondary hover:text-white'
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Dropdown */}
                  {servicesOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[480px] bg-ron-dark border border-white/10 rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.6)] p-5 grid grid-cols-2 gap-1">
                      {/* Marketing column */}
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ron-text-secondary mb-3 px-2">
                          Marketing
                        </p>
                        {marketingLinks.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors group ${
                              isActive(item.href)
                                ? 'text-ron-yellow bg-ron-yellow/10'
                                : 'text-ron-text-secondary hover:text-white hover:bg-white/5'
                            }`}
                          >
                            <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-ron-yellow" />
                            {item.label}
                          </Link>
                        ))}
                      </div>

                      {/* Build column */}
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ron-text-secondary mb-3 px-2">
                          Build
                        </p>
                        {[
                          { label: 'Website Development', href: '/services/web-development' },
                          { label: 'SaaS Product', href: '/services/saas-product' },
                        ].map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors group ${
                              isActive(item.href)
                                ? 'text-ron-yellow bg-ron-yellow/10'
                                : 'text-ron-text-secondary hover:text-white hover:bg-white/5'
                            }`}
                          >
                            <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-ron-yellow" />
                            {item.label}
                          </Link>
                        ))}

                        {/* All services link */}
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <Link
                            to="/services"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-ron-yellow hover:bg-ron-yellow/10 transition-colors"
                          >
                            All services <ArrowRight size={12} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm transition-colors ${
                    isActive(link.href) ? 'text-ron-yellow' : 'text-ron-text-secondary hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}

            <Link to="/contact" className="btn-primary text-sm flex items-center gap-2">
              Book a call
              <ArrowRight size={14} />
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <div
        className={`fixed inset-0 z-[99] bg-ron-dark transition-all duration-500 lg:hidden overflow-y-auto ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col px-6 pt-24 pb-12 gap-2">
          {/* Services accordion */}
          <div>
            <button
              onClick={() => setMobileServicesOpen((v) => !v)}
              className={`w-full flex items-center justify-between py-3 font-display text-xl transition-colors ${
                isActive('/services') ? 'text-ron-yellow' : 'text-white'
              }`}
            >
              Services
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {mobileServicesOpen && (
              <div className="pl-4 pb-3 flex flex-col gap-1">
                {/* Marketing group */}
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ron-text-secondary mt-3 mb-2">
                  Marketing
                </p>
                {marketingLinks.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`py-2 text-base transition-colors ${
                      isActive(item.href) ? 'text-ron-yellow' : 'text-ron-text-secondary hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Build group */}
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ron-text-secondary mt-4 mb-2">
                  Build
                </p>
                {[
                  { label: 'Website Development', href: '/services/web-development' },
                  { label: 'SaaS Product', href: '/services/saas-product' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`py-2 text-base transition-colors ${
                      isActive(item.href) ? 'text-ron-yellow' : 'text-ron-text-secondary hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                <Link
                  to="/services"
                  className="mt-3 py-2 text-base text-ron-yellow flex items-center gap-2"
                >
                  All services <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </div>

          {/* Other nav links */}
          {navLinks
            .filter((l) => !l.hasDropdown)
            .map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`py-3 font-display text-xl transition-colors ${
                  isActive(link.href) ? 'text-ron-yellow' : 'text-white hover:text-ron-yellow'
                }`}
              >
                {link.label}
              </Link>
            ))}

          <Link
            to="/contact"
            className="btn-primary mt-6 flex items-center justify-center gap-2"
          >
            Book a call
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* ── Page Content ── */}
      <main className="relative">
        <Outlet />
      </main>

      {/* ── Footer ── */}
      <footer className="bg-ron-dark border-t border-white/10 py-12 lg:py-16">
        <div className="w-full px-5 lg:px-[5vw]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            <div className="lg:col-span-1">
              <Link to="/" className="font-display font-bold text-lg text-white mb-4 block">
                Results Over Noise
              </Link>
              <p className="text-ron-text-secondary text-sm leading-relaxed">
                Data-driven marketing that delivers measurable ROI.
              </p>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.12em] text-ron-text-secondary mb-4">
                Marketing
              </h4>
              <ul className="space-y-2">
                {marketingLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-sm text-ron-text-secondary hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.12em] text-ron-text-secondary mb-4">
                Build
              </h4>
              <ul className="space-y-2 mb-6">
                {[
                  { label: 'Website Development', href: '/services/web-development' },
                  { label: 'SaaS Product', href: '/services/saas-product' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-sm text-ron-text-secondary hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <h4 className="font-mono text-xs uppercase tracking-[0.12em] text-ron-text-secondary mb-4">
                Company
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-sm text-ron-text-secondary hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-ron-text-secondary hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.12em] text-ron-text-secondary mb-4">
                Get in Touch
              </h4>
              <p className="text-sm text-ron-text-secondary mb-2">hello@resultsovernoise.co</p>
              <p className="text-sm text-ron-text-secondary">+1 (555) 013-2847</p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-ron-text-secondary text-xs">
              © Results Over Noise. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
