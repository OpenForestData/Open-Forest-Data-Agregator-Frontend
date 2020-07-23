import { BlogTile } from './blog-tile';
import { Keyword } from './keyword';
import { PaginationOffset } from './offset';

export interface BlogData {
  articles: BlogTile[];
  current_page: [];
  keywords: Keyword[];
  offset: PaginationOffset;
}
