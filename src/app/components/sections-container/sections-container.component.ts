import {
    Component,
    ChangeDetectionStrategy,
    ElementRef,
    output,
    afterNextRender,
    signal,
    input,
    computed,
    OnDestroy,
    numberAttribute,
} from '@angular/core';
import { SectionIndicatorComponent } from '../section-indicator/section-indicator.component';
import { SpacebarButtonComponent } from '../spacebar-button/spacebar-button.component';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
    selector: 'app-sections-container',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SectionIndicatorComponent, SpacebarButtonComponent, SideNavComponent],
    host: {
        'class': 'scroll-container',
        '[class.horizontal]': 'isHorizontal()',
        '[style.height]': 'hostHeight()',
        '[style.marginTop]': 'verticalMargin()',
        '[style.marginBottom]': 'verticalMargin()',
    },
    template: `
        <div class="viewport-wrapper">
            <div
                class="sections-track"
                [style.transform]="isHorizontal() ? trackTransform() : null"
            >
                <ng-content />
            </div>

            <div class="container-ui" [class.ui-hidden]="!isIntersecting()">
                <app-side-nav
                    [totalSections]="totalSections()"
                    [currentSection]="currentIndex()"
                    (sectionClicked)="onSideNavClick($event)"
                />
                <app-section-indicator
                    [current]="currentIndex()"
                    [total]="totalSections()"
                />
                <app-spacebar-button (pressed)="navigateNext()" />
            </div>
        </div>
    `,
    styles: [`
    /* ─── Shared base ─── */
    :host {
      display: block;
      margin: 0 2rem;
      border-radius: 24px;
      overflow-x: clip; 
      background: #000;
      position: relative;
    }

    /* ─── Wrappers ─── */
    .viewport-wrapper,
    .sections-track {
      display: contents;
    }

    /* ─── Container UI (vertical) ─── */
    .container-ui {
      position: sticky;
      bottom: 0;
      height: 100vh;
      margin-top: -100vh;
      pointer-events: none;
      z-index: 100;
      transition: opacity 0.5s ease, visibility 0.5s;
    }

    .container-ui.ui-hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }

    .container-ui app-side-nav,
    .container-ui app-section-indicator,
    .container-ui app-spacebar-button {
      pointer-events: auto;
    }

    app-side-nav {
      position: absolute;
      right: 2rem;
      top: 50%;
      transform: translateY(-50%);
    }

    app-section-indicator {
      position: absolute;
      bottom: 2rem;
      left: 2rem;
    }

    app-spacebar-button {
      position: absolute;
      bottom: 2rem;
      right: 2rem;
    }

    @media (max-width: 900px) {
      :host {
        margin: 0 1rem;
        border-radius: 16px;
      }

      app-spacebar-button,
      app-section-indicator {
        display: none;
      }
    }

    /* ─── Horizontal-specific ─── */

    :host.horizontal {
      overflow: hidden;
      background: transparent;
      scroll-snap-align: center;
      scroll-snap-stop: always;
    }

    :host.horizontal .viewport-wrapper {
      display: block;
      height: 100%;
      position: relative;
      overflow: hidden;
      border-radius: 24px;
      /* background: #000; Removed to avoid black lines */
    }

    :host.horizontal .sections-track {
      display: flex;
      height: 100%;
      will-change: transform;
      transition: transform 0.7s cubic-bezier(0.65, 0, 0.35, 1);
    }

    :host.horizontal .container-ui {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: auto;
      margin-top: 0;
    }

    /* Force sections to fill the viewport */
    :host.horizontal ::ng-deep app-section {
      min-width: 100%;
      height: 100% !important;
      flex-shrink: 0;
      scroll-snap-align: none;
    }
  `],
})
export class SectionsContainerComponent implements OnDestroy {
    /* Inputs */
    layout = input<'vertical' | 'horizontal'>('vertical');
    viewportHeightVh = input(85, { transform: numberAttribute });

    /* Outputs */
    sectionChanged = output<number>();
    navigateRequest = output<number>();
    containerVisible = output<boolean>();

    /* State */
    protected currentIndex = signal(0);
    private sections: Element[] = [];
    protected totalSections = signal(0);
    protected isIntersecting = signal(false);
    private observer: IntersectionObserver | null = null;

    /* Horizontal helpers */
    isHorizontal = computed(() => this.layout() === 'horizontal');

    trackTransform = computed(
        () => `translateX(-${this.currentIndex() * 100}%)`
    );

    /* Flat height: simply the input height (e.g. 85vh) */
    hostHeight = computed(() =>
        this.isHorizontal() ? `${this.viewportHeightVh()}vh` : null
    );

    /* Vertical centering margin: (100 - height) / 2 */
    verticalMargin = computed(() => {
        if (!this.isHorizontal()) return null;
        const vh = this.viewportHeightVh();
        const margin = (100 - vh) / 2;
        return `${margin}vh`;
    });

    /* Navigation state */
    private isTransitioning = false;
    private readonly TRANSITION_DURATION = 750;
    private readonly WHEEL_THRESHOLD = 30;
    private readonly SWIPE_THRESHOLD = 50;
    private touchStartX = 0;
    private touchStartY = 0;

    /* Handlers */
    private wheelHandler = (e: WheelEvent) => this.onWheel(e);
    private keyHandler = (e: KeyboardEvent) => this.onKey(e);
    private touchStartHandler = (e: TouchEvent) => this.onTouchStart(e);
    private touchEndHandler = (e: TouchEvent) => this.onTouchEnd(e);

