import { Keyword } from './keyword';

/**
 * Blog article interface
 */
export interface BlogArticle {
  /**
   * Blog author
   */
  author: string;
  /**
   * Blog content
   */
  content: string;
  /**
   * Added date
   */
  date: string;
  /**
   * Blog content
   */
  description: string;
  /**
   * Blog desc
   */
  desc: string;
  /**
   * Images in article
   */
  image_in_list?: string;
  /**
   * Article keywords
   */
  keywords: Keyword[];
  /**
   * Meta keywords
   */
  keywords_seo: string;
  /**
   * Youtube link
   */
  movie_youtube_link: string;
  /**
   * Meta OG Image
   */
  og_image: string;
  /**
   * Meta OG Type
   */
  og_type: string;
  /**
   * Slug
   */
  slug: string;
  /**
   * Article title
   */
  title: string;
  /**
   * Meta title
   */
  title_seo: string;
  /**
   * Article URL from API
   */
  url: string;
  /**
   * Previous article slug
   */
  prev?: string;
  /**
   * Next article slug
   */
  next?: string;
}
