import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getEditorsPicks } from '@/data/posts';

const toIsoDate = (input: string): string => {
  const parsed = new Date(input);
  if (Number.isNaN(parsed.getTime())) return '';
  return parsed.toISOString().split('T')[0];
};

const EditorsPick = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const picks = getEditorsPicks(6, /* excludeFeatured */ true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (picks.length === 0) return null;

  return (
    <section className="container-blog py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 id="editors-pick-heading" className="section-title mb-0">
          Editor's Pick
        </h2>
        <div
          className="flex space-x-2"
          role="group"
          aria-label="Editor's pick navigation"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll('left')}
            className="p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Scroll to previous articles"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll('right')}
            className="p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Scroll to next articles"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        role="region"
        aria-label="Editor's pick articles carousel"
        tabIndex={0}
      >
        {picks.map((pick) => {
          const isoDate = toIsoDate(pick.date);
          const href = `/blog/${pick.slug}`;
          return (
            <article
              key={pick.slug}
              className="flex-shrink-0 w-80 bg-card rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 border border-transparent focus-within:border-border focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
            >
              <Link
                to={href}
                className="block focus:outline-none rounded-lg"
                aria-label={`Read article: ${pick.title}`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={pick.image}
                    alt={`Editor's pick: ${pick.title} — a photograph related to ${pick.category.toLowerCase()}.`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="blog-meta">{pick.category}</span>
                    <span className="text-muted-foreground" aria-hidden="true">—</span>
                    <time className="blog-meta" dateTime={isoDate || undefined}>
                      {pick.date}
                    </time>
                  </div>

                  <h3 className="text-lg font-bold text-foreground leading-tight mb-3">
                    {pick.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {pick.excerpt}
                  </p>

                  <span className="inline-flex items-center text-xs font-medium uppercase tracking-wide text-foreground">
                    Read more
                    <span className="ml-2" aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default EditorsPick;
