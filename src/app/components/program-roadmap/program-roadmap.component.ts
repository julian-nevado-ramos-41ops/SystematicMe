import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { TranslationService } from '../../i18n';
import { PhraseCarouselComponent } from '../phrase-carousel/phrase-carousel.component';

interface RoadmapItem {
  name: string;
  content: string;
  isAction?: boolean;
  indent?: boolean;
}

interface Program {
  title: string;
  items: RoadmapItem[];
}

@Component({
  selector: 'app-program-roadmap',
  standalone: true,
  imports: [PhraseCarouselComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'roadmap-container',
    'id': 'program-roadmap'
  },
  template: `
    <!-- Join Now Modal -->
    @if (showJoinForm()) {
      <div class="modal-backdrop" (click)="closeForm()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <button class="modal-close" (click)="closeForm()">✕</button>

          @if (!formSubmitted()) {
            <h3 class="modal-title">{{ ts.t().roadmap.joinModal.title }}</h3>
            <p class="modal-subtitle">{{ ts.t().roadmap.joinModal.subtitle }}</p>

            <form (submit)="onSubmit($event)">
              <div class="form-group">
                <label for="joinName">{{ ts.t().roadmap.joinModal.nameLabel }}</label>
                <input id="joinName" name="name" type="text" [placeholder]="ts.t().roadmap.joinModal.namePlaceholder" required />
              </div>
              <div class="form-group">
                <label for="joinEmail">{{ ts.t().roadmap.joinModal.emailLabel }}</label>
                <input id="joinEmail" name="email" type="email" [placeholder]="ts.t().roadmap.joinModal.emailPlaceholder" required />
              </div>
              <div class="form-group">
                <label for="joinMonth">{{ ts.t().roadmap.joinModal.monthLabel }}</label>
                <select id="joinMonth" name="month" required>
                  <option value="" disabled selected>{{ ts.t().roadmap.joinModal.monthPlaceholder }}</option>
                  @if (activeProgramIndex() === 0) {
                    <option value="september">{{ ts.t().roadmap.joinModal.monthSep }}</option>
                    <option value="february">{{ ts.t().roadmap.joinModal.monthFeb }}</option>
                  } @else {
                    <option value="october">{{ ts.t().roadmap.joinModal.monthOct }}</option>
                    <option value="march">{{ ts.t().roadmap.joinModal.monthMar }}</option>
                  }
                </select>
              </div>
              <button type="submit" class="submit-btn">{{ ts.t().roadmap.joinModal.submitBtn }}</button>
            </form>
          } @else {
            <div class="success-message">
              <span class="success-icon">✓</span>
              <h3 class="modal-title">{{ ts.t().roadmap.joinModal.successTitle }}</h3>
              <p class="modal-subtitle">{{ ts.t().roadmap.joinModal.successSubtitle }}</p>
            </div>
          }
        </div>
      </div>
    }

    <!-- Main Layout -->
    <div class="roadmap-layout">
      <div class="roadmap-tables">
        <div class="roadmap-header">
          <h2 class="title" style="margin-bottom: 3rem;">{{ ts.t().roadmap.title }}</h2>
        </div>

        @for (program of programs(); track $index; let programIndex = $index) {
          <div class="program-block">
            <h3 class="program-title">{{ program.title }}</h3>
            <ul class="roadmap-table">
              @for (item of program.items; track $index) {
                <li class="roadmap-row" 
                    [class.indent]="item.indent">
                  <span class="col-name">{{ item.name }}</span>
                  @if (item.isAction) {
                    <span class="col-content">
                      <button class="join-btn" (click)="openForm(programIndex)">{{ item.content }}</button>
                    </span>
                  } @else {
                    <span class="col-content" [innerHTML]="item.content"></span>
                  }
                </li>
              }
            </ul>
            @for (carousel of programCarousels()[programIndex]; track $index) {
              <app-phrase-carousel [phrases]="carousel" />
            }
            <div class="mobile-program-image">
              <img src="./img/tables/img_table.png" alt="Program illustration" />
            </div>
          </div>
        }
      </div>

      <div class="roadmap-image">
        <img src="./img/tables/img_table.png" alt="Program illustration" />
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      height: auto;
      margin-top: 10vh;
      padding: 4rem 5%;
      color: var(--text-muted);
      font-family: 'Inter', sans-serif;
    }

    /* ─── Two-column Layout ─── */
    .roadmap-layout {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: 4rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .roadmap-tables {
      flex: 1;
      min-width: 0;
    }

    .roadmap-image {
      flex: 0 0 35%;
      max-width: 35%;
      position: sticky;
      top: 10vh;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }

    .roadmap-image img {
      width: 100%;
      height: auto;
      object-fit: contain;
      border-radius: 12px;
    }

    /* ─── Typography ─── */
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
      max-width: 100%;
      overflow: hidden;
    }

    .program-title {
      font-family: 'Inter', sans-serif;
      font-size: 2rem;
      font-weight: 500;
      color: var(--color-1);
      margin-bottom: 1.5rem;
      border-bottom: 2px solid #000;
      padding-bottom: 0.5rem;
    }

    /* ─── Table ─── */
    .roadmap-table {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
      max-width: 100%;
    }

    .roadmap-row {
      display: grid;
      grid-template-columns: 1fr 3fr;
      align-items: start;
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
      min-width: 0;
      overflow-wrap: break-word;
      word-break: break-word;
    }

    .col-content {
      line-height: 1.5;
      min-width: 0;
      overflow-wrap: break-word;
      word-break: break-word;
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

    /* ─── Join Now Button ─── */
    .join-btn {
      display: inline-flex;
      align-items: center;
      padding: 8px 24px;
      background: #000;
      color: #fff;
      border: none;
      border-radius: 100px;
      font-family: 'Inter', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .join-btn:hover {
      background: #333;
      transform: translateY(-1px);
    }

    /* ─── Modal ─── */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.3s ease;
    }

    .modal-content {
      background: #111;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 3rem;
      width: 90%;
      max-width: 440px;
      position: relative;
      color: #fff;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      animation: slideUp 0.3s ease;
    }

    .modal-close {
      position: absolute;
      top: 1.25rem;
      right: 1.25rem;
      background: none;
      border: none;
      color: rgba(255,255,255,0.5);
      font-size: 1.5rem;
      cursor: pointer;
      transition: color 0.2s;
      line-height: 1;
    }

    .modal-close:hover {
      color: #fff;
    }

    .modal-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 2.5rem;
      font-weight: 400;
      margin: 0 0 0.5rem 0;
      letter-spacing: 0.02em;
    }

    .modal-subtitle {
      color: rgba(255,255,255,0.6);
      font-size: 0.95rem;
      margin: 0 0 2rem 0;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: rgba(255,255,255,0.5);
      margin-bottom: 0.5rem;
    }

    .form-group input,
    .form-group select {
      width: 100%;
      padding: 0.75rem 1rem;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 10px;
      color: #fff;
      font-size: 1rem;
      font-family: 'Inter', sans-serif;
      outline: none;
      transition: border-color 0.2s;
      box-sizing: border-box;
    }

    .form-group input::placeholder {
      color: rgba(255,255,255,0.3);
    }

    .form-group input:focus,
    .form-group select:focus {
      border-color: rgba(255,255,255,0.35);
    }

    .form-group select option {
      background: #111;
      color: #fff;
    }

    .submit-btn {
      width: 100%;
      padding: 0.85rem;
      background: #fff;
      color: #000;
      border: none;
      border-radius: 10px;
      font-family: 'Inter', sans-serif;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      margin-top: 0.5rem;
    }

    .submit-btn:hover {
      background: #eee;
      transform: translateY(-1px);
    }

    .success-message {
      text-align: center;
      padding: 2rem 0;
    }

    .success-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: rgba(76, 214, 188, 0.15);
      color: #4CD6BC;
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* ─── Mobile per-table image (hidden on desktop) ─── */
    .mobile-program-image {
      display: none;
    }

    /* ─── Responsive ─── */
    @media (max-width: 1024px) {
      :host {
        padding: 2rem 1rem;
        overflow-x: hidden;
        max-width: 100vw;
      }

      *, *::before, *::after {
        box-sizing: border-box;
      }

      .roadmap-layout {
        flex-direction: column;
        gap: 0;
        max-width: 100%;
      }

      .roadmap-tables {
        width: 100%;
        max-width: 100%;
        overflow: hidden;
      }

      .roadmap-image {
        display: none;
      }

      .mobile-program-image {
        display: block;
        margin: 2rem 0;
      }

      .mobile-program-image img {
        width: 100%;
        max-height: 300px;
        object-fit: contain;
        border-radius: 12px;
      }

      .title {
        font-size: 1.8rem;
        word-break: break-word;
        overflow-wrap: break-word;
      }

      .program-title {
        font-size: 1.4rem;
        word-break: break-word;
        overflow-wrap: break-word;
      }

      .program-block {
        max-width: 100%;
        overflow: hidden;
      }

      .roadmap-table {
        max-width: 100%;
      }

      .roadmap-row {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        padding: 0.75rem 0;
        border-bottom: 1px solid rgba(0,0,0,0.08);
        font-size: 0.95rem;
      }

      .roadmap-row.indent {
        padding-left: 1rem;
        border-bottom: none;
      }

      .col-name {
        font-size: 0.8rem;
      }

      .col-content {
        font-size: 0.95rem;
      }
    }
  `
})
export class ProgramRoadmapComponent {
  readonly ts = inject(TranslationService);
  showJoinForm = signal(false);
  formSubmitted = signal(false);
  activeProgramIndex = signal(0);

