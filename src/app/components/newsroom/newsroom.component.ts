import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';

export interface NewsItem {
  date: string;
  company: string;
  title: string;
  summary: string;
  howAiSeesUs?: string;   // URL shown as "See More" link in the table
  isMain?: boolean;
  isFeatured?: boolean;
}

@Component({
  selector: 'app-newsroom',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'newsroom-host' },
  template: `
    <!-- ══ Main section title ══ -->
    <h1 class="newsroom-title">{{ title() }}</h1>

    <!-- ══ CONTAINER 1: Featured area ══ -->
    <div class="featured-area">

      <!-- Left column: logo banner + main news -->
      <div class="col-left">
        <div class="logo-banner">
          <img [src]="logoSrc()" alt="Logo" class="logo-img" />
        </div>

        @if (mainNews()) {
          <div class="main-news">
            <h2 class="main-news-title">
              @if (mainNews()!.howAiSeesUs) {
                <a [href]="mainNews()!.howAiSeesUs" target="_blank" rel="noopener noreferrer" class="title-link">{{ mainNews()!.title }}</a>
              } @else {
                {{ mainNews()!.title }}
              }
            </h2>
            <div class="main-news-meta">
              <div class="meta-top">
                <span class="news-label">{{ mainNews()!.company }}</span>
                <span class="news-date">{{ mainNews()!.date }}</span>
              </div>
              <p class="news-summary-text">{{ mainNews()!.summary }}</p>
            </div>
          </div>
        }
      </div>

      <!-- Right column: up to 4 featured sub-news -->
      <div class="col-right">
        @for (item of featuredNews(); track $index) {
          <div class="featured-card">
            <div class="featured-card-meta">
              <span class="news-label">{{ item.company }}</span>
              <span class="news-date">{{ item.date }}</span>
            </div>
            <h3 class="featured-card-title">
              @if (item.howAiSeesUs) {
                <a [href]="item.howAiSeesUs" target="_blank" rel="noopener noreferrer" class="title-link">{{ item.title }}</a>
              } @else {
                {{ item.title }}
              }
            </h3>
            <p class="featured-card-summary">{{ item.summary }}</p>
          </div>
        }
      </div>

    </div>

    <!-- Thin separator -->
    <hr class="section-divider" />

    <!-- ══ CONTAINER 2: News table ══ -->
    <div class="table-area">


      <div class="news-table-wrapper">
        <table class="news-table">
          <thead>
            <tr class="table-header-row">
              <th class="th">{{ tableHeaders().date }}</th>
              <th class="th">{{ tableHeaders().company }}</th>
              <th class="th th-title">{{ tableHeaders().title }}</th>
              <th class="th">{{ tableHeaders().summary }}</th>
              <th class="th">{{ tableHeaders().howAiSeesUs }}</th>
            </tr>
          </thead>
          <tbody>
            @for (item of news(); track $index) {
              <tr class="table-row">
                <td class="td td-date">{{ item.date }}</td>
                <td class="td td-company">{{ item.company }}</td>
                <td class="td td-title">
                  @if (item.howAiSeesUs) {
                    <a [href]="item.howAiSeesUs" target="_blank" rel="noopener noreferrer" class="title-link">{{ item.title }}</a>
                  } @else {
                    {{ item.title }}
                  }
                </td>
                <td class="td td-summary">{{ item.summary }}</td>
                <td class="td td-ai">
                  @if (item.howAiSeesUs) {
                    <a [href]="item.howAiSeesUs" target="_blank" rel="noopener noreferrer" class="see-more-link">{{ seeMoreText() }}</a>
                  } @else {
                    <span>—</span>
                  }
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      padding: 4rem 5%;
      font-family: 'Inter', sans-serif;
      color: #222;
      background-color: transparent;
    }

    /* ─── Main title: Newsroom ─── */
    .newsroom-title {
      font-family: 'Inter', sans-serif;
      font-size: 4rem;
      font-weight: 400;
      color: #000;
      margin: 0 0 3rem 0;
      letter-spacing: -2px;
      line-height: 1;
    }

    /* ─── Container 1: Featured area ─── */

    .featured-area {
      display: grid;
      grid-template-columns: 3fr 2fr;
      gap: 3rem;
      align-items: start;
      max-width: 80%;
    }

    /* Left column */
    .col-left {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .logo-banner {
      background-color: #ede8de;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      aspect-ratio: 16 / 9;
      overflow: hidden;
    }

    .logo-img {
      max-width: 50%;
      max-height: 60%;
      object-fit: contain;
    }

    .main-news {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      padding: 1.75rem 0 0 0;
      align-items: start;
    }

    .main-news-title {
      font-family: 'Inter', sans-serif;
      font-size: 1.9rem;
      font-weight: 700;
      color: #111;
      margin: 0;
      line-height: 1.2;
      letter-spacing: -0.4px;
      transition: color 0.2s ease;
    }

    .main-news:hover .main-news-title {
      color: var(--color-1, #E85D04);
    }

    .main-news-meta {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    /* Right column (narrow) */
    .col-right {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .featured-card {
      padding: 1.1rem 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      transition: background 0.2s ease;
      cursor: default;
    }

    .featured-card:last-child {
      border-bottom: none;
    }

    .featured-card:hover .featured-card-title {
      color: var(--color-1, #E85D04);
    }

    .featured-card-meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.5rem;
    }

    .featured-card-title {
      font-family: 'Inter', sans-serif;
      font-size: 1.15rem;
      font-weight: 700;
      color: #111;
      margin: 0 0 0.5rem 0;
      line-height: 1.3;
      transition: color 0.2s ease;
    }

    .featured-card-summary {
      font-size: 1rem;
      color: #555;
      margin: 0;
      line-height: 1.5;
    }

    /* Shared meta styles */
    .meta-top {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .news-label {
      font-family: 'Courier New', monospace;
      font-size: 0.88rem;
      letter-spacing: 0.5px;
      color: var(--color-1, #E85D04);
      text-transform: uppercase;
      font-weight: 500;
    }

    .news-date {
      font-size: 0.9rem;
      color: #888;
    }

    .news-summary-text {
      font-size: 1.05rem;
      color: #555;
      margin: 0;
      line-height: 1.55;
    }

    /* ─── Separator ─── */
    .section-divider {
      border: none;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      margin: 3rem 0;
    }

    /* ─── Container 2: News table ─── */
    .table-area {
      width: 100%;
      max-width: 90%;
    }

    .table-title {
      font-family: 'Inter', sans-serif;
      font-size: 2rem;
      font-weight: 500;
      color: #111;
      margin: 0 0 2rem 0;
      letter-spacing: -0.5px;
    }

    .news-table-wrapper {
      width: 100%;
      overflow-x: auto;
    }

    .news-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 1rem;
      color: #555;
    }

    .table-header-row {
      border-bottom: 2px solid rgba(0, 0, 0, 0.12);
    }

    .th {
      text-align: left;
      font-family: 'Courier New', monospace;
      font-size: 0.82rem;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #888;
      font-weight: 500;
      padding: 0 4rem 0.9rem 0;
      white-space: nowrap;
    }

    .th:last-child {
      padding-right: 0;
      text-align: right;
    }

    .table-row {
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      transition: color 0.2s ease;
    }

    .table-row:hover {
      color: #111;
      border-bottom-color: rgba(0, 0, 0, 0.15);
    }

    .td {
      padding: 1rem 5rem 1rem 0;
      vertical-align: top;
      line-height: 1.5;
    }

    .td:last-child {
      padding-right: 0;
      text-align: right;
    }

    .td-date {
      white-space: nowrap;
      color: #888;
      font-variant-numeric: tabular-nums;
      font-size: 0.92rem;
      min-width: 100px;
    }

    .td-company {
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
      color: var(--color-1, #E85D04);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      min-width: 120px;
    }

    .td-title {
      font-weight: 600;
      font-size: 1rem;
      color: #111;
      min-width: 200px;
    }

    .td-summary {
      color: #666;
      font-size: 1rem;
      min-width: 240px;
    }

    .td-ai {
      min-width: 100px;
    }

    .see-more-link {
      color: var(--color-1, #E85D04);
      text-decoration: none;
      font-weight: 500;
      font-size: 0.95rem;
      transition: opacity 0.2s ease;
    }

    .title-link {
      color: inherit;
      text-decoration: none;
      transition: inherit;
    }

    .see-more-link:hover {
      opacity: 0.7;
      text-decoration: underline;
    }

    /* ─── Responsive ─── */
    @media (max-width: 1024px) {
      .featured-area {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 900px) {
      .featured-area {
        grid-template-columns: 1fr;
      }

      .main-news {
        grid-template-columns: 1fr;
      }

      .newsroom-title {
        font-size: 3.5rem;
      }
    }

    @media (max-width: 600px) {
      :host {
        padding: 2.5rem 4%;
      }

      .newsroom-title {
        font-size: 2.5rem;
      }
    }
  `
})
export class NewsroomComponent {
  news = input.required<NewsItem[]>();
  logoSrc = input<string>('img/logo_stw.png');
  title = input<string>('Communications');
  seeMoreText = input<string>('See More');
  tableHeaders = input({
    date: 'Date',
    company: 'Company',
    title: 'Title',
    summary: 'Summary',
    howAiSeesUs: 'How AI sees us'
  });

  mainNews = computed(() => this.news().find(n => n.isMain) ?? null);
  featuredNews = computed(() => this.news().filter(n => n.isFeatured).slice(0, 4));
}
