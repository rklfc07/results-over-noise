import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Clock, Send, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const formCard = formCardRef.current;
    const content = contentRef.current;

    if (!section || !formCard || !content) return;

    const ctx = gsap.context(() => {
      // Form card from left
      gsap.fromTo(
        formCard,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formCard,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content from right
      gsap.fromTo(
        content,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-ron-dark py-20 lg:py-32"
    >
      <div className="w-full px-6 lg:px-[6vw]">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left Form Card */}
          <div
            ref={formCardRef}
            className="process-card p-6 lg:p-8 will-change-transform"
          >
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-ron-yellow/20 flex items-center justify-center mx-auto mb-6">
                  <Send size={28} className="text-ron-yellow" />
                </div>
                <h3 className="font-display font-semibold text-xl text-white mb-2">
                  Message sent!
                </h3>
                <p className="text-ron-text-secondary">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="font-display font-semibold text-xl text-white mb-6">
                  Send us a message
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-ron-text-secondary mb-1.5">
                      Name
                    </label>
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
                    <label className="block text-sm text-ron-text-secondary mb-1.5">
                      Email
                    </label>
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
                    <label className="block text-sm text-ron-text-secondary mb-1.5">
                      Company
                    </label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-ron-yellow"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-ron-text-secondary mb-1.5">
                      Message
                    </label>
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

                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center gap-2 mt-2"
                  >
                    Send message
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Content */}
          <div ref={contentRef} className="lg:pt-8 will-change-transform">
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,56px)] leading-[1.05] tracking-[-0.03em] text-white mb-6">
              Let's build your{' '}
              <span className="text-ron-yellow">growth engine</span>.
            </h2>

            <p className="text-ron-text-secondary text-base lg:text-lg mb-10">
              Tell us what you're launching. We'll reply within 24 hours with
              next steps.
            </p>

            {/* Contact Info */}
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
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-ron-text-secondary text-sm">
              © Results Over Noise. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-ron-text-secondary hover:text-white text-sm transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-ron-text-secondary hover:text-white text-sm transition-colors"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
