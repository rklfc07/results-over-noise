import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Clock, ArrowRight, MapPin, Star, Users, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.page-header', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' });
      gsap.fromTo('.contact-form', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-form', start: 'top 75%', toggleActions: 'play none none reverse' }
      });
      gsap.fromTo('.contact-info', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-info', start: 'top 75%', toggleActions: 'play none none reverse' }
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://formspree.io/f/xojkevan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        navigate('/thank-you');
      } else {
        setError('Something went wrong. Please try again or email us directly.');
      }
    } catch {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div ref={pageRef} className="bg-ron-dark pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="w-full px-5 lg:px-[5vw]">

        <div className="page-header mb-12 lg:mb-16">
          <p className="micro-label mb-4">Get in Touch</p>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-[clamp(36px,4vw,56px)] leading-[1.05] tracking-[-0.03em] text-white mb-4">
            Let's build your <span className="text-ron-yellow">growth engine</span>
          </h1>
          <p className="text-ron-text-secondary text-base lg:text-lg max-w-xl">
            Tell us what you're launching. We'll reply within 24 hours with next steps.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Left: Form */}
          <div className="contact-form process-card p-5 lg:p-6">
            <form onSubmit={handleSubmit}>
              <h3 className="font-display font-semibold text-lg text-white mb-5">Send us a message</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-ron-text-secondary mb-1.5">Name</label>
                  <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-ron-yellow" />
                </div>
                <div>
                  <label className="block text-sm text-ron-text-secondary mb-1.5">Email</label>
                  <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@company.com" required className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-ron-yellow" />
                </div>
                <div>
                  <label className="block text-sm text-ron-text-secondary mb-1.5">Company</label>
                  <Input name="company" value={formData.company} onChange={handleChange} placeholder="Your company" className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-ron-yellow" />
                </div>
                <div>
                  <label className="block text-sm text-ron-text-secondary mb-1.5">Message</label>
                  <Textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your project..." rows={4} required className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-ron-yellow resize-none" />
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-ron-yellow/5 border border-ron-yellow/15">
                  <Zap size={15} className="text-ron-yellow flex-shrink-0 mt-0.5" />
                  <p className="text-ron-text-secondary text-xs leading-relaxed">
                    <span className="text-white font-medium">Fast Response Guarantee</span> — We respond to all inquiries within 24 hours.
                  </p>
                </div>

                {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                <button type="submit" disabled={isSubmitting} className="w-full btn-primary flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {isSubmitting ? 'Sending...' : 'Send message'}
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>

          {/* Right: Info */}
          <div className="contact-info flex flex-col gap-6">
            <div className="process-card p-5 lg:p-6">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-ron-text-secondary mb-4">Why work with us</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-xl bg-white/5">
                  <div className="font-display font-bold text-2xl text-ron-yellow mb-1">50+</div>
                  <div className="text-ron-text-secondary text-xs">Brands Served</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="font-display font-bold text-2xl text-ron-yellow">4.9</span>
                    <Star size={14} className="text-ron-yellow fill-ron-yellow" />
                  </div>
                  <div className="text-ron-text-secondary text-xs">Client Rating</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5">
                  <div className="font-display font-bold text-2xl text-ron-yellow mb-1">90%</div>
                  <div className="text-ron-text-secondary text-xs">Client Retention</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5">
                  <div className="font-display font-bold text-2xl text-ron-yellow mb-1">3.5×</div>
                  <div className="text-ron-text-secondary text-xs">Avg. ROAS</div>
                </div>
              </div>
            </div>

            <div className="process-card p-5 lg:p-6">
              <h3 className="font-display font-semibold text-base text-white mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0"><Mail size={15} className="text-ron-yellow" /></div>
                  <div><p className="text-xs text-ron-text-secondary">Email</p><p className="text-white text-sm">info@resultsovernoise.com</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0"><Phone size={15} className="text-ron-yellow" /></div>
                  <div><p className="text-xs text-ron-text-secondary">Phone</p><p className="text-white text-sm">+91 7307553661</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0"><Clock size={15} className="text-ron-yellow" /></div>
                  <div><p className="text-xs text-ron-text-secondary">Hours</p><p className="text-white text-sm">Mon–Fri, 9am–6pm</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0"><MapPin size={15} className="text-ron-yellow" /></div>
                  <div><p className="text-xs text-ron-text-secondary">Location</p><p className="text-white text-sm">Remote-first, based in Mumbai</p></div>
                </div>
              </div>
            </div>

            <div className="process-card p-4 lg:p-5">
              <div className="flex items-start gap-3">
                <Users size={15} className="text-ron-text-secondary flex-shrink-0 mt-0.5" />
                <p className="text-ron-text-secondary text-xs leading-relaxed">
                  Prefer a live conversation?{' '}
                  <a href="tel:+917307553661" className="text-ron-yellow hover:underline">Call us directly</a>{' '}
                  or use the form and we'll schedule a call.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;