import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { TranslationService } from './i18n';
import { HeroComponent } from './components/hero/hero.component';
import { FooterComponent } from './components/footer/footer.component';
import { SectionsContainerComponent } from './components/sections-container/sections-container.component';
import { SectionComponent } from './components/section/section.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { AccordionCardComponent } from './components/accordion-card/accordion-card.component';
import { CursorFollowerComponent } from './components/cursor-follower/cursor-follower.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { HudOverlayComponent } from './components/hud-overlay/hud-overlay.component';
import { NavBarComponent, NavCommand } from './components/nav-bar/nav-bar.component';
import { PartStwComponent } from './components/part-stw/part-stw.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ProgramRoadmapComponent } from './components/program-roadmap/program-roadmap.component';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';
@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavBarComponent,
    HeroComponent,
    SectionsContainerComponent,
    SectionComponent,
    AccordionComponent,
    AccordionCardComponent,
    CursorFollowerComponent,
    PreloaderComponent,
    ContactUsComponent,
    ProgramRoadmapComponent,
    HudOverlayComponent,
    PartStwComponent,
    FooterComponent,
    CookieBannerComponent
  ],
  template: `
    <app-preloader />
    <app-cursor-follower />
    <app-hud-overlay />

    <app-nav-bar 
      [logo]="{ src: './img/logo-nav-bar.gif', alt: 'SciTheWorld', link: '/' }"
      [menuItems]="navItems()" 
      variant="glass"
      topOffset="20px"
      borderRadius="10px"
      fontFamily="'PP Supply Mono Regular', 'PP Supply Mono Regular Placeholder', monospace"
    />

    <app-hero 
      [title]="ts.t().hero.title" 
      [subtitle]="ts.t().hero.subtitle" 
      [showBrackets]="true"
      bracketsColor="var(--color-1)"
      subtitleColor="gray"
      [description]="ts.t().hero.description"
    />

    <app-part-stw
        [titleHtml]="ts.t().partStw.titleHtml"
        [description]="ts.t().partStw.description"
    />

    <app-sections-container
      #verticalContainer
      id="vertical-sections"
      layout="vertical"
      viewportHeightVh="100"
      (sectionChanged)="onVerticalSectionChange($event)"
      (containerVisible)="onContainerVisibilityChange($event, 'vertical')"
    >
        <app-section
          [id]="1"
          [sectionIndex]="0"
          [totalSections]="4"
          [globalCurrentSection]="verticalCurrentSection()"
          [title]="ts.t().verticalSections.section1.title"
          backgroundColor="#4AB5EA"
          [modalContent]="ts.t().verticalSections.section1.modalContent"
          (requestModal)="onRequestModal($event)"
          (navigate)="verticalContainer.onSideNavClick($event)"
          (nextSection)="verticalContainer.navigateNext()"
        >

        </app-section>

        <app-section
          [id]="2"
          [sectionIndex]="1"
          [totalSections]="4"
          [globalCurrentSection]="verticalCurrentSection()"
          [title]="ts.t().verticalSections.section2.title"
          backgroundColor="#FA715E"
          [isAccordionSection]="true"
          (navigate)="verticalContainer.onSideNavClick($event)"
          (nextSection)="verticalContainer.navigateNext()"
        >
          <app-accordion mode="click" [blockCount]="2" width="100%" height="100%">
             <app-accordion-card [title]="ts.t().verticalSections.section2.card1Title" image="./img/accordion/sergio_green_world.jpeg" [expanded]="expandedVerticalCard() === 0" (clicked)="setExpandedVerticalCard(0)">
                <div [innerHTML]="ts.t().verticalSections.section2.card1Content"></div>
             </app-accordion-card>
             <app-accordion-card [title]="ts.t().verticalSections.section2.card2Title" image="./img/accordion/sergio_receiving_prize.jpg" [expanded]="expandedVerticalCard() === 1" (clicked)="setExpandedVerticalCard(1)">
                <div [innerHTML]="ts.t().verticalSections.section2.card2Content"></div>
             </app-accordion-card>
          </app-accordion>
        </app-section>

        <app-section
          [id]="3"
          [sectionIndex]="2"
          [totalSections]="4"
          [globalCurrentSection]="verticalCurrentSection()"
          [title]="ts.t().verticalSections.section3.title"
          backgroundColor="#4CD6BC"
          [modalContent]="ts.t().verticalSections.section3.modalContent"
          (requestModal)="onRequestModal($event)"
          (navigate)="verticalContainer.onSideNavClick($event)"
          (nextSection)="verticalContainer.navigateNext()"
        >

        </app-section>

        <app-section
          [id]="4"
          [sectionIndex]="3"
          [totalSections]="4"
          [globalCurrentSection]="verticalCurrentSection()"
          [title]="ts.t().verticalSections.section4.title"
          backgroundColor="#EECA46"
          [modalContent]="ts.t().verticalSections.section4.modalContent"
          (requestModal)="onRequestModal($event)"
          (navigate)="verticalContainer.onSideNavClick($event)"
          (nextSection)="verticalContainer.navigateNext()"
        >

        </app-section>
    </app-sections-container>
    
    <app-program-roadmap />

    <app-sections-container
      #horizontalContainer
      id="horizontal-sections"
      layout="horizontal"
      viewportHeightVh="85"
      (sectionChanged)="onHorizontalSectionChange($event)"
      (containerVisible)="onContainerVisibilityChange($event, 'horizontal')"
    >
        <!-- Section 1 -->
        <app-section
            [id]="5"
            [sectionIndex]="0"
            [totalSections]="7"
            [globalCurrentSection]="horizontalCurrentSection()"
            [title]="ts.t().horizontalSections.section1.title"
            [modalContent]="ts.t().horizontalSections.section1.modalContent"
            backgroundColor="#4AB5EA"
            (requestModal)="onRequestModal($event)"
            (navigate)="horizontalContainer.onSideNavClick($event)"
            (nextSection)="horizontalContainer.navigateNext()"
        >
        </app-section>

        <!-- Section 2 -->
        <app-section
            [id]="6"
            [sectionIndex]="1"
            [totalSections]="7"
            [globalCurrentSection]="horizontalCurrentSection()"
            [title]="ts.t().horizontalSections.section2.title"
            [modalContent]="ts.t().horizontalSections.section2.modalContent"
            backgroundColor="#FA715E"
            (requestModal)="onRequestModal($event)"
            (navigate)="horizontalContainer.onSideNavClick($event)"
            (nextSection)="horizontalContainer.navigateNext()"
        >
        </app-section>

        <!-- Section 3 Accordion -->
        <app-section
            [id]="7"
            [sectionIndex]="2"
            [totalSections]="7"
            [globalCurrentSection]="horizontalCurrentSection()"
            [title]="ts.t().horizontalSections.section3.title"
            backgroundColor="#4CD6BC"
            [isAccordionSection]="true"
            contentSlotHeight="51dvh"
            (navigate)="horizontalContainer.onSideNavClick($event)"
            (nextSection)="horizontalContainer.navigateNext()"
        >
            <app-accordion mode="click" [blockCount]="2" width="100%" height="100%">
                <app-accordion-card [title]="ts.t().horizontalSections.section3.card1Title" [expanded]="expandedStudentsCard() === 0" (clicked)="setExpandedStudentsCard(0)">
                    <div [innerHTML]="ts.t().horizontalSections.section3.card1Content"></div>
                </app-accordion-card>
                <app-accordion-card [title]="ts.t().horizontalSections.section3.card2Title" [expanded]="expandedStudentsCard() === 1" (clicked)="setExpandedStudentsCard(1)">
                    <div [innerHTML]="ts.t().horizontalSections.section3.card2Content"></div>
                </app-accordion-card>
            </app-accordion>
        </app-section>

        <!-- Section 4 Accordion -->
        <app-section
            [id]="8"
            [sectionIndex]="3"
            [totalSections]="7"
            [globalCurrentSection]="horizontalCurrentSection()"
            [title]="ts.t().horizontalSections.section4.title"
            backgroundColor="#EECA46"
            [isAccordionSection]="true"
            contentSlotHeight="51dvh"
            (navigate)="horizontalContainer.onSideNavClick($event)"
            (nextSection)="horizontalContainer.navigateNext()"
        >
            <app-accordion mode="click" [blockCount]="2" width="100%" height="100%">
                 <app-accordion-card [title]="ts.t().horizontalSections.section4.card1Title" [expanded]="expandedTeachersCard() === 0" (clicked)="setExpandedTeachersCard(0)">
                    <div [innerHTML]="ts.t().horizontalSections.section4.card1Content"></div>
                 </app-accordion-card>
                 <app-accordion-card [title]="ts.t().horizontalSections.section4.card2Title" [expanded]="expandedTeachersCard() === 1" (clicked)="setExpandedTeachersCard(1)">
                    <div [innerHTML]="ts.t().horizontalSections.section4.card2Content"></div>
                 </app-accordion-card>
            </app-accordion>
        </app-section>

         <!-- Section 5 -->
        <app-section
            [id]="9"
            [sectionIndex]="4"
            [totalSections]="7"
            [globalCurrentSection]="horizontalCurrentSection()"
            [title]="ts.t().horizontalSections.section5.title"
            [modalContent]="ts.t().horizontalSections.section5.modalContent"
            backgroundColor="#FD5F65"
            (requestModal)="onRequestModal($event)"
            (navigate)="horizontalContainer.onSideNavClick($event)"
            (nextSection)="horizontalContainer.navigateNext()"
        >
        </app-section>

        <!-- Section 2 -->
         <app-section
            [id]="10"
            [sectionIndex]="5"
            [totalSections]="7"
            [globalCurrentSection]="horizontalCurrentSection()"
            [title]="ts.t().horizontalSections.section6.title"
            [modalContent]="ts.t().horizontalSections.section6.modalContent"
            backgroundColor="#4AB5EA"
            (requestModal)="onRequestModal($event)"
            (navigate)="horizontalContainer.onSideNavClick($event)"
            (nextSection)="horizontalContainer.navigateNext()"
        >
        </app-section>

        <!-- Section 3 -->
        <app-section
            [id]="11"
            [sectionIndex]="6"
            [totalSections]="7"
            [globalCurrentSection]="horizontalCurrentSection()"
            [title]="ts.t().horizontalSections.section7.title"
            backgroundColor="#FA715E"
            [modalContent]="inOneSentenceModal()"
            (requestModal)="onRequestModal($event)"
            (navigate)="horizontalContainer.onSideNavClick($event)"
            (nextSection)="horizontalContainer.navigateNext()"
        >
             <div class="quote-wrapper">
                 <p class="quote-text">{{ ts.t().horizontalSections.section7.contentHtml }}</p>
             </div>
        </app-section>

    </app-sections-container>


    <div id="contact" class="contact-block">
      <app-contact-us />
    </div>
    
    <app-footer />
    <app-cookie-banner />

    <!-- Modal overlay (Global) -->
    @if (activeModal()) {
      <div class="modal-backdrop" (click)="closeModal()">
        <div class="modal-container" [style.background-color]="activeModal()?.color" (click)="$event.stopPropagation()">
          <div class="modal-header" [style.background-color]="activeModal()?.color">
            <h2 class="modal-title">{{ activeModal()?.title }}</h2>
            <button class="modal-close" (click)="closeModal()">✕</button>
          </div>
          <div class="modal-body">
            <p class="modal-text" [innerHTML]="activeModal()?.content"></p>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-color: #f4f1ea;
      overflow-x: clip; /* clip instead of hidden to not break sticky */
    }

    .contact-block {
      width: 100%;
      padding: 0;
      margin: 0;
      scroll-snap-align: start;
    }

    .section-text {
        font-family: 'Inter', sans-serif;
        font-size: 1.1rem;
        line-height: 1.6;
        color: #1a1a1a; /* Dark text for light backgrounds */
    }

    .quote-wrapper {
        width: 100%;
        display: flex;
        justify-content: flex-start;
    }

    .quote-text {
        font-family: 'Inter', sans-serif;
        font-style: italic;
        font-weight: 300;
        font-size: clamp(1rem, 2vw, 1.35rem);
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.9);
        letter-spacing: 0.02em;
        margin-top: 2rem;
        margin-bottom: 0;
        max-width: 800px;
        text-align: left;
    }

    /* ─── Modal (Global Styles) ─── */
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.3s ease;
    }

    .modal-container {
      position: relative;
      width: 90%;
      max-width: 850px;
      max-height: 80vh;
      /* background-color set dynamically in template */
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      overflow-y: auto;
      animation: modalSlideIn 0.35s cubic-bezier(0.25, 1, 0.5, 1);
      display: flex;
      flex-direction: column;
    }

    .modal-header {
      position: sticky;
      top: 0;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 2rem 3.5rem 1.5rem 3.5rem;
      border-radius: 20px 20px 0 0;
    }

    .modal-close {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.6);
      font-size: 1.25rem;
      cursor: pointer;
      transition: all 0.2s ease;
      padding: 4px 8px;
      flex-shrink: 0;
    }

    .modal-close:hover {
      color: #ffffff;
      transform: scale(1.1);
    }

    .modal-title {
      font-family: 'Bebas Neue', 'Impact', sans-serif;
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 400;
      letter-spacing: 0.05em;
      line-height: 1;
      text-transform: uppercase;
      color: #ffffff;
      margin: 0;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }

    .modal-body {
      padding: 0 3.5rem 3rem 3.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .modal-text {
      font-family: 'Inter', sans-serif;
      font-size: 1.2rem;
      font-weight: 500;
      line-height: 1.8;
      color: #ffffff;
      margin: 0;
      white-space: pre-line;
      text-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    }
    
    .modal-text b, .modal-text strong {
      font-weight: 700;
      color: #ffffff;
      text-decoration: underline;
      text-decoration-color: rgba(255, 255, 255, 0.5);
      text-underline-offset: 4px;
    }

    .modal-text ul {
      list-style-type: disc;
      padding-left: 2.5rem;
      margin-top: 0.5rem;
      margin-bottom: 1.5rem;
      margin-left: 1rem;
    }

    .modal-text li {
      margin-bottom: 0.75rem;
      padding-left: 0.5rem;
    }

    .modal-text li::marker {
      color: rgba(255, 255, 255, 0.7);
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes modalSlideIn {
      from {
        opacity: 0;
        transform: translateY(20px) scale(0.97);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  `],
})
export class AppComponent {
  readonly ts = inject(TranslationService);

