import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Target, FileText, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Target,
    title: 'Paid Media',
    description: 'Search, social, programmatic—optimized weekly.',
  },
  {
    icon: FileText,
    title: 'SEO & Content',
    description: 'Rankings that compound and content that converts.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & CRO',
    description: 'Clear reporting + tests that lift conversion.',
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cards = cardsRef.current;
    const body = bodyRef.current;

    if (!section || !headline || !cards || !body) return;

    const cardElements = cards.querySelectorAll('.service-card');

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      // Headline from left
      scrollTl.fromTo(
        headline,
        { x: '-55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Cards from right (staggered)
      cardElements.forEach((card, i) => {
        scrollTl.fromTo(
          card,
          { x: '55vw', opacity: 0, scale: 0.98 },
          { x: 0, opacity: 1, scale: 1, ease: 'none' },
          0.06 + i * 0.04
        );
      });

      // Body from bottom
      scrollTl.fromTo(
        body,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );

      // SETTLE (30% - 70%) - hold position

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        headline,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      cardElements.forEach((card) => {
        scrollTl.fromTo(
          card,
          { x: 0, opacity: 1 },
          { x: '12vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
      });

      scrollTl.fromTo(
        body,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-pinned bg-ron-dark flex items-center"
    >
      <div className="w-full px-6 lg:px-[6vw] py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <div ref={headlineRef} className="mb-8">
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,56px)] leading-[1.05] tracking-[-0.03em] text-white">
                Full-funnel{' '}
                <span className="text-ron-yellow">services</span>
              </h2>
            </div>

            <div ref={bodyRef} className="max-w-md">
              <p className="text-ron-text-secondary text-base lg:text-lg leading-relaxed mb-6">
                From first impression to final conversion—strategy, creative,
                media, and measurement.
              </p>
              <button className="text-white hover:text-ron-yellow transition-colors flex items-center gap-2 text-sm">
                Explore the stack
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Service Cards */}
          <div
            ref={cardsRef}
            className="order-1 lg:order-2 flex flex-col gap-4 lg:gap-5"
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card process-card p-5 lg:p-6 card-hover will-change-transform"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <service.icon size={20} className="text-ron-yellow" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-white mb-1">
                      {service.title}
                    </h3>
                    <p className="text-ron-text-secondary text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
