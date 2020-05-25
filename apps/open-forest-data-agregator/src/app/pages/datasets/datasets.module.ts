import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { DataTablesModule } from 'angular-datatables';

import { SharedModule } from '@app/shared/shared.module';
import { DatasetsRoutingModule } from './datasets-routing.module';
import { DatasetsComponent } from './datasets.component';
import { DatasetsHeaderComponent } from '@app/pages/datasets/datasets-header/datasets-header.component';
import { DatasetsCategoryComponent } from '@app/pages/datasets/filters/datasets-category/datasets-category.component';
import { DatasetsFiltersComponent } from './filters/datasets-filters/datasets-filters.component';
import { DatasetsFilterComponent } from './filters/datasets-filters/datasets-filter/datasets-filter.component';
import { DatasetsDataPresentationComponent } from './datasets-data-presentation/datasets-data-presentation.component';
import { DatasetModule } from './dataset/dataset.module';
import { DatasetsListComponent } from './datasets-list/datasets-list.component';
import { DatasetsRangeComponent } from './filters/datasets-range/datasets-range.component';
import { DatasetsTimeRangeComponent } from './filters/datasets-time-range/datasets-time-range.component';
import { DatasetsTableComponent } from './datasets-table/datasets-table.component';
import { DatasetsGalleryComponent } from './datasets-gallery/datasets-gallery.component';

@NgModule({
  declarations: [
    DatasetsComponent,
    DatasetsHeaderComponent,
    DatasetsCategoryComponent,
    DatasetsFiltersComponent,
    DatasetsFilterComponent,
    DatasetsDataPresentationComponent,
    DatasetsListComponent,
    DatasetsRangeComponent,
    DatasetsTimeRangeComponent,
    DatasetsTableComponent,
    DatasetsGalleryComponent
  ],
  imports: [
    CommonModule,
    DatasetsRoutingModule,
    SharedModule,
    LeafletModule,
    LeafletDrawModule,
    DatasetModule,
    DataTablesModule
  ]
})
export class DatasetsModule {}
