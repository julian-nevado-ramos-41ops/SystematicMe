import { Component, ChangeDetectionStrategy, input, output, booleanAttribute } from '@angular/core';

@Component({
  selector: 'app-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'section',
    '[class.visible]': 'isVisible()',
    '[class.folded]': 'isFolded()',
    '[class.full-width-section]': 'isAccordionSection() || fullWidth()',
    '[style.background-color]': 'backgroundColor()',
    '[id]': '"section-" + id()',
  },
  template: `
    <div class="section-content" [class.full-width]="isAccordionSection() || fullWidth()" [class.has-image]="image()" [class.align-start]="!image()">
      @if (!isAccordionSection()) {
        <div class="text-container">
          <h1 class="section-title">{{ title() }}</h1>
          @if (subtitle()) {
            <p class="section-subtitle">{{ subtitle() }}</p>
          }
          @if (modalContent()) {
            <button class="see-more-btn" (click)="openModal($event)">
              <span class="see-more-text">See more</span>
              <span class="see-more-arrow">→</span>
            </button>
          }
        </div>
        @if (image()) {
          <div class="section-image-container">
            <img [src]="image()" [alt]="title()" class="section-image">
          </div>
        }
      } @else {
        <h3 class="section-mini-title">{{ title() }}</h3>
      }
      <div class="content-slot">
        <ng-content />
      </div>
    </div>


  `,
  styles: [`
    :host {
      height: 100vh;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 10%;
      padding-right: 0;
      position: relative;
      overflow: hidden;
      scroll-snap-align: start;
      scroll-snap-stop: always;
      box-sizing: border-box;
    }

    :host.full-width-section {
      padding-left: 0;
      padding-right: 0;
      justify-content: center;
    }

    :host.folded {
      display: none !important;
    }

    :host::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
      opacity: 0;
      transition: opacity 1s ease;
      pointer-events: none;
    }

    :host.visible::before {
      opacity: 1;
    }

    .section-content {
      text-align: left;
      padding: 2rem 0;
      width: 100%;
      max-width: 1400px; 
      margin-right: auto;
      margin-left: 0;
      opacity: 1;
      transform: translateY(0);
      display: flex;
      flex-direction: row; /* Always row on desktop */
      align-items: center; /* Default center for image sections */
      justify-content: space-between;
      gap: 4rem;
    }

    .section-content.align-start {
      flex-direction: column; /* Stack title and content vertically */
      align-items: flex-start;
      justify-content: flex-start;
      justify-content: flex-start;
      gap: 2rem; /* Reduced margin back to avoid pushing content too far */
    }

    .section-content.align-start .text-container {
      width: 100%;
      max-width: 100%;
      min-width: 0;
      position: static; /* Remove sticky behavior */
      flex: 0 0 auto;
    }

    .section-content.align-start .content-slot {
      width: 100%;
      flex: 1;
    }

    .section-content.has-image {
      max-width: none; /* Let image sections span full width to reach right edge */
      margin-right: 0;
      padding-right: 0;
    }
    
    /* Removed .has-image specific rule as we want it consistent */

    :host.visible .section-content {
      /* Visible state - same as default now */
      opacity: 1;
      transform: translateY(0);
    }

    .section-content.full-width {
      width: 100%;
      max-width: none;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      /* Reset specific image styles if full width is used differently, 
         but currently full-width is mainly for accordion */
    }

    .text-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-width: 300px;
      max-width: 45%; 
      flex-shrink: 0; /* Prevent shrinking/shifting */
      position: sticky; /* Keep it in view if list is long */
      top: 10vh;
    }

    .section-title {
      font-family: 'Bebas Neue', 'Impact', sans-serif;
      font-size: clamp(2rem, 8vw, 7rem); /* Slightly adjusted */
      font-weight: 400;
      letter-spacing: 0.05em;
      line-height: 0.9;
      text-transform: uppercase;
      color: #ffffff;
      margin: 0;
    }

    .section-subtitle {
      font-family: 'Inter', sans-serif;
      font-size: clamp(0.875rem, 1.5vw, 1.5rem);
      font-weight: 300;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: #ffffff;
      margin-top: 1.5rem;
      opacity: 0.9;
    }

    /* ─── See More Button ─── */
    .see-more-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      margin-top: 2rem;
      padding: 10px 24px;
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 100px;
      color: #ffffff;
      font-family: 'PP Supply Mono Regular', 'Courier New', monospace;
      font-size: 0.85rem;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.3s ease;
      width: fit-content;
    }

    .see-more-btn:hover {
      background: rgba(255, 255, 255, 0.16);
      border-color: rgba(255, 255, 255, 0.35);
      transform: translateX(4px);
    }

    .see-more-btn:active {
      transform: translateX(2px);
    }

    .see-more-arrow {
      transition: transform 0.3s ease;
      font-size: 1rem;
    }

    .see-more-btn:hover .see-more-arrow {
      transform: translateX(4px);
    }



    .section-image-container {
      flex: 1.5; /* Give more space to image relative to text */
      display: flex;
      justify-content: flex-end; 
      min-width: 50%; /* Ensure it takes space */
      margin-right: -20%; /* Pull strongly to the right */
    }

    .section-image {
      max-width: 100%;
      max-height: 60vh; 
      height: auto;
      object-fit: contain;
    }

    .section-mini-title {
      font-size: 1rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 1.5rem;
      color: rgba(255, 255, 255, 0.6);
    }

    @media (max-width: 900px) {
      .section-content {
        flex-direction: column;
        align-items: flex-start;
        gap: 2rem;
      }
      
      .text-container {
        max-width: 100%;
      }
      
      .section-image-container {
        max-width: 100%;
        justify-content: center;
        width: 100%;
      }
      
      .section-image {
        max-height: 40vh;
      }

      .content-slot {
        width: 100%;
      }

      :host {
        padding-right: 10%; /* Reset padding on mobile */
      }

      .modal-container {
        padding: 2rem 1.5rem;
        width: 95%;
      }
    }
    
    .content-slot {
      flex: 1;
      min-width: 300px;
    }
  `],
})
export class SectionComponent {
  id = input.required<number>();
  title = input.required<string>();
  subtitle = input('');
  image = input<string | undefined>();
  backgroundColor = input('var(--color-1)');
  modalContent = input<string | undefined>();
  isAccordionSection = input(false, { transform: booleanAttribute });
  fullWidth = input(false, { transform: booleanAttribute });
  isVisible = input(false);
  isFolded = input(false);

  requestModal = output<{ title: string, content: string, color: string }>();

  openModal(event: Event) {
    event.stopPropagation();
    const content = this.modalContent();
    if (content) {
      this.requestModal.emit({
        title: this.title(),
        content: content,
        color: this.backgroundColor()
      });
    }
  }
}
