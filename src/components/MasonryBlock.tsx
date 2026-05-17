import { Link } from 'react-router-dom';
import { getMasonryPosts, type PostDetail } from '@/data/posts';

type Height = 'tall' | 'medium' | 'short';

const heightCycle: Height[] = ['tall', 'medium', 'short', 'medium'];

const getHeightClass = (height: Height) => {
  switch (height) {
    case 'tall':
      return 'row-span-3';
    case 'medium':
      return 'row-span-2';
    case 'short':
    default:
      return 'row-span-1';
  }
};

const toIsoDate = (input: string): string => {
  const parsed = new Date(input);
  if (Number.isNaN(parsed.getTime())) return '';
  return parsed.toISOString().split('T')[0];
};

interface Tile {
  post: PostDetail;
  height: Height;
}

const buildTiles = (posts: PostDetail[]): Tile[] =>
  posts.map((post, index) => ({
    post,
    height: heightCycle[index % heightCycle.length],
  }));

const MasonryBlock = () => {
  const tiles = buildTiles(getMasonryPosts(4));

  if (tiles.length === 0) return null;

  return (
    <section className="container-blog py-16">
      <h2 id="masonry-heading" className="section-title mb-8">
        Featured Stories
      </h2>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[180px]"
        style={{ gridAutoFlow: 'row dense' }}
      >
        {tiles.map(({ post, height }) => {
          const isoDate = toIsoDate(post.date);
          const href = `/blog/${post.slug}`;
          return (
            <article
              key={post.slug}
              className={`group ${getHeightClass(height)} transition-all duration-300 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg`}
            >
              <Link
                to={href}
                aria-label={`Read featured story: ${post.title}`}
                className="block w-full h-full focus:outline-none"
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-card border border-border hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={post.image}
                    alt={`Featured story: ${post.title} — a photograph related to ${post.category.toLowerCase()}.`}
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width="294"
                    height={height === 'tall' ? '540' : height === 'medium' ? '360' : '180'}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 294px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs font-medium bg-primary/80 text-primary-foreground px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                      <time
                        className="text-xs opacity-80"
                        dateTime={isoDate || undefined}
                      >
                        {post.date}
                      </time>
                    </div>
                    <h3 className="font-bold text-sm md:text-base mb-2 line-clamp-2 group-hover:underline underline-offset-4">
                      {post.title}
                    </h3>
                    <p className="text-xs opacity-90 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default MasonryBlock;
