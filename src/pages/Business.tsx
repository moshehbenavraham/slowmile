import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import PageFilter, { Post } from '@/components/PageFilter';
import SEO from '@/components/SEO';
import { useMemo, useState } from 'react';
import { getPostsByCategory } from '@/data/posts';

/**
 * Business archive. Sources entries from the single posts.ts catalog
 * so every card slug resolves to either a real detail page or a
 * "Coming soon" preview stub.
 */
const Business = () => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  const businessPosts: Post[] = useMemo(
    () =>
      getPostsByCategory('BUSINESS').map((p) => ({
        title: p.title,
        category: p.category,
        subcategory: p.subcategory,
        date: p.date,
        excerpt: p.excerpt,
        image: p.image,
        slug: p.slug,
        tags: p.tags,
      })),
    [],
  );

  const postsToShow = filteredPosts.length > 0 ? filteredPosts : businessPosts;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Business"
        description="Insights and strategies for modern business leaders and entrepreneurs — sustainability, remote work, personal branding, leadership, and startup economics."
      />
      <Header />

      <main id="main-content" className="container-blog py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Business
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights and strategies for modern business leaders and entrepreneurs navigating today's competitive landscape.
          </p>
        </div>

        <PageFilter
          posts={businessPosts}
          onFilteredPostsChange={setFilteredPosts}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {postsToShow.map((post) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              category={post.category}
              date={post.date}
              excerpt={post.excerpt}
              image={post.image}
              href={`/blog/${post.slug}`}
              isSmall={false}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Business;
