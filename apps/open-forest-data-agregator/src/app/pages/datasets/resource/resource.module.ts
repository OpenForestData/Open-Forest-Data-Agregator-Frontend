import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceRoutingModule } from './resource-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { ResourceComponent } from './resource.component';
import { TextComponent } from './text/text.component';
import { PdfComponent } from './pdf/pdf.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { JsonComponent } from './json/json.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { TableComponent } from './table/table.component';
import { DocsComponent } from './docs/docs.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { XmlComponent } from './xml/xml.component';
import { MapComponent } from './map/map.component';
import { IframeComponent } from './iframe/iframe.component';
import { NotSupportedComponent } from './not-supported/not-supported.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    ResourceComponent,
    TextComponent,
    PdfComponent,
    JsonComponent,
    TableComponent,
    DocsComponent,
    XmlComponent,
    MapComponent,
    IframeComponent,
    NotSupportedComponent
  ],
  imports: [
    CommonModule,
    ResourceRoutingModule,
    SharedModule,
    PdfViewerModule,
    NgxJsonViewerModule,
    NgxDocViewerModule,
    DataTablesModule
  ]
})
export class ResourceModule {}