    constructor(private elementRef: ElementRef<HTMLElement>) {
        afterNextRender(() => {
            if (this.isHorizontal()) {
                this.setupHorizontal();
            } else {
                this.setupSectionObserver();
            }
            this.setupContainerVisibilityObserver();
        });
    }

    /* ───────── Vertical ───────── */

    private setupSectionObserver() {
        const container = this.elementRef.nativeElement;
        this.sections = Array.from(container.querySelectorAll('app-section'));
        this.totalSections.set(this.sections.length);

        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = this.sections.indexOf(entry.target);
                        if (index !== -1 && index !== this.currentIndex()) {
                            this.currentIndex.set(index);
                            this.sectionChanged.emit(index);
                            entry.target.classList.add('visible');
                        }
                    } else {
                        entry.target.classList.remove('visible');
                    }
                });
            },
            { root: null, rootMargin: '0px', threshold: 0.5 }
        );

        this.sections.forEach((section) => this.observer!.observe(section));

        if (this.sections[0]) {
            this.sections[0].classList.add('visible');
        }
    }

    /* ───────── Horizontal ───────── */

    private setupHorizontal() {
        const container = this.elementRef.nativeElement;
        this.sections = Array.from(container.querySelectorAll('app-section'));
        this.totalSections.set(this.sections.length);

        if (this.sections[0]) {
            this.sections[0].classList.add('visible');
        }

        container.addEventListener('wheel', this.wheelHandler, { passive: false });
        container.addEventListener('touchstart', this.touchStartHandler, { passive: true });
        container.addEventListener('touchend', this.touchEndHandler, { passive: true });
        document.addEventListener('keydown', this.keyHandler);
    }

    private onWheel(e: WheelEvent) {
        if (this.isTransitioning) {
            e.preventDefault();
            return;
        }

        const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
        if (Math.abs(delta) < this.WHEEL_THRESHOLD) return;

        const idx = this.currentIndex();

        if (delta > 0) {
            if (idx < this.sections.length - 1) {
                e.preventDefault();
                this.navigateHorizontal(idx + 1);
            }
        } else {
            if (idx > 0) {
                e.preventDefault();
                this.navigateHorizontal(idx - 1);
            }
        }
    }

    private onKey(e: KeyboardEvent) {
        const rect = this.elementRef.nativeElement.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5;
        if (!inView || this.isTransitioning) return;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            this.navigateHorizontal(this.currentIndex() + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            this.navigateHorizontal(this.currentIndex() - 1);
        }
    }

    private onTouchStart(e: TouchEvent) {
        this.touchStartX = e.changedTouches[0].clientX;
        this.touchStartY = e.changedTouches[0].clientY;
    }

    private onTouchEnd(e: TouchEvent) {
        if (this.isTransitioning) return;
        const dx = this.touchStartX - e.changedTouches[0].clientX;
        const dy = this.touchStartY - e.changedTouches[0].clientY;

        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > this.SWIPE_THRESHOLD) {
            if (dx > 0) {
                this.navigateHorizontal(this.currentIndex() + 1);
            } else {
                this.navigateHorizontal(this.currentIndex() - 1);
            }
        }
    }

    private navigateHorizontal(index: number) {
        const clamped = Math.max(0, Math.min(index, this.sections.length - 1));
        if (clamped === this.currentIndex()) return;

        this.isTransitioning = true;

        this.sections[this.currentIndex()]?.classList.remove('visible');
        this.sections[clamped]?.classList.add('visible');
        this.currentIndex.set(clamped);
        this.sectionChanged.emit(clamped);
        this.navigateRequest.emit(clamped);

        setTimeout(() => {
            this.isTransitioning = false;
        }, this.TRANSITION_DURATION);
    }

    /* ───────── Shared ───────── */

    protected navigateNext() {
        if (this.isHorizontal()) {
            this.navigateHorizontal(this.currentIndex() + 1);
        } else {
            const nextIndex = Math.min(this.currentIndex() + 1, this.sections.length - 1);
            this.navigateToSection(nextIndex);
        }
    }

    protected onSideNavClick(index: number) {
        if (this.isHorizontal()) {
            this.navigateHorizontal(index);
        } else {
            this.navigateToSection(index);
        }
    }

    private setupContainerVisibilityObserver() {
        const container = this.elementRef.nativeElement;
        const visibilityObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    this.isIntersecting.set(entry.isIntersecting);
                    this.containerVisible.emit(entry.isIntersecting);
                });
            },
            { root: null, threshold: 0.15 }
        );
        visibilityObserver.observe(container);
    }

    scrollToSection(index: number) {
        if (this.isHorizontal()) {
            this.navigateHorizontal(index);
        } else {
            this.navigateToSection(index);
        }
    }

    private navigateToSection(index: number) {
        const targetIndex = Math.max(0, Math.min(index, this.sections.length - 1));
        const targetSection = this.sections[targetIndex];

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            this.navigateRequest.emit(targetIndex);
        }
    }

    ngOnDestroy() {
        if (this.observer) this.observer.disconnect();
        const container = this.elementRef.nativeElement;
        container.removeEventListener('wheel', this.wheelHandler);
        container.removeEventListener('touchstart', this.touchStartHandler);
        container.removeEventListener('touchend', this.touchEndHandler);
        document.removeEventListener('keydown', this.keyHandler);
    }
}
