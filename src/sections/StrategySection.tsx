import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Users, MessageSquare, Share2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Users, label: 'Audience' },
  { icon: MessageSquare, label: 'Message' },
  { icon: Share2, label: 'Channels' },
];

const StrategySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const mediaCard = mediaCardRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const statsEl = statsRef.current;

    if (!section || !mediaCard || !headline || !body || !statsEl) return;

    const statItems = statsEl.querySelectorAll('.stat-item');

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
      // Media card from left
      scrollTl.fromTo(
        mediaCard,
        { x: '-60vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Headline from right
      scrollTl.fromTo(
        headline,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.06
      );

      // Body from bottom
      scrollTl.fromTo(
        body,
        { y: '12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.14
      );

      // Stats from bottom (staggered)
      statItems.forEach((item, i) => {
        scrollTl.fromTo(
          item,
          { y: '8vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.18 + i * 0.04
        );
      });

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        mediaCard,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        headline,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        body,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      statItems.forEach((item) => {
        scrollTl.fromTo(
          item,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.72
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="section-pinned bg-ron-dark flex items-center"
    >
      <div className="w-full px-6 lg:px-[6vw] py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 items-center">
          {/* Left Media Card */}
          <div className="order-1 flex justify-center lg:justify-start">
            <div
              ref={mediaCardRef}
              className="media-card w-full max-w-[400px] lg:max-w-none lg:w-[40vw] lg:h-[68vh] aspect-[3/4] lg:aspect-auto will-change-transform"
            >
              <img
                src="./images/strategy_research.jpg"
                alt="Strategy research"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="order-2 lg:pl-[4vw]">
            <div ref={headlineRef} className="mb-8">
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,56px)] leading-[1.05] tracking-[-0.03em] text-white">
                Strategy before{' '}
                <span className="text-ron-yellow">spend</span>
              </h2>
            </div>

            <div ref={bodyRef} className="max-w-md mb-8">
              <p className="text-ron-text-secondary text-base lg:text-lg leading-relaxed mb-6">
                We map your audience, messaging, and funnel—so media dollars land
                with the right people at the right time.
              </p>
              <button className="text-white hover:text-ron-yellow transition-colors flex items-center gap-2 text-sm">
                See how we plan
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Stats Row */}
            <div ref={statsRef} className="flex flex-wrap gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="stat-item flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
                >
                  <stat.icon size={14} className="text-ron-yellow" />
                  <span className="font-mono text-xs uppercase tracking-[0.12em] text-ron-text-secondary">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategySection;
