import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

type SitemapSection = {
  heading: string;
  links: { to: string; label: string; description?: string }[];
};

const sections: SitemapSection[] = [
  {
    heading: 'Editorial',
    links: [
      { to: '/', label: 'Home', description: 'Featured stories, editor’s picks, and the latest from the desk.' },
      { to: '/posts', label: 'All Posts', description: 'The full Nexus archive — every essay and reported piece.' },
      { to: '/business', label: 'Business', description: 'Strategy, leadership, and the future of work.' },
      { to: '/technology', label: 'Technology', description: 'AI, the web, security, and the tools we live with.' },
      { to: '/podcast', label: 'Podcast', description: 'Conversations with thinkers, makers, and operators.' },
      { to: '/search', label: 'Search', description: 'Search by keyword across the entire archive.' },
    ],
  },
  {
    heading: 'About & Contact',
    links: [
      { to: '/about', label: 'About', description: 'Who we are and what we publish.' },
      { to: '/contact', label: 'Contact', description: 'Reach out — partnerships, pitches, feedback.' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { to: '/privacy', label: 'Privacy Policy' },
      { to: '/terms', label: 'Terms of Service' },
    ],
  },
];

const Sitemap = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Sitemap"
        description="An overview of every page on Nexus Blog — editorial sections, podcast, contact, and legal."
      />
      <Header />

      <main id="main-content" className="container-blog py-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Sitemap</h1>
            <p className="text-lg text-muted-foreground">
              Every page on Nexus, grouped for quick navigation. Search engines should use the machine-readable{' '}
              <a
                href="/sitemap.xml"
                className="underline underline-offset-2 hover:text-foreground transition-colors"
              >
                /sitemap.xml
              </a>{' '}
              file.
            </p>
          </header>

          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold text-foreground mb-6">{section.heading}</h2>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="group block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                      >
                        <span className="text-base font-medium text-foreground group-hover:underline underline-offset-4">
                          {link.label}
                        </span>
                        {link.description && (
                          <span className="block text-sm text-muted-foreground mt-1">
                            {link.description}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sitemap;
