import { Keyword } from './keyword';

export interface BlogArticle {
  author: string;
  content: string;
  date: string;
  description: string;
  image_in_list?: string;
  keywords: Keyword[];
  keywords_seo: string;
  movie_youtube_link: string;
  og_image: string;
  og_type: string;
  slug: string;
  title: string;
  title_seo: string;
  url: string;
  prev?: string;
  next?: string;
}
