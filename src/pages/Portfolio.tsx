import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, TrendingDown, Users, BarChart3, Search } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    client: 'Computhink',
    country: 'USA 🇺🇸',
    industry: 'SaaS',
    category: 'Paid Advertising',
    logo: '/images/logos/Computhink.png',
    result: '+3.2× ROAS',
    resultIcon: TrendingUp,
    description: 'Rebuilt Google Ads campaigns from scratch. Increased visibility and leads through targeted search campaigns and conversion rate optimisation.',
    tags: ['Google Ads', 'CRO', 'SaaS'],
    duration: '3 months',
    accentColor: 'from-blue-600/20 via-blue-900/10 to-transparent',
    borderHover: 'hover:border-blue-500/40',
  },
  {
    id: 2,
    client: 'Keerti Education',
    country: 'India 🇮🇳',
    industry: 'Education',
    category: 'Paid Advertising',
    logo: '/images/logos/keerti_education.webp',
    result: '+80% Leads Growth',
    resultIcon: Users,
    description: 'Audited and restructured existing paid campaigns for a leading education provider. Tightened targeting, rewrote ad copy, and A/B tested landing pages to cut cost per acquisition.',
    tags: ['Google Ads', 'Meta Ads', 'A/B Testing'],
    duration: '4 months',
    accentColor: 'from-blue-500/20 via-indigo-900/10 to-transparent',
    borderHover: 'hover:border-blue-400/40',
  },
  {
    id: 3,
    client: 'Brilliante Crystal',
    country: 'USA 🇺🇸',
    industry: 'E-commerce',
    category: 'SEO',
    logo: '/images/logos/brilliantecrystalcleaner.png',
    result: 'Technical SEO Fixed',
    resultIcon: Search,
    description: 'Conducted full SEO audit. Solved technical SEMrush errors. Optimised on-page SEO across the entire product catalogue to improve search visibility.',
    tags: ['Technical SEO', 'On-page SEO', 'SEMrush'],
    duration: '2 months',
    accentColor: 'from-cyan-500/20 via-cyan-900/10 to-transparent',
    borderHover: 'hover:border-cyan-400/40',
  },
  {
    id: 4,
    client: 'Trash Butler',
    country: 'USA 🇺🇸',
    industry: 'Property Services',
    category: 'SEO',
    logo: '/images/logos/trash_buttler.png',
    result: '+68% Qualified Leads',
    resultIcon: Users,
    description: 'Designed and launched a full-funnel lead generation system for a doorstep trash pickup service. Combined local SEO and paid search to drive high-quality property management leads.',
    tags: ['Local SEO', 'Google Ads', 'Landing Pages'],
    duration: '3 months',
    accentColor: 'from-indigo-500/20 via-indigo-900/10 to-transparent',
    borderHover: 'hover:border-indigo-400/40',
  },
  {
    id: 5,
    client: 'Dr. E. Wirth & Co.',
    country: 'Germany 🇩🇪',
    industry: 'Insurance',
    category: 'SEO',
    logo: '/images/logos/DrEwirth.png',
    result: '4× Pipeline Growth',
    resultIcon: BarChart3,
    description: 'Built a thought leadership content strategy for a leading German insurance broker. SEO-driven articles and targeted distribution quadrupled their inbound enquiry pipeline.',
    tags: ['Content Marketing', 'SEO', 'Lead Gen'],
    duration: '5 months',
    accentColor: 'from-green-600/20 via-green-900/10 to-transparent',
    borderHover: 'hover:border-green-500/40',
  },
  {
    id: 6,
    client: 'Fit & Fine',
    country: 'India 🇮🇳',
    industry: 'Health & Wellness',
    category: 'Website Development',
    logo: '/images/logos/fit_and_fine.svg',
    result: 'Clean website from scratch',
    resultIcon: TrendingDown,
    description: 'Scaled Meta ad campaigns for a health and wellness brand. Introduced creative testing and audience segmentation to significantly reduce cost per lead while growing reach.',
    tags: ['Meta Ads', 'Creative Testing', 'Analytics'],
    duration: '4 months',
    accentColor: 'from-orange-500/20 via-orange-900/10 to-transparent',
    borderHover: 'hover:border-orange-400/40',
  },
];

const categories = ['All', 'Paid Advertising', 'SEO', 'Lead Generation', 'Website Development'];

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
                className={`portfolio-card process-card overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(245,200,66,0.10)] ${project.borderHover} flex flex-col`}
              >
                {/* Logo Thumbnail */}
                <div className={`relative aspect-video overflow-hidden bg-gradient-to-br ${project.accentColor}`}>

                  {/* Logo centred — always white card so every logo is visible */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="bg-white rounded-2xl px-8 py-5 flex items-center justify-center w-full max-w-[220px] shadow-xl">
                      <img
                        src={project.logo}
                        alt={`${project.client} logo`}
                        className="max-h-12 w-auto object-contain"
                      />
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-ron-yellow/90 text-ron-dark text-xs font-semibold rounded-full">
                      {project.category}
                    </span>
                  </div>

                  {/* Country badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 bg-black/50 backdrop-blur-sm text-white/80 text-xs rounded-full border border-white/10">
                      {project.country}
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
