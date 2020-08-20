import { BlogTile } from './blog-tile';
import { Keyword } from './keyword';
import { PaginationOffset } from './offset';

/**
 * Blog response from API Interface
 */
export interface BlogData {
  /**
   * List of articles
   */
  articles: BlogTile[];
  /**
   * Current page
   */
  current_page: [];
  /**
   * Articles keywords
   */
  keywords: Keyword[];
  /**
   * Pagination offset
   */
  offset: PaginationOffset;
}
