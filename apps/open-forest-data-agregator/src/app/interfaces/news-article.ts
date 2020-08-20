/**
 * News article item interface
 */
export interface NewsArticle {
  /**
   * News author
   */
  author: string;
  /**
   * News added date
   */
  date: string;
  /**
   * News meta description
   */
  desc: string;
  /**
   * News content
   */
  description: string;
  /**
   * Images in article
   */
  image_in_list: string;
  /**
   * News meta keywords
   */
  keywords_seo: string;
  /**
   * News OG Image
   */
  og_image: string;
  /**
   * News OG Type
   */
  og_type: string;
  /**
   * New slug
   */
  slug: string;
  /**
   * News title
   */
  title: string;
  /**
   * News title for SEO
   */
  title_seo: string;
  /**
   * News URL in API
   */
  url: string;
}
