import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// NOTE: Update SITE_URL when the production hostname is known.
// This default is an inferred guess based on the repo slug.
export const SITE_URL = 'https://lifestyle-blog.app';
export const SITE_NAME = 'Nexus';
export const SITE_DESCRIPTION =
  'Nexus is a lifestyle editorial covering fashion, technology, business, culture, and mindful everyday living.';
export const TWITTER_HANDLE = '@nexus_blog';
export const DEFAULT_OG_IMAGE = '/social-card.svg';

export interface ArticleMeta {
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export interface SEOProps {
  /** Page title fragment. Will be combined with the site name. */
  title?: string;
  /** Meta description (1-160 chars). Defaults to site description. */
  description?: string;
  /** Override the canonical path. Defaults to the current location pathname. */
  path?: string;
  /** Absolute URL or repo-root path for the social image. */
  image?: string;
  ogType?: 'website' | 'article';
  /** When true, emits robots: noindex,nofollow. */
  noindex?: boolean;
  /** Optional JSON-LD object (or array of objects). */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Article-specific Open Graph properties. */
  article?: ArticleMeta;
}

function absolute(url: string | undefined): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`;
}

function upsertMeta(key: string, content: string, attr: 'name' | 'property' = 'name') {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function clearMeta(key: string, attr: 'name' | 'property' = 'name') {
  document.head.querySelectorAll(`meta[${attr}="${key}"]`).forEach((n) => n.remove());
}

function setJsonLd(data: SEOProps['jsonLd'], id = 'page-jsonld') {
  document.head.querySelectorAll(`script[data-seo-id="${id}"]`).forEach((n) => n.remove());
  if (!data) return;
  const script = document.createElement('script');
  script.setAttribute('type', 'application/ld+json');
  script.setAttribute('data-seo-id', id);
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

const SEO = ({
  title,
  description,
  path,
  image,
  ogType = 'website',
  noindex,
  jsonLd,
  article,
}: SEOProps) => {
  const location = useLocation();
  const pagePath = path ?? location.pathname;
  const url = absolute(pagePath) ?? SITE_URL;
  const finalTitle = title
    ? `${title} — ${SITE_NAME}`
    : `${SITE_NAME} — Lifestyle Blog for Culture, Work & Everyday Ideas`;
  const finalDesc = description ?? SITE_DESCRIPTION;
  const finalImage = absolute(image ?? DEFAULT_OG_IMAGE) ?? '';

  // Serialise complex deps so the effect re-runs on real changes only.
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : '';
  const articleKey = article ? JSON.stringify(article) : '';

  useEffect(() => {
    document.title = finalTitle;
    upsertMeta('description', finalDesc);
    upsertMeta('robots', noindex ? 'noindex,nofollow' : 'index,follow');
    upsertLink('canonical', url);

    upsertMeta('og:title', finalTitle, 'property');
    upsertMeta('og:description', finalDesc, 'property');
    upsertMeta('og:type', ogType, 'property');
    upsertMeta('og:url', url, 'property');
    upsertMeta('og:site_name', SITE_NAME, 'property');
    if (finalImage) upsertMeta('og:image', finalImage, 'property');

    upsertMeta('twitter:card', 'summary_large_image');
    upsertMeta('twitter:site', TWITTER_HANDLE);
    upsertMeta('twitter:title', finalTitle);
    upsertMeta('twitter:description', finalDesc);
    if (finalImage) upsertMeta('twitter:image', finalImage);

    // Article-specific meta — clear first so a previous page's tags don't leak.
    clearMeta('article:published_time', 'property');
    clearMeta('article:modified_time', 'property');
    clearMeta('article:author', 'property');
    clearMeta('article:section', 'property');
    document.head.querySelectorAll('meta[property="article:tag"]').forEach((n) => n.remove());

    if (article) {
      if (article.publishedTime) upsertMeta('article:published_time', article.publishedTime, 'property');
      if (article.modifiedTime) upsertMeta('article:modified_time', article.modifiedTime, 'property');
      if (article.author) upsertMeta('article:author', article.author, 'property');
      if (article.section) upsertMeta('article:section', article.section, 'property');
      if (article.tags?.length) {
        for (const tag of article.tags) {
          const el = document.createElement('meta');
          el.setAttribute('property', 'article:tag');
          el.setAttribute('content', tag);
          document.head.appendChild(el);
        }
      }
    }

    setJsonLd(jsonLd);

    return () => {
      // Avoid leaking page-specific JSON-LD or article meta into the next route.
      setJsonLd(undefined);
      clearMeta('article:published_time', 'property');
      clearMeta('article:modified_time', 'property');
      clearMeta('article:author', 'property');
      clearMeta('article:section', 'property');
      document.head.querySelectorAll('meta[property="article:tag"]').forEach((n) => n.remove());
      upsertMeta('robots', 'index,follow');
    };
  }, [finalTitle, finalDesc, url, ogType, noindex, finalImage, jsonLdKey, articleKey]);

  return null;
};

export default SEO;
