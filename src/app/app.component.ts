import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
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
    FooterComponent
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
      title="<div>INFRASTRUCTURE TO MANAGE</div><div>YOUR CAREER LIKE A PRO</div>" 
      subtitle="SystematicMe" 
      [showBrackets]="true"
      bracketsColor="var(--color-1)"
      subtitleColor="gray"
      description=""
    />

    <app-part-stw
        titleHtml="Part of <u>SciTheWorld</u>"
        description="<p><strong>We are the training arm at SciTheWorld:</strong></p><ol><li>The way we keep on researching and adapting to innovation.</li><li>The democratization of our greenfield, Algorithmization, so that professionals can research and adapt as fast as we do.</li></ol>"
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
          title="The problem we solve"
          backgroundColor="#4AB5EA"
          modalContent="AI, automation, and deep technological shifts do not destroy careers randomly. They destroy static professional profiles.\n\nMost professionals fail not because they lack intelligence, but because:\n<ul><li>they update too late,</li><li>they overreact under pressure,</li><li>or they gamble on abrupt career resets.</li></ul>\nSystematicMe exists to ensure that the professional identity is never static."
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
          title="Why us"
          backgroundColor="#FA715E"
          [isAccordionSection]="true"
          (navigate)="verticalContainer.onSideNavClick($event)"
          (nextSection)="verticalContainer.navigateNext()"
        >
          <app-accordion mode="click" [blockCount]="2" width="100%" height="100%">
             <app-accordion-card title="CREDIBILITY" image="./img/accordion/sergio_green_world.jpeg" [expanded]="expandedVerticalCard() === 0" (clicked)="setExpandedVerticalCard(0)">
                <p>We have a pristine track record dynamically anticipating innovation over the years. And, while doing so, we fathered Algorithmization - well beyond it was mainstream.</p>
                <p>We have globally trained clients on this discipline across sectors. It is time to democratize that.</p>
             </app-accordion-card>
             <app-accordion-card title="UNBEATABLE TECHNOLOGY" image="./img/accordion/sergio_receiving_prize.jpg" [expanded]="expandedVerticalCard() === 1" (clicked)="setExpandedVerticalCard(1)">
                <p>There is a point when the job market can't absorb you. We can uniquely help you re-orientate your career towards entrepreneurship upon our algorithmic technology (venture tech).</p>
                <p>The more we have trained you the more we know you. And so, the better the match.</p>
             </app-accordion-card>
          </app-accordion>
        </app-section>

        <app-section
          [id]="3"
          [sectionIndex]="2"
          [totalSections]="4"
          [globalCurrentSection]="verticalCurrentSection()"
          title="The method: follow, evolve, deviate"
          backgroundColor="#4CD6BC"
          modalContent="SystematicMe follows a deliberate loop:\n<br>\n<b>First, you catch up</b>\nYou start by understanding the concepts behind the way the founders think, decide, and anticipate change. In particular, wrapped around two topics: their particular experience and their overall attitude.\n<br>\n<b>Then, you evolve with us</b>\nThe system updates continuously, as we do. New technologies, new risks, new opportunities. None of us know what’s coming next and we will surely need to learn more and, even pioneer again part of the path.\n<br>\n<b>Finally, you deviate</b>\nOnce you have judgment, you deliberately build your own path, your own profile. Your professional strategy based on your own perception of risk-reward.\n<br>\n<b>Custom. Timely. Proactive.</b>\nBecause careers must be managed professionally as competitive advantages."
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
          title="How learning works with us?"
          backgroundColor="#EECA46"
          modalContent="We do not start with fragmented topics. We start with real stories.\n<br>\nEach program:\n<ul><li>presents a full, complex and very significant narrative, difficult to grasp at the beginning,</li><li>breaks it into structured modules,</li><li>delivers targeted learning pills tied to that story - videos, reports, Python Notebooks, prompts… any combination.</li></ul>\nThe loop is intentional:\n<ul><li>first, the story feels complex and overwhelming (first day),</li><li>then, it becomes complex but intelligible (last day),</li><li>finally, it becomes actionable (all along your career).</li></ul>"
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
            title="The road to success"
            modalContent="SystematicMe seeks timely knowledge accumulation at a level eloquent enough for you to make decisions, challenge marketing, challenge experts…\nAnd over time:\n\t• skills compound,\n\t• risk awareness increases,\n\t• optionality grows, and\n\t• network spans.\nThis all is what we expect to converge toward success. Not immediately. But reliably."
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
            title="WHO THIS IS FOR"
            modalContent="SystematicMe is built for people who need judgment, not just skills:\n\t• professionals from mid-roles to board level,\n\t• investors,\n\t• journalists,\n\t• policymakers and civil servants.\nYou do not need to be the most technical person in the room. That will soon be a bot.\nYou need to understand context, trade-offs, and consequences.\nThis is, you need the skills required to apply your human creativity on top."
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
            title="STUDENTS"
            backgroundColor="#4CD6BC"
            [isAccordionSection]="true"
            contentSlotHeight="51dvh"
            (navigate)="horizontalContainer.onSideNavClick($event)"
            (nextSection)="horizontalContainer.navigateNext()"
        >
            <app-accordion mode="click" [blockCount]="2" width="100%" height="100%">
                <app-accordion-card title="THIS IS NOT" [expanded]="expandedStudentsCard() === 0" (clicked)="setExpandedStudentsCard(0)">
                    <ul>
                        <li>a single course;</li>
                        <li>a one-off coaching interaction; nor</li>
                        <li>a reskilling panic button.</li>
                    </ul>
                    <p>Actually, often, not even the truth. At the speed the world moves, the truth isn’t easy to catch.</p>
                </app-accordion-card>
                <app-accordion-card title="THIS IS" [expanded]="expandedStudentsCard() === 1" (clicked)="setExpandedStudentsCard(1)">
                    <ul>
                        <li>a way for the less techie and quantitative to gain judgement by seeking the truth from experts while keeping up with tech and innovation advances;</li>
                        <li>a continuous system that evolves with you, a companion for the rest of your career;</li>
                        <li>a traceable portfolio of skills, risks, and options over time;</li>
                        <li>a way to navigate change gradually, deliberately, and intelligently; and</li>
                        <li>in the limit, for those that qualify, a technology partner as co-investor for certain members of the community that feel the need to become entrepreneurs.</li>
                    </ul>
                </app-accordion-card>
            </app-accordion>
        </app-section>

        <!-- Section 4 Accordion -->
        <app-section
            [id]="8"
            [sectionIndex]="3"
            [totalSections]="7"
            [globalCurrentSection]="horizontalCurrentSection()"
            title="TEACHERS"
            backgroundColor="#EECA46"
            [isAccordionSection]="true"
            contentSlotHeight="51dvh"
            (navigate)="horizontalContainer.onSideNavClick($event)"
            (nextSection)="horizontalContainer.navigateNext()"
        >
            <app-accordion mode="click" [blockCount]="2" width="100%" height="100%">
                 <app-accordion-card title="THIS IS NOT" [expanded]="expandedTeachersCard() === 0" (clicked)="setExpandedTeachersCard(0)">
                    <ul>
                        <li>a social network open to any expert. You need to be proposed and, then, qualify.</li>
                        <li>a course to which you have to commit, compromising your agenda.</li>
                        <li>for you to talk about deep background - unless you want to, we take care of that.</li>
                    </ul>
                 </app-accordion-card>
                 <app-accordion-card title="THIS IS" [expanded]="expandedTeachersCard() === 1" (clicked)="setExpandedTeachersCard(1)">
                    <ul>
                        <li>for you to build on a topic, not to describe it.</li>
                        <li>For you to convey your wisdom - the cherry-on-top, the latest insight, a timely opinion…</li>
                        <li>a way to become influential in a world dominated by social networks’ influencers. The users of this channel are eager to go the extra-mile, to analyze and think of what you have to say. You are the spark that makes them think.</li>
                    </ul>
                 </app-accordion-card>
            </app-accordion>
        </app-section>

         <!-- Section 5 -->
        <app-section
            [id]="9"
            [sectionIndex]="4"
            [totalSections]="7"
            [globalCurrentSection]="horizontalCurrentSection()"
            title="Career hedging, not gambling"
            modalContent="SystematicMe’s approach to career management inherits risk management practices from the investment industry - in the end, the most valuable asset you have to trade is you own career.\nThus, the better we understand:\n\t• your skills - your career risks and assets,\n\t• your efforts - the skin you put in the game,\nthe better we can propose:\n\t• short learning pills,\n\t• deeper, longer programs,\n\t• open or free resources where appropriate,\n\t• paid, high-leverage learning only when justified.\nThis is, after-uni education built around custom, timely skills . Career built upon optionality, not credentials."
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
            title="Only efficient efforts"
            modalContent="By continuously understanding your roadmap in a micro level of skills, we:\n\t• avoid charging you twice for overlapping concepts (and wasting your time),\n\t• treat you as an individual, not a cohort.\nSome guidance is algorithmic. Some is personal."
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
            title="IN ONE SENTENCE"
            backgroundColor="#FA715E"
            [modalContent]="inOneSentenceModal"
            (requestModal)="onRequestModal($event)"
            (navigate)="horizontalContainer.onSideNavClick($event)"
            (nextSection)="horizontalContainer.navigateNext()"
        >
             <div class="content-wrapper" style="width: 100%; display: flex; justify-content: flex-start;">
                <p class="section-text" style="color: white; max-width: 800px; text-align: left; margin: 0; font-style: italic; opacity: 0.9;">
                    [ SystematicMe is your lifelong career infrastructure—designed to help you stay valuable, independent, and antifragile in an world of continuous innovation. ]
                </p>
             </div>
        </app-section>

    </app-sections-container>


    <div id="contact" class="contact-block">
      <app-contact-us />
    </div>
    
    <app-footer />

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
      padding-left: 1.5rem;
      margin-top: 0.5rem;
      margin-bottom: 1rem;
    }

    .modal-text li {
      margin-bottom: 0.75rem;
      padding-left: 0.25rem;
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
  activeModal = signal<{ title: string, content: string, color: string } | null>(null);

  inOneSentenceModal = `Yes, the sentence is the first with which we introduced ourselves. By reading this website, you have already experienced mildly our learning approach (<u>complex and overwhelming > complex but intelligible</u>). What probably lacked a lot of meaning just a few minutes may at this stage resonate with fair accuracy.
<br><br>
Now, you have probably developed an initial level of judgment around why <b>career management must be managed like a pro</b>. This is, <b>approached structurally, over the long term, and supported by career management infrastructure</b>—even through corporate and investment technology in the most radical transition of all: entrepreneurship.
<br>
Next? Action (<u>actionable</u>) - join us. 
<br>
But there is no need to decide now. Let the ideas settle. Return when you fully grasp both the relevance of what we propose and why we are uniquely positioned to deliver it. <b>You will know when</b>.`;

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

  navItems = signal<NavCommand[]>([
    { label: 'ABOUT US', link: '#vertical-sections' },
    { label: 'PROGRAMMS', link: '#program-roadmap' },
    { label: 'THE ROAD', link: '#horizontal-sections' },
    {
      label: 'THE GROUP',
      children: [
        { label: 'SciTheWorld', link: 'https://scitheworld.com' },
        { label: 'Algorithmization', link: 'https://algorithmization.com' },
        { label: '41OPS', link: 'https://41ops.com' },
        { label: 'Learning~Adaptive', link: 'https://learningadaptive.com' }
      ]
    },
    { label: 'CONTACT', link: '#contact' }
  ]);
}
