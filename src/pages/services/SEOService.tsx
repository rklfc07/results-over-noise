import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Search, TrendingUp, FileText, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Search,
    title: 'Technical SEO',
    description: 'Site audits, speed optimization, and technical fixes that help search engines crawl and index your site effectively.',
  },
  {
    icon: FileText,
    title: 'On-Page Optimization',
    description: 'Strategic keyword targeting, meta optimization, and content structuring that improves rankings.',
  },
  {
    icon: TrendingUp,
    title: 'Content Strategy',
    description: 'Data-driven content planning that targets high-value keywords your customers are searching for.',
  },
  {
    icon: Globe,
    title: 'Link Building',
    description: 'Ethical link acquisition strategies that build authority and improve domain trust.',
  },
];

const deliverables = [
  'Comprehensive SEO audit',
  'Keyword research & mapping',
  'Technical issue resolution',
  'Monthly performance reports',
  'Content optimization',
  'Competitor analysis',
];

const SEOService = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.page-header', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' });
      gsap.fromTo('.feature-card', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.features-grid', start: 'top 70%', toggleActions: 'play none none reverse' },
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-ron-dark pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="w-full px-5 lg:px-[5vw]">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link to="/services" className="text-ron-text-secondary hover:text-white transition-colors">Services</Link>
          <span className="text-ron-text-secondary">/</span>
          <span className="text-ron-yellow">SEO & Organic Traffic</span>
        </div>

        {/* Page Header */}
        <div className="page-header mb-10 lg:mb-14">
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-[clamp(36px,4vw,56px)] leading-[1.05] tracking-[-0.03em] text-white mb-4">
            SEO & <span className="text-ron-yellow">Organic Traffic</span>
          </h1>
          <p className="text-ron-text-secondary text-base lg:text-lg max-w-2xl mb-8">
            Get found by customers actively searching for your services. We optimize your site
            for sustainable, long-term growth that compounds over time.
          </p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
            Get a free SEO audit
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* STACKED LAYOUT — Option A */}

        {/* 1. Features — full-width stacked rows */}
        <div className="features-grid flex flex-col gap-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card process-card p-5 lg:p-6 flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                <feature.icon size={24} className="text-ron-yellow" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-white mb-1">{feature.title}</h3>
                <p className="text-ron-text-secondary text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 2. What's Included — full width */}
        <div className="process-card p-5 lg:p-6 mb-4">
          <h3 className="font-display font-semibold text-lg text-white mb-5">What's Included</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {deliverables.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check size={16} className="text-ron-yellow mt-0.5 flex-shrink-0" />
                <span className="text-ron-text-secondary text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. CTA — full width */}
        <div className="process-card p-5 lg:p-6 bg-ron-yellow/5 border-ron-yellow/20">
          <h3 className="font-display font-semibold text-lg text-white mb-3">Ready to rank higher?</h3>
          <p className="text-ron-text-secondary text-sm mb-5">
            Most clients see measurable improvements in organic traffic within 90 days.
          </p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
            Start your SEO campaign
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SEOService;
