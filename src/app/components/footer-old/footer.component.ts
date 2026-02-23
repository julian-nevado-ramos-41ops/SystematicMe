import { Component, ChangeDetectionStrategy, computed } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <footer class="footer">
      <div class="footer-content">
        <p class="copyright">
          &copy; {{ currentYear() }} SciTheWorld. All rights reserved.
        </p>
        <div class="links">
            <!-- Add links here if needed later -->
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
      gap: 1rem;
    }

    .copyright {
      margin: 0;
      letter-spacing: 0.02em;
    }

    @media (max-width: 600px) {
      .footer-content {
        justify-content: center;
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {
    currentYear = computed(() => new Date().getFullYear());
}
