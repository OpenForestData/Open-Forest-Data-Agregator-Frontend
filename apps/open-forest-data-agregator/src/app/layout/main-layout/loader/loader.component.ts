import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@app/services/loader.service';

@Component({
  selector: 'ofd-agregator-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  constructor(public loaderService: LoaderService) {}

  ngOnInit() {}
}
