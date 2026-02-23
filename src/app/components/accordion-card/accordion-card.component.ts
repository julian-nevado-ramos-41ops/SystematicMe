import { Component, ChangeDetectionStrategy, input, output, booleanAttribute, signal } from '@angular/core';

@Component({
  selector: 'app-accordion-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'card',
    '[class.expanded]': 'expanded()',
    '[class.collapsed]': '!expanded()',
    '[class.no-expanded]': '!anyExpanded()',
    '(click)': 'onClick()',
  },
  template: `
    <div class="vertical-title">{{ title() }}</div>
    @if (image()) {
      <div class="card-bg-image">
        <img [src]="image()" [alt]="title()" />
      </div>
    }
    <div class="card-content">
      <div class="card-text">
        <h2>{{ title() }}</h2>
        <div class="card-body">
          <ng-content />
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      cursor: pointer;
      transition: flex 0.5s cubic-bezier(0.25, 1, 0.5, 1);
      background: #0d0d0d;
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
      display: flex;
      flex-direction: column;
      min-width: 0;
      container-type: inline-size;
    }

    :host.expanded {
      flex: 8;
    }

    :host.collapsed {
      flex: 1;
      background: #111;
    }

    :host.collapsed:hover {
      background: #1a1a1a;
    }

    /* ─── Background Image (always visible) ─── */
    .card-bg-image {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 70%;
      height: 70%;
      z-index: 0;
      overflow: hidden;
      border-radius: 12px;
    }

    .card-bg-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(100%);
      transition: filter 0.5s ease;
      opacity: 0.4;
    }

    :host:hover .card-bg-image img {
      filter: grayscale(0%);
      opacity: 0.6;
    }

    :host.expanded .card-bg-image img {
      opacity: 0.25;
    }

    :host.expanded:hover .card-bg-image img {
      filter: grayscale(0%);
      opacity: 0.35;
    }

    /* ─── Content ─── */
    .card-content {
      position: relative;
      z-index: 1;
      padding: 40px clamp(20px, 8%, 60px);
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: stretch;
      gap: 2rem;
      padding-top: 5%;
      opacity: 1;
      transition: opacity 0.3s ease;
      max-width: 100%;
      box-sizing: border-box;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .card-text {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      min-width: 0;
    }

    .card-body {
      display: block;
    }

    :host.collapsed .card-content {
      display: none;
    }

    /* ─── Vertical Title (collapsed state) ─── */
    .vertical-title {
      position: absolute;
      bottom: 60px;
      left: 50%;
      transform-origin: 0 50%;
      transform: rotate(-90deg);
      white-space: nowrap;
      font-size: 1.8rem;
      font-weight: 500;
      color: #ffffff;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      text-transform: uppercase;
      max-width: 80dvh;
      overflow: hidden;
      text-overflow: ellipsis;
      z-index: 2;
      text-shadow: 0 1px 4px rgba(0,0,0,0.6);
    }

    :host.collapsed.no-expanded .vertical-title {
      opacity: 1;
      transform: none;
      left: 40px;
      bottom: 40px;
      max-width: calc(100% - 80px);
      white-space: normal;
    }

    :host.collapsed:not(.no-expanded) .vertical-title {
      opacity: 1;
    }

    /* ─── Heading ─── */
    h2 {
      font-size: clamp(1.2rem, 10cqi, 2.5rem);
      font-weight: 400;
      margin: 0 0 1.5rem 0;
      font-family: 'Bebas Neue', 'Impact', sans-serif;
      color: #ffffff;
      word-wrap: break-word;
      overflow-wrap: break-word;
      max-width: 100%;
      line-height: 1.1;
      text-transform: uppercase;
      text-shadow: 0 1px 4px rgba(0,0,0,0.5);
    }

    /* ─── Mobile ─── */
    @media (max-width: 768px) {
      :host,
      :host.collapsed,
      :host.expanded {
        flex: none;
        width: 100%;
      }

      :host.collapsed {
        height: auto;
        min-height: 60px;
      }

      :host.expanded {
        height: 400px;
      }

      .vertical-title {
        display: none;
      }

      /* Hide image on all mobile states */
      .card-bg-image {
        display: none;
      }

      /* On mobile collapsed: show only title */
      :host.collapsed .card-content {
        display: flex;
      }

      :host.collapsed .card-body {
        display: none;
      }

      .card-content {
        padding: 30px;
        flex-direction: column;
        text-align: left;
      }

      h2 {
        text-align: left;
      }
    }
  `,
})
export class AccordionCardComponent {
  title = input.required<string>();
  image = input<string>();
  expanded = input(false, { transform: booleanAttribute });
  clicked = output<void>();
  anyExpanded = signal(false);

  onClick() {
    this.clicked.emit();
  }
}
