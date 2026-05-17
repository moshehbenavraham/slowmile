import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getFeaturedPost, type PostDetail } from '@/data/posts';

interface FeaturedArticleProps {
  post?: PostDetail;
}

const toIsoDate = (input: string): string => {
  const parsed = new Date(input);
  if (Number.isNaN(parsed.getTime())) return '';
  return parsed.toISOString().split('T')[0];
};

const FeaturedArticle = ({ post = getFeaturedPost() }: FeaturedArticleProps) => {
  const isoDate = toIsoDate(post.date);
  const href = `/blog/${post.slug}`;

  return (
    <article className="container-blog py-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Link
            to={href}
            className="block w-full h-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
            aria-label={`Read article: ${post.title}`}
          >
            <img
              src={post.image}
              alt={`Featured article: ${post.title} — a photograph related to ${post.category.toLowerCase()}.`}
              className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              width="592"
              height="444"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 592px"
            />
          </Link>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h1 className="featured-title">
            <Link
              to={href}
              className="hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            >
              {post.title}
            </Link>
          </h1>

          <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm">
            <span className="blog-meta">{post.author} / WRITER</span>
            <span className="text-muted-foreground" aria-hidden="true">—</span>
            <span className="blog-meta">{post.category}</span>
            <span className="text-muted-foreground" aria-hidden="true">—</span>
            <time className="blog-meta" dateTime={isoDate || undefined}>
              {post.date}
            </time>
            <span className="text-muted-foreground" aria-hidden="true">—</span>
            <span className="blog-meta">{post.readTime}</span>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>

          <div className="pt-4">
            <Button variant="outline" size="sm" asChild>
              <Link to={href} aria-label={`Read more: ${post.title}`}>
                READ MORE
                <span className="ml-2" aria-hidden="true">→</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

/** Default featured article — sources from the post catalog. */
export const DefaultFeaturedArticle = () => <FeaturedArticle />;

export default FeaturedArticle;
