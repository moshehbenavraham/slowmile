/**
 * Single source of truth for the Nexus article catalog.
 *
 * Pages and homepage sections import from here instead of duplicating
 * the same metadata across components. Posts marked `hasDetail: true`
 * have a full body rendered by /blog/:slug; previews-only entries are
 * intentionally narrow and should not be linked from the homepage until
 * a detail body exists.
 */
import businessPost from '@/assets/business-post.jpg';
import fashionPost from '@/assets/fashion-post.jpg';
import techPost from '@/assets/tech-post.jpg';
import lifestylePost from '@/assets/lifestyle-post.jpg';
import workLifestyle from '@/assets/work-lifestyle.jpg';
import fashionLifestyle from '@/assets/fashion-lifestyle.jpg';

export type Category = 'FASHION' | 'TECHNOLOGY' | 'BUSINESS' | 'LIFESTYLE' | 'PODCAST';

export interface PostMeta {
  slug: string;
  title: string;
  category: Category;
  subcategory?: string;
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  image: string;
  tags?: string[];
  /** True when /blog/:slug renders real long-form content. */
  hasDetail: boolean;
}

export interface PostDetail extends PostMeta {
  hasDetail: true;
  heroImage: string;
  authorAvatar: string;
  content: string;
}

const fashionBloggingContent = `
      <p>The fashion industry has undergone a seismic shift in the past decade, with fashion blogging emerging as one of the most influential forces reshaping how we discover, consume, and interact with style. What began as personal style diaries has evolved into a billion-dollar industry that directly impacts fashion trends, consumer behavior, and brand strategies worldwide.</p>

      <p>From the early days of pioneering bloggers like Susanna Lau of Style Bubble and Tavi Gevinson of Style Rookie, to today's Instagram influencers with millions of followers, fashion blogging has democratized fashion commentary and created new pathways to influence that bypass traditional gatekeepers.</p>

      <h2 class="text-xl font-bold text-foreground mb-4 mt-8">The Evolution of Fashion Influence</h2>

      <p>Traditional fashion journalism once held exclusive power over trend-setting and style validation. Magazine editors and fashion critics were the sole arbiters of what was considered fashionable. However, the rise of digital platforms has fundamentally disrupted this hierarchy.</p>

      <p>Today's fashion influencers operate with unprecedented autonomy, building direct relationships with their audiences and creating authentic content that resonates on a personal level. This shift has forced established fashion media to adapt, with many traditional publications now collaborating with digital creators to maintain relevance.</p>

      <h2 class="text-xl font-bold text-foreground mb-4 mt-8">The Anatomy of Modern Fashion Influence</h2>

      <p>Contemporary fashion influencers operate across multiple platforms, each serving different purposes in their overall strategy:</p>

      <ul class="list-disc pl-6 my-4">
        <li><strong>Instagram:</strong> Visual storytelling through curated feeds and Stories</li>
        <li><strong>TikTok:</strong> Trend creation and viral fashion content</li>
        <li><strong>YouTube:</strong> Long-form content including lookbooks and shopping hauls</li>
        <li><strong>Blogs:</strong> In-depth fashion analysis and personal narratives</li>
        <li><strong>Pinterest:</strong> Style inspiration and trend forecasting</li>
      </ul>

      <h2 class="text-xl font-bold text-foreground mb-4 mt-8">The Business of Fashion Blogging</h2>

      <p>What started as passion projects have transformed into sophisticated business enterprises. Successful fashion influencers now operate as media companies, employing teams for content creation, brand partnerships, and business development.</p>

      <p>The monetization strategies have diversified significantly:</p>

      <ul class="list-disc pl-6 my-4">
        <li><strong>Brand Partnerships:</strong> Sponsored content and ambassadorships</li>
        <li><strong>Affiliate Marketing:</strong> Commission-based product recommendations</li>
        <li><strong>Product Lines:</strong> Private label fashion and beauty collaborations</li>
        <li><strong>Digital Products:</strong> Style guides, courses, and exclusive content</li>
        <li><strong>Event Hosting:</strong> Fashion shows, meet-and-greets, and brand activations</li>
      </ul>

      <h2 class="text-xl font-bold text-foreground mb-4 mt-8">Impact on Consumer Behavior</h2>

      <p>Fashion influencers have fundamentally altered how consumers discover and purchase clothing. The traditional seasonal fashion cycle has given way to constant content creation and immediate shopping opportunities through features like Instagram Shopping and "link in bio" tools.</p>

      <p>Research indicates that 72% of Gen Z and millennial consumers have made fashion purchases directly influenced by social media content. This immediate connection between inspiration and purchase has created new challenges and opportunities for both brands and consumers.</p>

      <h2 class="text-xl font-bold text-foreground mb-4 mt-8">Challenges in the Influencer Economy</h2>

      <p>Despite its growth, the fashion influencer industry faces significant challenges:</p>

      <ul class="list-disc pl-6 my-4">
        <li><strong>Authenticity Concerns:</strong> Balancing genuine recommendations with commercial partnerships</li>
        <li><strong>Market Saturation:</strong> Standing out in an increasingly crowded field</li>
        <li><strong>Platform Dependencies:</strong> Vulnerability to algorithm changes and platform policies</li>
        <li><strong>Sustainability Issues:</strong> Pressure to constantly showcase new products</li>
        <li><strong>Mental Health:</strong> The psychological impact of constant public scrutiny</li>
      </ul>

      <h2 class="text-xl font-bold text-foreground mb-4 mt-8">The Sustainability Movement</h2>

      <p>A growing number of fashion influencers are pivoting toward sustainable fashion advocacy, using their platforms to promote conscious consumption, vintage shopping, and ethical brands. This shift reflects broader consumer awareness about fashion's environmental impact.</p>

      <p>Influencers like Venetia La Manna and Aditi Mayer have built substantial followings by focusing on sustainable fashion education, proving that conscious content can be both engaging and commercially successful.</p>

      <h2 class="text-xl font-bold text-foreground mb-4 mt-8">Technology and the Future of Fashion Influence</h2>

      <p>Emerging technologies are reshaping the landscape once again. Virtual reality shopping experiences, AI-powered style recommendations, and augmented reality try-on features are creating new possibilities for fashion content creation and consumer engagement.</p>

      <p>The rise of virtual influencers like Lil Miquela and the integration of NFTs in fashion are pushing the boundaries of what constitutes fashion influence in the digital age.</p>

      <h2 class="text-xl font-bold text-foreground mb-4 mt-8">Looking Ahead: The Next Chapter</h2>

      <p>As we look toward the future, fashion blogging and influence will likely become even more integrated with e-commerce, sustainability initiatives, and immersive technologies. The most successful influencers will be those who can adapt to changing platforms while maintaining authentic connections with their audiences.</p>

      <p>The democratization of fashion influence has permanently changed the industry landscape, creating opportunities for diverse voices and perspectives that were previously marginalized. This evolution continues to challenge traditional fashion hierarchies and create new pathways for creative expression and commercial success.</p>

      <p>Fashion blogging has proven that influence in the digital age is not about gatekeeping access to style, but about fostering communities, inspiring creativity, and making fashion more accessible to everyone.</p>
    `;

