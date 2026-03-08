import { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, FileText, BarChart3, TrendingDown, TrendingUp, Users, Quote, CheckCircle2, Zap, Shield, BarChart2, Lightbulb, Layout, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Lightbulb,
    title: 'Marketing Strategy',
    description: 'Roadmaps that align every channel to your business goals.',
    href: '/services/marketing-strategy',
  },
  {
    icon: Users,
    title: 'Lead Generation',
    description: 'Systems that fill your pipeline with qualified prospects.',
    href: '/services/lead-generation',
  },
  {
    icon: FileText,
    title: 'SEO & Content',
    description: 'Rankings that compound and content that converts.',
    href: '/services/seo',
  },
  {
    icon: Target,
    title: 'Paid Advertising',
    description: 'Search, social, programmatic—optimized weekly.',
    href: '/services/paid-advertising',
  },
  {
    icon: Layout,
    title: 'Website Development',
    description: 'Fast, conversion-focused websites built to perform.',
    href: '/services/web-development',
  },
  {
    icon: Layers,
    title: 'SaaS Product Growth',
    description: 'Grow MRR, reduce churn, scale your product.',
    href: '/services/saas-product',
  },
];

const metrics = [
  { icon: TrendingDown, value: '-42%', label: 'CPA', description: 'After 90 days of creative testing.' },
  { icon: TrendingUp, value: '+3.2×', label: 'ROAS', description: 'Paid search + landing page redesign.' },
  { icon: Users, value: '+68%', label: 'Leads', description: 'SEO + content program.' },
];

const testimonials = [
  {
    quote: "They turned our funnel into a predictable growth engine—clear reporting, fast iterations, and real ROI.",
    name: "Jordan Hale",
    title: "VP Marketing, Northlight",
    img: "/images/testimonial_1.jpg",
  },
  {
    quote: "Our cost per lead dropped 38% in the first two months. The team knows their stuff and communicates clearly.",
    name: "Priya Sharma",
    title: "Head of Growth, Vertex Labs",
    img: "/images/testimonial_2.jpg",
  },
  {
    quote: "We finally have a marketing partner that speaks in numbers, not buzzwords. Refreshing and effective.",
    name: "Marcus Chen",
    title: "CEO, Brightpath",
    img: "/images/testimonial_3.jpg",
  },
  {
    quote: "SEO traffic up 3x in six months. They built a content engine that keeps delivering.",
    name: "Anika Torres",
    title: "Marketing Director, Scale AI",
    img: "/images/testimonial_4.jpg",
  },
  {
    quote: "From strategy to execution—they handle it all without hand-holding. Exactly what we needed.",
    name: "Daniel Brooks",
    title: "Founder, Launchpad Co.",
    img: "/images/testimonial_5.jpg",
  },
];

const whyReasons = [
  {
    icon: BarChart2,
    title: 'Numbers over narratives',
    description: 'Every decision is backed by data. We report what actually moves the needle—CPA, ROAS, pipeline, revenue.',
  },
  {
    icon: Zap,
    title: 'Fast iterations',
    description: 'Weekly optimisations, not quarterly reviews. We move at the speed your business demands.',
  },
  {
    icon: Shield,
    title: 'No lock-in, full transparency',
    description: 'You own your accounts, your data, and your results. We earn your business every month.',
  },
  {
    icon: CheckCircle2,
    title: 'Senior team, always',
    description: 'No hand-offs to juniors. Your campaigns are managed by experienced marketers from day one.',
  },
];

const clientLogos = [
  'Northlight', 'Vertex Labs', 'Scale AI', 'Brightpath', 'Launchpad Co.',
  'Meridian', 'Skybridge', 'Apex Digital', 'Clearwave', 'Ironclad',
];




// ── Horizontal Testimonial Scroll with Images ───────────────────────────────
const TestimonialScroll = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  const scrollTo = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[idx] as HTMLElement;
    track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
    setCurrent(idx);
  };

  // Auto-scroll every 2 seconds
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent(prev => {
        const next = (prev + 1) % total;
        const track = trackRef.current;
        if (track) {
          const card = track.children[next] as HTMLElement;
          track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
        }
        return next;
      });
    }, 2000);
    return () => clearInterval(timer);
  }, [paused, total]);

  // Track manual scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cards = Array.from(track.children) as HTMLElement[];
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.getBoundingClientRect().left - track.getBoundingClientRect().left);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setCurrent(closest);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div>
      {/* Scrollable track */}
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="snap-center flex-shrink-0 w-[90vw] sm:w-[520px] lg:w-[600px] process-card overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row">
              {/* Image */}
              <div className="w-full sm:w-[45%] h-[200px] sm:h-auto relative">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Content */}
              <div className="flex-1 p-5 lg:p-6">
                <Quote size={24} className="text-ron-yellow mb-4" />
                <blockquote className="font-display font-semibold text-base lg:text-lg leading-[1.4] tracking-[-0.02em] text-white mb-4">
                  "{t.quote}"
                </blockquote>
                <div>
                  <p className="text-white font-medium text-sm">{t.name}</p>
                  <p className="text-white/60 text-xs mt-0.5">{t.title}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot navigation */}
      <div className="flex items-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-6 h-2 bg-ron-yellow'
                : 'w-2 h-2 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};


