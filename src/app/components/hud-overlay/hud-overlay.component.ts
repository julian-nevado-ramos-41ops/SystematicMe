import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener,
  signal,
  computed,
  inject,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-hud-overlay',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'hud-overlay',
  },
  template: `
    <!-- X Coordinate (Bottom Center) -->
    <div class="coord coord-x">
      {{ padNum(mouseX()) }} X {{ padNum(winWidth()) }} W
    </div>

    <!-- Y Coordinate (Right Side, Rotated) -->
    <div class="coord coord-y">
      {{ padNum(mouseY()) }} Y {{ padNum(winHeight()) }} H
    </div>
  `,
  styles: [`
    :host {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9999;
      font-family: 'IBM Plex Mono', monospace;
    }

    .coord {
      position: absolute;
      color: #000000;
      font-size: 18px;
      letter-spacing: 0.2em;
      font-weight: 400;
      white-space: nowrap;
    }

    .coord-x {
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
    }

    .coord-y {
      right: 10px;
      top: 40%;
      writing-mode: vertical-rl;
    }

    @media (max-width: 900px) {
      :host {
        display: none;
      }
    }
  `],
})
export class HudOverlayComponent implements AfterViewInit {
  private cdr = inject(ChangeDetectorRef);

  mouseX = signal(0);
  mouseY = signal(0);
  winWidth = signal(typeof window !== 'undefined' ? window.innerWidth : 1920);
  winHeight = signal(typeof window !== 'undefined' ? window.innerHeight : 1080);

  xPercent = computed(() =>
    this.winWidth() > 0 ? (this.mouseX() / this.winWidth()) * 100 : 0
  );
  yPercent = computed(() =>
    this.winHeight() > 0 ? (this.mouseY() / this.winHeight()) * 100 : 0
  );

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX.set(event.clientX);
    this.mouseY.set(event.clientY);
  }

  @HostListener('window:resize')
  onResize() {
    this.winWidth.set(window.innerWidth);
    this.winHeight.set(window.innerHeight);
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  padNum(n: number): string {
    return String(n).padStart(4, '0');
  }
}
