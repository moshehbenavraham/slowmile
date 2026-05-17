import BlogCard from './BlogCard';
import { getTrendingPosts } from '@/data/posts';

const TrendingBlock = () => {
  const trendingPosts = getTrendingPosts(6);

  if (trendingPosts.length === 0) return null;

  return (
    <section className="container-blog py-16 bg-muted/30">
      <h2 id="trending-heading" className="section-title mb-8">
        Trending
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trendingPosts.map((post, index) => (
          <BlogCard
            key={post.slug}
            title={post.title}
            category={post.category}
            date={post.date}
            excerpt={index < 3 ? post.excerpt : undefined}
            image={post.image}
            href={`/blog/${post.slug}`}
            isSmall={index >= 3}
          />
        ))}
      </div>
    </section>
  );
};

export default TrendingBlock;
