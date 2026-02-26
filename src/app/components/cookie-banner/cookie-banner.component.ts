import { Component, ChangeDetectionStrategy, signal, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslationService } from '../../i18n/translation.service';

@Component({
    selector: 'app-cookie-banner',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './cookie-banner.component.html',
    styleUrls: ['./cookie-banner.component.css']
})
export class CookieBannerComponent implements OnInit {
    isVisible = signal(false);
    showCustomize = signal(false);
    analyticsCookies = signal(false);
    marketingCookies = signal(false);

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        public ts: TranslationService
    ) { }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            const consent = localStorage.getItem('stw-cookie-consent');
            if (consent) {
                try {
                    const parsed = JSON.parse(consent);
                    this.analyticsCookies.set(parsed.analytics || false);
                    this.marketingCookies.set(parsed.marketing || false);
                } catch {
                    // ignore mapping error
                }
            } else {
                setTimeout(() => {
                    this.isVisible.set(true);
                }, 1000);
            }
        }
    }

    toggleCustomize() {
        this.showCustomize.update(s => !s);
    }

    toggleAnalytics() {
        this.analyticsCookies.update(s => !s);
    }

    toggleMarketing() {
        this.marketingCookies.update(s => !s);
    }

    acceptAll() {
        this.analyticsCookies.set(true);
        this.marketingCookies.set(true);
        this.saveConsent();
    }

    rejectAll() {
        this.analyticsCookies.set(false);
        this.marketingCookies.set(false);
        this.saveConsent();
    }

    savePreferences() {
        this.saveConsent();
    }

    private saveConsent() {
        if (isPlatformBrowser(this.platformId)) {
            const consent = {
                necessary: true,
                analytics: this.analyticsCookies(),
                marketing: this.marketingCookies()
            };
            localStorage.setItem('stw-cookie-consent', JSON.stringify(consent));
            this.isVisible.set(false);
        }
    }
}
