import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Search, Tag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const allBlogPosts = [
  {
    id: 1,
    title: "How to Reduce Your CPA by 40% in 90 Days",
    excerpt: "Discover the proven strategies we use to dramatically lower customer acquisition costs through creative testing, audience refinement, and landing page optimization. Learn the exact framework that helped our clients achieve sustainable cost reductions.",
    image: "/images/blog_1.jpg",
    date: "Feb 20, 2025",
    readTime: "5 min read",
    slug: "reduce-cpa-40-percent",
    category: "Paid Advertising",
    featured: true
  },
  {
    id: 2,
    title: "SEO in 2025: What's Working Now",
    excerpt: "The search landscape is evolving rapidly. From AI-powered search to voice optimization, learn the latest SEO tactics that are driving real organic growth for our clients in today's competitive environment.",
    image: "/images/blog_2.jpg",
    date: "Feb 15, 2025",
    readTime: "7 min read",
    slug: "seo-2025-whats-working",
    category: "SEO",
    featured: false
  },
  {
    id: 3,
    title: "Building a Social Media Funnel That Converts",
    excerpt: "Turn likes into leads with our comprehensive guide to creating high-converting social media marketing funnels. From awareness to conversion, learn how to nurture prospects across every stage of the buyer journey.",
    image: "/images/blog_3.jpg",
    date: "Feb 10, 2025",
    readTime: "6 min read",
    slug: "social-media-funnel-guide",
    category: "Social Media",
    featured: false
  },
  {
    id: 4,
    title: "Content Marketing Strategy: A Complete Guide",
    excerpt: "Content is still king, but the rules have changed. Discover how to create a content strategy that attracts, engages, and converts your target audience while building long-term brand authority.",
    image: "/images/blog_4.jpg",
    date: "Feb 5, 2025",
    readTime: "8 min read",
    slug: "content-marketing-strategy-guide",
    category: "Content Marketing",
    featured: false
  },
  {
    id: 5,
    title: "ROAS vs. MER: Which Metric Should You Track?",
    excerpt: "Understanding the right metrics is crucial for marketing success. We break down the differences between Return on Ad Spend and Marketing Efficiency Ratio, and when to use each for measuring campaign performance.",
    image: "/images/blog_1.jpg",
    date: "Jan 28, 2025",
    readTime: "4 min read",
    slug: "roas-vs-mer-metrics",
    category: "Analytics",
    featured: false
  },
  {
    id: 6,
    title: "The Ultimate Guide to Google Ads in 2025",
    excerpt: "From Performance Max campaigns to responsive search ads, stay ahead of the curve with our comprehensive guide to Google Ads. Learn the strategies that are driving results for businesses right now.",
    image: "/images/blog_2.jpg",
    date: "Jan 22, 2025",
    readTime: "10 min read",
    slug: "google-ads-guide-2025",
    category: "Paid Advertising",
    featured: false
  },
];

const categories = ["All", "Paid Advertising", "SEO", "Social Media", "Content Marketing", "Analytics"];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const heroRef = useRef<HTMLElement>(null);
  const postsRef = useRef<HTMLElement>(null);

  const filteredPosts = allBlogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = allBlogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured || selectedCategory !== "All");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.blog-hero-content', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
      });
      gsap.fromTo('.blog-post-card', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: postsRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      });
    });
    return () => ctx.revert();
  }, [filteredPosts]);

  return (
    <div className="bg-ron-dark min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="w-full px-5 lg:px-[5vw]">
          <div className="blog-hero-content max-w-3xl">
            <p className="micro-label mb-4">Insights & Resources</p>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-0.03em] text-white mb-6">
              Marketing insights that <span className="text-ron-yellow">drive results</span>
            </h1>
            <p className="text-ron-text-secondary text-base lg:text-lg leading-relaxed max-w-xl">
              Practical strategies, industry trends, and proven tactics to help you grow your business through data-driven marketing.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="pb-8 lg:pb-12">
        <div className="w-full px-5 lg:px-[5vw]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search */}
            <div className="relative max-w-md w-full">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-ron-yellow transition-colors"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    selectedCategory === category
                      ? 'bg-ron-yellow text-ron-dark font-medium'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post (only show when All is selected and no search) */}
      {featuredPost && selectedCategory === "All" && !searchQuery && (
        <section className="pb-16">
          <div className="w-full px-5 lg:px-[5vw]">
            <Link to={`/blog/${featuredPost.slug}`} className="group block">
              <article className="process-card overflow-hidden card-hover">
                <div className="grid lg:grid-cols-2">
                  <div className="aspect-video lg:aspect-auto overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 lg:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-ron-yellow/20 text-ron-yellow text-xs font-medium rounded-full">
                        Featured
                      </span>
                      <span className="text-white/50 text-xs flex items-center gap-1">
                        <Tag size={12} />
                        {featuredPost.category}
                      </span>
                    </div>
                    <h2 className="font-display font-bold text-2xl lg:text-3xl text-white mb-4 group-hover:text-ron-yellow transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-ron-text-secondary text-base leading-relaxed mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-white/50 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {featuredPost.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section ref={postsRef} className="pb-24 lg:pb-32">
        <div className="w-full px-5 lg:px-[5vw]">
          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="group blog-post-card">
                  <article className="process-card overflow-hidden card-hover h-full flex flex-col">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5 lg:p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-ron-yellow text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="font-display font-semibold text-lg text-white mb-2 group-hover:text-ron-yellow transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-ron-text-secondary text-sm leading-relaxed line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                        <div className="flex items-center gap-3 text-white/50 text-xs">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {post.readTime}
                          </span>
                        </div>
                        <span className="text-ron-yellow text-sm flex items-center gap-1">
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/60 text-lg">No articles found matching your criteria.</p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                className="text-ron-yellow hover:underline mt-4"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 lg:py-24 bg-ron-lavender">
        <div className="w-full px-5 lg:px-[5vw]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-[clamp(30px,3.2vw,48px)] leading-[1.1] tracking-[-0.02em] text-white mb-4">
              Get insights delivered to your inbox
            </h2>
            <p className="text-ron-text-secondary text-base lg:text-lg mb-8">
              Subscribe to our newsletter for the latest marketing strategies and industry updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/40 focus:outline-none focus:border-ron-yellow transition-colors"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
