import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const clientLogos = [
  'Northlight',
  'Vertex Labs',
  'Scale AI',
  'Brightpath',
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const mediaCardRef = useRef<HTMLDivElement>(null);
  const attributionRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const quote = quoteRef.current;
    const mediaCard = mediaCardRef.current;
    const attribution = attributionRef.current;
    const logos = logosRef.current;

    if (!section || !quote || !mediaCard || !attribution || !logos) return;

    const logoElements = logos.querySelectorAll('.client-logo');

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
      // Quote from left
      scrollTl.fromTo(
        quote,
        { x: '-55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Media card from right
      scrollTl.fromTo(
        mediaCard,
        { x: '55vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.06
      );

      // Attribution from bottom
      scrollTl.fromTo(
        attribution,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.16
      );

      // Logos stagger
      logoElements.forEach((logo, i) => {
        scrollTl.fromTo(
          logo,
          { opacity: 0, y: '4vh' },
          { opacity: 1, y: 0, ease: 'none' },
          0.2 + i * 0.025
        );
      });

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        quote,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        mediaCard,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        attribution,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.72
      );

      logoElements.forEach((logo) => {
        scrollTl.fromTo(
          logo,
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
      className="section-pinned bg-ron-lavender flex items-center"
    >
      <div className="w-full px-6 lg:px-[6vw] py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 items-center">
          {/* Left Quote */}
          <div className="order-2 lg:order-1">
            <div ref={quoteRef} className="mb-8 will-change-transform">
              <Quote size={40} className="text-ron-yellow mb-6" />
              <blockquote className="font-display font-semibold text-2xl sm:text-3xl lg:text-[clamp(28px,3vw,42px)] leading-[1.15] tracking-[-0.02em] text-white">
                They turned our funnel into a predictable growth engine—clear
                reporting, fast iterations, and real ROI.
              </blockquote>
            </div>

            <div ref={attributionRef} className="mb-10 will-change-transform">
              <p className="text-white font-medium text-lg">
                Jordan Hale
              </p>
              <p className="text-white/70 text-sm">
                VP Marketing, Northlight
              </p>
            </div>

            {/* Client Logos */}
            <div ref={logosRef}>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-white/60 mb-4">
                Trusted by teams at
              </p>
              <div className="flex flex-wrap gap-4">
                {clientLogos.map((logo, index) => (
                  <div
                    key={index}
                    className="client-logo px-4 py-2 rounded-lg bg-white/10 text-white/80 text-sm font-medium will-change-transform"
                  >
                    {logo}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Media Card */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div
              ref={mediaCardRef}
              className="media-card w-full max-w-[400px] lg:max-w-none lg:w-[40vw] lg:h-[68vh] aspect-[3/4] lg:aspect-auto will-change-transform"
            >
              <img
                src="./images/testimonial_team_meeting.jpg"
                alt="Team meeting"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