const selfDrivingContent = `
      <p>The automotive industry is experiencing a revolutionary transformation with the advent of self-driving cars. This technology promises to reshape how we think about transportation, safety, and urban planning.</p>

      <p>From Tesla's Autopilot to Waymo's fully autonomous vehicles, the race to develop reliable self-driving technology has accelerated dramatically in recent years. But what exactly are self-driving cars, and how close are we to seeing them on every street?</p>

      <h2 class="text-xl font-bold text-foreground mb-4 mt-8">The Five Levels of Autonomous Driving</h2>

      <p>The Society of Automotive Engineers (SAE) has defined five levels of driving automation, ranging from no automation to full automation:</p>

      <ul class="list-disc pl-6 my-4">
        <li><strong>Level 0:</strong> No automation - human driver controls everything</li>
        <li><strong>Level 1:</strong> Driver assistance - features like cruise control</li>
        <li><strong>Level 2:</strong> Partial automation - car can steer and accelerate/brake</li>
        <li><strong>Level 3:</strong> Conditional automation - car handles most driving tasks</li>
        <li><strong>Level 4:</strong> High automation - car can handle all driving in specific conditions</li>
        <li><strong>Level 5:</strong> Full automation - car can drive anywhere, anytime</li>
      </ul>

      <h2 class="text-xl font-bold text-foreground mb-4 mt-8">The Technology Behind Autonomous Vehicles</h2>

      <p>Self-driving cars rely on a combination of sophisticated technologies to navigate safely. These include LiDAR sensors for 3D mapping, cameras for visual recognition, radar for object detection, and advanced AI algorithms for decision-making.</p>

      <p>Machine learning plays a crucial role, as these vehicles must process enormous amounts of data in real-time to make split-second decisions about steering, braking, and acceleration.</p>

      <h2 class="text-xl font-bold text-foreground mb-4 mt-8">Benefits and Challenges</h2>

      <p>The potential benefits of autonomous vehicles are significant: reduced traffic accidents, improved mobility for disabled individuals, and more efficient traffic flow. However, challenges remain in terms of regulatory approval, public acceptance, and technical reliability in complex urban environments.</p>

      <p>As we move forward, the integration of self-driving cars into our transportation infrastructure will require careful consideration of safety, ethics, and societal impact.</p>
    `;

