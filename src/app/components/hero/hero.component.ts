import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'hero-section',
  },
  template: `
    <div class="hero-content" [class]="'align-' + alignment()">
      @if (subtitle()) {
        <p class="hero-subtitle" 
           [style.color]="subtitleColor()"
           [style.font-size]="subtitleSize()">
          @if (showBrackets()) {
            <span class="bracket" [style.color]="bracketsColor()">[</span>
          }
          {{ subtitle() }}
          @if (showBrackets()) {
            <span class="bracket" [style.color]="bracketsColor()">]</span>
          }
        </p>
      }
      <h1 class="hero-title" [innerHTML]="title()"></h1>
      
      @if (description()) {
        <p class="hero-description"
           [style.color]="descriptionColor()"
           [style.font-size]="descriptionSize()">
          {{ description() }}
        </p>
      }
    </div>
  `,
  styles: [`
    :host {
      height: 100vh;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f4f1ea; /* Matches site background */
      color: #1a1a1a;
      position: relative;
      overflow: hidden;
      margin-top: 5%;
    }

    .hero-content {
      z-index: 1;
      padding: 0 5%;
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 1400px;
    }

    .hero-content.align-left {
      align-items: flex-start;
      text-align: left;
    }

    .hero-content.align-center {
      align-items: center;
      text-align: center;
    }

    .hero-content.align-right {
      align-items: flex-end;
      text-align: right;
    }

    .hero-title {
      font-family: 'Bebas Neue', sans-serif; /* Gorda y condensada */
      font-size: clamp(3rem, 10vw, 8rem); /* Smaller responsive sizing */
      font-weight: 400; /* Bebas Neue is practically bold by default */
      letter-spacing: 0.02em;
      line-height: 0.9; /* Tighter vertical stacking */
      color: #1a1a1a;
      margin: 0;
      text-transform: uppercase;
      display: flex;
      flex-direction: column; /* Stack lines vertically */
      align-items: flex-start; /* Align stacking */
    }

    /* Style specifically the divs passed in title() */
    ::ng-deep .hero-title > div {
       display: block;
    }

    ::ng-deep .sacramento-regular {
      font-family: "Sacramento", cursive !important;
      font-weight: 400;
      font-style: normal;
      text-transform: none;
      font-size: 1.25em;
      line-height: 0.8;
      display: inline-block;
      margin-right: 0.1em;
    }

    ::ng-deep .indie-flower-regular {
      font-family: "Indie Flower", cursive !important;
      font-weight: 400;
      font-style: normal;
      text-transform: none;
      font-size: 1em;
      line-height: 1;
      display: inline-block;
      margin-right: 0.1em;
    }

    ::ng-deep .shadows-into-light-regular {
      font-family: "Shadows Into Light", cursive !important;
      font-weight: 400;
      font-style: normal;
      text-transform: none;
      font-size: 0.9em;
      line-height: 1;
      display: inline-block;
      margin-right: 0.1em;
    }

    .hero-subtitle {
      font-family: 'Helvetica Neue', 'Arial', sans-serif;
      font-weight: 400;
      letter-spacing: 0.05em;
      margin-bottom: 1.5rem;
      max-width: 800px;
    }

    .hero-description {
      font-family: 'Helvetica Neue', 'Arial', sans-serif;
      font-weight: 400;
      line-height: 1.6;
      margin-top: 6rem;
      max-width: 600px;
    }

    @media (max-width: 900px) {
      .hero-description {
        margin-top: 2rem;
        margin-bottom: 2rem;
      }
      
      :host {
         height: 100vh; /* Occupy full screen */
         min-height: 100vh;
         padding-bottom: 0;
         align-items: center; /* Center to use padding-top effectively */
         padding-top: 15vh; /* Push content down slightly more */
         margin-top: 0;
      }
    }
    
    .bracket {
      font-weight: 700;
      margin: 0 0.1em;
    }

    .bracket:first-child {
      margin-left: 0;
    }
  `],
})
export class HeroComponent {
  title = input.required<string>();
  subtitle = input('');
  description = input('');

  // Customization Inputs
  alignment = input<'left' | 'center' | 'right'>('left');
  subtitleSize = input<string>('1.5rem');
  subtitleColor = input<string>('gray');
  showBrackets = input<boolean>(false);
  bracketsColor = input<string>('var(--color-1)');

  descriptionSize = input<string>('1.2rem');
  descriptionColor = input<string>('#666666');
}
