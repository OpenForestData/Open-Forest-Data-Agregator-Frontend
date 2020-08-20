import { PaginationOffset } from './offset';
import { NewsArticle } from './news-article';

/**
 * News list interface
 */
export interface NewsList {
  /**
   * List of news
   */
  articles: NewsArticle[];
  /**
   * Current page
   */
  current_page: [];
  /**
   * Pagination offset
   */
  offset: PaginationOffset;
}