const csrContent = `
      <p>In today's interconnected world, businesses are increasingly expected to operate with a sense of social responsibility that extends beyond profit maximization. Corporate Social Responsibility (CSR) has evolved from a nice-to-have initiative to a business imperative.</p>

      <p>Companies that embrace CSR are finding that it not only benefits society and the environment but also enhances their brand reputation, employee satisfaction, and long-term financial performance.</p>

      <h2 class="text-xl font-bold text-foreground mb-4 mt-8">What is Corporate Social Responsibility?</h2>

      <p>CSR refers to a company's commitment to conducting business in an ethical manner that considers the social, environmental, and economic impact of its operations. It involves taking responsibility for the company's effects on society and the environment.</p>

      <h2 class="text-xl font-bold text-foreground mb-4 mt-8">Key Areas of CSR</h2>

      <p>Modern CSR programs typically focus on four main areas:</p>

      <ul class="list-disc pl-6 my-4">
        <li><strong>Environmental Responsibility:</strong> Reducing carbon footprint, waste management, sustainable sourcing</li>
        <li><strong>Social Responsibility:</strong> Fair labor practices, community development, diversity and inclusion</li>
        <li><strong>Economic Responsibility:</strong> Fair business practices, supporting local economies, transparent reporting</li>
        <li><strong>Philanthropic Responsibility:</strong> Charitable giving, volunteer programs, community partnerships</li>
      </ul>

      <h2 class="text-xl font-bold text-foreground mb-4 mt-8">The Business Case for CSR</h2>

      <p>Research consistently shows that companies with strong CSR programs outperform their peers in multiple areas. They attract and retain top talent, build stronger customer loyalty, and often enjoy better financial performance over the long term.</p>

      <p>Moreover, consumers increasingly prefer to do business with companies that share their values, making CSR a competitive advantage in today's market.</p>

      <h2 class="text-xl font-bold text-foreground mb-4 mt-8">Implementing Effective CSR Strategies</h2>

      <p>Successful CSR programs require genuine commitment from leadership, clear goals and metrics, stakeholder engagement, and transparent reporting. Companies must avoid "greenwashing" and ensure their CSR efforts are authentic and impactful.</p>

      <p>As we face global challenges like climate change and social inequality, the role of businesses in driving positive change has never been more important. CSR is no longer optional – it's essential for sustainable business success.</p>
    `;

