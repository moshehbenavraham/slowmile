import { useSearchParams, Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import SEO from '@/components/SEO';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { searchPosts } from '@/data/posts';

/**
 * Search results page. Queries the single posts.ts catalog via
 * searchPosts() so every hit links to either a real detail page or a
 * "Coming soon" preview stub — and the result count matches the
 * archive the visitor actually sees on the category pages.
 */
const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') ?? '');

  const currentQuery = searchParams.get('q') ?? '';

  const filteredPosts = useMemo(() => searchPosts(currentQuery), [currentQuery]);

  // Sync the input when the URL query param changes (e.g. browser back/forward).
  useEffect(() => {
    setSearchQuery(currentQuery);
  }, [currentQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      setSearchParams({ q: trimmed });
    } else {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  const browseCategories = [
    { label: 'All Posts', to: '/posts' },
    { label: 'Business', to: '/business' },
    { label: 'Technology', to: '/technology' },
    { label: 'Podcast', to: '/podcast' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={currentQuery ? `Search: ${currentQuery}` : 'Search'}
        description="Search the Nexus archive for articles, podcasts, and reporting across fashion, technology, business, and lifestyle."
        noindex
      />
      <Header />

      <main id="main-content" className="container-blog py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            Search Results
          </h1>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-8" noValidate>
            <div className="relative max-w-md">
              <label htmlFor="search-input" className="sr-only">
                Search articles
              </label>
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="search-input"
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-12 py-3"
                aria-label="Search articles"
                autoComplete="off"
              />
              {searchQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </Button>
              )}
            </div>
          </form>

          {/* Search Results */}
          {currentQuery ? (
            <div>
              <div className="mb-6" role="status" aria-live="polite">
                <p className="text-lg text-muted-foreground">
                  {filteredPosts.length > 0
                    ? `Found ${filteredPosts.length} result${filteredPosts.length === 1 ? '' : 's'} for "${currentQuery}"`
                    : `No results found for "${currentQuery}"`}
                </p>
              </div>

              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => (
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
              ) : (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    No articles found
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search terms or browse our categories:
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {browseCategories.map(({ label, to }) => (
                      <Button key={to} variant="outline" asChild>
                        <Link to={to}>{label}</Link>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                What are you looking for?
              </h2>
              <p className="text-muted-foreground mb-6">
                Enter a search term above to find articles, or browse our latest content:
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {browseCategories.map(({ label, to }) => (
                  <Button key={to} variant="outline" asChild>
                    <Link to={to}>{label}</Link>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;
