import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Clock, Send, ArrowRight, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div ref={pageRef} className="bg-ron-dark pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="w-full px-5 lg:px-[5vw]">
        {/* Page Header */}
        <div className="page-header mb-12 lg:mb-16">
          <p className="micro-label mb-4">Get in Touch</p>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-[clamp(36px,4vw,56px)] leading-[1.05] tracking-[-0.03em] text-white mb-4">
            Let's build your <span className="text-ron-yellow">growth engine</span>
          </h1>
          <p className="text-ron-text-secondary text-base lg:text-lg max-w-xl">
            Tell us what you're launching. We'll reply within 24 hours with next steps.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Form */}
          <div className="contact-form process-card p-5 lg:p-6">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-ron-yellow/20 flex items-center justify-center mx-auto mb-6">
                  <Send size={28} className="text-ron-yellow" />
                </div>
                <h3 className="font-display font-semibold text-xl text-white mb-2">Message sent!</h3>
                <p className="text-ron-text-secondary">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="font-display font-semibold text-lg text-white mb-5">Send us a message</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-ron-text-secondary mb-1.5">Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-ron-yellow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-ron-text-secondary mb-1.5">Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-ron-yellow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-ron-text-secondary mb-1.5">Company</label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-ron-yellow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-ron-text-secondary mb-1.5">Message</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      rows={4}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-ron-yellow resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2 mt-2">
                    Send message
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="contact-info">
            <div className="mb-8">
              <h3 className="font-display font-semibold text-lg text-white mb-5">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <Mail size={18} className="text-ron-yellow" />
                  </div>
                  <div>
                    <p className="text-sm text-ron-text-secondary">Email</p>
                    <p className="text-white">hello@resultsovernoise.co</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <Phone size={18} className="text-ron-yellow" />
                  </div>
                  <div>
                    <p className="text-sm text-ron-text-secondary">Phone</p>
                    <p className="text-white">+1 (555) 013-2847</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <Clock size={18} className="text-ron-yellow" />
                  </div>
                  <div>
                    <p className="text-sm text-ron-text-secondary">Hours</p>
                    <p className="text-white">Mon–Fri, 9am–6pm ET</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <MapPin size={18} className="text-ron-yellow" />
                  </div>
                  <div>
                    <p className="text-sm text-ron-text-secondary">Location</p>
                    <p className="text-white">Remote-first, based in New York</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Response */}
            <div className="process-card p-5 lg:p-6 bg-ron-yellow/5 border-ron-yellow/20">
              <h4 className="font-display font-semibold text-base text-white mb-2">
                Fast Response Guarantee
              </h4>
              <p className="text-ron-text-secondary text-sm">
                We respond to all inquiries within 24 hours. For urgent matters, 
                feel free to call us directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
