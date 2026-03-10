import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Twitter, Linkedin, Facebook, Link as LinkIcon, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const allBlogPosts = [
  {
    id: 1,
    title: "How to Reduce Your CPA by 40% in 90 Days",
    excerpt: "Discover the proven strategies we use to dramatically lower customer acquisition costs through creative testing, audience refinement, and landing page optimization.",
    image: "/images/blog_1.jpg",
    date: "Feb 20, 2025",
    readTime: "5 min read",
    slug: "reduce-cpa-40-percent",
    category: "Paid Advertising",
    author: "Results Over Noise Team",
    content: `
      <p>Customer Acquisition Cost (CPA) is one of the most critical metrics for any performance marketing campaign. A high CPA can quickly drain your marketing budget and make your campaigns unsustainable. In this comprehensive guide, we'll share the exact strategies we've used to help our clients reduce their CPA by up to 40% in just 90 days.</p>
      
      <h2>Understanding Your Current CPA Baseline</h2>
      <p>Before you can improve your CPA, you need to understand where you currently stand. Start by calculating your CPA across different channels, campaigns, and audience segments. This will help you identify which areas have the most room for improvement.</p>
      
      <p>Key metrics to track:</p>
      <ul>
        <li>Overall CPA by channel (Google Ads, Facebook, etc.)</li>
        <li>CPA by campaign objective</li>
        <li>CPA by audience segment</li>
        <li>CPA by creative/ad variant</li>
      </ul>
      
      <h2>Strategy 1: Creative Testing at Scale</h2>
      <p>One of the fastest ways to reduce CPA is through systematic creative testing. Most advertisers make the mistake of testing too few variations or not testing frequently enough.</p>
      
      <p>Our approach:</p>
      <ul>
        <li>Launch 10-15 new creative variations every week</li>
        <li>Test different hooks, visuals, and calls-to-action</li>
        <li>Use dynamic creative optimization where possible</li>
        <li>Quickly pause underperformers and scale winners</li>
      </ul>
      
      <h2>Strategy 2: Audience Refinement</h2>
      <p>Broad targeting often leads to wasted spend. By refining your audiences based on performance data, you can focus your budget on the segments most likely to convert.</p>
      
      <p>Action steps:</p>
      <ul>
        <li>Analyze conversion data by demographic segments</li>
        <li>Create lookalike audiences from your best customers</li>
        <li>Use exclusion audiences to avoid targeting existing customers</li>
        <li>Test interest-based vs. behavior-based targeting</li>
      </ul>
      
      <h2>Strategy 3: Landing Page Optimization</h2>
      <p>Even the best ads won't perform if your landing page doesn't convert. We consistently see 20-30% improvements in CPA from landing page optimizations alone.</p>
      
      <p>Key optimization areas:</p>
      <ul>
        <li>Page load speed (aim for under 3 seconds)</li>
        <li>Mobile responsiveness</li>
        <li>Clear value proposition above the fold</li>
        <li>Streamlined forms with minimal fields</li>
        <li>Social proof and trust signals</li>
      </ul>
      
      <h2>Strategy 4: Bid Strategy Optimization</h2>
      <p>Your bidding strategy can make or break your CPA. We recommend starting with automated bidding strategies and then refining based on performance.</p>
      
      <p>Best practices:</p>
      <ul>
        <li>Use Target CPA bidding once you have sufficient conversion data</li>
        <li>Set realistic CPA targets based on your margins</li>
        <li>Allow 2-3 weeks for algorithms to optimize</li>
        <li>Monitor and adjust targets based on performance trends</li>
      </ul>
      
      <h2>Putting It All Together</h2>
      <p>Reducing your CPA isn't about finding one magic bullet—it's about systematically optimizing every part of your funnel. By implementing these four strategies consistently over 90 days, you can expect to see significant improvements in your customer acquisition costs.</p>
      
      <p>Remember: optimization is an ongoing process, not a one-time fix. The most successful advertisers are those who commit to continuous testing and improvement.</p>
      
      <p>Ready to reduce your CPA? <a href="/contact">Book a discovery call</a> with our team to discuss how we can help you achieve your performance marketing goals.</p>
    `
  },
  {
    id: 2,
    title: "SEO in 2025: What's Working Now",
    excerpt: "The search landscape is evolving rapidly. From AI-powered search to voice optimization, learn the latest SEO tactics that are driving real organic growth.",
    image: "/images/blog_2.jpg",
    date: "Feb 15, 2025",
    readTime: "7 min read",
    slug: "seo-2025-whats-working",
    category: "SEO",
    author: "Results Over Noise Team",
    content: `
      <p>Search engine optimization has evolved dramatically over the past few years. With AI-powered search features, voice search adoption, and constantly changing algorithms, staying ahead requires a modern approach to SEO.</p>
      
      <h2>The Rise of AI-Powered Search</h2>
      <p>Google's Search Generative Experience (SGE) and similar AI features are changing how users interact with search results. Instead of clicking through multiple results, users are increasingly getting their answers directly from AI-generated summaries.</p>
      
      <p>What this means for SEO:</p>
      <ul>
        <li>Focus on becoming a cited source in AI responses</li>
        <li>Structure content for featured snippets</li>
        <li>Build topical authority through comprehensive coverage</li>
        <li>Optimize for conversational, question-based queries</li>
      </ul>
      
      <h2>Entity-Based SEO</h2>
      <p>Search engines are moving beyond keywords to understand entities and their relationships. This shift requires a more sophisticated approach to content strategy.</p>
      
      <p>Implementation strategies:</p>
      <ul>
        <li>Use schema markup to define entities clearly</li>
        <li>Build content clusters around core topics</li>
        <li>Establish your brand as an entity through consistent NAP</li>
        <li>Create content that demonstrates E-E-A-T</li>
      </ul>
      
      <h2>Voice Search Optimization</h2>
      <p>With the proliferation of smart speakers and voice assistants, optimizing for voice search is no longer optional. Voice queries tend to be longer and more conversational than typed searches.</p>
      
      <p>Voice search best practices:</p>
      <ul>
        <li>Target long-tail, conversational keywords</li>
        <li>Create FAQ sections that answer specific questions</li>
        <li>Optimize for local "near me" searches</li>
        <li>Ensure fast page load times for quick answers</li>
      </ul>
      
      <h2>Technical SEO Fundamentals</h2>
      <p>While the SEO landscape evolves, technical fundamentals remain crucial. A technically sound website provides the foundation for all other SEO efforts.</p>
      
      <p>Technical priorities:</p>
      <ul>
        <li>Core Web Vitals optimization</li>
        <li>Mobile-first indexing readiness</li>
        <li>Proper canonicalization and hreflang</li>
        <li>XML sitemaps and robots.txt optimization</li>
        <li>Internal linking structure</li>
      </ul>
      
      <h2>Content Quality Over Quantity</h2>
      <p>The era of publishing content for the sake of volume is over. Search engines now prioritize comprehensive, authoritative content that truly serves user intent.</p>
      
      <p>Content strategy shifts:</p>
      <ul>
        <li>Focus on depth over breadth</li>
        <li>Update and refresh existing content regularly</li>
        <li>Include original research and data</li>
        <li>Optimize for user engagement signals</li>
      </ul>
      
      <h2>Building Sustainable SEO Success</h2>
      <p>SEO in 2025 is about building genuine authority and providing real value to users. Short-term tactics may provide temporary boosts, but sustainable rankings come from consistent, quality-focused efforts.</p>
      
      <p>Ready to improve your organic visibility? <a href="/contact">Let's discuss your SEO strategy.</a></p>
    `
  },
  {
    id: 3,
    title: "Building a Social Media Funnel That Converts",
    excerpt: "Turn likes into leads with our comprehensive guide to creating high-converting social media marketing funnels.",
    image: "/images/blog_3.jpg",
    date: "Feb 10, 2025",
    readTime: "6 min read",
    slug: "social-media-funnel-guide",
    category: "Social Media",
    author: "Results Over Noise Team",
    content: `
      <p>Social media isn't just about building an audience—it's about converting that audience into customers. A well-designed social media funnel can transform your social presence from a vanity metric into a revenue-generating machine.</p>
      
      <h2>Understanding the Social Media Funnel</h2>
      <p>A social media funnel mirrors the traditional marketing funnel but is optimized for social platforms. It consists of four key stages:</p>
      
      <ul>
        <li><strong>Awareness:</strong> Attracting new audiences to your brand</li>
        <li><strong>Interest:</strong> Engaging and educating potential customers</li>
        <li><strong>Consideration:</strong> Building trust and demonstrating value</li>
        <li><strong>Conversion:</strong> Turning followers into customers</li>
      </ul>
      
      <h2>Stage 1: Awareness Content</h2>
      <p>The top of your funnel should focus on reaching new audiences and introducing them to your brand. This content should be highly shareable and optimized for discovery.</p>
      
      <p>Effective awareness content types:</p>
      <ul>
        <li>Educational posts and carousels</li>
        <li>Trending audio and viral formats</li>
        <li>Behind-the-scenes content</li>
        <li>User-generated content</li>
        <li>Influencer collaborations</li>
      </ul>
      
      <h2>Stage 2: Interest Content</h2>
      <p>Once you've captured attention, your content should deepen the relationship by providing value and establishing expertise.</p>
      
      <p>Interest-building strategies:</p>
      <ul>
        <li>Detailed how-to content</li>
        <li>Industry insights and trends</li>
        <li>Case studies and success stories</li>
        <li>Interactive content (polls, Q&As)</li>
      </ul>
      
      <h2>Stage 3: Consideration Content</h2>
      <p>At this stage, your audience is evaluating whether your solution is right for them. Your content should address objections and demonstrate value.</p>
      
      <p>Consideration tactics:</p>
      <ul>
        <li>Product demonstrations and tutorials</li>
        <li>Comparison content</li>
        <li>Customer testimonials and reviews</li>
        <li>Free resources and lead magnets</li>
      </ul>
      
      <h2>Stage 4: Conversion Content</h2>
      <p>The bottom of your funnel should make it easy for interested prospects to take action. Every piece of conversion content should have a clear call-to-action.</p>
      
      <p>Conversion-focused content:</p>
      <ul>
        <li>Limited-time offers and promotions</li>
        <li>Clear product/service information</li>
        <li>Easy booking or purchasing options</li>
        <li>Retargeting ads for engaged users</li>
      </ul>
      
      <h2>Measuring Funnel Performance</h2>
      <p>To optimize your funnel, you need to track the right metrics at each stage:</p>
      
      <ul>
        <li><strong>Awareness:</strong> Reach, impressions, follower growth</li>
        <li><strong>Interest:</strong> Engagement rate, saves, shares</li>
        <li><strong>Consideration:</strong> Link clicks, profile visits, DMs</li>
        <li><strong>Conversion:</strong> Leads generated, sales attributed to social</li>
      </ul>
      
      <h2>Building Your Funnel</h2>
      <p>Creating an effective social media funnel takes time and testing. Start by auditing your current content and identifying gaps in your funnel. Then, gradually build out each stage with targeted content designed to move users toward conversion.</p>
      
      <p>Need help building your social media funnel? <a href="/contact">Let's talk about your goals.</a></p>
    `
  },
  {
    id: 4,
    title: "Content Marketing Strategy: A Complete Guide",
    excerpt: "Content is still king, but the rules have changed. Discover how to create a content strategy that attracts, engages, and converts your target audience.",
    image: "/images/blog_4.jpg",
    date: "Feb 5, 2025",
    readTime: "8 min read",
    slug: "content-marketing-strategy-guide",
    category: "Content Marketing",
    author: "Results Over Noise Team",
    content: `
      <p>Content marketing remains one of the most effective ways to attract and engage your target audience. But with so much content being published every day, standing out requires a strategic, data-driven approach.</p>
      
      <h2>Defining Your Content Strategy</h2>
      <p>A successful content strategy starts with clear goals and a deep understanding of your audience. Before creating any content, answer these questions:</p>
      
      <ul>
        <li>What business objectives will content help you achieve?</li>
        <li>Who is your target audience and what do they care about?</li>
        <li>What unique perspective can you offer?</li>
        <li>How will you measure success?</li>
      </ul>
      
      <h2>Audience Research and Personas</h2>
      <p>Understanding your audience is the foundation of effective content marketing. Create detailed buyer personas that go beyond demographics to include psychographics, pain points, and content preferences.</p>
      
      <p>Research methods:</p>
      <ul>
        <li>Customer interviews and surveys</li>
        <li>Social media listening</li>
        <li>Competitor content analysis</li>
        <li>Keyword and search trend research</li>
      </ul>
      
      <h2>Content Pillars and Topics</h2>
      <p>Organize your content around 3-5 core pillars that align with your business expertise and audience interests. This approach helps establish authority and makes content planning more manageable.</p>
      
      <p>Example content pillars for a marketing agency:</p>
      <ul>
        <li>Paid Advertising Strategies</li>
        <li>SEO and Organic Growth</li>
        <li>Marketing Analytics and Measurement</li>
        <li>Industry Trends and Insights</li>
      </ul>
      
      <h2>Content Formats and Distribution</h2>
      <p>Different formats serve different purposes in your content strategy. Choose formats based on your audience preferences, resources, and distribution channels.</p>
      
      <p>Popular content formats:</p>
      <ul>
        <li>Blog posts and articles</li>
        <li>Video content (short-form and long-form)</li>
        <li>Podcasts and audio content</li>
        <li>Infographics and visual content</li>
        <li>Case studies and whitepapers</li>
        <li>Email newsletters</li>
      </ul>
      
      <h2>Content Calendar and Workflow</h2>
      <p>Consistency is key in content marketing. A well-planned content calendar ensures regular publishing and helps coordinate efforts across your team.</p>
      
      <p>Calendar best practices:</p>
      <ul>
        <li>Plan content 2-4 weeks in advance</li>
        <li>Include key dates and seasonal events</li>
        <li>Balance different content types and topics</li>
        <li>Build in time for review and approval</li>
      </ul>
      
      <h2>Measuring Content Performance</h2>
      <p>Track metrics that align with your content goals. While vanity metrics like page views are easy to measure, focus on metrics that indicate business impact.</p>
      
      <p>Key content metrics:</p>
      <ul>
        <li>Organic traffic and search rankings</li>
        <li>Engagement metrics (time on page, scroll depth)</li>
        <li>Lead generation and conversion rates</li>
        <li>Content marketing ROI</li>
      </ul>
      
      <h2>Continuous Optimization</h2>
      <p>Content marketing is an ongoing process of creation, measurement, and optimization. Regularly review your content performance and use insights to improve future content.</p>
      
      <p>Ready to build a content strategy that drives results? <a href="/contact">Let's discuss your content marketing goals.</a></p>
    `
  },
  {
    id: 5,
    title: "ROAS vs. MER: Which Metric Should You Track?",
    excerpt: "Understanding the right metrics is crucial for marketing success. We break down the differences between Return on Ad Spend and Marketing Efficiency Ratio.",
    image: "/images/blog_1.jpg",
    date: "Jan 28, 2025",
    readTime: "4 min read",
    slug: "roas-vs-mer-metrics",
    category: "Analytics",
    author: "Results Over Noise Team",
    content: `
      <p>In the world of performance marketing, metrics matter. But with so many acronyms and KPIs to track, it can be challenging to know which ones truly indicate success. Two of the most commonly discussed metrics are ROAS (Return on Ad Spend) and MER (Marketing Efficiency Ratio). Let's break down what each means and when to use them.</p>
      
      <h2>What is ROAS?</h2>
      <p>Return on Ad Spend measures the revenue generated for every dollar spent on advertising. It's calculated by dividing total revenue by total ad spend.</p>
      
      <p><strong>Formula:</strong> ROAS = Revenue ÷ Ad Spend</p>
      
      <p>For example, if you spend $1,000 on ads and generate $5,000 in revenue, your ROAS is 5:1 (or 500%).</p>
      
      <h2>What is MER?</h2>
      <p>Marketing Efficiency Ratio is similar to ROAS but includes all marketing spend, not just advertising. This includes salaries, tools, agency fees, and other marketing costs.</p>
      
      <p><strong>Formula:</strong> MER = Revenue ÷ Total Marketing Spend</p>
      
      <p>If your total marketing spend is $2,000 (including $1,000 in ads) and you generate $5,000 in revenue, your MER is 2.5:1.</p>
      
      <h2>When to Use ROAS</h2>
      <p>ROAS is most useful when:</p>
      <ul>
        <li>Evaluating specific campaign or channel performance</li>
        <li>Optimizing ad spend allocation</li>
        <li>Comparing performance across different advertising platforms</li>
        <li>Making real-time bidding decisions</li>
      </ul>
      
      <h2>When to Use MER</h2>
      <p>MER provides a more holistic view and is best for:</p>
      <ul>
        <li>Understanding overall marketing efficiency</li>
        <li>Budget planning and resource allocation</li>
        <li>Reporting to stakeholders on total marketing investment</li>
        <li>Long-term strategic planning</li>
      </ul>
      
      <h2>Which Should You Track?</h2>
      <p>The answer is: both. ROAS and MER serve different purposes and provide different insights. Use ROAS for tactical optimization and MER for strategic planning.</p>
      
      <p>At Results Over Noise, we track both metrics for all our clients, providing a complete picture of marketing performance from daily optimizations to quarterly reviews.</p>
      
      <p>Want to improve your marketing metrics? <a href="/contact">Let's talk about your measurement strategy.</a></p>
    `
  },
  {
    id: 6,
    title: "The Ultimate Guide to Google Ads in 2025",
    excerpt: "From Performance Max campaigns to responsive search ads, stay ahead of the curve with our comprehensive guide to Google Ads.",
    image: "/images/blog_2.jpg",
    date: "Jan 22, 2025",
    readTime: "10 min read",
    slug: "google-ads-guide-2025",
    category: "Paid Advertising",
    author: "Results Over Noise Team",
    content: `
      <p>Google Ads continues to evolve, with new features, campaign types, and best practices emerging regularly. Whether you're new to Google Ads or looking to optimize existing campaigns, this guide covers everything you need to know for 2025.</p>
      
      <h2>Campaign Types Overview</h2>
      <p>Google Ads offers several campaign types, each suited to different marketing objectives:</p>
      
      <ul>
        <li><strong>Search:</strong> Text ads on Google search results</li>
        <li><strong>Display:</strong> Visual ads across the Google Display Network</li>
        <li><strong>Video:</strong> Ads on YouTube and partner sites</li>
        <li><strong>Shopping:</strong> Product listings for e-commerce</li>
        <li><strong>Performance Max:</strong> AI-powered multi-channel campaigns</li>
        <li><strong>Demand Gen:</strong> Awareness and consideration campaigns</li>
      </ul>
      
      <h2>Performance Max Best Practices</h2>
      <p>Performance Max has become a cornerstone of Google Ads strategy. Here's how to get the most from these AI-powered campaigns:</p>
      
      <ul>
        <li>Provide high-quality creative assets (images, videos, headlines)</li>
        <li>Use audience signals to guide the algorithm</li>
        <li>Set up proper conversion tracking</li>
        <li>Allow sufficient time for learning (2-3 weeks)</li>
        <li>Monitor and optimize based on performance data</li>
      </ul>
      
      <h2>Search Campaign Optimization</h2>
      <p>Despite the rise of automated campaigns, Search remains essential for capturing high-intent traffic:</p>
      
      <ul>
        <li>Use responsive search ads with multiple headlines and descriptions</li>
        <li>Implement smart bidding strategies</li>
        <li>Build comprehensive negative keyword lists</li>
        <li>Optimize ad extensions for maximum visibility</li>
        <li>Regular search term report analysis</li>
      </ul>
      
      <h2>Conversion Tracking Setup</h2>
      <p>Accurate conversion tracking is essential for campaign success. Ensure you're tracking:</p>
      
      <ul>
        <li>Primary conversions (purchases, leads)</li>
        <li>Secondary conversions (page views, engagement)</li>
        <li>Offline conversions (phone calls, in-store visits)</li>
        <li>Conversion values for revenue tracking</li>
      </ul>
      
      <h2>Budget and Bidding Strategies</h2>
      <p>Choosing the right bidding strategy depends on your goals and data availability:</p>
      
      <ul>
        <li><strong>Maximize Conversions:</strong> Best for volume-focused campaigns</li>
        <li><strong>Target CPA:</strong> Ideal when you have clear cost-per-acquisition goals</li>
        <li><strong>Target ROAS:</strong> Perfect for e-commerce with revenue tracking</li>
        <li><strong>Maximize Conversion Value:</strong> Great for revenue optimization</li>
      </ul>
      
      <h2>Staying Ahead in 2025</h2>
      <p>The Google Ads landscape will continue to evolve. Stay ahead by:</p>
      
      <ul>
        <li>Embracing AI-powered campaign types</li>
        <li>Investing in first-party data collection</li>
        <li>Testing new features as they're released</li>
        <li>Continuously optimizing based on performance data</li>
      </ul>
      
      <p>Ready to take your Google Ads to the next level? <a href="/contact">Let's discuss your paid search strategy.</a></p>
    `
  },
];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const post = allBlogPosts.find(p => p.slug === slug);

  const relatedPosts = allBlogPosts
    .filter(p => p.category === post?.category && p.slug !== slug)
    .slice(0, 2);

  useLayoutEffect(() => {
    if (!post) return;
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      gsap.fromTo('.blog-post-header', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
      });
      gsap.fromTo('.blog-post-content', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.2,
      });
    });
    return () => ctx.revert();
  }, [post]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = post?.title || '';
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  if (!post) {
    return (
      <div className="bg-ron-dark min-h-screen pt-32 pb-24">
        <div className="w-full px-5 lg:px-[5vw] text-center">
          <h1 className="font-display font-bold text-3xl text-white mb-4">Article Not Found</h1>
          <p className="text-ron-text-secondary mb-8">The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ron-dark min-h-screen">
      {/* Header */}
      <section className="pt-24 pb-8">
        <div className="w-full px-5 lg:px-[5vw]">
          <Link to="/blog" className="text-white/60 hover:text-ron-yellow transition-colors inline-flex items-center gap-2 text-sm mb-8">
            <ArrowLeft size={16} /> Back to all articles
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <section className="pb-8">
        <div className="w-full px-5 lg:px-[5vw]">
          <div className="blog-post-header max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-ron-yellow/20 text-ron-yellow text-xs font-medium rounded-full">
                {post.category}
              </span>
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-[clamp(36px,4.5vw,56px)] leading-[1.1] tracking-[-0.02em] text-white mb-6">
              {post.title}
            </h1>
            <p className="text-ron-text-secondary text-lg lg:text-xl leading-relaxed mb-8">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/10">
              <div className="flex items-center gap-4 text-white/50 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {post.readTime}
                </span>
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/50 text-sm mr-2">Share:</span>
                <button onClick={() => handleShare('twitter')} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <Twitter size={16} className="text-white/70" />
                </button>
                <button onClick={() => handleShare('linkedin')} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <Linkedin size={16} className="text-white/70" />
                </button>
                <button onClick={() => handleShare('facebook')} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <Facebook size={16} className="text-white/70" />
                </button>
                <button onClick={() => handleShare('copy')} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  {copied ? <CheckCircle size={16} className="text-green-400" /> : <LinkIcon size={16} className="text-white/70" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-12">
        <div className="w-full px-5 lg:px-[5vw]">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-24">
        <div className="w-full px-5 lg:px-[5vw]">
          <div className="blog-post-content max-w-3xl mx-auto">
            <div 
              ref={contentRef}
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 lg:py-24 bg-white/5">
          <div className="w-full px-5 lg:px-[5vw]">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display font-bold text-2xl text-white mb-8">
                Related <span className="text-ron-yellow">Articles</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`} className="group">
                    <article className="process-card overflow-hidden card-hover">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-5">
                        <span className="text-ron-yellow text-xs font-medium">{relatedPost.category}</span>
                        <h3 className="font-display font-semibold text-lg text-white mt-2 group-hover:text-ron-yellow transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-5 lg:px-[5vw]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4">
              Ready to implement these strategies?
            </h2>
            <p className="text-ron-text-secondary text-base lg:text-lg mb-8">
              Let's discuss how we can help you achieve your marketing goals.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Book a discovery call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;