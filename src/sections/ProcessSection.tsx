import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Search, MapPin, Rocket, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery',
    description: 'Goals, data, competitors, quick wins.',
  },
  {
    number: '02',
    icon: MapPin,
    title: 'Plan',
    description: 'Channel mix, messaging, timeline.',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Execute',
    description: 'Launch, monitor, iterate weekly.',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Scale',
    description: 'Double down on what performs.',
  },
];

const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const track = trackRef.current;
    const cards = cardsRef.current;
    const dots = dotsRef.current;

    if (!section || !headline || !track || !cards || !dots) return;

    const cardElements = cards.querySelectorAll('.process-step-card');
    const dotElements = dots.querySelectorAll('.connector-dot');

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.7,
        },
      });

      // ENTRANCE (0% - 30%)
      // Headline from top
      scrollTl.fromTo(
        headline,
        { y: '-12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Track line draw
      scrollTl.fromTo(
        track,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', transformOrigin: 'left center' },
        0.06
      );

      // Cards from bottom (staggered left to right)
      cardElements.forEach((card, i) => {
        scrollTl.fromTo(
          card,
          { y: '40vh', opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, ease: 'none' },
          0.08 + i * 0.04
        );
      });

      // Dots pop in
      dotElements.forEach((dot, i) => {
        scrollTl.fromTo(
          dot,
          { scale: 0 },
          { scale: 1, ease: 'none' },
          0.18 + i * 0.03
        );
      });

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%) - cards collapse to center
      scrollTl.fromTo(
        cardElements[0],
        { x: 0, opacity: 1 },
        { x: '22vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cardElements[1],
        { x: 0, opacity: 1 },
        { x: '7vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cardElements[2],
        { x: 0, opacity: 1 },
        { x: '-7vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cardElements[3],
        { x: 0, opacity: 1 },
        { x: '-22vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        track,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        headline,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="section-pinned bg-ron-dark flex items-center"
    >
      <div className="w-full px-6 lg:px-[6vw] py-20 lg:py-0">
        {/* Headline */}
        <div ref={headlineRef} className="mb-12 lg:mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,56px)] leading-[1.05] tracking-[-0.03em] text-white mb-4">
            How we <span className="text-ron-yellow">work</span>
          </h2>
          <p className="text-ron-text-secondary text-base lg:text-lg max-w-md">
            A simple, repeatable system—so you always know what's happening
            next.
          </p>
          <button className="mt-4 text-white hover:text-ron-yellow transition-colors flex items-center gap-2 text-sm">
            Download our playbook
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Track Line */}
          <div
            ref={trackRef}
            className="absolute left-0 right-0 top-[calc(50%-1px)] h-[2px] bg-white/20 hidden lg:block will-change-transform"
            style={{ transformOrigin: 'left center' }}
          />

          {/* Connector Dots */}
          <div
            ref={dotsRef}
            className="absolute left-0 right-0 top-[calc(50%-4px)] hidden lg:flex justify-between px-[8vw] will-change-transform"
          >
            {steps.map((_, index) => (
              <div
                key={index}
                className="connector-dot w-2 h-2 rounded-full bg-ron-yellow will-change-transform"
              />
            ))}
          </div>

          {/* Cards */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          >
            {steps.map((step, index) => (
              <div
                key={index}
                className="process-step-card process-card p-5 lg:p-6 card-hover will-change-transform"
              >
                {/* Number */}
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-ron-yellow mb-4 block">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                  <step.icon size={20} className="text-white" />
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-lg text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-ron-text-secondary text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
