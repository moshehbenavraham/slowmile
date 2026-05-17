import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO, { SITE_URL, SITE_NAME } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SocialShare from '@/components/SocialShare';
import ReadingProgress from '@/components/ReadingProgress';
import TableOfContents from '@/components/TableOfContents';
import RelatedPosts from '@/components/RelatedPosts';
import BackToTop from '@/components/BackToTop';
import {
  CATEGORY_ROUTE_MAP,
  findPostMetaBySlug,
  getPostBySlug,
  getPopularPosts,
  getRelatedPosts,
  type PostDetail,
  type PostMeta,
} from '@/data/posts';

const NEWSLETTER_EMAIL = 'hello@nexusblog.com';
const NEWSLETTER_ENDPOINT = import.meta.env.VITE_NEWSLETTER_ENDPOINT as string | undefined;

const toIsoDate = (input: string): string => {
  const parsed = new Date(input);
  if (Number.isNaN(parsed.getTime())) return '';
  return parsed.toISOString().split('T')[0];
};

const stripHtml = (input: string): string =>
  input.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

type ResolutionStatus = 'detail' | 'preview' | 'missing';

interface ResolvedPost {
  post: PostDetail | null;
  preview: PostMeta | null;
  status: ResolutionStatus;
}

const resolvePost = (slug: string | undefined): ResolvedPost => {
  if (!slug) return { post: null, preview: null, status: 'missing' };
  const detail = getPostBySlug(slug);
  if (detail) {
    return { post: detail, preview: null, status: 'detail' };
  }
  const meta = findPostMetaBySlug(slug);
  if (meta) {
    return { post: null, preview: meta, status: 'preview' };
  }
  return { post: null, preview: null, status: 'missing' };
};

