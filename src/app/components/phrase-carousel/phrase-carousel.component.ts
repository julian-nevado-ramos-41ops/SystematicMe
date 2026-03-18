import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';

@Component({
  selector: 'app-phrase-carousel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'phrase-carousel' },
  template: `
    <div class="carousel-root">
      <!-- Fixed title label -->
      <span class="carousel-label">{{ title() }}</span>

      <!-- Scrolling track -->
      <div class="carousel-wrapper">
        <div class="track-container">
          <div class="track animate-scroll"
               (mouseenter)="isPaused = true"
               (mouseleave)="isPaused = false">

            <!-- Original Set -->
            @for (phrase of scrollingPhrases(); track $index) {
              <span class="phrase-text">{{ phrase }}</span>
              <span class="phrase-sep" aria-hidden="true">|</span>
            }
            <!-- Duplicate Set for seamless infinite scroll -->
            @for (phrase of scrollingPhrases(); track $index) {
              <span class="phrase-text">{{ phrase }}</span>
              <span class="phrase-sep" aria-hidden="true">|</span>
            }

          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
    }

    .carousel-root {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 1.5rem 0;
      min-height: 8rem;
      border-top: 1px solid rgba(0, 0, 0, 0.07);
    }

    /* ── Fixed label ── */
    .carousel-label {
      flex-shrink: 0;
      font-family: "PP Supply Mono Regular", "PP Supply Mono Regular Placeholder", monospace;
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--color-1, #E85D04);
      white-space: nowrap;
    }

    /* ── Scrolling area ── */
    .carousel-wrapper {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
      -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
    }

    .track-container {
      display: flex;
      overflow: hidden;
      align-items: center;
    }

    .track {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0 2rem;
      flex-shrink: 0;
    }

    @keyframes scroll {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    .animate-scroll {
      animation: scroll 110s linear infinite;
    }

    .animate-scroll:hover {
      animation-play-state: paused;
    }

    /* ── Phrase text – plain, no bubbles ── */
    .phrase-text {
      display: inline-block;
      flex-shrink: 0;
      width: 22ch;
      font-family: "PP Supply Mono Regular", "PP Supply Mono Regular Placeholder", monospace;
      font-size: 0.9rem;
      color: rgba(0, 0, 0, 0.45);
      line-height: 1.55;
      letter-spacing: 0.01em;
      white-space: normal;
      word-break: break-word;
      transition: color 0.2s ease;
      cursor: default;
    }

    .phrase-text:hover {
      color: rgba(0, 0, 0, 0.75);
    }

    .phrase-sep {
      color: rgba(0, 0, 0, 0.18);
      font-size: 1.8rem;
      flex-shrink: 0;
      align-self: center;
      user-select: none;
    }

    @media (max-width: 1024px) {
      .carousel-root {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
        padding: 1.25rem 0;
        width: 100%;
        box-sizing: border-box;
      }

      .carousel-label {
        white-space: normal;
        word-break: break-word;
      }

      .carousel-wrapper {
        mask-image: none;
        -webkit-mask-image: none;
        width: 100%;
      }

      .phrase-text {
        font-size: 1.1rem;
      }
    }
  `
})
export class PhraseCarouselComponent {
  phrases = input.required<string[]>();

  /** First element is taken as the fixed title label */
  title = computed(() => this.phrases()[0] ?? '');

  /** The rest scroll */
  scrollingPhrases = computed(() => this.phrases().slice(1));

  isPaused = false;
}