const mindfulContent = `
      <p>In our fast-paced world, finding moments of peace and balance has become more challenging than ever. The constant buzz of notifications, endless to-do lists, and societal pressures can leave us feeling overwhelmed and disconnected from what truly matters.</p>

      <p>Mindful living offers a path to reclaim our sense of balance and well-being. It's about being present in the moment, making conscious choices, and cultivating a deeper awareness of our thoughts, feelings, and surroundings.</p>

      <h2 class="text-xl font-bold text-foreground mb-4 mt-8">What is Mindful Living?</h2>

      <p>Mindful living is the practice of bringing conscious awareness to our daily activities and experiences. It involves slowing down, paying attention, and making intentional choices rather than operating on autopilot.</p>

      <h2 class="text-xl font-bold text-foreground mb-4 mt-8">Simple Ways to Practice Mindfulness</h2>

      <p>Incorporating mindfulness into your daily routine doesn't require dramatic lifestyle changes. Here are some simple practices to get started:</p>

      <ul class="list-disc pl-6 my-4">
        <li><strong>Morning Rituals:</strong> Start your day with five minutes of deep breathing or meditation</li>
        <li><strong>Mindful Eating:</strong> Pay attention to the taste, texture, and aroma of your food</li>
        <li><strong>Digital Detox:</strong> Set aside specific times each day to disconnect from technology</li>
        <li><strong>Nature Connection:</strong> Spend time outdoors and observe the natural world around you</li>
        <li><strong>Gratitude Practice:</strong> Reflect on three things you're grateful for each day</li>
      </ul>

      <h2 class="text-xl font-bold text-foreground mb-4 mt-8">The Benefits of Mindful Living</h2>

      <p>Research has shown that mindfulness practices can reduce stress, improve mental clarity, enhance emotional regulation, and boost overall well-being. People who practice mindful living often report feeling more content, focused, and resilient in the face of challenges.</p>

      <h2 class="text-xl font-bold text-foreground mb-4 mt-8">Creating Your Personal Balance</h2>

      <p>Remember that mindful living looks different for everyone. The key is to find practices that resonate with you and fit into your lifestyle. Start small, be consistent, and be patient with yourself as you develop these new habits.</p>

      <p>In a world that often values busyness over well-being, choosing to live mindfully is a radical act of self-care and consciousness.</p>
    `;

/**
 * Articles with full long-form content. These are the only slugs that
 * /blog/:slug serves real content for — the homepage links exclusively
 * to entries from this list to avoid dead-end clicks.
 */
export const detailedPosts: PostDetail[] = [
  {
    slug: 'rise-of-fashion-blogging',
    title: 'The Rise of Fashion Blogging: The Role of Influencers in the Industry',
    category: 'FASHION',
    subcategory: 'Digital Fashion',
    date: 'September 20, 2025',
    readTime: '8 min read',
    author: 'MELVILLE',
    authorAvatar: '/placeholder-avatar.jpg',
    excerpt:
      'Fashion blogging has emerged as one of the most influential forces reshaping how we discover, consume, and interact with style.',
    image: fashionPost,
    heroImage: fashionPost,
    tags: ['Influencers', 'Social Media', 'Fashion Industry'],
    hasDetail: true,
    content: fashionBloggingContent,
  },
  {
    slug: 'self-driving-cars-everything-you-need-to-know',
    title: 'Self-Driving Cars: Everything You Need to Know',
    category: 'TECHNOLOGY',
    subcategory: 'Autonomous Vehicles',
    date: 'September 12, 2025',
    readTime: '7 min read',
    author: 'NEXUS',
    authorAvatar: '/placeholder-avatar.jpg',
    excerpt:
      'The automotive industry is experiencing a revolutionary transformation with the advent of self-driving cars.',
    image: techPost,
    heroImage: techPost,
    tags: ['Autonomous Vehicles', 'AI', 'Transportation'],
    hasDetail: true,
    content: selfDrivingContent,
  },
  {
    slug: 'the-importance-of-corporate-social-responsibility',
    title: 'The Importance of Corporate Social Responsibility',
    category: 'BUSINESS',
    subcategory: 'Sustainability',
    date: 'September 10, 2025',
    readTime: '6 min read',
    author: 'NEXUS',
    authorAvatar: '/placeholder-avatar.jpg',
    excerpt:
      'Businesses are increasingly expected to operate with a sense of social responsibility that extends beyond profit maximization.',
    image: businessPost,
    heroImage: businessPost,
    tags: ['CSR', 'Sustainability', 'Leadership'],
    hasDetail: true,
    content: csrContent,
  },
  {
    slug: 'mindful-living-finding-balance-in-a-busy-world',
    title: 'Mindful Living: Finding Balance in a Busy World',
    category: 'LIFESTYLE',
    subcategory: 'Wellness',
    date: 'September 8, 2025',
    readTime: '4 min read',
    author: 'MELVILLE',
    authorAvatar: '/placeholder-avatar.jpg',
    excerpt:
      'In our fast-paced world, finding moments of peace and balance has become more challenging than ever.',
    image: lifestylePost,
    heroImage: lifestylePost,
    tags: ['Mindfulness', 'Wellness', 'Work-Life Balance'],
    hasDetail: true,
    content: mindfulContent,
  },
];

