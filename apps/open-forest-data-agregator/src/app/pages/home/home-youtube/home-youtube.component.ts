import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UtilsService } from '@app/services/utils.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/**
 * Youtube section at home
 */
@Component({
  selector: 'ofd-agregator-home-youtube',
  templateUrl: './home-youtube.component.html',
  styleUrls: ['./home-youtube.component.scss', '../home.media.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeYoutubeComponent implements OnInit {
  /**
   * Safe Resource url to youtube movie
   */
  public url: string | SafeResourceUrl = '';
  /**
   * Home Youtube constructor
   * @param {UtilsService} utilService Utils service
   * @param {DomSanitizer} sanitizer Sanitizer
   * @param {ChangeDetectorRef} changeDetectorRef Change detector reference
   */
  constructor(
    public utilService: UtilsService,
    public sanitizer: DomSanitizer,
    public changeDetectorRef: ChangeDetectorRef
  ) {}

  /**
   * Set safe url resource to youtube movie on component init
   */
  ngOnInit() {
    setTimeout(() => {
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.utilService.homePageData.youtube_link.replace('watch?v=', 'embed/')
      );
      this.changeDetectorRef.detectChanges();
    }, 500);
  }
}
