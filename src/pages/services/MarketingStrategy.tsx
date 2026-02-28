import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Lightbulb, Search, MapPin, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Search,
    title: 'Market Research',
    description: 'Deep dive into your market, competitors, and opportunities to identify growth levers.',
  },
  {
    icon: BarChart3,
    title: 'Competitor Analysis',
    description: 'Understand what your competitors are doing and find gaps you can exploit.',
  },
  {
    icon: MapPin,
    title: 'Channel Planning',
    description: 'Strategic selection of marketing channels based on your audience and goals.',
  },
  {
    icon: Lightbulb,
    title: 'KPI Setting',
    description: 'Clear, measurable objectives that align with your business goals.',
  },
];

const deliverables = [
  'Comprehensive market analysis',
  'Competitor landscape report',
  'Customer persona development',
  'Channel strategy & budget allocation',
  '90-day action plan',
  'KPI dashboard setup',
];

const MarketingStrategy = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.page-header', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' });
      gsap.fromTo('.feature-card', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.features-grid', start: 'top 70%', toggleActions: 'play none none reverse' }
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-ron-dark pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="w-full px-5 lg:px-[5vw]">
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link to="/services" className="text-ron-text-secondary hover:text-white transition-colors">Services</Link>
          <span className="text-ron-text-secondary">/</span>
          <span className="text-ron-yellow">Marketing Strategy</span>
        </div>

        <div className="page-header mb-12 lg:mb-16">
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-[clamp(36px,4vw,56px)] leading-[1.05] tracking-[-0.03em] text-white mb-4">
            Marketing <span className="text-ron-yellow">Strategy</span>
          </h1>
          <p className="text-ron-text-secondary text-base lg:text-lg max-w-2xl mb-8">
            Comprehensive marketing roadmaps tailored to your business goals. Strategic planning 
            that aligns all your marketing efforts for maximum impact.
          </p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
            Get a strategy session
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="features-grid grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-12 lg:mb-16">
          {features.map((feature, index) => (
            <div key={index} className="feature-card process-card p-5 lg:p-6">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                <feature.icon size={24} className="text-ron-yellow" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white mb-2">{feature.title}</h3>
              <p className="text-ron-text-secondary text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="process-card p-5 lg:p-6">
            <h3 className="font-display font-semibold text-lg text-white mb-5">What's Included</h3>
            <ul className="space-y-3">
              {deliverables.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check size={18} className="text-ron-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-ron-text-secondary text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="process-card p-5 lg:p-6 bg-ron-yellow/5 border-ron-yellow/20">
            <h3 className="font-display font-semibold text-lg text-white mb-3">Ready for a clear roadmap?</h3>
            <p className="text-ron-text-secondary text-sm mb-6">
              Get a data-driven strategy that shows exactly where to invest for maximum ROI.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Book your strategy session
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingStrategy;