/**
 * Listing-only entries. These slugs do NOT yet resolve to a real
 * /blog/:slug detail body — they appear on category pages so the
 * archive looks populated, but the homepage MUST not link to them.
 */
export const previewPosts: PostMeta[] = [
  {
    slug: 'ai-machine-learning-business',
    title: 'AI and Machine Learning: Transforming Business Operations',
    category: 'TECHNOLOGY',
    subcategory: 'Artificial Intelligence',
    date: 'September 18, 2025',
    readTime: '5 min read',
    author: 'NEXUS',
    excerpt:
      'Discover how artificial intelligence is revolutionizing the way businesses operate.',
    image: techPost,
    tags: ['AI', 'Machine Learning', 'Business Automation'],
    hasDetail: false,
  },
  {
    slug: 'sustainable-business-practices',
    title: 'Sustainable Business Practices for Modern Entrepreneurs',
    category: 'BUSINESS',
    subcategory: 'Sustainability',
    date: 'September 15, 2025',
    readTime: '6 min read',
    author: 'NEXUS',
    excerpt:
      'Learn how to build a sustainable business that benefits both profit and planet.',
    image: businessPost,
    tags: ['Sustainability', 'Green Business', 'Entrepreneurship'],
    hasDetail: false,
  },
  {
    slug: 'future-remote-work',
    title: 'The Future of Remote Work: Trends and Predictions',
    category: 'BUSINESS',
    subcategory: 'Future of Work',
    date: 'September 10, 2025',
    readTime: '5 min read',
    author: 'NEXUS',
    excerpt: 'Analyzing the evolution of remote work and what lies ahead.',
    image: workLifestyle,
    tags: ['Remote Work', 'Future Trends', 'Digital Workplace'],
    hasDetail: false,
  },
  {
    slug: 'fashion-week-highlights',
    title: 'Fashion Week Highlights: Trends That Define the Season',
    category: 'FASHION',
    subcategory: 'Fashion Events',
    date: 'September 8, 2025',
    readTime: '5 min read',
    author: 'MELVILLE',
    excerpt:
      "A comprehensive look at the standout moments from this season's fashion weeks.",
    image: fashionLifestyle,
    tags: ['Fashion Week', 'Trends', 'Runway'],
    hasDetail: false,
  },
  {
    slug: 'blockchain-beyond-crypto',
    title: 'Blockchain Technology: Beyond Cryptocurrency',
    category: 'TECHNOLOGY',
    subcategory: 'Blockchain',
    date: 'September 5, 2025',
    readTime: '6 min read',
    author: 'NEXUS',
    excerpt: 'Exploring innovative applications of blockchain in various industries.',
    image: techPost,
    tags: ['Blockchain', 'Cryptocurrency', 'Innovation'],
    hasDetail: false,
  },
  {
    slug: 'personal-brand-digital-age',
    title: 'Building a Personal Brand in the Digital Age',
    category: 'BUSINESS',
    subcategory: 'Personal Branding',
    date: 'September 3, 2025',
    readTime: '5 min read',
    author: 'NEXUS',
    excerpt:
      'Essential strategies for creating and maintaining your online presence.',
    image: businessPost,
    tags: ['Personal Branding', 'Digital Marketing', 'Online Presence'],
    hasDetail: false,
  },
  {
    slug: 'wellness-trends-worth-time',
    title: "Wellness Trends: What's Actually Worth Your Time",
    category: 'LIFESTYLE',
    subcategory: 'Health Trends',
    date: 'September 1, 2025',
    readTime: '4 min read',
    author: 'MELVILLE',
    excerpt: 'Separating wellness fads from genuinely beneficial practices.',
    image: lifestylePost,
    tags: ['Health', 'Wellness Trends', 'Self-Care'],
    hasDetail: false,
  },
  {
    slug: 'digital-marketing-strategies',
    title: 'Digital Marketing Strategies That Actually Work',
    category: 'BUSINESS',
    subcategory: 'Digital Marketing',
    date: 'August 28, 2025',
    readTime: '6 min read',
    author: 'NEXUS',
    excerpt:
      "Proven digital marketing tactics to grow your business in today's competitive landscape.",
    image: workLifestyle,
    tags: ['Digital Marketing', 'Growth Strategies', 'Online Marketing'],
    hasDetail: false,
  },
  {
    slug: 'leadership-times-change',
    title: 'Leadership in Times of Change',
    category: 'BUSINESS',
    subcategory: 'Leadership',
    date: 'August 25, 2025',
    readTime: '5 min read',
    author: 'NEXUS',
    excerpt:
      'How effective leaders navigate uncertainty and drive organizational success.',
    image: businessPost,
    tags: ['Leadership', 'Change Management', 'Business Strategy'],
    hasDetail: false,
  },
  {
    slug: 'economics-startup-growth',
    title: 'The Economics of Startup Growth',
    category: 'BUSINESS',
    subcategory: 'Startup Growth',
    date: 'August 22, 2025',
    readTime: '6 min read',
    author: 'NEXUS',
    excerpt:
      'Understanding the financial dynamics that drive successful startup scaling.',
    image: workLifestyle,
    tags: ['Startups', 'Growth Economics', 'Business Finance'],
    hasDetail: false,
  },
  // ── Technology previews (listed on /technology) ─────────────────
  {
    slug: 'ai-everyday-life',
    title: 'The Rise of Artificial Intelligence in Everyday Life',
    category: 'TECHNOLOGY',
    subcategory: 'Artificial Intelligence',
    date: 'September 18, 2025',
    readTime: '5 min read',
    author: 'NEXUS',
    excerpt:
      'Exploring how AI is transforming industries and reshaping our daily experiences.',
    image: techPost,
    tags: ['AI', 'Machine Learning', 'Daily Tech'],
    hasDetail: false,
  },
  {
    slug: 'blockchain-real-world-applications',
    title: 'Blockchain Beyond Cryptocurrency: Real-World Applications',
    category: 'TECHNOLOGY',
    subcategory: 'Blockchain',
    date: 'September 12, 2025',
    readTime: '6 min read',
    author: 'NEXUS',
    excerpt:
      'Discovering innovative uses of blockchain technology across various sectors.',
    image: fashionLifestyle,
    tags: ['Blockchain', 'Innovation', 'Real-world Applications'],
    hasDetail: false,
  },
  {
    slug: 'web-development-trends-2025',
    title: 'The Future of Web Development: Trends to Watch in 2025',
    category: 'TECHNOLOGY',
    subcategory: 'Web Development',
    date: 'September 8, 2025',
    readTime: '5 min read',
    author: 'NEXUS',
    excerpt:
      'Key technologies and frameworks shaping the next generation of web applications.',
    image: techPost,
    tags: ['Web Development', 'Frontend', 'Future Trends'],
    hasDetail: false,
  },
  {
    slug: 'cybersecurity-small-business',
    title: 'Cybersecurity Best Practices for Small Businesses',
    category: 'TECHNOLOGY',
    subcategory: 'Cybersecurity',
    date: 'September 5, 2025',
    readTime: '6 min read',
    author: 'NEXUS',
    excerpt:
      'Essential security measures every small business should implement to protect their data.',
    image: fashionLifestyle,
    tags: ['Cybersecurity', 'Small Business', 'Data Protection'],
    hasDetail: false,
  },
  {
    slug: 'mobile-app-development-evolution',
    title: 'The Evolution of Mobile App Development',
    category: 'TECHNOLOGY',
    subcategory: 'Mobile Development',
    date: 'August 30, 2025',
    readTime: '5 min read',
    author: 'NEXUS',
    excerpt:
      'From native to cross-platform: how mobile development approaches have transformed.',
    image: techPost,
    tags: ['Mobile Development', 'Cross-platform', 'App Development'],
    hasDetail: false,
  },
  {
    slug: 'cloud-computing-business-guide',
    title: 'Cloud Computing: Choosing the Right Solution for Your Business',
    category: 'TECHNOLOGY',
    subcategory: 'Cloud Computing',
    date: 'August 26, 2025',
    readTime: '7 min read',
    author: 'NEXUS',
    excerpt:
      'A comprehensive guide to selecting the perfect cloud infrastructure for your needs.',
    image: fashionLifestyle,
    tags: ['Cloud Computing', 'Infrastructure', 'Business Solutions'],
    hasDetail: false,
  },
  // ── Podcast previews (listed on /podcast) ───────────────────────
  {
    slug: 'future-digital-storytelling',
    title: 'The Future of Digital Storytelling: A Conversation with Content Creators',
    category: 'PODCAST',
    subcategory: 'Digital Media',
    date: 'September 20, 2025',
    readTime: '42 min listen',
    author: 'NEXUS',
    excerpt:
      'Join us as we explore how digital platforms are reshaping the way we tell and consume stories.',
    image: lifestylePost,
    tags: ['Storytelling', 'Content Creation', 'Digital Media'],
    hasDetail: false,
  },
  {
    slug: 'authentic-brands-social-media',
    title: 'Building Authentic Brands in the Social Media Age',
    category: 'PODCAST',
    subcategory: 'Brand Strategy',
    date: 'September 14, 2025',
    readTime: '38 min listen',
    author: 'NEXUS',
    excerpt:
      'Industry experts discuss strategies for creating genuine connections with audiences online.',
    image: fashionPost,
    tags: ['Brand Strategy', 'Social Media', 'Authenticity'],
    hasDetail: false,
  },
  {
    slug: 'psychology-influence-marketing',
    title: 'The Psychology of Influence: Understanding Modern Marketing',
    category: 'PODCAST',
    subcategory: 'Marketing Psychology',
    date: 'September 7, 2025',
    readTime: '45 min listen',
    author: 'NEXUS',
    excerpt:
      'Diving deep into the psychological principles that drive successful marketing campaigns.',
    image: workLifestyle,
    tags: ['Psychology', 'Marketing', 'Influence'],
    hasDetail: false,
  },
  {
    slug: 'women-in-tech',
    title: 'Women in Tech: Breaking Barriers and Shaping the Future',
    category: 'PODCAST',
    subcategory: 'Tech Industry',
    date: 'August 31, 2025',
    readTime: '50 min listen',
    author: 'NEXUS',
    excerpt:
      'Inspiring conversations with female leaders who are transforming the technology landscape.',
    image: lifestylePost,
    tags: ['Women in Tech', 'Leadership', 'Tech Industry'],
    hasDetail: false,
  },
  {
    slug: 'art-personal-branding',
    title: 'The Art of Personal Branding: From Vision to Execution',
    category: 'PODCAST',
    subcategory: 'Personal Development',
    date: 'August 24, 2025',
    readTime: '36 min listen',
    author: 'NEXUS',
    excerpt:
      "Learn how to craft and communicate your unique story in today's competitive market.",
    image: fashionPost,
    tags: ['Personal Branding', 'Career Development', 'Self-Marketing'],
    hasDetail: false,
  },
  {
    slug: 'sustainable-living-impact',
    title: 'Sustainable Living: Small Changes, Big Impact',
    category: 'PODCAST',
    subcategory: 'Sustainability',
    date: 'August 17, 2025',
    readTime: '41 min listen',
    author: 'NEXUS',
    excerpt:
      'Practical tips and insights for incorporating sustainability into your daily routine.',
    image: workLifestyle,
    tags: ['Sustainability', 'Lifestyle', 'Environmental Impact'],
    hasDetail: false,
  },
];

