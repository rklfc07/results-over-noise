import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Target, Share2, FileText, Lightbulb, Users, Layout, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const marketingServices = [
  {
    icon: Lightbulb,
    title: 'Marketing Strategy',
    description: 'Comprehensive marketing roadmaps tailored to your business goals. Strategic planning that aligns all your marketing efforts for maximum impact.',
    href: '/services/marketing-strategy',
    features: ['Market Research', 'Competitor Analysis', 'Channel Planning', 'KPI Setting'],
  },
  {
    icon: Search,
    title: 'SEO & Organic Traffic',
    description: 'Get found by customers actively searching for your services. We optimize your site for sustainable, long-term growth that compounds over time.',
    href: '/services/seo',
    features: ['Technical SEO', 'On-page Optimization', 'Content Strategy', 'Link Building'],
  },
  {
    icon: Target,
    title: 'Paid Advertising',
    description: 'Turn ad spend into revenue with data-driven campaigns. We manage Google Ads and Meta campaigns that deliver consistent, profitable results.',
    href: '/services/paid-advertising',
    features: ['Google Ads', 'Meta Ads', 'Programmatic', 'Retargeting'],
  },
  {
    icon: Share2,
    title: 'Social Media Marketing',
    description: 'Build your brand and engage your audience where they spend their time. Strategic content and community management that drives real business results.',
    href: '/services/social-media',
    features: ['Content Creation', 'Community Management', 'Paid Social', 'Analytics'],
  },
  {
    icon: Users,
    title: 'Lead Generation',
    description: 'Fill your pipeline with qualified prospects. We create systems that consistently generate high-quality leads for your sales team.',
    href: '/services/lead-generation',
    features: ['Landing Pages', 'Lead Magnets', 'Nurturing Sequences', 'CRM Integration'],
  },
  {
    icon: FileText,
    title: 'Content Marketing',
    description: 'Content that educates, engages, and converts. From blog posts to lead magnets, we create assets that work 24/7 to grow your business.',
    href: '/services/content-marketing',
    features: ['Blog Content', 'Lead Magnets', 'Email Campaigns', 'Video Scripts'],
  },
];

const buildServices = [
  {
    icon: Layout,
    title: 'Website Development',
    description: 'Fast, beautiful, conversion-focused websites built from scratch. From landing pages to full marketing sites—designed to perform and built to scale.',
    href: '/services/web-development',
    features: ['Custom Design', 'Responsive Build', 'CMS Integration', 'Performance Optimisation'],
  },
  {
    icon: Layers,
    title: 'SaaS Product Growth',
    description: 'We help SaaS teams grow MRR by optimising every stage of the product funnel—from trial sign-up to loyal paying customer. Less churn, more revenue.',
    href: '/services/saas-product',
    features: ['Onboarding Optimisation', 'Churn Reduction', 'Funnel Analytics', 'Growth Strategy'],
  },
];

const ServiceCard = ({ service, index }: { service: typeof marketingServices[0]; index: number }) => (
  <Link
    key={index}
    to={service.href}
    className="service-item process-card p-5 lg:p-6 card-hover block"
  >
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
        <service.icon size={24} className="text-ron-yellow" />
      </div>
      <div className="flex-1">
        <h3 className="font-display font-semibold text-lg lg:text-xl text-white mb-2">
          {service.title}
        </h3>
        <p className="text-ron-text-secondary text-sm leading-relaxed mb-4">
          {service.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {service.features.map((feature, fIndex) => (
            <span
              key={fIndex}
              className="px-2.5 py-1 rounded-full bg-white/5 text-ron-text-secondary text-xs"
            >
              {feature}
            </span>
          ))}
        </div>
        <span className="text-ron-yellow text-sm flex items-center gap-1">
          Learn more <ArrowRight size={12} />
        </span>
      </div>
    </div>
  </Link>
);

const Services = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.page-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );

      gsap.fromTo(
        '.service-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.services-list',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-ron-dark pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="w-full px-5 lg:px-[5vw]">
        {/* Page Header */}
        <div className="page-header mb-12 lg:mb-16">
          <p className="micro-label mb-4">What We Do</p>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-[clamp(36px,4vw,56px)] leading-[1.05] tracking-[-0.03em] text-white mb-4">
            Services that <span className="text-ron-yellow">deliver</span>
          </h1>
          <p className="text-ron-text-secondary text-base lg:text-lg max-w-xl">
            Full-funnel marketing, web development, and SaaS growth solutions designed to
            drive measurable results for your business.
          </p>
        </div>

        {/* Marketing Services */}
        <div className="services-list mb-12 lg:mb-16">
          <h2 className="font-display font-semibold text-xl text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-ron-yellow inline-block" />
            Marketing
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {marketingServices.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>

        {/* Build / Product Services */}
        <div className="mb-12 lg:mb-16">
          <h2 className="font-display font-semibold text-xl text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-ron-yellow inline-block" />
            Build
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {buildServices.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="process-card p-6 lg:p-8 text-center">
          <h3 className="font-display font-semibold text-xl text-white mb-3">
            Not sure what you need?
          </h3>
          <p className="text-ron-text-secondary text-sm mb-6 max-w-md mx-auto">
            Let's discuss your goals and we'll recommend the right mix of services for your business.
          </p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
            Book a free consultation
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
