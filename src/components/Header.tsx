import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Menu,
  X,
} from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import { getActiveSocialLinks, type SocialPlatform } from '@/lib/site';

const SOCIAL_ICONS: Record<SocialPlatform, ComponentType<SVGProps<SVGSVGElement>>> = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

const navItems = [
  { name: 'ALL POSTS', href: '/posts' },
  { name: 'BUSINESS', href: '/business' },
  { name: 'TECHNOLOGY', href: '/technology' },
  { name: 'PODCAST', href: '/podcast' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const socials = getActiveSocialLinks();

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container-blog">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Nexus — Home"
            >
              <span className="text-2xl font-bold text-foreground">nexus</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center space-x-8"
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <Link key={item.name} to={item.href} className="nav-link">
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Social Links & Search */}
          <div className="hidden lg:flex items-center space-x-4">
            {socials.map(({ platform, url, label }) => {
              const Icon = SOCIAL_ICONS[platform];
              return (
                <Button key={platform} variant="outline" size="sm" asChild>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Nexus on ${label}`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              );
            })}

            <Button
              variant="outline"
              size="sm"
              aria-label="Search articles"
              onClick={() => navigate('/search')}
            >
              <Search className="h-4 w-4" aria-hidden="true" />
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div id="mobile-navigation" className="lg:hidden border-t border-border py-4">
            <nav
              className="flex flex-col space-y-4"
              role="navigation"
              aria-label="Mobile navigation"
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-6 space-y-4">
              <div className="flex space-x-2 items-center flex-wrap gap-y-2">
                {socials.map(({ platform, url, label }) => {
                  const Icon = SOCIAL_ICONS[platform];
                  return (
                    <Button key={platform} variant="outline" size="sm" asChild>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Nexus on ${label}`}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </Button>
                  );
                })}

                <ThemeToggle />
              </div>

              <Button
                variant="outline"
                size="sm"
                aria-label="Search articles"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate('/search');
                }}
              >
                <Search className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
