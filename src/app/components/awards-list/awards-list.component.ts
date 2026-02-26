import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { TranslationService } from '../../i18n';

interface Award {
  name: string;
  category: string;
  project: string;
  year: string;
}

@Component({
  selector: 'app-awards-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'awards-list-container'
  },
  template: `
    <div class="awards-header">
      <h2 class="title">{{ ts.t().awardsList.title1 }}<span class="asterisk">{{ ts.t().awardsList.title2 }}</span></h2>
      <p class="subtitle">{{ ts.t().awardsList.subtitle }}</p>
    </div>
    <ul class="awards-table">
      @for (award of awards(); track $index) {
        <li class="award-row">
          <span class="col-name">{{ award.name }}</span>
          <span class="col-category">{{ award.category }}</span>
          <span class="col-project">{{ award.project }}</span>
          <span class="col-year">/{{ award.year }}</span>
        </li>
      }
    </ul>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 100%;
      padding: 4rem 5%; /* Match sections left padding */
      color: var(--text-muted);
      font-family: 'Inter', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
    }

    .awards-header {
      margin-bottom: 4rem;
    }

    .title {
      font-family: 'Inter', sans-serif;
      font-size: 4rem;
      font-weight: 400;
      color: #000;
      margin-bottom: 0.5rem;
      letter-spacing: -1px;
    }

    .asterisk {
      color: var(--color-1); /* Orange/Red accent */
      vertical-align: super;
      font-size: 2.5rem;
    }

    .subtitle {
      font-family: 'Courier New', monospace;
      color: var(--color-1);
      font-size: 0.9rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-left: 0.2rem;
    }

    .awards-table {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      width: 100%; /* Take full width of container */
      max-width: none; /* Remove constraint to fill screen */
    }

    .award-row {
      display: grid;
      grid-template-columns: 2fr 1fr 2fr 100px; /* Fixed width for year to keep it tight */
      align-items: center;
      gap: 2rem; /* Increase gap between columns */
      padding: 0.5rem 0;
      border-bottom: 1px solid rgba(0,0,0,0.05);
      transition: color 0.3s ease;
      font-size: 0.95rem;
      color: #666;
    }

    .award-row:hover {
      color: #000;
    }

    .col-year {
      text-align: left; /* Align left for consistency */
      opacity: 0.8;
    }

    @media (max-width: 1024px) {
      :host {
        padding: 4rem 5%;
      }
      
      .title {
        font-size: 2.5rem;
      }

      .award-row {
        grid-template-columns: 1fr;
        gap: 0.25rem;
        margin-bottom: 1.5rem;
        border-bottom: none;
      }
      
      .col-year {
        text-align: left;
        opacity: 0.7;
      }
    }
  `
})
export class AwardsListComponent {
  readonly ts = inject(TranslationService);
  awards = computed<Award[]>(() => this.ts.t().awardsList.awards);
}