  // ── Carousel data ──────────────────────────────────────────────────

  /** Lookup matrix: programCarousels()[programIndex] = [carousel1, carousel2] */
  programCarousels = computed<string[][][]>(() => {
    const c = this.ts.t().roadmap.carousels;
    return [
      [c.p1c1, c.p1c2],
      [c.p2c1, c.p2c2],
    ];
  });

  programs = computed<Program[]>(() => {
    const r = this.ts.t().roadmap;
    return [
      {
        title: r.program1.title,
        items: [
          r.program1.items.nature,
          r.program1.items.narrative,
          r.program1.items.material,
          r.program1.items.coreDimensions,
          r.program1.items.distribution,
          { ...r.program1.items.modules, indent: true },
          { ...r.program1.items.pills, indent: true },
          r.program1.items.price,
          { ...r.program1.items.availability, isAction: true }
        ]
      },
      {
        title: r.program2.title,
        items: [
          r.program2.items.nature,
          r.program2.items.narrative,
          r.program2.items.material,
          r.program2.items.coreDimensions,
          r.program2.items.distribution,
          { ...r.program2.items.modules, indent: true },
          { ...r.program2.items.pills, indent: true },
          { ...r.program2.items.customQa, indent: true },
          { ...r.program2.items.price, content: '€600' },
          { ...r.program2.items.availability, content: r.program1.items.availability.content, isAction: true }
        ]
      }
    ];
  });

  openForm(index: number = 0) {
    this.activeProgramIndex.set(index);
    this.formSubmitted.set(false);
    this.showJoinForm.set(true);
  }

  closeForm() {
    this.showJoinForm.set(false);
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    formData.append('source', window.location.hostname || 'systematicme');

    const selectedProgram = this.programs()[this.activeProgramIndex()];
    formData.append('program', selectedProgram.title);

    try {
      await fetch('https://platform.scitheworld.com/systematicme_submit_form/', {
        method: 'POST',
        body: formData,
      });
    } catch (err) {
      console.error('Error sending form:', err);
    }

    this.formSubmitted.set(true);
  }
}
