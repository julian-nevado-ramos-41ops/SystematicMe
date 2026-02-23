import { Component, ChangeDetectionStrategy, computed } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-left">
          <img src="img/logo-ISO.png" alt="ISO Logo" class="iso-logo">
          <span class="iso-text">Members of both groups: AI and Web3 &amp; Metaverse</span>
        </div>
        <div class="footer-right">
          <p class="copyright">
            &copy; {{ currentYear() }} SciTheWorld. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      background-color: #0d0d0d;
      color: rgba(255, 255, 255, 0.6);
      font-family: 'Inter', sans-serif;
      font-size: 0.875rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .footer {
      padding: 2rem 5%;
      max-width: 1400px;
      margin: 0 auto;
    }

    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.5rem;
    }

    .footer-left {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .iso-logo {
      height: 40px;
      width: auto;
      object-fit: contain;
    }

    .iso-text {
      font-size: 0.875rem;
      opacity: 0.8;
    }

    .copyright {
      margin: 0;
      letter-spacing: 0.02em;
    }

    @media (max-width: 768px) {
      .footer-content {
        flex-direction: column;
        justify-content: center;
        text-align: center;
      }
      
      .footer-left {
        flex-direction: column;
        gap: 0.75rem;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = computed(() => new Date().getFullYear());
}
