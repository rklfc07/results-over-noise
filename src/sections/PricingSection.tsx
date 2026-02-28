import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight, Zap, TrendingUp, Crown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    icon: Zap,
    name: 'Starter',
    price: '$2,500',
    period: '/month',
    description: 'Audit + 90-day plan',
    features: [
      'Marketing audit',
      'Competitor analysis',
      '90-day roadmap',
      'Channel recommendations',
      'Monthly check-in',
    ],
    cta: 'Get started',
    highlighted: false,
  },
  {
    icon: TrendingUp,
    name: 'Growth',
    price: '$5,500',
    period: '/month',
    description: 'Media management + creative testing',
    features: [
      'Everything in Starter',
      'Paid media management',
      'Creative testing',
      'Weekly optimization',
      'Bi-weekly reporting',
      'Landing page reviews',
    ],
    cta: 'Book a call',
    highlighted: true,
  },
  {
    icon: Crown,
    name: 'Scale',
    price: 'Custom',
    period: '',
    description: 'Full funnel + CRO + reporting',
    features: [
      'Everything in Growth',
      'Full-funnel strategy',
      'CRO & A/B testing',
      'SEO & content',
      'Dedicated strategist',
      'Real-time dashboard',
    ],
    cta: 'Contact us',
    highlighted: false,
  },
];

const PricingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cards = cardsRef.current;

    if (!section || !headline || !cards) return;

    const cardElements = cards.querySelectorAll('.pricing-card');

    const ctx = gsap.context(() => {
      // Headline animation (flowing)
      gsap.fromTo(
        headline,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headline,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger (flowing)
      cardElements.forEach((card, i) => {
        gsap.fromTo(
          card,
          { x: 60, opacity: 0, scale: 0.98 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.1,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative bg-ron-dark py-20 lg:py-32"
    >
      <div className="w-full px-6 lg:px-[6vw]">
        <div className="grid lg:grid-cols-[1fr,2fr] gap-12 lg:gap-16">
          {/* Left Headline */}
          <div ref={headlineRef}>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,56px)] leading-[1.05] tracking-[-0.03em] text-white mb-4">
              Pricing that <span className="text-ron-yellow">scales</span>
            </h2>
            <p className="text-ron-text-secondary text-base lg:text-lg mb-6">
              Start small, grow fast—no long-term lock-in.
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-ron-text-secondary">
              Custom scopes available.
            </p>
          </div>

          {/* Right Pricing Cards */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6"
          >
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`pricing-card process-card p-6 card-hover will-change-transform ${
                  pkg.highlighted
                    ? 'border-ron-yellow/50 bg-ron-yellow/5'
                    : ''
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                    pkg.highlighted ? 'bg-ron-yellow' : 'bg-white/5'
                  }`}
                >
                  <pkg.icon
                    size={20}
                    className={pkg.highlighted ? 'text-ron-dark' : 'text-ron-yellow'}
                  />
                </div>

                {/* Name */}
                <h3 className="font-display font-semibold text-lg text-white mb-2">
                  {pkg.name}
                </h3>

                {/* Price */}
                <div className="mb-4">
                  <span className="font-display font-bold text-2xl text-white">
                    {pkg.price}
                  </span>
                  <span className="text-ron-text-secondary text-sm">
                    {pkg.period}
                  </span>
                </div>

                {/* Description */}
                <p className="text-ron-text-secondary text-sm mb-6">
                  {pkg.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-start gap-2 text-sm text-ron-text-secondary"
                    >
                      <Check size={14} className="text-ron-yellow mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={scrollToContact}
                  className={`w-full py-2.5 rounded-full text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                    pkg.highlighted
                      ? 'bg-ron-yellow text-ron-dark hover:shadow-lg hover:shadow-ron-yellow/20'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {pkg.cta}
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
