import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/services') {
      return location.pathname.startsWith('/services');
    }
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-ron-dark">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? 'bg-ron-dark/95 backdrop-blur-md py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="w-full px-5 lg:px-[5vw] flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-display font-bold text-base lg:text-lg text-white tracking-tight"
          >
            Results Over Noise
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`text-sm transition-colors duration-200 ${
                  isActive(link.href)
                    ? 'text-ron-yellow'
                    : 'text-ron-text-secondary hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="btn-primary text-sm flex items-center gap-2"
            >
              Book a call
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[99] bg-ron-dark transition-all duration-500 lg:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`font-display text-2xl transition-colors ${
                isActive(link.href)
                  ? 'text-ron-yellow'
                  : 'text-white hover:text-ron-yellow'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/contact" className="btn-primary mt-4 flex items-center gap-2">
            Book a call
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-ron-dark border-t border-white/10 py-12 lg:py-16">
        <div className="w-full px-5 lg:px-[5vw]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="font-display font-bold text-lg text-white mb-4 block">
                Results Over Noise
              </Link>
              <p className="text-ron-text-secondary text-sm leading-relaxed">
                Data-driven marketing that delivers measurable ROI.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.12em] text-ron-text-secondary mb-4">
                Services
              </h4>
              <ul className="space-y-2">
                {[
                  { label: 'SEO & Organic', href: '/services/seo' },
                  { label: 'Paid Advertising', href: '/services/paid-advertising' },
                  { label: 'Social Media', href: '/services/social-media' },
                  { label: 'Content Marketing', href: '/services/content-marketing' },
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
            </div>

            {/* Company */}
            <div>
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

            {/* Contact */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.12em] text-ron-text-secondary mb-4">
                Get in Touch
              </h4>
              <p className="text-sm text-ron-text-secondary mb-2">
                hello@resultsovernoise.co
              </p>
              <p className="text-sm text-ron-text-secondary">
                +1 (555) 013-2847
              </p>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-ron-text-secondary text-xs">
              © Results Over Noise. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link to="#" className="text-ron-text-secondary hover:text-white text-xs transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-ron-text-secondary hover:text-white text-xs transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
