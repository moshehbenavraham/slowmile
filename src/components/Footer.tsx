import { Link } from 'react-router-dom';
import { getActiveSocialLinks } from '@/lib/site';

const Footer = () => {
  const socials = getActiveSocialLinks();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t border-border" role="contentinfo">
      <div className="container-blog py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">nexus</h2>
            <p className="text-sm text-muted-foreground">
              An editorial blog exploring fashion, technology, business, and mindful everyday living.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/posts"
                  className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  Fashion
                </Link>
              </li>
              <li>
                <Link
                  to="/technology"
                  className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  to="/business"
                  className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  Business
                </Link>
              </li>
              <li>
                <Link
                  to="/podcast"
                  className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  Podcast
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/sitemap"
                  className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  Sitemap
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {socials.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Connect</h3>
              <div className="flex flex-wrap gap-4">
                {socials.map(({ platform, url, label }) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                    aria-label={`Nexus on ${label}`}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Nexus Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
