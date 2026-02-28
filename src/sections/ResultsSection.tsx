import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, TrendingDown, TrendingUp, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  {
    icon: TrendingDown,
    value: '-42%',
    label: 'CPA',
    description: 'After 90 days of creative testing.',
  },
  {
    icon: TrendingUp,
    value: '+3.2×',
    label: 'ROAS',
    description: 'Paid search + landing page redesign.',
  },
  {
    icon: Users,
    value: '+68%',
    label: 'Leads',
    description: 'SEO + content program.',
  },
];

const ResultsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cards = cardsRef.current;
    const cta = ctaRef.current;

    if (!section || !headline || !cards || !cta) return;

    const cardElements = cards.querySelectorAll('.metric-card');

    const ctx = gsap.context(() => {
      // Headline animation (flowing)
      gsap.fromTo(
        headline,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headline,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger (flowing with scrub)
      cardElements.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.1,
          }
        );
      });

      // CTA animation
      gsap.fromTo(
        cta,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cta,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-ron-dark py-20 lg:py-32"
    >
      <div className="w-full px-6 lg:px-[6vw]">
        {/* Headline */}
        <div ref={headlineRef} className="mb-12 lg:mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,56px)] leading-[1.05] tracking-[-0.03em] text-white mb-4">
            Results you can <span className="text-ron-yellow">measure</span>
          </h2>
          <p className="text-ron-text-secondary text-base lg:text-lg max-w-xl">
            We report what matters—cost per acquisition, pipeline contribution,
            and return on ad spend.
          </p>
        </div>

        {/* Metric Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-12"
        >
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="metric-card process-card p-6 lg:p-8 card-hover will-change-transform"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                <metric.icon size={24} className="text-ron-yellow" />
              </div>

              {/* Value */}
              <div className="mb-4">
                <span className="font-display font-bold text-4xl lg:text-5xl text-white">
                  {metric.value}
                </span>
                <span className="font-display font-semibold text-xl text-ron-text-secondary ml-2">
                  {metric.label}
                </span>
              </div>

              {/* Description */}
              <p className="text-ron-text-secondary text-sm leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef}>
          <button className="btn-primary flex items-center gap-2">
            Get a custom forecast
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
