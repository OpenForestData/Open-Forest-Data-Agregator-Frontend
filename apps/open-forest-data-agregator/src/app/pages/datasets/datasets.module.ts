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
import { DatasetsDataPresentationComponent } from './datasets-data-presentation/datasets-data-presentation.component';
import { DatasetModule } from './dataset/dataset.module';
import { DatasetsListComponent } from './datasets-list/datasets-list.component';
import { DatasetsRangeComponent } from './filters/datasets-range/datasets-range.component';
import { DatasetsTimeRangeComponent } from './filters/datasets-time-range/datasets-time-range.component';
import { DatasetsTableComponent } from './datasets-table/datasets-table.component';
import { DatasetsGalleryComponent } from './datasets-gallery/datasets-gallery.component';
import { DatasetsMapComponent } from './datasets-map/datasets-map.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { DatasetsCategoryDescriptionComponent } from './datasets-category-description/datasets-category-description.component';
import { DatasetsActiveFiltersComponent } from './datasets-active-filters/datasets-active-filters.component';
import { DatasetsInputTagComponent } from './filters/datasets-input-tag/datasets-input-tag.component';
import { DatasetsFilterComponent } from './filters/datasets-filters/datasets-filter/datasets-filter.component';

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
    DatasetsGalleryComponent,
    DatasetsMapComponent,
    DatasetsCategoryDescriptionComponent,
    DatasetsActiveFiltersComponent,
    DatasetsInputTagComponent
  ],
  imports: [
    CommonModule,
    DpDatePickerModule,
    DatasetsRoutingModule,
    SharedModule,
    LeafletModule,
    LeafletDrawModule,
    DatasetModule,
    DataTablesModule
  ]
})
export class DatasetsModule {}
