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

@NgModule({
  declarations: [ResourceComponent, TextComponent, PdfComponent, JsonComponent, TableComponent],
  imports: [CommonModule, ResourceRoutingModule, SharedModule, PdfViewerModule, NgxJsonViewerModule]
})
export class ResourceModule {}
