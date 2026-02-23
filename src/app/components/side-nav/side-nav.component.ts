import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'side-nav',
    'aria-label': 'Navegación de secciones',
  },
  template: `
    <div class="nav-current-section" [style.color]="color()">{{ formattedCurrent() }}</div>

    <ul class="timeline-dots">
      @for (i of dotsArray(); track i) {
        <li>
          <a
            [href]="'#section-' + (i + 1)"
            class="timeline-dot"
            [class.active]="currentSection() === i"
            [style.background-color]="currentSection() === i ? 'transparent' : color()"
            [style.border-color]="color()"
            [attr.aria-label]="'Ir a sección ' + (i + 1)"
            (click)="onDotClick($event, i)"
          ></a>
        </li>
      }
    </ul>

    <div class="nav-total-sections" [style.color]="color()">{{ formattedTotal() }}</div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      z-index: 1000;
    }

    .nav-current-section,
    .nav-total-sections {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      font-size: 14px;
      font-weight: 700;
      line-height: 1;
    }

    .timeline-dots {
      list-style: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 10px 0;
      margin: 0;
    }

    .timeline-dot {
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      border: 2px solid transparent;
      box-sizing: content-box;
    }

    .timeline-dot.active {
      background-color: transparent;
      width: 8px;
      height: 8px;
      transform: scale(1.2);
    }

    .timeline-dot:hover {
      transform: scale(1.5);
    }
  `,
})
export class SideNavComponent {
  color = input('#000000');
  totalSections = input.required<number>();
  currentSection = input(0);
  sectionClicked = output<number>();

  dotsArray() {
    return Array.from({ length: this.totalSections() }, (_, i) => i);
  }

  formattedCurrent() {
    return (this.currentSection() + 1).toString().padStart(2, '0');
  }

  formattedTotal() {
    return this.totalSections().toString().padStart(2, '0');
  }

  onDotClick(event: Event, index: number) {
    event.preventDefault();
    this.sectionClicked.emit(index);
  }
}

