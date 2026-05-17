import { Link } from 'react-router-dom';
import BlogCard from './BlogCard';
import { Button } from '@/components/ui/button';
import { getHomepageGridPosts } from '@/data/posts';

const BlogGrid = () => {
  const blogPosts = getHomepageGridPosts(6);

  if (blogPosts.length === 0) return null;

  return (
    <section className="container-blog py-16">
      <div className="flex items-end justify-between mb-8 gap-6 flex-wrap">
        <h2 id="all-posts-heading" className="section-title mb-0">
          Latest Articles
        </h2>
        <Button variant="outline" size="sm" asChild>
          <Link to="/posts" aria-label="Browse all Nexus articles">
            VIEW ALL POSTS
            <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
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

export default BlogGrid;
