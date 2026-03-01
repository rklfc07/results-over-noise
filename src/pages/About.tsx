import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, TrendingUp, Users, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Target,
    title: 'Results First',
    description: 'We measure success by the impact we create for your business, not vanity metrics.',
  },
  {
    icon: TrendingUp,
    title: 'Data-Driven',
    description: 'Every decision is backed by data. We test, learn, and optimize continuously.',
  },
  {
    icon: Users,
    title: 'Partnership',
    description: 'We work as an extension of your team, aligned with your goals and invested in your success.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We hold ourselves to the highest standards in everything we do.',
  },
];

const stats = [
  { value: '50+', label: 'Clients Served' },
  { value: '$10M+', label: 'Ad Spend Managed' },
  { value: '3.5×', label: 'Avg. ROAS' },
  { value: '90%', label: 'Client Retention' },
];

// Trusted by logos (placeholder brand names — replace with actual logos)
const trustedBy = ['ShopNova', 'Stackly', 'Meridian', 'VitalCare', 'Finvault', 'UrbanNest'];

const About = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.page-header', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' });
      gsap.fromTo('.stat-item', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.stats-row', start: 'top 75%', toggleActions: 'play none none reverse' }
      });
      gsap.fromTo('.value-card', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.values-grid', start: 'top 70%', toggleActions: 'play none none reverse' }
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-ron-dark pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="w-full px-5 lg:px-[5vw]">

        {/* Page Header */}
        <div className="page-header mb-10 lg:mb-14">
          {/* ABOUT US label — bold with yellow accent bar */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-5 bg-ron-yellow rounded-full" />
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-white font-semibold">
              About Us
            </p>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-[clamp(36px,4vw,56px)] leading-[1.05] tracking-[-0.03em] text-white mb-5">
            We're obsessed with <span className="text-ron-yellow">results</span>
          </h1>

          {/* Body text — slightly larger for readability */}
          <p className="text-ron-text-secondary text-base lg:text-lg leading-relaxed max-w-2xl mb-4">
            Results Over Noise is a performance marketing agency that helps businesses
            cut through the clutter and drive measurable growth.
          </p>
          <p className="text-ron-text-secondary text-base lg:text-lg leading-relaxed max-w-2xl mb-8">
            Founded by marketers who were tired of vague reports and vanity metrics,
            we built an agency that focuses on what actually matters: revenue, ROI, and
            real business impact.
          </p>

          {/* Trusted by strip */}
          <div className="mb-8">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-ron-text-secondary mb-4">
              Trusted by
            </p>
            <div className="flex flex-wrap gap-3">
              {trustedBy.map((brand) => (
                <span
                  key={brand}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-row grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 lg:mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item process-card p-5 text-center">
              <div className="font-display font-bold text-2xl lg:text-3xl text-ron-yellow mb-1">
                {stat.value}
              </div>
              <div className="text-ron-text-secondary text-xs lg:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
          <div className="media-card aspect-[4/3] lg:aspect-auto">
            <img
              src="./images/strategy_research.jpg"
              alt="Our team at work"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-white mb-4">
              Strategy before spend
            </h2>
            <p className="text-ron-text-secondary text-sm lg:text-base leading-relaxed mb-4">
              We don't believe in throwing money at ads and hoping for the best. Every campaign
              starts with deep research into your market, competitors, and customers.
            </p>
            <p className="text-ron-text-secondary text-sm lg:text-base leading-relaxed mb-6">
              This strategic foundation allows us to build campaigns that are targeted, efficient,
              and designed to deliver results from day one.
            </p>

            {/* Explore services — styled as a proper button, not a plain link */}
            <div>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/25 text-white text-sm font-medium hover:border-ron-yellow hover:text-ron-yellow transition-all duration-300 group"
              >
                Explore our services
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-12 lg:mb-16">
          <h2 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-white mb-8">
            Our Values
          </h2>
          <div className="values-grid grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {values.map((value, index) => (
              <div key={index} className="value-card process-card p-5 lg:p-6">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                  <value.icon size={20} className="text-ron-yellow" />
                </div>
                <h3 className="font-display font-semibold text-lg text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-ron-text-secondary text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="process-card p-6 lg:p-8 text-center">
          <h3 className="font-display font-semibold text-xl text-white mb-3">
            Ready to work with us?
          </h3>
          <p className="text-ron-text-secondary text-sm mb-6 max-w-md mx-auto">
            Let's discuss how we can help you achieve your marketing goals.
          </p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
            Book a discovery call
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
