import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, RefreshCw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PerformanceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const mediaCardRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const mediaCard = mediaCardRef.current;
    const badge = badgeRef.current;

    if (!section || !headline || !body || !mediaCard || !badge) return;

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

      // Body from bottom
      scrollTl.fromTo(
        body,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // Media card from right
      scrollTl.fromTo(
        mediaCard,
        { x: '55vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.06
      );

      // Badge from top
      scrollTl.fromTo(
        badge,
        { y: '-4vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        headline,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        body,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        mediaCard,
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        badge,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.72
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-ron-dark flex items-center"
    >
      <div className="w-full px-6 lg:px-[6vw] py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <div ref={headlineRef} className="mb-8">
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,56px)] leading-[1.05] tracking-[-0.03em] text-white">
                Optimize for{' '}
                <span className="text-ron-yellow">outcomes</span>
              </h2>
            </div>

            <div ref={bodyRef} className="max-w-md">
              <p className="text-ron-text-secondary text-base lg:text-lg leading-relaxed mb-6">
                We test creative, landing pages, and audiences—then double down
                on what moves the needle.
              </p>
              <button className="text-white hover:text-ron-yellow transition-colors flex items-center gap-2 text-sm">
                View case studies
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Media Card */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div
              ref={mediaCardRef}
              className="media-card relative w-full max-w-[400px] lg:max-w-none lg:w-[40vw] lg:h-[68vh] aspect-[3/4] lg:aspect-auto will-change-transform"
            >
              <img
                src="./images/performance_optimization.jpg"
                alt="Performance optimization"
                className="w-full h-full object-cover"
              />
              {/* Badge */}
              <div
                ref={badgeRef}
                className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-ron-yellow text-ron-dark text-xs font-semibold will-change-transform"
              >
                <RefreshCw size={12} />
                Weekly optimization
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;
