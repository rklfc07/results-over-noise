import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, TrendingDown, TrendingUp, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Each card has a type that drives accent color and icon color variation
const metrics = [
  {
    icon: TrendingDown,
    value: '-42%',
    label: 'CPA',
    labelFull: 'Cost Per Acquisition',
    description: 'After 90 days of creative testing.',
    // Red/orange accent — cost reduction win
    accentColor: 'rgba(239,68,68,0.15)',
    iconColor: '#f87171',
    borderAccent: 'rgba(239,68,68,0.25)',
  },
  {
    icon: TrendingUp,
    value: '+3.2×',
    label: 'ROAS',
    labelFull: 'Return on Ad Spend',
    description: 'Paid search + landing page redesign.',
    // Yellow accent — multiplier/growth win
    accentColor: 'rgba(242,232,75,0.12)',
    iconColor: '#F2E84B',
    borderAccent: 'rgba(242,232,75,0.3)',
  },
  {
    icon: Users,
    value: '+68%',
    label: 'Leads',
    labelFull: 'Qualified Leads',
    description: 'SEO + content program.',
    // Green accent — growth win
    accentColor: 'rgba(34,197,94,0.12)',
    iconColor: '#4ade80',
    borderAccent: 'rgba(34,197,94,0.25)',
  },
];

const MetricCard = ({ metric, index }: { metric: typeof metrics[0]; index: number }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="metric-card process-card p-6 lg:p-8 will-change-transform cursor-default"
      style={{
        border: `1px solid ${metric.borderAccent}`,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 32px 80px rgba(0,0,0,0.55)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = '';
      }}
    >
      {/* Icon with per-card color */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
        style={{ background: metric.accentColor }}
      >
        <metric.icon size={28} style={{ color: metric.iconColor }} />
      </div>

      {/* Value */}
      <div className="mb-3">
        <span className="font-display font-bold text-4xl lg:text-5xl text-white">
          {metric.value}
        </span>
      </div>

      {/* Label with tooltip */}
      <div className="flex items-center gap-2 mb-3 relative">
        <span
          className="font-display font-bold text-lg"
          style={{ color: metric.iconColor }}
        >
          {metric.label}
        </span>
        <button
          className="w-4 h-4 rounded-full bg-white/10 text-white/50 text-[10px] flex items-center justify-center hover:bg-white/20 transition-colors relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          ?
          {showTooltip && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg text-white text-xs whitespace-nowrap z-10">
              {metric.labelFull}
            </div>
          )}
        </button>
      </div>

      {/* Description */}
      <p className="text-ron-text-secondary text-sm leading-relaxed">
        {metric.description}
      </p>
    </div>
  );
};

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
      gsap.fromTo(
        headline,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: headline, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );

      cardElements.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, scale: 0.98 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out', delay: i * 0.1,
            scrollTrigger: { trigger: card, start: 'top 75%', toggleActions: 'play none none reverse' },
          }
        );
      });

      gsap.fromTo(
        cta,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: cta, start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-ron-dark py-20 lg:py-32">
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
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-12">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} index={index} />
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
