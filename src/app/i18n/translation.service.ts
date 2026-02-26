import { Injectable, signal, computed, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Translations } from './translations.type';
import { EN } from './en';
import { ES } from './es';

const DICTIONARIES = {
    en: EN,
    es: ES
};

export type Language = 'en' | 'es';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    readonly currentLang = signal<Language>('en');

    readonly t = computed<Translations>(() => DICTIONARIES[this.currentLang()]);

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            const savedLang = localStorage.getItem('la-lang') as Language;
            if (savedLang === 'en' || savedLang === 'es') {
                this.currentLang.set(savedLang);
            } else {
                // Determine default language from browser or default to EN
                const browserLang = navigator.language.substring(0, 2);
                const defaultLang = browserLang === 'es' ? 'es' : 'en';
                this.currentLang.set(defaultLang);
                localStorage.setItem('la-lang', defaultLang);
            }
        }
    }

    setLanguage(lang: Language) {
        this.currentLang.set(lang);
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('la-lang', lang);
        }
    }

    toggleLanguage() {
        this.setLanguage(this.currentLang() === 'en' ? 'es' : 'en');
    }
}
