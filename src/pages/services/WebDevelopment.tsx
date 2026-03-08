import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Layout, Zap, ShieldCheck, Smartphone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Layout,
    title: 'Custom Design & Build',
    description: 'Pixel-perfect websites designed from scratch to reflect your brand, engage visitors, and convert leads—no templates, no shortcuts.',
  },
  {
    icon: Zap,
    title: 'Performance Optimised',
    description: 'Fast-loading pages with Core Web Vitals scores that keep Google happy and users engaged. Speed is a feature, not an afterthought.',
  },
  {
    icon: Smartphone,
    title: 'Fully Responsive',
    description: 'Every site we build looks and works flawlessly across all devices—mobile, tablet, and desktop—from day one.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Scalable',
    description: 'Built on modern stacks with security best practices baked in. Architected to scale as your business grows.',
  },
];

const deliverables = [
  'Discovery & wireframing',
  'Custom UI/UX design',
  'Responsive front-end development',
  'CMS integration (if needed)',
  'Performance & SEO setup',
  'Analytics & tracking implementation',
  'Post-launch support',
];

const WebDevelopment = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.page-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );

      gsap.fromTo(
        '.feature-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-ron-dark pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="w-full px-5 lg:px-[5vw]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link to="/services" className="text-ron-text-secondary hover:text-white transition-colors">
            Services
          </Link>
          <span className="text-ron-text-secondary">/</span>
          <span className="text-ron-yellow">Website Development</span>
        </div>

        {/* Page Header */}
        <div className="page-header mb-12 lg:mb-16">
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-[clamp(36px,4vw,56px)] leading-[1.05] tracking-[-0.03em] text-white mb-4">
            Website <span className="text-ron-yellow">Development</span>
          </h1>
          <p className="text-ron-text-secondary text-base lg:text-lg max-w-2xl mb-8">
            We build fast, beautiful, conversion-focused websites that become your most
            valuable marketing asset. From landing pages to full marketing sites—designed
            to perform.
          </p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
            Discuss your project
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Features Grid */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-12 lg:mb-16">
          {features.map((feature, index) => (
            <div key={index} className="feature-card process-card p-5 lg:p-6">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                <feature.icon size={24} className="text-ron-yellow" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-ron-text-secondary text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Two Column: Deliverables + CTA */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Deliverables */}
          <div className="process-card p-5 lg:p-6">
            <h3 className="font-display font-semibold text-lg text-white mb-5">
              What's Included
            </h3>
            <ul className="space-y-3">
              {deliverables.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check size={18} className="text-ron-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-ron-text-secondary text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Card */}
          <div className="process-card p-5 lg:p-6 bg-ron-yellow/5 border-ron-yellow/20">
            <h3 className="font-display font-semibold text-lg text-white mb-3">
              Ready to build something great?
            </h3>
            <p className="text-ron-text-secondary text-sm mb-6">
              Most projects go from brief to live in 4–8 weeks. Tell us what you need and
              we'll put together a proposal.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Start your project
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebDevelopment;
