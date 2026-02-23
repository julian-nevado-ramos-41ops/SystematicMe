import {
  Component,
  ChangeDetectionStrategy,
  output,
  signal,
  afterNextRender,
  OnDestroy,
  input,
  booleanAttribute,
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

  private isHandlingSpaceKey = false;

  private keydownHandler = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      if (this.isActive()) {
        event.preventDefault(); // Always prevent scrolling
        if (!event.repeat) {
          this.isHandlingSpaceKey = true;
          this.startPress(event);
        }
      } else if (this.isHandlingSpaceKey) {
        // If we started handling this spacebar press when active, continue 
        // preventing default until keyup, even if we become inactive mid-press
        event.preventDefault();
      }
    }
  };

  private keyupHandler = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      this.isHandlingSpaceKey = false;
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
