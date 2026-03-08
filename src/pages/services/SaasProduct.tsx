import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Layers, RefreshCw, BarChart3, Lock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Layers,
    title: 'Product-Led Growth Strategy',
    description: 'We design SaaS experiences that sell themselves—onboarding flows, feature gating, and in-app prompts that turn free users into paying customers.',
  },
  {
    icon: RefreshCw,
    title: 'Retention & Churn Reduction',
    description: 'Data-driven strategies to improve activation, increase engagement, and reduce churn so your MRR compounds month over month.',
  },
  {
    icon: BarChart3,
    title: 'Growth Analytics & Funnel Optimisation',
    description: 'Full-funnel instrumentation from trial start to paid conversion. We find where users drop off and systematically fix it.',
  },
  {
    icon: Lock,
    title: 'Scalable Architecture Guidance',
    description: 'Technical and go-to-market recommendations that keep your product fast, reliable, and ready to scale without re-platforming.',
  },
];

const deliverables = [
  'SaaS growth audit',
  'Onboarding flow optimisation',
  'Pricing & packaging review',
  'In-app messaging strategy',
  'Churn analysis & playbook',
  'MRR & ARR reporting dashboard',
  'Monthly growth reviews',
];

const SaasProduct = () => {
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
          <span className="text-ron-yellow">SaaS Product</span>
        </div>

        {/* Page Header */}
        <div className="page-header mb-12 lg:mb-16">
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-[clamp(36px,4vw,56px)] leading-[1.05] tracking-[-0.03em] text-white mb-4">
            SaaS <span className="text-ron-yellow">Product Growth</span>
          </h1>
          <p className="text-ron-text-secondary text-base lg:text-lg max-w-2xl mb-8">
            We help SaaS companies grow faster by optimising every stage of the product
            funnel—from first sign-up to loyal paying customer. Less churn, more MRR.
          </p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
            Talk to a SaaS specialist
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
              Ready to scale your SaaS?
            </h3>
            <p className="text-ron-text-secondary text-sm mb-6">
              We work with early-stage and growth-stage SaaS teams. Book a call and we'll
              review your funnel for free.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Book a free funnel review
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaasProduct;
