


import { Component, ChangeDetectionStrategy, input, output, booleanAttribute } from '@angular/core';
import { SectionIndicatorComponent } from '../section-indicator/section-indicator.component';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { SpacebarButtonComponent } from '../spacebar-button/spacebar-button.component';

@Component({
  selector: 'app-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionIndicatorComponent, SideNavComponent, SpacebarButtonComponent],
  host: {
    'class': 'section',
    '[class.visible]': 'isVisible()',
    '[class.folded]': 'isFolded()',
    '[class.full-width-section]': 'isAccordionSection() || fullWidth()',
    '[style.background-color]': 'backgroundColor()',
    '[style.--content-slot-height]': 'contentSlotHeight()',
    '[id]': '"section-" + id()',
  },
  template: `
    <div class="left-indicator">
      @if (totalSections() > 0) {
        <app-section-indicator [current]="globalCurrentSection()" [total]="totalSections()" />
      }
    </div>

    <div class="section-content" [class.full-width]="isAccordionSection() || fullWidth()" [class.has-image]="image()" [class.align-start]="!image()">
      @if (!isAccordionSection()) {
        <div class="text-container">
          <h2 class="section-title">{{ title() }}</h2>
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
        <div class="text-container accordion-header">
          <h2 class="section-title">{{ title() }}</h2>
        </div>
      }
      <div class="content-slot">
        <ng-content />
      </div>
    </div>

    <div class="right-nav">
      @if (totalSections() > 0) {
        <app-side-nav [totalSections]="totalSections()" [currentSection]="globalCurrentSection()" [color]="navColor()" (sectionClicked)="navigate.emit($event)" />
        @if (sectionIndex() < totalSections() - 1) {
          <app-spacebar-button [isActive]="globalCurrentSection() === sectionIndex()" (pressed)="nextSection.emit()" />
        }
      }
    </div>
  `,
  styles: [`
    :host {
      height: 100vh; /* Fallback for older browsers */
      height: 100dvh; /* Dynamic viewport height safely avoids mobile browser toolbars */
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 2rem;
      padding-right: 2rem;
      position: relative;
      overflow: hidden;
      scroll-snap-align: start;
      scroll-snap-stop: always;
      box-sizing: border-box;
      gap: 2rem;
    }

    .left-indicator {
      position: relative;
      height: 100%;
      width: 100px;
      flex-shrink: 0;
    }

    .left-indicator app-section-indicator {
      position: absolute;
      bottom: 2rem;
      left: 0;
    }

    .right-nav {
      position: relative;
      height: 100%;
      width: 140px; /* Matched spacebar button width */
      flex-shrink: 0;
    }

    .right-nav app-side-nav {
       position: absolute;
       top: 50%;
       left: 50%;
       transform: translate(-50%, -50%);
    }

    .right-nav app-spacebar-button {
       position: absolute;
       bottom: 2rem;
       left: 50%;
       transform: translateX(-50%);
    }

    :host.full-width-section {
      padding-left: 0;
      padding-right: 0;
      justify-content: center;
    }

    :host.full-width-section .left-indicator,
    :host.full-width-section .right-nav {
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 10;
      pointer-events: none;
    }

    :host.full-width-section .left-indicator {
      left: 2rem;
    }

    :host.full-width-section .right-nav {
      right: 2rem;
    }

    :host.full-width-section .left-indicator app-section-indicator,
    :host.full-width-section .right-nav app-side-nav,
    :host.full-width-section .right-nav app-spacebar-button {
      pointer-events: auto;
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
      flex: 1; /* Takes available space */
      max-width: 1400px; 
      opacity: 1;
      transform: translateY(0);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 4rem;
    }

    .section-content.align-start {
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 2rem;
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
      align-items: center;
      overflow: hidden;
    }

    .section-content.full-width .content-slot {
      width: 80%;
      height: var(--content-slot-height, 60dvh);
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      flex: none;
    }

    .accordion-header {
      position: absolute;
      top: 12vh;
      left: 0;
      right: 0;
      width: 80%;
      max-width: 1400px;
      margin: 0 auto;
      padding-left: 5%;
      z-index: 15;
      pointer-events: none;
      box-sizing: border-box;
    }
    
    .accordion-header h2 {
      text-align: left;
    }

    .text-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-width: 300px;
      max-width: 45%; 
      flex-shrink: 0;
      position: sticky;
      top: 10vh;
    }

    .section-title {
      font-family: 'Bebas Neue', 'Impact', sans-serif;
      font-size: clamp(2rem, 8vw, 7rem);
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
      flex: 1.5;
      display: flex;
      justify-content: flex-end; 
      min-width: 50%;
      margin-right: -20%;
    }

    .section-image {
      max-width: 100%;
      max-height: 60vh; 
      height: auto;
      object-fit: contain;
    }
    
    @media (max-width: 900px) {
      :host {
        padding: 0 5%;
        justify-content: center;
        gap: 0;
      }

      .left-indicator {
        display: block;
        position: absolute;
        bottom: 1.1rem; 
        left: 1.5rem;
        width: auto;
        height: auto;
        z-index: 100;
        pointer-events: auto;
      }

      .right-nav {
        display: none;
      }
      
      .section-content {
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 2rem;
        width: 100%;
        max-width: 100%;
      }

      .section-content.full-width {
        justify-content: flex-start;
        gap: 1.5rem;
        padding-top: 6.5rem;
        padding-bottom: 3.5rem;
      }

      .text-container {
        align-items: center;
        text-align: center;
        max-width: 100%;
        min-width: 0;
        position: static;
      }

      .accordion-header {
         position: static;
         pointer-events: auto;
         margin: 0 0 3.25rem 0;
         width: 100%;
         text-align: center;
         padding: 0;
      }

      .accordion-header h2 {
        text-align: center;
      }

      .section-content.full-width .content-slot {
        width: 80%;
        max-width: 100%;
        height: min(var(--content-slot-height, 60dvh), calc(100dvh - 14rem));
        max-height: calc(100dvh - 14rem);
        min-height: 0;
        overflow: hidden;
        align-items: stretch;
      }

      .section-image-container {
        width: 100%;
        max-width: 100%;
        margin-right: 0;
        display: flex;
        justify-content: center;
        flex: none;
      }
      
      .section-image {
        max-height: 40vh;
      }

      .content-slot {
        width: 100%;
        min-width: 0;
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
  navColor = input('#000000');
  modalContent = input<string | undefined>();
  prompt = input<string | undefined>();
  llmLinks = input<{ label: string, url: string }[] | undefined>();
  isAccordionSection = input(false, { transform: booleanAttribute });
  fullWidth = input(false, { transform: booleanAttribute });
  contentSlotHeight = input('60dvh');
  isVisible = input(false);
  isFolded = input(false);

  sectionIndex = input(0);
  totalSections = input(0);
  globalCurrentSection = input(0);

  navigate = output<number>();
  nextSection = output<void>();

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
