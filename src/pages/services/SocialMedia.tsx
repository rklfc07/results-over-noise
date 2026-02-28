import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Share2, Image, MessageCircle, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Image,
    title: 'Content Creation',
    description: 'Engaging posts, stories, and reels that capture attention and communicate your brand message.',
  },
  {
    icon: MessageCircle,
    title: 'Community Management',
    description: 'Active engagement with your audience—responding to comments, messages, and building relationships.',
  },
  {
    icon: TrendingUp,
    title: 'Paid Social',
    description: 'Strategic boosted posts and ad campaigns that amplify your reach and drive conversions.',
  },
  {
    icon: Share2,
    title: 'Analytics & Reporting',
    description: 'Clear insights into what\'s working, audience growth, and engagement metrics that matter.',
  },
];

const deliverables = [
  'Content calendar & strategy',
  'Daily posting & scheduling',
  'Community engagement',
  'Monthly performance reports',
  'Hashtag research & optimization',
  'Influencer outreach',
];

const SocialMedia = () => {
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
          <span className="text-ron-yellow">Social Media Marketing</span>
        </div>

        <div className="page-header mb-12 lg:mb-16">
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-[clamp(36px,4vw,56px)] leading-[1.05] tracking-[-0.03em] text-white mb-4">
            Social Media <span className="text-ron-yellow">Marketing</span>
          </h1>
          <p className="text-ron-text-secondary text-base lg:text-lg max-w-2xl mb-8">
            Build your brand and engage your audience where they spend their time. Strategic 
            content and community management that drives real business results.
          </p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
            Get a social media audit
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
            <h3 className="font-display font-semibold text-lg text-white mb-3">Ready to grow your following?</h3>
            <p className="text-ron-text-secondary text-sm mb-6">
              Build a loyal community that engages with your brand and converts into customers.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Start your social campaign
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
