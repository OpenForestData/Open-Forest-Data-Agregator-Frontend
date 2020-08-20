import { Keyword } from './keyword';

/**
 * Blog tile item interface
 */
export interface BlogTile {
  /**
   * Author
   */
  author: string;
  /**
   * Added date
   */
  date: string;
  /**
   * Meta description
   */
  desc: string;
  /**
   * Content
   */
  description: string;
  /**
   * Images in blog
   */
  image_in_list: string;
  /**
   * Blog keywords
   */
  keywords: Keyword[];
  /**
   * Meta keywords
   */
  keywords_seo: string;
  /**
   * Youtube link to movie
   */
  movie_youtube_link: string;
  /**
   * OG Image link
   */
  og_image: string;
  /**
   * OG Type
   */
  og_type: string;
  /**
   * Blog slug
   */
  slug: string;
  /**
   * Blog title
   */
  title: string;
  /**
   * Blog title for SEO
   */
  title_seo: string;
  /**
   * Blog URL from API
   */
  url: string;
}