const detailedAsMeta: PostMeta[] = detailedPosts.map(
  ({ heroImage: _h, authorAvatar: _a, content: _c, ...meta }) => meta,
);

/** Category-route map shared by homepage and detail pages. */
export const CATEGORY_ROUTE_MAP: Record<string, string> = {
  fashion: '/posts',
  technology: '/technology',
  business: '/business',
  lifestyle: '/posts',
  podcast: '/podcast',
};

/** Lookup a detailed post by slug. Undefined when no detail exists. */
export function getPostBySlug(slug: string | undefined): PostDetail | undefined {
  if (!slug) return undefined;
  return detailedPosts.find((p) => p.slug === slug);
}

/**
 * Lookup ANY post (detailed or preview) by slug. Used by the detail
 * route so preview-only slugs render a "Coming soon" stub instead of a
 * generic 404 — and so search/category card links never dead-end.
 */
export function findPostMetaBySlug(slug: string | undefined): PostMeta | undefined {
  if (!slug) return undefined;
  return getAllPostMeta().find((p) => p.slug === slug);
}

/** All posts (detailed + preview) sorted newest first. */
export function getAllPostMeta(): PostMeta[] {
  return [...detailedAsMeta, ...previewPosts];
}

/** Posts filtered by category. */
export function getPostsByCategory(category: Category): PostMeta[] {
  return getAllPostMeta().filter((p) => p.category === category);
}

