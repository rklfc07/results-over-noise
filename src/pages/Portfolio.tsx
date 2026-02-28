import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, TrendingDown, Users, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    client: 'ShopNova',
    industry: 'E-commerce',
    category: 'Paid Advertising',
    image: '/images/portfolio_1.jpg',
    result: '+3.2× ROAS',
    resultIcon: TrendingUp,
    description: 'Rebuilt Google Shopping and Meta campaigns from scratch. Introduced creative testing cycles and audience segmentation that tripled return on ad spend within 90 days.',
    tags: ['Google Ads', 'Meta Ads', 'CRO'],
    duration: '3 months',
    color: 'from-yellow-500/20 to-transparent',
  },
  {
    id: 2,
    client: 'Stackly',
    industry: 'SaaS / Tech',
    category: 'SEO',
    image: '/images/portfolio_2.jpg',
    result: '+180% Organic Traffic',
    resultIcon: TrendingUp,
    description: 'Developed a full content strategy targeting high-intent keywords. Combined technical SEO fixes with a consistent publishing cadence to nearly triple organic sessions.',
    tags: ['Technical SEO', 'Content Strategy', 'Link Building'],
    duration: '6 months',
    color: 'from-blue-500/20 to-transparent',
  },
  {
    id: 3,
    client: 'Meridian Realty',
    industry: 'Real Estate',
    category: 'Lead Generation',
    image: '/images/portfolio_3.jpg',
    result: '+68% Qualified Leads',
    resultIcon: Users,
    description: 'Designed and launched a full-funnel lead generation system using local SEO, targeted paid search, and landing page optimisation to drive high-quality property enquiries.',
    tags: ['Local SEO', 'Google Ads', 'Landing Pages'],
    duration: '4 months',
    color: 'from-green-500/20 to-transparent',
  },
  {
    id: 4,
    client: 'VitalCare',
    industry: 'Healthcare',
    category: 'Paid Advertising',
    image: '/images/portfolio_4.jpg',
    result: '-42% CPA',
    resultIcon: TrendingDown,
    description: 'Audited and restructured existing paid campaigns for a healthcare provider. Tightened targeting, rewrote ad copy, and A/B tested landing pages to cut cost per acquisition by 42%.',
    tags: ['Google Ads', 'A/B Testing', 'Analytics'],
    duration: '3 months',
    color: 'from-red-500/20 to-transparent',
  },
  {
    id: 5,
    client: 'Finvault',
    industry: 'Finance / Fintech',
    category: 'Content Marketing',
    image: '/images/portfolio_5.jpg',
    result: '4× Pipeline Growth',
    resultIcon: BarChart3,
    description: 'Built a thought leadership content engine for a fintech startup. Whitepapers, SEO articles, and LinkedIn distribution combined to quadruple their inbound sales pipeline.',
    tags: ['Content Marketing', 'SEO', 'LinkedIn'],
    duration: '5 months',
    color: 'from-purple-500/20 to-transparent',
  },
  {
    id: 6,
    client: 'UrbanNest',
    industry: 'E-commerce',
    category: 'Social Media',
    image: '/images/portfolio_6.jpg',
    result: '+220% Social Revenue',
    resultIcon: TrendingUp,
    description: 'Scaled Instagram and TikTok ad campaigns for a home décor brand. Introduced UGC creative testing and influencer whitelisting to grow social-attributed revenue by 220%.',
    tags: ['Meta Ads', 'TikTok Ads', 'UGC'],
    duration: '4 months',
    color: 'from-orange-500/20 to-transparent',
  },
];

const categories = ['All', 'Paid Advertising', 'SEO', 'Lead Generation', 'Content Marketing', 'Social Media'];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLElement>(null);

  const filtered = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.portfolio-hero-content', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
      });
      gsap.fromTo('.portfolio-card', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      });
    });
    return () => ctx.revert();
  }, [filtered]);

  return (
    <div className="bg-ron-dark min-h-screen">

      {/* Hero */}
      <section ref={heroRef} className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="w-full px-5 lg:px-[5vw]">
          <div className="portfolio-hero-content max-w-3xl">
            <p className="micro-label mb-4">Case Studies</p>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-[clamp(40px,5vw,64px)] leading-[1.1] tracking-[-0.02em] text-white mb-6">
              Work that <span className="text-ron-yellow">speaks</span> for itself
            </h1>
            <p className="text-ron-text-secondary text-base lg:text-lg leading-relaxed max-w-xl">
              Real campaigns, real clients, real results. Here's a selection of projects where we turned marketing spend into measurable growth.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-10">
        <div className="w-full px-5 lg:px-[5vw]">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-ron-yellow text-ron-dark font-medium'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={gridRef} className="pb-24 lg:pb-32">
        <div className="w-full px-5 lg:px-[5vw]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(project => (
              <div
                key={project.id}
                className="portfolio-card process-card overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(245,200,66,0.12)] hover:border-ron-yellow/30 flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-white/5">
                  {/* Placeholder gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-60`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="font-display font-bold text-2xl text-white/20 uppercase tracking-widest">
                        {project.client}
                      </p>
                      <p className="text-white/10 text-xs uppercase tracking-widest mt-1">
                        {project.industry}
                      </p>
                    </div>
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-ron-yellow/90 text-ron-dark text-xs font-semibold rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 lg:p-6 flex flex-col flex-1">
                  {/* Client & Industry */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-ron-yellow transition-colors duration-300">
                      {project.client}
                    </h3>
                    <span className="text-white/40 text-xs">{project.industry}</span>
                  </div>

                  {/* Key Result */}
                  <div className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-white/5 border border-white/5">
                    <project.resultIcon size={16} className="text-ron-yellow flex-shrink-0" />
                    <span className="font-display font-bold text-ron-yellow text-lg">{project.result}</span>
                  </div>

                  {/* Description */}
                  <p className="text-ron-text-secondary text-sm leading-relaxed flex-1 mb-4">
                    {project.description}
                  </p>

                  {/* Tags & Duration */}
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-white/5 text-white/60 text-xs rounded-lg">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-white/30 text-xs">Duration: {project.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-ron-lavender">
        <div className="w-full px-5 lg:px-[5vw] text-center">
          <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-[clamp(30px,3.2vw,48px)] leading-[1.1] tracking-[-0.02em] text-white mb-4">
            Want results like <span className="text-ron-yellow">these</span>?
          </h2>
          <p className="text-ron-text-secondary text-base lg:text-lg max-w-md mx-auto mb-8">
            Let's talk about your business and build a strategy that delivers measurable growth.
          </p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
            Book a discovery call
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Portfolio;
