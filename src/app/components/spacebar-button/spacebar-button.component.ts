import {
  Component,
  ChangeDetectionStrategy,
  output,
  signal,
  afterNextRender,
  OnDestroy,
  input,
  booleanAttribute,
  ElementRef,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-spacebar-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'spacebar__button',
    '[class.is-pressed]': 'isPressed()',
    '[class.is-inactive]': '!isActive()',
    '(mousedown)': 'startPress($event)',
    '(mouseup)': 'cancelPress()',
    '(mouseleave)': 'cancelPress()',
    '(touchstart)': 'startPress($event)',
    '(touchend)': 'cancelPress()',
  },
  templateUrl: `spacebar_button_template.html`,
  styleUrl: './spacebar_button_styles.css',
})
export class SpacebarButtonComponent implements OnDestroy {
  isActive = input(true, { transform: booleanAttribute });
  pressed = output<void>();

  isPressed = signal(false);
  private pressTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly ANIMATION_DURATION = 1000;

  private isHandlingPress = false;
  private elementRef = inject(ElementRef);

  private isCurrentSection(): boolean {
    let sectionEl: HTMLElement | null = this.elementRef.nativeElement;
    while (sectionEl && sectionEl.tagName !== 'APP-SECTION') {
      sectionEl = sectionEl.parentElement;
    }
    if (!sectionEl) return false;

    let containerEl: HTMLElement | null = sectionEl;
    while (containerEl && containerEl.tagName !== 'APP-SECTIONS-CONTAINER') {
      containerEl = containerEl.parentElement;
    }
    if (!containerEl) return false;

    // Ensure the container is somewhat visible in the viewport before acting on spacebar
    const rect = containerEl.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom >= 0;
    if (!isInView) return false;

    const sections = Array.from(containerEl.querySelectorAll('app-section'));
    const myIndex = sections.indexOf(sectionEl);
    const visibleIndex = sections.findIndex(s => s.classList.contains('visible'));

    return myIndex === visibleIndex;
  }

  private keydownHandler = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      // Si este botón inició la pulsación actual, seguir previniendo el scroll
      if (this.isHandlingPress && event.repeat) {
        event.preventDefault();
        return;
      }

      // Solo responder si esta sección es la activa DOM-wise
      if (!this.isCurrentSection()) return;

      event.preventDefault();
      if (!event.repeat) {
        this.isHandlingPress = true;
        this.startPress(event);
      }
    }
  };

  private keyupHandler = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      this.isHandlingPress = false;
      this.cancelPress();
    }
  };

  constructor() {
    afterNextRender(() => {
      document.addEventListener('keydown', this.keydownHandler);
      document.addEventListener('keyup', this.keyupHandler);
    });
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.keydownHandler);
    document.removeEventListener('keyup', this.keyupHandler);
    if (this.pressTimer) {
      clearTimeout(this.pressTimer);
    }
  }

  gradientTransform() {
    return this.isPressed() ? 'matrix(1, 0, 0, 1, 0, 0)' : 'matrix(1, 0, 0, 1, -140, 0)';
  }

  startPress(event: Event) {
    if (this.isPressed()) return;

    event.preventDefault();
    this.isPressed.set(true);

    this.pressTimer = setTimeout(() => {
      this.completeAction();
    }, this.ANIMATION_DURATION);
  }

  cancelPress() {
    if (this.pressTimer) {
      clearTimeout(this.pressTimer);
      this.pressTimer = null;
    }
    this.isPressed.set(false);
  }

  private completeAction() {
    if (this.pressTimer) {
      clearTimeout(this.pressTimer);
      this.pressTimer = null;
    }
    this.pressed.emit();
    this.isPressed.set(false);
  }
}
