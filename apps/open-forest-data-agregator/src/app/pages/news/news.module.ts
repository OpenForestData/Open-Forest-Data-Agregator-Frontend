import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { NewsComponent } from './news.component';
import { NewsRoutingModule } from './news-routing.module';
import { NewsPostComponent } from './news-post/news-post.component';
import { NewsTileComponent } from './news-tile/news-tile.component';
import { NewsTileMainComponent } from './news-tile-main/news-tile-main.component';

/**
 * News module components
 */
const components = [NewsComponent, NewsPostComponent, NewsTileComponent, NewsTileMainComponent];

/**
 * News module
 */
@NgModule({
  declarations: components,
  imports: [CommonModule, NewsRoutingModule, SharedModule]
})
export class NewsModule {}
