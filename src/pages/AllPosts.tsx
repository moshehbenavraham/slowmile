import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import PageFilter, { Post } from '@/components/PageFilter';
import SEO from '@/components/SEO';
import { useMemo, useState } from 'react';
import { getAllPostMeta } from '@/data/posts';

/**
 * Archive of every published post (and preview stub). Sources from the
 * single posts.ts catalog so every slug renders either a real detail
 * page or a graceful "Coming soon" stub — no broken cards.
 */
const AllPosts = () => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  const blogPosts: Post[] = useMemo(
    () =>
      getAllPostMeta().map((p) => ({
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

  const postsToShow = filteredPosts.length > 0 ? filteredPosts : blogPosts;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="All Posts"
        description="Browse the complete Nexus archive — essays and reporting on fashion, technology, business, lifestyle, and the podcast."
      />
      <Header />

      <main id="main-content" className="container-blog py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            All Posts
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our complete collection of articles covering fashion, technology, business, lifestyle, and the podcast.
          </p>
        </div>

        <PageFilter
          posts={blogPosts}
          onFilteredPostsChange={setFilteredPosts}
          availableCategories={['FASHION', 'TECHNOLOGY', 'BUSINESS', 'LIFESTYLE', 'PODCAST']}
          showCategoryFilter={true}
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

export default AllPosts;
