import {
    Component,
    ChangeDetectionStrategy,
    input,
    signal,
    ElementRef,
    AfterViewInit,
    OnDestroy,
    Inject,
    PLATFORM_ID,
    NgZone,
    contentChildren,
    effect,
    numberAttribute,
    booleanAttribute,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AccordionCardComponent } from '../accordion-card/accordion-card.component';
import { InteractiveMapComponent, MapMarker } from '../interactive-map/interactive-map.component';

/**
 * Data interface for scroll-mode cards (data-driven).
 */
export interface LlmLink {
    label: string;
    url: string;
}

export interface Testimonial {
    name: string;
    role: string;
    quote: string;
}

export interface AccordionImage {
    src: string;
    alt: string;
    isOverlay?: boolean;
    class?: string;
}

export interface AccordionCardData {
    title: string;
    description: string;
    icon?: string;
    backgroundColor?: string;
    /** Text to be copied to clipboard via copy button */
    prompt?: string;
    /** LLM service links to display as buttons */
    llmLinks?: LlmLink[];
    /** Map markers to display on the interactive map */
    markers?: MapMarker[];
    /** Images to display in the visual column */
    images?: AccordionImage[];
    /** Custom class for the images stack container */
    imagesStackClass?: string;
    /** Testimonials shown below the LLM buttons */
    testimonials?: Testimonial[];
}

/**
 * Unified Accordion Component
 *
 * Supports two modes:
 * - `click` (default): Cards are projected via ng-content using <app-accordion-card>.
 *   Clicking a card expands it. This is the original accordion-container behavior.
 * - `scroll`: Cards are generated from a data array. The container width
 *   expands as the user scrolls through the section (sticky animation).
 *
 * @example Click mode (with projected cards):
 * ```html
 * <app-accordion mode="click" [blockCount]="2">
 *   <app-accordion-card title="Card 1" [expanded]="exp === 0" (clicked)="exp = 0">
 *     <p>Content here</p>
 *   </app-accordion-card>
 *   <app-accordion-card title="Card 2" [expanded]="exp === 1" (clicked)="exp = 1">
 *     <p>Content here</p>
 *   </app-accordion-card>
 * </app-accordion>
 * ```
 *
 * @example Scroll mode (data-driven):
 * ```html
 * <app-accordion
 *   mode="scroll"
 *   [cards]="myCards"
 *   minWidth="60%"
 *   maxWidth="90%"
 *   sectionHeight="200vh"
 * />
 * ```
 */
