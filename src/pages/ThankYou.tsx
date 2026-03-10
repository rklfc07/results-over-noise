import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Home, Mail } from 'lucide-react';

const ThankYou = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-ron-dark min-h-screen flex items-center justify-center px-5">
      <div className="max-w-lg w-full text-center">

        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-ron-yellow/15 flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={40} className="text-ron-yellow" />
        </div>

        {/* Heading */}
        <p className="micro-label mb-4">Message Received</p>
        <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-[-0.02em] text-white mb-4">
          Thank you for <span className="text-ron-yellow">reaching out!</span>
        </h1>
        <p className="text-ron-text-secondary text-base lg:text-lg leading-relaxed mb-10">
          We've received your message and will get back to you at your email within <span className="text-white font-medium">24 hours</span>.
        </p>

        {/* What happens next */}
        <div className="process-card p-5 lg:p-6 text-left mb-8">
          <h3 className="font-display font-semibold text-base text-white mb-4">What happens next?</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-ron-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-ron-yellow text-xs font-bold">1</span>
              </div>
              <p className="text-ron-text-secondary text-sm leading-relaxed">We review your message and understand your goals.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-ron-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-ron-yellow text-xs font-bold">2</span>
              </div>
              <p className="text-ron-text-secondary text-sm leading-relaxed">Our team reaches out within 24 hours to schedule a discovery call.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-ron-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-ron-yellow text-xs font-bold">3</span>
              </div>
              <p className="text-ron-text-secondary text-sm leading-relaxed">We build a custom strategy tailored to your business and goals.</p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="btn-primary flex items-center gap-2">
            <Home size={16} />
            Back to Home
          </Link>
          <a
            href="mailto:info@resultsovernoise.com"
            className="text-white hover:text-ron-yellow transition-colors flex items-center gap-2 text-sm"
          >
            <Mail size={14} />
            Email us directly
            <ArrowRight size={14} />
          </a>
        </div>

      </div>
    </div>
  );
};

export default ThankYou;
