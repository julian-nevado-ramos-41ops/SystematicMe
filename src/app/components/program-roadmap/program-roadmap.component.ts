import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

interface RoadmapItem {
  name: string;
  content: string;
  isAction?: boolean;
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
    <!-- Join Now Modal -->
    @if (showJoinForm()) {
      <div class="modal-backdrop" (click)="closeForm()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <button class="modal-close" (click)="closeForm()">✕</button>

          @if (!formSubmitted()) {
            <h3 class="modal-title">Join Now</h3>
            <p class="modal-subtitle">Start your journey with SystematicMe</p>

            <form (submit)="onSubmit($event)">
              <div class="form-group">
                <label for="joinName">Name</label>
                <input id="joinName" type="text" placeholder="Your full name" required />
              </div>
              <div class="form-group">
                <label for="joinEmail">Email</label>
                <input id="joinEmail" type="email" placeholder="your@email.com" required />
              </div>
              <div class="form-group">
                <label for="joinMonth">Preferred start month</label>
                <select id="joinMonth" required>
                  <option value="" disabled selected>Select a month</option>
                  <option value="september">September</option>
                  <option value="february">February</option>
                </select>
              </div>
              <button type="submit" class="submit-btn">Submit</button>
            </form>
          } @else {
            <div class="success-message">
              <span class="success-icon">✓</span>
              <h3 class="modal-title">Thank you!</h3>
              <p class="modal-subtitle">We'll be in touch shortly.</p>
            </div>
          }
        </div>
      </div>
    }

    <!-- Main Layout -->
    <div class="roadmap-layout">
      <div class="roadmap-tables">
        <div class="roadmap-header">
          <h2 class="title" style="margin-bottom: 3rem;">Programms roadmap</h2>
        </div>

        @for (program of programs(); track $index) {
          <div class="program-block">
            <h3 class="program-title">{{ program.title }}</h3>
            <ul class="roadmap-table">
              @for (item of program.items; track $index) {
                <li class="roadmap-row" 
                    [class.indent]="item.name === 'Modules' || item.name === 'Pills' || item.name === 'Custom Q&A per cohort'">
                  <span class="col-name">{{ item.name }}</span>
                  @if (item.isAction) {
                    <span class="col-content">
                      <button class="join-btn" (click)="openForm()">Join Now</button>
                    </span>
                  } @else {
                    <span class="col-content" [innerHTML]="item.content"></span>
                  }
                </li>
              }
            </ul>
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

    /* ─── Table ─── */
    .roadmap-table {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
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
        padding: 4rem 5%;
      }

      .roadmap-layout {
        flex-direction: column;
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
  showJoinForm = signal(false);
  formSubmitted = signal(false);

  programs = signal<Program[]>([
    {
      title: 'Algorithmization: The New Everything.',
      items: [
        { name: 'Nature', content: 'course - deep, long.' },
        {
          name: 'Narrative', content: "our challenge building up a company that couldn't fit anywhere because it was too innovative."
        },
        { name: 'Material', content: 'all papers from <a href="https://www.algorithmization.com" target="_blank">www.algorithmization.com</a>' },
        { name: 'Core dimensions', content: 'microeconomics, AI/ML, and deeptech design.' },
        { name: 'Distribution', content: '' },
        { name: 'Modules', content: "9 - each followed by an offline video upon the pills' Q&A." },
        { name: 'Pills', content: 'from 1 to 10 per paper - each reinforced by a community Q&A.' },
        { name: 'Price', content: '€2,750.' },
        { name: 'Availability', content: '', isAction: true }
      ]
    },
    {
      title: 'F*ck-You Skills',
      items: [
        { name: 'Nature', content: 'zoom-out - light, short' },
        { name: 'Narrative', content: 'a less technical, more provocative and personal set of pills on professional risk management, as an evolution of the famous F*CK-YOU MONEY.' },
        { name: 'Material', content: 'none previous.' },
        { name: 'Core dimensions', content: 'microeconomics.' },
        { name: 'Distribution', content: '' },
        { name: 'Modules', content: "1 - followed by an offline video upon the pills' Q&A." },
        { name: 'Pills', content: '4 - each reinforced by Q&A.' },
        { name: 'Custom Q&A per cohort', content: 'per pill (report) and per module (offline video).' },
        { name: 'Price', content: 'TBA' },
        { name: 'Availability', content: 'forthcoming.' }
      ]
    }
  ]);

  openForm() {
    this.formSubmitted.set(false);
    this.showJoinForm.set(true);
  }

  closeForm() {
    this.showJoinForm.set(false);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    console.log('Join form submitted:', {
      name: (form.querySelector('#joinName') as HTMLInputElement)?.value,
      email: (form.querySelector('#joinEmail') as HTMLInputElement)?.value,
      month: (form.querySelector('#joinMonth') as HTMLSelectElement)?.value,
    });
    this.formSubmitted.set(true);
  }
}
