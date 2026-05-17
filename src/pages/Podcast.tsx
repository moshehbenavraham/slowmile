import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import PageFilter, { Post } from '@/components/PageFilter';
import SEO from '@/components/SEO';
import { useMemo, useState } from 'react';
import { getPodcastEpisodes } from '@/data/posts';

/**
 * Podcast archive. Sources entries from the single posts.ts catalog
 * via getPodcastEpisodes() so episode cards never link to nonexistent
 * /blog/:slug routes.
 */
const Podcast = () => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  const podcastEpisodes: Post[] = useMemo(
    () =>
      getPodcastEpisodes().map((p) => ({
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

  const postsToShow = filteredPosts.length > 0 ? filteredPosts : podcastEpisodes;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Podcast"
        description="Engaging conversations with thought leaders, innovators, and creators on storytelling, brand authenticity, marketing psychology, and sustainable living."
      />
      <Header />

      <main id="main-content" className="container-blog py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Podcast
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Engaging conversations with thought leaders, innovators, and creators shaping our world today.
          </p>
        </div>

        <PageFilter
          posts={podcastEpisodes}
          onFilteredPostsChange={setFilteredPosts}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {postsToShow.map((episode) => (
            <BlogCard
              key={episode.slug}
              title={episode.title}
              category={episode.category}
              date={episode.date}
              excerpt={episode.excerpt}
              image={episode.image}
              href={`/blog/${episode.slug}`}
              isSmall={false}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Podcast;
