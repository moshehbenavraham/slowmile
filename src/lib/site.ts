/**
 * Centralized site metadata and social profiles.
 *
 * Social links default to `null` to avoid shipping dead `href="#"`
 * anchors or links to the social brand homepages (twitter.com,
 * facebook.com, instagram.com) — those send visitors away from the
 * site instead of to a Nexus profile and pollute structured data.
 *
 * To enable a network, replace `null` with the absolute URL of the
 * Nexus profile on that platform. Components render nothing for any
 * platform whose entry is still `null`.
 */

export type SocialPlatform = 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube';

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label: string;
}

export const SOCIAL_LINKS: Record<SocialPlatform, string | null> = {
  facebook: null,
  twitter: null,
  instagram: null,
  linkedin: null,
  youtube: null,
};

const SOCIAL_LABELS: Record<SocialPlatform, string> = {
  facebook: 'Facebook',
  twitter: 'Twitter',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
};

/**
 * Returns only social platforms with a configured URL. Components map
 * over this to render their social row — empty array hides the row
 * entirely.
 */
export function getActiveSocialLinks(): SocialLink[] {
  return (Object.entries(SOCIAL_LINKS) as [SocialPlatform, string | null][])
    .filter(([, url]) => typeof url === 'string' && url.length > 0)
    .map(([platform, url]) => ({
      platform,
      url: url as string,
      label: SOCIAL_LABELS[platform],
    }));
}

export function hasAnySocialLink(): boolean {
  return getActiveSocialLinks().length > 0;
}
