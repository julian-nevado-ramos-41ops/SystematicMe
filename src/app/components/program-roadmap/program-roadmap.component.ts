import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

interface RoadmapItem {
  name: string;
  content: string;
}

interface Program {
  title: string;
  items: RoadmapItem[];
}

@Component({
  selector: 'app-program-roadmap',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'roadmap-container',
    'id': 'program-roadmap'
  },
  template: `
    <div class="roadmap-header">
      <h2 class="title" style="margin-bottom: 3rem;">Programms roadmap</h2> <!-- Main Title -->
    </div>

    @for (program of programs(); track $index) {
        <div class="program-block">
            <h3 class="program-title">{{ program.title }}</h3>
            <ul class="roadmap-table">
            @for (item of program.items; track $index) {
                <li class="roadmap-row" 
                    [class.indent]="item.name === 'Modules' || item.name === 'Pills' || item.name === 'Custom Q&A per cohort'">
                <span class="col-name">{{ item.name }}</span>
                <span class="col-content" [innerHTML]="item.content"></span>
                </li>
            }
            </ul>
        </div>
    }
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      height: auto;
      margin-top: 10vh;
      padding: 4rem 5%;
      color: var(--text-muted);
      font-family: 'Inter', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
    }

    .roadmap-header {
      margin-bottom: 2rem;
    }

    .title {
      font-family: 'Inter', sans-serif;
      font-size: 4rem;
      font-weight: 400;
      color: #000;
      margin-bottom: 0.5rem;
      letter-spacing: -1px;
    }

    .program-block {
        margin-bottom: 4rem;
        width: 100%;
    }

    .program-title {
        font-family: 'Inter', sans-serif;
        font-size: 2rem;
        font-weight: 500;
        color: #000;
        margin-bottom: 1.5rem;
        border-bottom: 2px solid #000;
        padding-bottom: 0.5rem;
    }

    .roadmap-table {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
      max-width: none;
    }

    .roadmap-row {
      display: grid;
      grid-template-columns: 1fr 3fr; /* Name takes 1 part, content takes 3 parts */
      align-items: start; /* Align to top for long content */
      gap: 3rem; 
      padding: 0.75rem 0;
      border-bottom: 1px solid rgba(0,0,0,0.05);
      transition: color 0.3s ease;
      font-size: 1.1rem;
      color: #666;
    }

    .roadmap-row:hover {
      color: #000;
    }

    .roadmap-row.indent {
        padding-left: 2rem;
        border-bottom: none;
    }

    .roadmap-row.indent .col-name {
        font-weight: 500;
        text-transform: none;
    }

    .col-name {
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .col-content {
      line-height: 1.5;
    }

    :host ::ng-deep .col-content a {
        color: inherit !important;
        text-decoration: underline;
        text-decoration-color: rgba(0, 0, 0, 0.2);
        text-underline-offset: 4px;
        transition: text-decoration-color 0.2s ease;
    }

    :host ::ng-deep .col-content a:hover {
        text-decoration-color: rgba(0, 0, 0, 0.5);
    }

    @media (max-width: 1024px) {
      :host {
        padding: 4rem 5%;
      }
      
      .title {
        font-size: 2.5rem;
      }

      .roadmap-row {
        grid-template-columns: 1fr;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
        border-bottom: none;
      }
    }
  `
})
export class ProgramRoadmapComponent {
  programs = signal<Program[]>([
    {
      title: 'Algorithmization: The New Everything.',
      items: [
        { name: 'Nature', content: 'course - deep, long.' },
        { name: 'Narrative', content: 'our challenge building up a company that couldn’t fit anywhere because it was too innovative.' },
        { name: 'Material', content: 'all papers from <a href="https://www.algorithmization.com" target="_blank">www.algorithmization.com</a>' },
        { name: 'Core dimensions', content: 'microeconomics, AI/ML, and deeptech design.' },
        { name: 'Distribution', content: '' },
        { name: 'Modules', content: '9 - each followed by an offline video upon the pills’ Q&A.' },
        { name: 'Pills', content: 'from 1 to 10 per paper - each reinforced by a community Q&A.' },
        { name: 'Price', content: '€2,750.' },
        { name: 'Availability', content: 'join now.' }
      ]
    },
    {
      title: 'Fuck-You as a Skill',
      items: [
        { name: 'Nature', content: 'zoom-out - light, short' },
        { name: 'Narrative', content: 'a less technical, more provocative and personal set of pills on professional risk management, inspired by our attitude when managing our careers like pros.' },
        { name: 'Material', content: 'none previous.' },
        { name: 'Core dimensions', content: 'microeconomics.' },
        { name: 'Distribution', content: '' },
        { name: 'Modules', content: '1 - followed by an offline video upon the pills’ Q&A.' },
        { name: 'Pills', content: '4 - each reinforced by Q&A.' },
        { name: 'Custom Q&A per cohort', content: 'per pill (report) and per module (offline video).' },
        { name: 'Price', content: 'TBA' },
        { name: 'Availability', content: 'forthcoming.' }
      ]
    }
  ]);
}
