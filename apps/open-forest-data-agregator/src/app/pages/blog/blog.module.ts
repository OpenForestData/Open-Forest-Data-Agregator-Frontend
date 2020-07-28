import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';

import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { PostTileComponent } from './post-tile/post-tile.component';
import { BlogPostComponent } from './blog-post/blog-post.component';

/**
 * Blog module components
 */
const components = [BlogComponent, PostTileComponent, BlogPostComponent];

/**
 * Blog module
 */
@NgModule({
  declarations: components,
  imports: [CommonModule, BlogRoutingModule, SharedModule]
})
export class BlogModule {}