// ── Moving Logo Strip ────────────────────────────────────────────────────────
const LogoStrip = () => {
  const doubled = [...clientLogos, ...clientLogos];
  return (
    <div className="overflow-hidden py-8 border-t border-b border-white/10">
      <div
        className="flex gap-12 logo-strip-inner"
        style={{ width: 'max-content', animation: 'logoScroll 20s linear infinite' }}
      >
        {doubled.map((name, i) => (
          <span
            key={i}
            className="text-white/40 font-display font-semibold text-sm uppercase tracking-[0.12em] whitespace-nowrap hover:text-white/80 transition-colors"
          >
            {name}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes logoScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

// ── Main Component ───────────────────────────────────────────────────────────
const Home = () => {
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const resultsRef = useRef<HTMLElement>(null);
  const whyRef = useRef<HTMLElement>(null);
  const testimonialRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-content', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 });
      gsap.fromTo('.hero-image', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.4 });

      gsap.fromTo('.services-title', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: servicesRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      });
      gsap.fromTo('.service-card', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.services-grid', start: 'top 70%', toggleActions: 'play none none reverse' },
      });
      gsap.fromTo('.results-title', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: resultsRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      });
      gsap.fromTo('.metric-card', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.metrics-grid', start: 'top 70%', toggleActions: 'play none none reverse' },
      });
      gsap.fromTo('.why-card', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.why-grid', start: 'top 70%', toggleActions: 'play none none reverse' },
      });
      gsap.fromTo('.testimonial-content', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: testimonialRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="bg-ron-dark">
        {/* Hero Section */}
        <section ref={heroRef} className="flex items-center" style={{ minHeight: 'calc(100vh - clamp(72px, 11vw, 100px))', marginTop: 'clamp(72px, 11vw, 100px)' }}>
          <div className="w-full px-5 lg:px-[5vw]">
            <div className="grid md:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-center">
              {/* Text LEFT */}
              <div className="hero-content order-1">
                <p className="micro-label mb-3">Performance Marketing</p>
                <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.15] tracking-[-0.02em] text-white mb-4">
                  <span className="text-ron-yellow">Data-driven</span>{' '}marketing.
                  <br />
                  Built to perform.
                </h1>
                <p className="text-ron-text-secondary text-base lg:text-lg leading-relaxed max-w-md mb-6">
                  We plan, run, and optimize campaigns across paid search, social,
                  and content—so every dollar works harder.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link to="/contact" className="btn-primary flex items-center gap-2">
                    Book a discovery call
                    <ArrowRight size={16} />
                  </Link>
                  <Link to="/services" className="text-white hover:text-ron-yellow transition-colors flex items-center gap-2 text-sm">
                    Explore services
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
              {/* Image RIGHT */}
              <div className="hero-image order-2 flex justify-center md:justify-end">
                <div className="media-card w-full max-w-[340px] md:max-w-none md:w-full aspect-[4/5]">
                  <img
                    src="/images/hero_team_collab.jpg"
                    alt="Team collaboration"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section ref={servicesRef} className="py-16 lg:py-24">
          <div className="w-full px-5 lg:px-[5vw]">
            <div className="services-title mb-10 lg:mb-14">
              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-[clamp(30px,3.2vw,48px)] leading-[1.1] tracking-[-0.02em] text-white mb-4">
                Full-funnel <span className="text-ron-yellow">services</span>
              </h2>
              <p className="text-ron-text-secondary text-base lg:text-lg max-w-lg">
                From first impression to final conversion—strategy, creative,
                media, measurement, and the technology to power it all.
              </p>
            </div>
            <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
              {services.map((service, index) => (
                <Link key={index} to={service.href} className="service-card process-card p-5 lg:p-6 block group transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(245,200,66,0.15)] hover:border-ron-yellow/40 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-ron-yellow/10 transition-colors duration-300">
                      <service.icon size={20} className="text-ron-yellow" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-white mb-1 group-hover:text-ron-yellow transition-colors duration-300">{service.title}</h3>
                      <p className="text-ron-text-secondary text-sm leading-relaxed mb-3">{service.description}</p>
                      <span className="text-ron-yellow text-sm flex items-center gap-1">Learn more <ArrowRight size={12} /></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/services" className="text-white hover:text-ron-yellow transition-colors flex items-center gap-2 text-sm">
              View all services <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* Results Section */}
        <section ref={resultsRef} className="py-16 lg:py-24">
          <div className="w-full px-5 lg:px-[5vw]">
            <div className="results-title mb-10 lg:mb-14">
              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-[clamp(30px,3.2vw,48px)] leading-[1.1] tracking-[-0.02em] text-white mb-4">
                Results you can <span className="text-ron-yellow">measure</span>
              </h2>
              <p className="text-ron-text-secondary text-base lg:text-lg max-w-lg">
                We report what matters—cost per acquisition, pipeline contribution, and return on ad spend.
              </p>
            </div>
            <div className="metrics-grid grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-10">
              {metrics.map((metric, index) => (
                <div key={index} className="metric-card process-card p-5 lg:p-6 group transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(245,200,66,0.15)] hover:border-ron-yellow/40 cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-5 group-hover:bg-ron-yellow/10 transition-colors duration-300">
                    <metric.icon size={20} className="text-ron-yellow" />
                  </div>
                  <div className="mb-3">
                    <span className="font-display font-bold text-3xl lg:text-4xl text-white group-hover:text-ron-yellow transition-colors duration-300">{metric.value}</span>
                    <span className="font-display font-semibold text-lg text-ron-text-secondary ml-2">{metric.label}</span>
                  </div>
                  <p className="text-ron-text-secondary text-sm leading-relaxed">{metric.description}</p>
                </div>
              ))}
            </div>
            <Link to="/contact" className="btn-primary flex items-center gap-2">
              Get a custom forecast <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Why Results Over Noise Section */}
        <section ref={whyRef} className="py-16 lg:py-24 bg-white/5">
          <div className="w-full px-5 lg:px-[5vw]">
            <div className="mb-10 lg:mb-14">
              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-[clamp(30px,3.2vw,48px)] leading-[1.1] tracking-[-0.02em] text-white mb-4">
                Why <span className="text-ron-yellow">Results Over Noise</span>?
              </h2>
              <p className="text-ron-text-secondary text-base lg:text-lg max-w-lg">
                We're not another agency chasing vanity metrics. Here's what makes us different.
              </p>
            </div>
            <div className="why-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {whyReasons.map((reason, index) => (
                <div key={index} className="why-card process-card p-5 lg:p-6 group transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(245,200,66,0.15)] hover:border-ron-yellow/40 cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-5 group-hover:bg-ron-yellow/10 transition-colors duration-300">
                    <reason.icon size={20} className="text-ron-yellow" />
                  </div>
                  <h3 className="font-display font-semibold text-base text-white mb-2 group-hover:text-ron-yellow transition-colors duration-300">{reason.title}</h3>
                  <p className="text-ron-text-secondary text-sm leading-relaxed">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section – Horizontal Scroll with Images */}
        <section ref={testimonialRef} className="py-16 lg:py-24">
          <div className="w-full px-5 lg:px-[5vw]">
            <div className="testimonial-content mb-10 lg:mb-14">
              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-[clamp(30px,3.2vw,48px)] leading-[1.1] tracking-[-0.02em] text-white mb-4">
                What our <span className="text-ron-yellow">clients</span> say
              </h2>
              <p className="text-ron-text-secondary text-base lg:text-lg max-w-lg">
                Real results. Real feedback. Scroll to see more.
              </p>
            </div>
            <TestimonialScroll />
          </div>
        </section>

        {/* Client Logo Strip */}
        <LogoStrip />

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="w-full px-5 lg:px-[5vw] text-center">
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-[clamp(30px,3.2vw,48px)] leading-[1.1] tracking-[-0.02em] text-white mb-4">
              Ready to <span className="text-ron-yellow">grow</span>?
            </h2>
            <p className="text-ron-text-secondary text-base lg:text-lg max-w-md mx-auto mb-8">
              Let's discuss how we can help you achieve your marketing goals.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Book a discovery call <ArrowRight size={16} />
            </Link>
          </div>
        </section>


      </div>
    </>
  );
};

export default Home;
