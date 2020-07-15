import { Keyword } from './keyword';

export interface BlogTile {
  author: string;
  date: string;
  desc: string;
  description: string;
  image_in_list: string;
  keywords: Keyword[];
  keywords_seo: string;
  movie_youtube_link: string;
  og_image: string;
  og_type: string;
  slug: string;
  title: string;
  title_seo: string;
  url: string;
}
