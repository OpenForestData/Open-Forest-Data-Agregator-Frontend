import { PaginationOffset } from './offset';
import { NewsArticle } from './news-article';

export interface NewsList {
  articles: NewsArticle[];
  current_page: [];
  offset: PaginationOffset;
}
