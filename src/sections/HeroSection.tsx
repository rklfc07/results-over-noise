import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const mediaCardRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const mediaCard = mediaCardRef.current;
    const body = bodyRef.current;
    const cta = ctaRef.current;

    if (!section || !headline || !mediaCard || !body || !cta) return;

    const ctx = gsap.context(() => {
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      loadTl.fromTo(
        mediaCard,
        { x: '12vw', scale: 0.96, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, duration: 0.9 },
        0.2
      );

      const headlineLines = headline.querySelectorAll('.headline-line');
      loadTl.fromTo(
        headlineLines,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
        0.3
      );

      loadTl.fromTo(
        [body, cta],
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.6
      );

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([headline, mediaCard, body, cta], {
              opacity: 1, x: 0, y: 0, scale: 1,
            });
          },
        },
      });

      scrollTl.fromTo(headline, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(mediaCard, { x: 0, scale: 1, opacity: 1 }, { x: '10vw', scale: 0.98, opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(body, { y: 0, opacity: 1 }, { y: '18vh', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(cta, { y: 0, opacity: 1 }, { y: '18vh', opacity: 0, ease: 'power2.in' }, 0.72);
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="section-pinned bg-ron-dark flex items-center">
      <div className="w-full px-6 lg:px-[6vw] py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <p className="micro-label mb-6">Performance Marketing</p>

            <div ref={headlineRef} className="mb-8">
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-[clamp(44px,5vw,76px)] leading-[0.95] tracking-[-0.03em] text-white">
                <span className="headline-line block"><span className="text-ron-yellow">Data-driven</span></span>
                <span className="headline-line block">marketing.</span>
                <span className="headline-line block">Built to perform.</span>
              </h1>
            </div>

            <div ref={bodyRef} className="max-w-md mb-8">
              <p className="text-ron-text-secondary text-base lg:text-lg leading-relaxed">
                We plan, run, and optimize campaigns across paid search, social,
                and content—so every dollar works harder.
              </p>
            </div>

            {/* CTAs — primary dominant, secondary ghost outline */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection('#contact')}
                className="btn-primary flex items-center gap-2 text-base px-6 py-3"
              >
                Book a discovery call
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollToSection('#services')}
                className="flex items-center gap-2 text-sm px-5 py-3 rounded-full border border-white/30 text-white hover:border-ron-yellow hover:text-ron-yellow transition-all duration-300"
              >
                Explore services
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Right Media Card — gradient fades on all edges */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div
              ref={mediaCardRef}
              className="relative w-full max-w-[400px] lg:max-w-none lg:w-[40vw] lg:h-[68vh] aspect-[3/4] lg:aspect-auto will-change-transform overflow-hidden rounded-3xl"
              style={{ boxShadow: '0 28px 70px rgba(0,0,0,0.45)' }}
            >
              <img
                src="./images/hero_team_collab.jpg"
                alt="Team collaboration"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 30%' }}
              />
              {/* Left edge fade */}
              <div className="absolute inset-y-0 left-0 w-1/3 pointer-events-none"
                style={{ background: 'linear-gradient(to right, #0B0B0D 0%, transparent 100%)' }} />
              {/* Top edge fade */}
              <div className="absolute inset-x-0 top-0 h-1/4 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, #0B0B0D 0%, transparent 100%)' }} />
              {/* Bottom edge fade */}
              <div className="absolute inset-x-0 bottom-0 h-1/4 pointer-events-none"
                style={{ background: 'linear-gradient(to top, #0B0B0D 0%, transparent 100%)' }} />
              {/* Right edge fade */}
              <div className="absolute inset-y-0 right-0 w-1/4 pointer-events-none"
                style={{ background: 'linear-gradient(to left, #0B0B0D 0%, transparent 100%)' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
