import { Link } from 'react-router-dom';

interface BlogCardProps {
  title: string;
  category: string;
  date: string;
  /** Route to navigate to. Required — homepage cards must point at real content. */
  href: string;
  excerpt?: string;
  image: string;
  isSmall?: boolean;
}

const toIsoDate = (input: string): string => {
  const parsed = new Date(input);
  if (Number.isNaN(parsed.getTime())) return '';
  return parsed.toISOString().split('T')[0];
};

const BlogCard = ({
  title,
  category,
  date,
  excerpt,
  image,
  href,
  isSmall = false,
}: BlogCardProps) => {
  const isoDate = toIsoDate(date);

  return (
    <article className="blog-card group transition-all duration-300 hover:shadow-lg border border-transparent hover:border-border">
      <Link
        to={href}
        className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label={`Read article: ${title}`}
      >
        {/* Image */}
        <div className={`relative overflow-hidden ${isSmall ? 'aspect-[3/2]' : 'aspect-[4/3]'}`}>
          <img
            src={image}
            alt={`Article image for: ${title} — a photograph related to ${category.toLowerCase()}.`}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            width={isSmall ? '300' : '387'}
            height={isSmall ? '200' : '291'}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 387px"
          />
        </div>

        {/* Content */}
        <div className={`p-6 space-y-3 ${isSmall ? 'p-4 space-y-2' : ''}`}>
          <div className="flex items-center space-x-2">
            <span className="blog-meta">{category}</span>
            <span className="text-muted-foreground text-xs" aria-hidden="true">—</span>
            <time className="blog-meta" dateTime={isoDate || undefined}>
              {date}
            </time>
          </div>

          <h3
            className={`font-bold text-foreground leading-tight group-hover:underline underline-offset-4 transition-colors ${
              isSmall ? 'text-base' : 'text-lg'
            }`}
          >
            {title}
          </h3>

          {excerpt && !isSmall && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {excerpt}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