/** Convenience accessor for the podcast feed. */
export function getPodcastEpisodes(): PostMeta[] {
  return getPostsByCategory('PODCAST');
}

/** Lightweight search across title / category / excerpt / tags / slug. */
export function searchPosts(query: string): PostMeta[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return getAllPostMeta().filter((post) => {
    const haystack = [
      post.title,
      post.category,
      post.subcategory ?? '',
      post.excerpt,
      post.slug,
      ...(post.tags ?? []),
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}

/** Hero / featured article — always a real detail post. */
export function getFeaturedPost(): PostDetail {
  return detailedPosts[0];
}

/**
 * Editor's pick rail. Returns up to N detail posts so every card links
 * to a working detail page. Excludes the featured post by default to
 * avoid showing the hero article twice on the homepage.
 */
export function getEditorsPicks(limit = 4, excludeFeatured = true): PostDetail[] {
  const featuredSlug = excludeFeatured ? getFeaturedPost().slug : null;
  return detailedPosts
    .filter((p) => p.slug !== featuredSlug)
    .slice(0, limit);
}

/** Trending grid. Detail-only posts so clicks always land. */
export function getTrendingPosts(limit = 6): PostDetail[] {
  return detailedPosts.slice(0, limit);
}

/** Masonry grid. Detail-only posts so clicks always land. */
export function getMasonryPosts(limit = 4): PostDetail[] {
  return detailedPosts.slice(0, limit);
}

/** All-Posts grid on the homepage. Detail-only posts so clicks always land. */
export function getHomepageGridPosts(limit = 4): PostDetail[] {
  return detailedPosts.slice(0, limit);
}

/** Popular sidebar list (used by BlogDetail). */
export function getPopularPosts(currentSlug?: string, limit = 3): PostMeta[] {
  return detailedAsMeta
    .filter((p) => p.slug !== currentSlug)
    .slice(0, limit);
}

/** Related posts (used by BlogDetail). Mixes category and other detail posts. */
export function getRelatedPosts(
  currentSlug: string,
  currentCategory: string,
  limit = 3,
): PostMeta[] {
  const others = detailedAsMeta.filter((p) => p.slug !== currentSlug);
  const sameCategory = others.filter((p) => p.category === currentCategory);
  const seen = new Set<string>();
  const ordered: PostMeta[] = [];
  for (const p of [...sameCategory, ...others]) {
    if (seen.has(p.slug)) continue;
    seen.add(p.slug);
    ordered.push(p);
    if (ordered.length >= limit) break;
  }
  return ordered;
}