@Component({
    selector: 'app-accordion',
    standalone: true,
    imports: [CommonModule, InteractiveMapComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.css'],
    host: {
        '[class.mode-click]': 'mode() === "click"',
        '[class.mode-scroll]': 'mode() === "scroll"',
        '[class.scroll-snap]': 'scrollSnap()',
        '[style.gap]': 'mode() === "click" ? gap() : null',
        '[style.width]': 'mode() === "click" ? width() : null',
        '[style.height]': 'mode() === "click" ? height() : null',
    },
})
export class AccordionComponent implements AfterViewInit, OnDestroy {

    // ─── Mode ──────────────────────────────────────────────
    /** Accordion mode: 'click' for interactive expand/collapse, 'scroll' for scroll-driven animation */
    mode = input<'click' | 'scroll'>('click');

    // ─── Click-mode Inputs ─────────────────────────────────
    /** Number of blocks/cards (click mode) */
    blockCount = input(2, { transform: numberAttribute });

    // ─── Scroll-mode Inputs ────────────────────────────────
    /** Data-driven cards for scroll mode */
    cards = input<AccordionCardData[]>([]);

    /** Optional title for the scroll section */
    sectionTitle = input<string>('');

    /** Optional subtitle for the scroll section */
    sectionSubtitle = input<string>('');

    /** Minimum width of the cards container (scroll mode) */
    minWidth = input<string>('60%');

    /** Maximum width of the cards container (scroll mode) */
    maxWidth = input<string>('90%');

    /** Height of each card (scroll mode) */
    cardHeight = input<string>('350px');

    /** Total height of the scroll section (scroll mode). Controls how long the scroll-driven animation lasts */
    sectionHeight = input<string>('200vh');

    // ─── Shared Inputs ─────────────────────────────────────
    /** Gap between cards */
    gap = input<string>('12px');

    /** Border radius of cards */
    borderRadius = input<string>('20px');

    /** Text color */
    textColor = input<string>('#ffffff');

    /** Font family */
    fontFamily = input<string>("'Helvetica Neue', 'Arial', sans-serif");

    /** Width of the container (click mode) */
    width = input<string>('85%');

    /** Height of the container (click mode) */
    height = input<string>('70vh');

    /** Enable scroll snap alignment on the host element */
    scrollSnap = input(false, { transform: booleanAttribute });

    // ─── Internal State ────────────────────────────────────
    /** Scroll progress for scroll mode: 0 = collapsed (minWidth), 1 = expanded (maxWidth) */
    expansionProgress = signal(0);

    /** Whether any projected card is expanded (click mode) */
    anyExpanded = signal(false);

    /** Index of the currently expanded scroll-mode card (-1 = none) */
    expandedScrollCard = signal(-1);

    /** Whether the prompt was recently copied (for UI feedback) */
    copied = signal(false);

    // ─── Content Children (click mode) ─────────────────────
    projectedCards = contentChildren(AccordionCardComponent);

    /** Toggle a scroll-mode card's expanded state */
    toggleScrollCard(index: number): void {
        if (this.expandedScrollCard() === index) {
            this.expandedScrollCard.set(-1);
        } else {
            this.expandedScrollCard.set(index);
        }
    }

    /** Copy prompt text to clipboard */
    copyPrompt(text: string, event: Event): void {
        event.stopPropagation();
        navigator.clipboard.writeText(text).then(() => {
            this.copied.set(true);
            setTimeout(() => this.copied.set(false), 2000);
        });
    }

    /** Open LLM link in new tab */
    openLlmLink(url: string, event: Event): void {
        event.stopPropagation();
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    // ─── Private ───────────────────────────────────────────
    private scrollHandler: (() => void) | null = null;
    private isBrowser: boolean;

    constructor(
        private el: ElementRef,
        private ngZone: NgZone,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);

        // Click-mode: propagate anyExpanded state to projected cards
        effect(() => {
            if (this.mode() !== 'click') return;
            const cards = this.projectedCards();
            const hasExpanded = cards.some(card => card.expanded());
            this.anyExpanded.set(hasExpanded);
            cards.forEach(card => {
                card.anyExpanded.set(hasExpanded);
            });
        });
    }

    ngAfterViewInit(): void {
        if (!this.isBrowser || this.mode() !== 'scroll') return;

        this.ngZone.runOutsideAngular(() => {
            this.scrollHandler = () => this.onScroll();
            window.addEventListener('scroll', this.scrollHandler, { passive: true });
            this.onScroll();
        });
    }

    ngOnDestroy(): void {
        if (this.scrollHandler) {
            window.removeEventListener('scroll', this.scrollHandler);
        }
    }

    private onScroll(): void {
        const el = this.el.nativeElement as HTMLElement;
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const triggerStart = viewportHeight * 0.9;
        const triggerEnd = viewportHeight * 0.3;
        const elementTop = rect.top;

        let progress: number;
        if (elementTop >= triggerStart) {
            progress = 0;
        } else if (elementTop <= triggerEnd) {
            progress = 1;
        } else {
            progress = 1 - (elementTop - triggerEnd) / (triggerStart - triggerEnd);
        }

        progress = Math.max(0, Math.min(1, progress));

        if (Math.abs(this.expansionProgress() - progress) > 0.005) {
            this.ngZone.run(() => {
                this.expansionProgress.set(progress);
            });
        }
    }

    /** Computes the interpolated width as a % string (scroll mode) */
    get currentWidth(): string {
        const min = parseFloat(this.minWidth());
        const max = parseFloat(this.maxWidth());
        const width = min + (max - min) * this.expansionProgress();
        return `${width}%`;
    }
}
