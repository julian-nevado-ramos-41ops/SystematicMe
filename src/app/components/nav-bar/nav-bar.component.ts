import { Component, ChangeDetectionStrategy, input, computed, signal, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

export interface NavCommand {
    label: string;
    action?: () => void;
    link?: string;
    icon?: string;
    children?: NavCommand[];
}

export interface NavLogo {
    src?: string;
    text?: string;
    alt?: string;
    link?: string;
}

@Component({
    selector: 'app-nav-bar',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
    // Content Inputs
    logo = input<NavLogo>({ text: 'Logo' });
    menuItems = input<NavCommand[]>([]);
    cta = input<NavCommand | null>(null);
    showLangPicker = input<boolean>(true);

    // Appearance Inputs
    variant = input<'glass' | 'transparent'>('glass');
    topOffset = input<string>('20px');
    fontFamily = input<string>("'Inter', sans-serif");

    // Customization Inputs (CSS Variables)
    backgroundColor = input<string>('rgba(121, 118, 118, 0.18)'); // Default dark glass
    blurAmount = input<string>('15px');
    borderColor = input<string>('rgba(245, 243, 237, 0.13)');
    borderRadius = input<string>('10px');
    textColor = input<string>('#000000ff');
    menuPadding = input<string>('0 8rem');

    ctaColor = input<string>('#ede7df');
    ctaTextColor = input<string>('#000000');

    // Scroll Logic
    isHidden = signal(false);
    private lastScrollTop = 0;
    private accumulatedDelta = 0;
    private readonly SCROLL_THRESHOLD = 150; // Pixels to scroll to trigger change
    private readonly TOP_THRESHOLD = 50; // Always show if closer to top than this

    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        if (!isPlatformBrowser(this.platformId)) return;

        const currentScroll = window.scrollY || document.documentElement.scrollTop;

        // Don't hide if mobile menu is open
        if (this.mobileMenuOpen()) {
            this.isHidden.set(false);
            return;
        }

        // Always show when at the very top
        if (currentScroll < this.TOP_THRESHOLD) {
            this.isHidden.set(false);
            this.accumulatedDelta = 0;
            this.lastScrollTop = currentScroll;
            return;
        }

        const delta = currentScroll - this.lastScrollTop;
        this.lastScrollTop = currentScroll;

        // Update accumulated delta based on direction consistency
        if (delta > 0) { // Scrolling DOWN
            // If we were scrolling up, reset
            if (this.accumulatedDelta < 0) {
                this.accumulatedDelta = 0;
            }
            this.accumulatedDelta += delta;

            // If we've scrolled down enough, hide
            if (this.accumulatedDelta > this.SCROLL_THRESHOLD) {
                if (!this.isHidden()) this.isHidden.set(true);
            }
        } else { // Scrolling UP
            // If we were scrolling down, reset
            if (this.accumulatedDelta > 0) {
                this.accumulatedDelta = 0;
            }
            this.accumulatedDelta += delta;

            // If we've scrolled up enough, show (threshold is negative here)
            if (this.accumulatedDelta < -this.SCROLL_THRESHOLD) {
                if (this.isHidden()) this.isHidden.set(false);
            }
        }
    }

    // Computed classes
    containerClasses = computed(() => {
        return {
            'nav-transparent': this.variant() === 'transparent',
            'nav-hidden': this.isHidden()
        };
    });

    hasLogoSlot = false; // Placeholder for future expansion
    hasMenuSlot = false;
    hasActionsSlot = false;

    // Mobile Menu Logic
    mobileMenuOpen = signal(false);
    expandedSubmenu = signal<string | null>(null);

    toggleMobileMenu() {
        this.mobileMenuOpen.set(!this.mobileMenuOpen());
        if (!this.mobileMenuOpen()) {
            this.expandedSubmenu.set(null);
        }
    }

    closeMobileMenu() {
        this.mobileMenuOpen.set(false);
        this.expandedSubmenu.set(null);
    }

    toggleSubmenu(label: string, event: Event) {
        event.preventDefault();
        event.stopPropagation();
        this.expandedSubmenu.set(this.expandedSubmenu() === label ? null : label);
    }
}