  activeModal = signal<{ title: string, content: string, color: string } | null>(null);

  inOneSentenceModal = computed(() => this.ts.t().horizontalSections.section7.modalContent);

  // Track current sections for internal navigation
  verticalCurrentSection = signal(0);
  horizontalCurrentSection = signal(0);

  // Expanded states for accordions
  expandedVerticalCard = signal(-1);
  expandedStudentsCard = signal(-1);
  expandedTeachersCard = signal(-1);
  private visibleContainers = new Set<string>();

  onVerticalSectionChange(index: number) {
    this.verticalCurrentSection.set(index);
  }

  onHorizontalSectionChange(index: number) {
    this.horizontalCurrentSection.set(index);
  }

  onContainerVisibilityChange(visible: boolean, id: string) {
    if (visible) {
      this.visibleContainers.add(id);
    } else {
      this.visibleContainers.delete(id);
    }
  }


  onRequestModal(data: { title: string, content: string, color: string }) {
    this.activeModal.set(data);
  }

  closeModal() {
    this.activeModal.set(null);
  }

  setExpandedVerticalCard(index: number) {
    this.expandedVerticalCard.update(current => current === index ? -1 : index);
  }

  setExpandedStudentsCard(index: number) {
    this.expandedStudentsCard.update(current => current === index ? -1 : index);
  }

  setExpandedTeachersCard(index: number) {
    this.expandedTeachersCard.update(current => current === index ? -1 : index);
  }

  navItems = computed<NavCommand[]>(() => [
    { label: this.ts.t().nav.aboutUs, link: '#vertical-sections' },
    { label: this.ts.t().nav.programs, link: '#program-roadmap' },
    { label: this.ts.t().nav.theRoad, link: '#horizontal-sections' },
    {
      label: this.ts.t().nav.theGroup,
      children: [
        { label: 'SciTheWorld', link: 'https://scitheworld.com' },
        { label: 'Algorithmization', link: 'https://algorithmization.com' },
        { label: '41OPS', link: 'https://41ops.com' },
        { label: 'Learning~Adaptive', link: 'https://learningadaptive.com' }
      ]
    },
    { label: this.ts.t().nav.contact, link: '#contact' }
  ]);
}