const BlogDetail = () => {
  const { slug } = useParams();
  const { post, preview, status } = resolvePost(slug);

  const isoDate = post ? toIsoDate(post.date) : '';
  const excerpt = post ? stripHtml(post.content).slice(0, 160) + '…' : '';
  const postPath = `/blog/${slug ?? ''}`;
  const articleJsonLd = post
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: excerpt,
        datePublished: isoDate || undefined,
        dateModified: isoDate || undefined,
        articleSection: post.category,
        author: { '@type': 'Person', name: post.author },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/social-card.svg` },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${postPath}` },
        url: `${SITE_URL}${postPath}`,
      }
    : undefined;

  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError(null);

    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }

    setIsSubscribing(true);
    try {
      if (NEWSLETTER_ENDPOINT) {
        const res = await fetch(NEWSLETTER_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmed }),
        });
        if (!res.ok) throw new Error(`Subscription failed (${res.status})`);
        toast.success('Subscribed', { description: 'Welcome to the Nexus newsletter.' });
        setEmail('');
      } else {
        const subject = encodeURIComponent('[Nexus] Newsletter signup');
        const body = encodeURIComponent(`Please subscribe me to the newsletter: ${trimmed}`);
        window.location.href = `mailto:${NEWSLETTER_EMAIL}?subject=${subject}&body=${body}`;
        toast.success('Opening your email app', {
          description: 'Send the prepared message to confirm your subscription.',
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not subscribe right now.';
      setNewsletterError(message);
      toast.error('Subscription failed', {
        description: `Try again, or email ${NEWSLETTER_EMAIL} directly.`,
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  if (status === 'preview' && preview) {
    const previewIso = toIsoDate(preview.date);
    const categoryRoute = CATEGORY_ROUTE_MAP[preview.category.toLowerCase()] ?? '/posts';
    return (
      <div className="min-h-screen bg-background">
        <SEO
          title={preview.title}
          description={preview.excerpt}
          path={postPath}
          ogType="article"
          noindex
          article={{
            section: preview.category,
            author: preview.author,
            publishedTime: previewIso || undefined,
          }}
        />
        <Header />
        <main id="main-content" className="container-blog py-16">
          <article className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-4 text-xs">
              <span className="text-muted-foreground">{preview.category}</span>
              {preview.subcategory && (
                <>
                  <span className="text-muted-foreground" aria-hidden="true">—</span>
                  <span className="text-muted-foreground">{preview.subcategory}</span>
                </>
              )}
              <span className="text-muted-foreground" aria-hidden="true">—</span>
              <time className="text-muted-foreground" dateTime={previewIso || undefined}>
                {preview.date}
              </time>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              {preview.title}
            </h1>

            <img
              src={preview.image}
              alt={`Article image for: ${preview.title}`}
              className="w-full aspect-[16/10] object-cover rounded-lg mb-8"
              loading="lazy"
            />

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {preview.excerpt}
            </p>

            <div className="rounded-lg border border-border bg-muted/40 p-6 mb-8">
              <p className="text-sm font-medium text-foreground mb-2">
                This story is on the way.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We're still finishing this one. In the meantime, browse the rest of the{' '}
                {preview.category.toLowerCase()} archive or subscribe below to be notified the
                moment it goes live.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link to={categoryRoute}>{`More from ${preview.category.toLowerCase()}`}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/posts">Browse all posts</Link>
              </Button>
            </div>
          </article>
        </main>
        <Footer />
        <BackToTop />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <SEO
          title="Article Not Found"
          description="The article you're looking for could not be found. Browse the Nexus archive or return home."
          path={postPath}
          noindex
        />
        <Header />
        <main id="main-content" className="container-blog py-24">
          <div className="max-w-2xl mx-auto text-center">
            <p className="blog-meta mb-4">404 — Article not found</p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              We couldn't find that article
            </h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              The link may be outdated, or the article hasn't been published yet. Try the archive
              or head back to the homepage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/posts">Browse all posts</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/">Return home</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
        <BackToTop />
      </div>
    );
  }

  const popularPosts = getPopularPosts(post.slug, 3);
  const relatedPosts = getRelatedPosts(post.slug, post.category, 3).map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    date: p.date,
    readTime: p.readTime,
    image: p.image,
    excerpt: p.excerpt,
  }));

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={post.title}
        description={excerpt}
        path={postPath}
        ogType="article"
        article={{
          publishedTime: isoDate || undefined,
          modifiedTime: isoDate || undefined,
          author: post.author,
          section: post.category,
        }}
        jsonLd={articleJsonLd}
      />
      <ReadingProgress />
      <Header />

      <main id="main-content" className="container-blog py-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article>
              {/* Article Header */}
              <header className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-medium text-muted-foreground">{post.category}</span>
                  <span className="text-muted-foreground text-xs">—</span>
                  <time className="text-xs text-muted-foreground" dateTime={isoDate || undefined}>
                    {post.date}
                  </time>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                  {post.title}
                </h1>

                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-sm font-medium">{post.author.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{post.author}</p>
                      <p className="text-xs text-muted-foreground">{post.readTime}</p>
                    </div>
                  </div>

                  <SocialShare
                    title={post.title}
                    description={`Read "${post.title}" on Nexus Blog`}
                  />
                </div>
              </header>

              {/* Hero Image */}
              <div className="mb-8">
                <img
                  src={post.heroImage}
                  alt={`Hero image for: ${post.title}`}
                  className="w-full aspect-[16/10] object-cover rounded-lg"
                />
              </div>

              {/* Article Content */}
              <div
                className="prose prose-lg max-w-none text-foreground article-content
                  prose-headings:text-foreground prose-headings:font-bold prose-headings:mb-4 prose-headings:mt-8
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                  prose-ul:text-muted-foreground prose-li:text-muted-foreground
                  prose-img:rounded-lg prose-img:my-6"
                data-article-content
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mt-16 pt-8 border-t border-border">
                <RelatedPosts
                  currentPost={{ category: post.category, title: post.title }}
                  allPosts={relatedPosts}
                  maxPosts={3}
                />
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            {/* Table of Contents */}
            <TableOfContents content={post.content} />

            {/* Newsletter Signup */}
            <form
              onSubmit={handleNewsletterSubmit}
              className="bg-foreground text-background p-6 mb-8 rounded-lg"
              noValidate
            >
              <h3 className="text-lg font-bold mb-4">Newsletter</h3>
              <p className="text-sm mb-4 opacity-90">
                Subscribe to our newsletter to get our newest articles instantly.
              </p>
              <div className="space-y-3">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <Input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (newsletterError) setNewsletterError(null);
                  }}
                  required
                  className="bg-background text-foreground border-0"
                  aria-invalid={newsletterError ? 'true' : undefined}
                  aria-describedby={newsletterError ? 'newsletter-error' : undefined}
                />
                {newsletterError && (
                  <p
                    id="newsletter-error"
                    className="text-xs text-red-300"
                    role="alert"
                    aria-live="polite"
                  >
                    {newsletterError}
                  </p>
                )}
                <Button
                  type="submit"
                  variant="outline"
                  disabled={isSubscribing}
                  className="w-full bg-background text-foreground hover:bg-muted"
                >
                  {isSubscribing
                    ? 'SUBSCRIBING…'
                    : NEWSLETTER_ENDPOINT
                      ? 'SIGNUP'
                      : 'SIGNUP VIA EMAIL'}
                </Button>
              </div>
            </form>

            {/* Popular Posts */}
            {popularPosts.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-foreground mb-6">Popular Posts</h3>
                <div className="space-y-6">
                  {popularPosts.map((popularPost) => (
                    <article key={popularPost.slug}>
                      <Link
                        to={`/blog/${popularPost.slug}`}
                        className="flex gap-4 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                        aria-label={`Read article: ${popularPost.title}`}
                      >
                        <div className="flex-shrink-0">
                          <img
                            src={popularPost.image}
                            alt=""
                            className="w-20 h-20 object-cover rounded"
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-muted-foreground">
                              {popularPost.category}
                            </span>
                            <span className="text-muted-foreground text-xs">—</span>
                            <time
                              className="text-xs text-muted-foreground"
                              dateTime={toIsoDate(popularPost.date) || undefined}
                            >
                              {popularPost.date}
                            </time>
                          </div>
                          <h4 className="text-sm font-medium text-foreground leading-tight group-hover:underline underline-offset-4">
                            {popularPost.title}
                          </h4>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-6">Categories</h3>
              <div className="space-y-3">
                {(['Fashion', 'Technology', 'Business', 'Lifestyle'] as const).map((category) => (
                  <Link
                    key={category}
                    to={CATEGORY_ROUTE_MAP[category.toLowerCase()] ?? '/posts'}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default BlogDetail;
