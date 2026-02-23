import { Component, ChangeDetectionStrategy, signal, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-cookie-banner',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './cookie-banner.component.html',
    styleUrls: ['./cookie-banner.component.css']
})
export class CookieBannerComponent implements OnInit {
    isVisible = signal(false);

    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            const consent = localStorage.getItem('stw-cookie-consent');
            if (!consent) {
                // Delay slightly to not jar the user immediately
                setTimeout(() => {
                    this.isVisible.set(true);
                }, 1000);
            }
        }
    }

    acceptCookies() {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('stw-cookie-consent', 'true');
            this.isVisible.set(false);
        }
    }
}
