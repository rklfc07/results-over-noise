import { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Target, Share2, FileText, Lightbulb, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const allServices = [
  {
    icon: Search,
    title: 'SEO & Organic Traffic',
    outcome: 'Rank higher, get found, grow without paying per click.',
    description: 'Get found by customers actively searching for your services. We optimize your site for sustainable, long-term growth that compounds over time.',
    href: '/services/seo',
    features: ['Technical SEO', 'On-page Optimization', 'Content Strategy', 'Link Building'],
  },
  {
    icon: Target,
    title: 'Paid Advertising',
    outcome: 'Turn every ad dollar into predictable, measurable revenue.',
    description: 'Turn ad spend into revenue with data-driven campaigns. We manage Google Ads and Meta campaigns that deliver consistent, profitable results.',
    href: '/services/paid-advertising',
    features: ['Google Ads', 'Meta Ads', 'Programmatic', 'Retargeting'],
  },
  {
    icon: Share2,
    title: 'Social Media Marketing',
    outcome: 'Build an audience that trusts your brand and buys from you.',
    description: 'Build your brand and engage your audience where they spend their time. Strategic content and community management that drives real business results.',
    href: '/services/social-media',
    features: ['Content Creation', 'Community Management', 'Paid Social', 'Analytics'],
  },
  {
    icon: FileText,
    title: 'Content Marketing',
    outcome: 'Create assets that educate, attract, and convert on autopilot.',
    description: 'Content that educates, engages, and converts. From blog posts to lead magnets, we create assets that work 24/7 to grow your business.',
    href: '/services/content-marketing',
    features: ['Blog Content', 'Lead Magnets', 'Email Campaigns', 'Video Scripts'],
  },
  {
    icon: Lightbulb,
    title: 'Marketing Strategy',
    outcome: 'Get a clear roadmap so every channel works toward one goal.',
    description: 'Comprehensive marketing roadmaps tailored to your business goals. Strategic planning that aligns all your marketing efforts for maximum impact.',
    href: '/services/marketing-strategy',
    features: ['Market Research', 'Competitor Analysis', 'Channel Planning', 'KPI Setting'],
  },
  {
    icon: Users,
    title: 'Lead Generation',
    outcome: 'Fill your pipeline with qualified leads, month after month.',
    description: 'Fill your pipeline with qualified prospects. We create systems that consistently generate high-quality leads for your sales team.',
    href: '/services/lead-generation',
    features: ['Landing Pages', 'Lead Magnets', 'Nurturing Sequences', 'CRM Integration'],
  },
];

// Rotating stats for the hero right side
const rotatingStats = [
  { value: '3.2×', label: 'Average ROAS' },
  { value: '-42%', label: 'Lower CPA' },
  { value: '+180%', label: 'Organic Traffic Growth' },
  { value: '50+', label: 'Brands Served' },
];

const RotatingStat = () => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % rotatingStats.length);
        setVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const stat = rotatingStats[current];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        <div className="font-display font-bold text-5xl lg:text-6xl text-ron-yellow mb-3">
          {stat.value}
        </div>
        <div className="font-mono text-xs uppercase tracking-widest text-ron-text-secondary">
          {stat.label}
        </div>
      </div>
      {/* Dots */}
      <div className="flex gap-1.5 mt-8">
        {rotatingStats.map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{ background: i === current ? '#F2E84B' : 'rgba(255,255,255,0.2)' }}
          />
        ))}
      </div>
    </div>
  );
};

const Services = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.page-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );
      gsap.fromTo(
        '.service-item',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: '.services-list', start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-ron-dark pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="w-full px-5 lg:px-[5vw]">

        {/* Page Header — two column: headline left, rotating stat right */}
        <div className="page-header mb-12 lg:mb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="micro-label mb-4">What We Do</p>
              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-[clamp(36px,4vw,56px)] leading-[1.05] tracking-[-0.03em] text-white mb-4">
                Services that <span className="text-ron-yellow">deliver</span>
              </h1>
              <p className="text-ron-text-secondary text-base lg:text-lg max-w-xl">
                Full-funnel marketing solutions designed to drive measurable growth for your business.
              </p>
            </div>
            {/* Rotating stat — fills the empty right side */}
            <div
              className="hidden lg:block process-card h-40"
              style={{ border: '1px solid rgba(242,232,75,0.15)' }}
            >
              <RotatingStat />
            </div>
          </div>
        </div>

        {/* Services List — Option A: Stacked layout (full-width rows) */}
        <div className="services-list flex flex-col gap-4 mb-12">
          {allServices.map((service, index) => (
            <Link
              key={index}
              to={service.href}
              className="service-item process-card p-5 lg:p-6 card-hover block group"
            >
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-ron-yellow/10 transition-colors duration-300">
                  <service.icon size={22} className="text-ron-yellow" />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Title + arrow */}
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h3 className="font-display font-semibold text-lg lg:text-xl text-white group-hover:text-ron-yellow transition-colors duration-300">
                      {service.title}
                    </h3>
                    <ArrowRight size={16} className="text-ron-yellow flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Outcome — results-first hook */}
                  <p className="text-ron-yellow/80 text-sm font-medium mb-2">
                    {service.outcome}
                  </p>

                  {/* Description */}
                  <p className="text-ron-text-secondary text-sm leading-relaxed mb-3">
                    {service.description}
                  </p>

                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, fIndex) => (
                      <span
                        key={fIndex}
                        className="px-2.5 py-1 rounded-full bg-white/5 text-ron-text-secondary text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="process-card p-6 lg:p-8 text-center">
          <h3 className="font-display font-semibold text-xl text-white mb-3">
            Not sure what you need?
          </h3>
          <p className="text-ron-text-secondary text-sm mb-6 max-w-md mx-auto">
            Let's discuss your goals and we'll recommend the right mix of services for your business.
          </p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
            Book a free consultation
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
