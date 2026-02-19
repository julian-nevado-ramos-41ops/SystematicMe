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
    <div class="card-content">
      <h2>{{ title() }}</h2>
      <ng-content />
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
    }

    :host.expanded {
      flex: 8;
    }

    :host.collapsed {
      flex: 1;
      background: #111;
      align-items: center;
      justify-content: center;
    }

    :host.collapsed:hover {
      background: #1a1a1a;
    }

    .card-content {
      padding: 2rem 5%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start !important;
      opacity: 1;
      transition: opacity 0.3s ease;
      max-width: 100%;
      box-sizing: border-box;
      overflow-y: auto;
      overflow-x: hidden;
    }

    :host.collapsed .card-content {
      display: none;
    }

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
    }

    :host.collapsed.no-expanded .vertical-title {
      opacity: 1;
      transform: none;
      left: 40px;
      bottom: 40px;
    }

    /* When expanded, collapsed cards should just show vertical title (default opacity 0 in base style, need to override here) */
    :host.collapsed:not(.no-expanded) .vertical-title {
      opacity: 1;
    }

    h2 {
      font-size: 3rem;
      font-weight: 400;
      margin: 3rem 0 2rem 0;
      font-family: 'Bebas Neue', 'Impact', sans-serif;
      color: #ffffff;
      line-height: 1.1;
    }

    .card-content p, 
    .card-content ul {
      font-size: 2.2rem;
      line-height: 1.5;
      color: #ffffff;
      margin-bottom: 3rem;
    }

    .card-content ul {
      list-style-type: disc;
      padding-left: 2.5rem;
    }

    .card-content li {
      margin-bottom: 3rem;
    }

    @media (max-width: 768px) {
      :host,
      :host.collapsed,
      :host.expanded {
        flex: none;
        height: 200px;
        width: 100%;
        overflow: hidden;
        border-radius: 12px;
      }

      :host.expanded {
        flex: 1; /* Fill remaining space within the accordion */
        height: auto;
        min-height: 0; /* Allow shrinking below content size */
        overflow: hidden;
        border-radius: 12px;
      }

      /* On mobile collapsed: show title horizontally with vertical breathing room */
      :host.collapsed .vertical-title {
        display: block;
        position: static;
        transform: none;
        opacity: 1;
        font-size: 1.5rem;
        font-weight: 600;
        padding: 1.5rem 2rem;
        text-align: left;
        white-space: normal;
        overflow: hidden;
        line-height: 1.2;
      }

      /* Hide content when collapsed */
      :host.collapsed .card-content {
        display: none;
      }

      :host.collapsed {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }

      /* Expanded card content scrolls inside */
      :host.expanded .card-content {
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        height: 100%;
        max-height: 100%;
        padding: 1.5rem 2rem;
      }

      .card-content {
        padding: 20px 30px;
      }
    }
  `,
})
export class AccordionCardComponent {
  title = input.required<string>();
  expanded = input(false, { transform: booleanAttribute });
  clicked = output<void>();
  anyExpanded = signal(false);

  onClick() {
    this.clicked.emit();
  }
}
