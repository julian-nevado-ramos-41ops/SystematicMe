import { Component, ChangeDetectionStrategy, signal, viewChild } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { FooterComponent } from './components/footer/footer.component';
import { SectionsContainerComponent } from './components/sections-container/sections-container.component';
import { SectionComponent } from './components/section/section.component';
import { AccordionComponent, AccordionCardData, LlmLink, Testimonial } from './components/accordion/accordion.component';
import { MapMarker } from './components/interactive-map/interactive-map.component';
import { AccordionCardComponent } from './components/accordion-card/accordion-card.component';
import { CursorFollowerComponent } from './components/cursor-follower/cursor-follower.component';
import { AwardsListComponent } from './components/awards-list/awards-list.component';
import { LogoCarouselComponent } from './components/logo-carousel/logo-carousel.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { HudOverlayComponent } from './components/hud-overlay/hud-overlay.component';
import { NavBarComponent, NavCommand } from './components/nav-bar/nav-bar.component';
import { PartStwComponent } from './components/part-stw/part-stw.component';
import { CollapsibleListComponent, CollapsibleItem } from './components/collapsible-list/collapsible-list.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

interface SectionData {
  id: number;
  title: string;
  subtitle: string;
  backgroundColor: string;
  image?: string;
  modalContent?: string;
}

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavBarComponent,
    HeroComponent,
    SectionsContainerComponent,
    SectionComponent,
    AccordionComponent,
    CollapsibleListComponent,
    AccordionCardComponent,
    CursorFollowerComponent,
    AwardsListComponent,
    LogoCarouselComponent,
    PreloaderComponent,
    HudOverlayComponent,
    PartStwComponent,
    ContactUsComponent,
    FooterComponent
  ],
  template: `
    <app-preloader />
    <app-cursor-follower />
    <app-hud-overlay />

    <app-nav-bar 
      [logo]="{ src: './img/logo_stw.png', alt: 'SciTheWorld', link: '/' }"
      [menuItems]="navItems()" 
      variant="glass"
      topOffset="20px"
      borderRadius="10px"
      fontFamily="'PP Supply Mono Regular', 'PP Supply Mono Regular Placeholder', monospace"
    />

    <app-hero 
      title="<div>THE</div><div>FUTURE-PROOFED GROUP</div>" 
      subtitle="SciTheWorld" 
      [showBrackets]="true"
      bracketsColor="var(--color-1)"
      subtitleColor="gray"
      description="State-of-the-art. Center of excellence-driven. Diversified. Fully on-platform. End-to-end algorithmic. AI OPS native. Extreme-efficient. Federated. OS built upon algorithmic trading technology. Hybrid models. Native interconnections. Proprietary and from scratch... \n \nsince 2015."
    />

    <app-accordion
      id="highlights"
      mode="scroll"
      sectionTitle="HIGHLIGHTS"
      sectionSubtitle="Plenty of achievements"
      [cards]="accordionCards()"
      minWidth="60%"
      maxWidth="90%"
      cardHeight="350px"
      gap="1.5rem"
      borderRadius="20px"
      sectionHeight="200vh"
      scrollSnap
    />

    <app-sections-container
      id="about-us"
      layout="horizontal"
      viewportHeightVh="85"
      (sectionChanged)="onSectionChanged($event)"
      (navigateRequest)="handleNavigateRequest($event)"
      #sectionsContainer
    >
      @for (section of sections(); track section.id) {
        <app-section
          [id]="section.id"
          [title]="section.title"
          [subtitle]="section.subtitle"
          [backgroundColor]="section.backgroundColor"
          [image]="section.image"
          [modalContent]="section.modalContent"
          (requestModal)="onRequestModal($event)"
        >
          @if (section.id === 3) {
            <app-collapsible-list [items]="ecosystemItems()" />
          } @else if (section.id === 5) {
            <p class="intro-text">
              When Silicon Valley has the idea, SciTheWorld has the technology.
              <br><br>
              One of our international advisors said it long time ago. Over time it became actually very accurate so we kept it as our own internal motto. Not to congratulate ourselves but the other way around - to keep the pressure. Nevertheless, as warned in finance, past performance is no guarantee of future one.
            </p>
          }
        </app-section>
      }
    </app-sections-container>

    <div id="awards" class="awards-block">
      <app-awards-list />
    </div>

    <div id="brands" class="logos-block">
      <app-logo-carousel />
    </div>

    <div id="contact" class="contact-block">
      <app-contact-us />
    </div>
    
    <app-footer />

    <!-- Modal overlay (Global) -->
    @if (activeModal()) {
      <div class="modal-backdrop" (click)="closeModal()">
        <div class="modal-container" [style.background-color]="activeModal()?.color" (click)="$event.stopPropagation()">
          <button class="modal-close" (click)="closeModal()">✕</button>
          <h2 class="modal-title">{{ activeModal()?.title }}</h2>
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

    .awards-block,
    .logos-block {
      width: 100%;
      padding: 4rem 0;
      scroll-snap-align: start;
    }

    .contact-block {
      width: 100%;
      padding: 0;
      margin: 0;
      scroll-snap-align: start;
    }

    .bento-list {
      list-style: none;
      padding: 0;
      margin: 0 0 2rem 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .bento-list li {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      color: rgba(255, 255, 255, 0.7);
      font-size: 1.1rem;
      line-height: 1.5;
    }

    .bento-list li::before {
      content: '•';
      color: rgba(255, 255, 255, 0.4);
      font-size: 1.2rem;
      flex-shrink: 0;
      margin-top: 0;
    }

    .intro-text {
      color: #fff;
      font-size: clamp(1rem, 1.5vw, 1.5rem);
      line-height: 1.6;
      font-weight: 300;
      white-space: pre-line;
      font-family: 'Inter', sans-serif;
      opacity: 0.9;
    }

    @media (max-width: 900px) {
      .intro-text {
        max-width: 80%; /* Limit width more on mobile */
        font-size: 1rem;
      }
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
      padding: 3rem 3.5rem;
      /* background-color set dynamically in template */
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      overflow-y: auto;
      animation: modalSlideIn 0.35s cubic-bezier(0.25, 1, 0.5, 1);
    }

    .modal-close {
      position: absolute;
      top: 1.25rem;
      right: 1.5rem;
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.6);
      font-size: 1.25rem;
      cursor: pointer;
      transition: all 0.2s ease;
      padding: 4px 8px;
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
      margin: 0 0 2rem 0;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }

    .modal-body {
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
  currentSection = signal(0);
  expandedCard = signal(-1);
  activeModal = signal<{ title: string, content: string, color: string } | null>(null);

  onRequestModal(data: { title: string, content: string, color: string }) {
    this.activeModal.set(data);
  }

  closeModal() {
    this.activeModal.set(null);
  }

  navItems = signal<NavCommand[]>([
    { label: 'HIGHLIGHTS', link: '#highlights' },
    { label: 'ABOUT US', link: '#about-us' },
    { label: 'AWARDS', link: '#awards' },
    { label: 'WHO TRUST US', link: '#brands' },
    {
      label: 'THE GROUP',
      children: [
        { label: 'Algorithmization', link: 'https://algorithmization.com' },
        { label: 'SystematicMe', link: 'https://systematicme.com' },
        { label: '41OPS', link: 'https://41ops.com' },
        { label: 'LearningAdaptive', link: 'https://learningadaptive.com' }
      ]
    }
  ]);

  accordionCards = signal<AccordionCardData[]>([
    {
      title: 'EXTREME-EFFICIENT NATION',
      description: 'In 2025, we became the first company to be trusted to change a whole country - Spain. \n\nIt was based on our AI-geostrategy paper and involved the Ministry of Economy (bottom-up guidance of the economic policy; \n\nFirst things first - we established a methodology to help all companies detect and prioritize their transformation projects. Actually, one of the least advanced challenges to date.',
      icon: '',
      images: [{ src: './img/highlights/sergio_ee_nations.png', alt: 'Sergio EE Nations' }],
      imagesStackClass: 'stack-1',
      backgroundColor: 'rgba(232, 93, 4, 0.85)',
      testimonials: [
        {
          name: 'EU Country',
          role: "Sr Civil Servant' 25",
          quote: "The paper was a discovery - there was already so much sound literature and technology anticipated by SciTheWorld that following their lead was a mere risk-reward optimization. More than 3k companies in the scope.",
        },
      ],
    },
    {
      title: 'PIONEERS OF AGENTIC AI',
      description: 'We are highly regarded as the global pioneers of strategies-based Agentic AI. We started in 2015 and published our results in our first paper - Data MAPs.\n\nDo not trust our word for that. Ask your preferred LLM, here.',
      icon: '',
      images: [{ src: './img/highlights/sergio_talk_2.png', alt: 'Sergio Talk 2' }],
      imagesStackClass: 'hide-when-open',
      backgroundColor: 'rgba(0, 119, 182, 0.85)',
      prompt: `To the light of the info that I'm going to give you based on a paper written in 2022, would you say this is a pioneer work on agentic AI? In particular, 'AI-native enterprises and operating models' as distinguished by McKinsey. Note that pioneers typically anticipate concepts but with different names than those used afterwards, mainstream. Take everything into account and make your most accurate verdict. And note that you are seeing only one chapter of a paper - there are more chapters in that paper and there are more papers on transformation, algorithmization and AI as they have a centre of excellence for that. Also, they have an award to the best innovation in simulation as they allowed, back in 2019, a machine to autonomously self-create and calibrate its algorithms via Reinforcement Learning (a major topic in Sergio's PhD Thesis in AI). Finally, spot he problems its solves with respect to mainstream agents (e.g. costs, legacy system integration, compliance, RAM...). Follows the Chapter:
 
Data MAPs Algorithmization requires an optimal weighting between business and technology departments’ needs. Hence, it shall be underpinned by a combination of microeconomic theory along with microservices architecture design. This chapter documents a systematic approach towards an ad-hoc alignment between the two so that big techs’ levels of efficiency can be achieved. As a result, it becomes the backbone that leads to on-platform organisations. 3.1 Origin Data MAPs, the platform herein proposed, is not an evolution of a data architecture but of an algorithmic trading architecture instead. These are event-driven, Kappa architectures. The way they manage latency is called complex event processing (CEP). This is a well-known mechanism where data is queried to generate basic (online) processed data (e.g. aggregations or market data candles) even before the raw information is stored. This is the case from the late 2000s. Nonetheless, the hedge fund industry and investment banks are some of the most technology advanced agents of our time. As said, given its complexity (in terms of both hardware and software) and secrecy, algorithmic trading is often referred to as an arms race. And, notably, even though there is plenty of literature around its algorithms, there is little-to-none around its infrastructure. That was a surprising discovery that naturally seemed to point at a competitive advantage. Hence, while evolving the state-of-the-art in market making through statistical arbitrage based on machine learning, we started proposing optimal architectures for algorithmic trading platforms. This is, our innovation process was twofold: 1. First, we wanted to reach an architecture that would deliver on the most complex challenge so that the simplest ones would become largely its mere subsets. 2. Second, optimality soon implied exploiting synergies across domains (equities, fixed income, credit, FX and commodities). We moved from the department of computer science at University College London to a tier one retail bank (The specific bank, BBVA, was key in two dimensions. First, it was a retail bank. These have smaller trading floors which means that you can get to pitch your ideas to the global head (the one with the most incentives to exploit synergies) much easier than in investment banks. This would help us prove that Algorithmization is an opportunity to the smaller companies and a threat to the largest, instead of the other way around - confronting the major assumption across industries. Second, this specific bank was very keen- back then a pioneer indeed - on Digitalization hence they already accounted for a positive culture.) to prove our research in the real industry. Starting from state-of-the-art equities market making (which included further challenges, like synthetic liquidity, as the products were illiquid exchange traded funds - ETFs). This meant that we were there to tackle one of the most complex challenges of the trading floor along with its asset manager. Once there, we observed the industry. Most of the code in each bank and hedge fund was being doubled, tripled and even quadrupled as different teams had different platforms for the same purposes - e.g. execution algorithms. This is, their domain-driven approach led to expensive silos. Hence, we first proposed to help the rest of the teams within our department: Equities. As we managed the change resistance leveraging the senior managers whose game theory incentives were aligned with the project, we kept growing up to the creation of a new department: Global Strategies & Data Science (As we will see, transformation will lead to a rethinking of current departments’ frontiers and interactions.) . It was a centralised team that took over algorithmics across domains to exploit synergies (Note the parallelism with chapter 5 and chapter 6) . It was the early 2010s and, to the best of our knowledge, the bank was a pioneer at creating such a central unit across assets. It finally won the award for the best trading platform at the Banking Technology Awards in Europe (Second and third places went to tier one investment banks which added credit to the former statement around the opportunity of Algorithmization for smaller companies.) . Back in 2015, we started the second part of our experimentation. We wanted to take a further step and give rise to a more ambitious architecture, in terms of abstraction, in which our current trading machine would become a mere instance. While doing so, we added section 1.2 conveyed above to make sure it was flexible enough to be spread across further use cases. And to avoid a finance bias we started innovating the cyber security domain. 3.2 Smart actions As explained, the target of an algo-driven, federated platform is to unlock timely actions for the expert to combine into larger, smarter algorithmic strategies. The expert can be anyone. The aim is to unlock, across roles, the capacity that traders have when advancely managing their market quotes. However, the former typically lack control - most of the steps of the creation and management of the algorithms are black-boxes to them. Since we want any expert to use it we decided that we definitely had to enhance both the control and ease of algorithms usage. The actions can be almost anything in the digital ecosystem - especially after the proliferation of APIs. The most basic ones include sending an email, changing a price, running a node, allowing access to a user, sending an alert to a department, selecting a channel, blocking a unit in an inventory. . . Figure 18: The Algorithmization approach: the unlock of smart actions. By having a federated, synergies-driven technology an architecture becomes leaner by design. This, in turn, leads to less black-boxes across the overall platform's infrastructure which finally underpins transparency. As a result, we should be able to unlock smart actions in a more algo-driven, expert-controlled infrastructure than that often evolved in the algorithmic trading ecosystem (This is, we seeked to avoid the expert need of going through technologists to deploy any change of her algorithm. Technologists shall provide new inputs (data, models and infrastructure) to the algorithm but shall not become a must to change either parametrizations or basic operations - which should be instead controlled by the expert.) for everyone to evolve upon. 3.3 Architecture federation.
3.3.1 Motivation From the start, we considered breaking the code in different nodes so that intellectual property could be protected and shared by design. This way, data products and, more crucially, algorithmic services could easily flow across digital projects. 3.3.2Synergies by design As said, the key of enterprise software going forward is to exploit innovation upon innovation towards exponential. That means that the software design process has to include synergies by default. As such, the process starts with a brainstorming of possible connected projects. There is no need for them to be in the pipeline yet. But they should be an ambitious (yet realistic) target to underpin the future legacies of the company. Anticipating synergies to exploit in the future and accommodating them today by design is a best practice that unlocks the aforementioned innovation-upon-innovation towards exponential impact (up to a Sigmoid). For example, let’s say an organisation wants to develop the technology to tackle a use case, A, and there are no more use cases to develop. To grant a minimal exploitation of synergies, the different teams involved shall think of a, say, couple of ambitious projections of the use case A, for example B and C, and dissect them into their different steps. The target is to find at least a step in common with A so that A can be divided into recyclable steps, say we find two in common, the number five in use case B, A B5 , and the number two in use case C, A C2 . Figure 19: Data MAPs synergies exploitation protocol. Over time, the algorithmization experts get used to spotting the steps that seem recyclable by themselves without the need to brainstorm further. More interestingly, as they keep accumulating a portfolio of MAUs, MAEs and MAPs as assets, instead of considering feasible projects they directly recycle past ones. 3.3.3 Micro architecture building blocks: MAUs, MAEs and MAPs Figure 20: Sketch of a micro architecture unit (MAU). We call micro architecture units (MAUs) a minimal microservice that can trigger smart actions and live isolatedly towards federation. It is composed of a data node and an orchestrator node - which holds the algorithmic strategy and the libraries required in-memory to take the smart actions upon its own data and/or external data. Those nodes share the same RAM and are communicated (Sometimes, the communication protocol, as we shall see, is best not to fix it publically (as in blockchain technologies) but to negotiate it between counterparties and change it over time. This way we mitigate possible cyber security attacks - more especially, those of Computer Network Exploitation (CNE) where the hacker stays longer, scanning the infrastructure towards exploiting a vulnerability.) with the exterior (API REST, queues, buses. . . ). As such, they co-exist in a server whether alone or with other MAUs (This is relevant since, as we saw in the definition of an algorithm, it can affect its output. The hardware choice depends on the budget and the cybersecurity amongst other things.) . We call micro architecture extensions (MAEs) to those that at least meet the above but have some of the aforementioned nodes duplicated. They are usual, for example, when different nature of data (time series or transversal) has to be included by design or due to cyber security protection (e.g. permissions). We call micro architecture patterns (MAPs) the connected MAUs and MAEs that lead to a network or platform with a specific usage (e.g. a business service) yet open by design. Figure 21: Sketch of a micro architecture pattern (MAP) upon MAUs and MAEs. Previously, we have conveyed the need to identify recyclable steps towards the exploitation of architecture synergies. By identifying each recyclable step as a MAP from inception they can be easily used to build up numerous usages. This way, different end-to-end platforms can be built upon the same overall architectures as if they were fractal expansions; and this leads to less costs, more specialisation, easier maintenance, etc. As a result, the programmer shall start focusing on these minimal units and their fractal expansions when creating a platform (Note that federation can be as micro as, in the limit, a sole developer. By letting developers work in small pieces following our governance protocols we minimise the risk of black-boxes and rotation.) - we call it Pattern Oriented Programming (POP) upon Object Oriented Programming (OOP). Note that, strictly speaking, we do not believe this approach is ideal. Ideally, the architecture designer shall be able to perfectly understand the business present and future needs and deploy any piece ad-hoc to them. However, we believe the approach is optimal at weighting architecture benefits and business benefits - where the latter reaches open industries. 3.4Governance We define governance as the rules that manage the best practices to be embraced by a department, a company or an industry after thoroughly analysing its pros and cons. And typically, it is devoted to enforce interoperability, compliance (including privacy), security, and documentation. But, as we will see, they should also rule innovation management, efficiencies, branding and other dimensions of a company through on-platform protocols. Follows a brief description of the former four. 3.4.1 Interoperability Data, algorithms and models shall be produced in a way that allows them being consumed by third parties. There is very little literature about interoperability - communication protocol and messages. From our experience, there are two ways to do this. The first, universal. It seeks a one-size-fits-all solution. As such, it does not seek efficiency but massive consumption that most of the team provides beyond optimal information per agent. Even though Figure 22: Data MAPs interoperability across companies. having-more-than-required is typically a good thing, in technology it becomes an inefficiency that has economic consequences - from saturation of bottlenecks to actual loss of business opportunities (One of the most popular formats in finance is Financial Information eXchange (FIX). The exchange universally broadcast their data this way. Even though it is a good enough format for most players it is too rich for trading arbitrage so a large part of these strategies rely on being able to react to the message before finishing its reading.) . The second, ad-hoc. It typically seeks efficient and/or, equally relevant, more cyber secure solutions. UX here is compromised by agreeing on homogenising native code at both sides or by fully adapting the consumer to the producer - which would imply risky disclosure for the latter though. In both cases a message can lead to mere data communication or to the trigger of actions by the receiver (send data, change data, delete data. . . ). Again, the format can be universally fixed or negotiated ad-hoc towards cyber security or efficiency. This is obviously easier to achieve internally, within and across departments of a company (see chapter 5 and chapter 6) but more scarce when it comes to interoperability across companies (see Figure ?? and chapters 7 and 8). 3.4.2 Compliance Regulation is taking an increasing role across industries. And, being local, it is becoming a challenge of special complexity for those companies with a global footprint. Further, failing to comply is a major risk given the magnitude of the consequences. In order to be compliant by design (at least at minimums), companies can adopt tactical technology as the one explained in subsection 4.2.4. The target is to be resilient to operational errors up to systematic misconduct (especially in a context of high technologist employees rotation). To achieve it, human compliance shall be reinforced by machine processes both on-platform protocols and automatic routines. Chapter 4, will illustrate the nature of these machine processes at length. 3.4.3 Security Security is yet another increasing challenge, given the relevance of the digital assets of the companies and the digital dynamics. There are very well known security minimums agreed within associations (Like the International Standards Organisation (ISO) of which we are members for the forthcoming big data and artificial intelligence certification.) that companies shall follow and improve. We, internally, account for technology that onboards our projects, filling out directly part of the ISO 27001 certification reports - the distribution of technology assets, their risks and their mitigations. As we will see in chapter 4, following the concept of bootstrapping, once a company’s platform has been deployed with Data MAPs technology, it can unlock different strategies to secure its own assets and mitigate the risks once they occur. Further, it can unlock new approaches like those that leverage tactical technology. We believe cyber security is still in its infancy. 3.4.4 Privacy Data privacy is a right. As such, there is a lot of regulation and law enforcement around it. Citizens shall be granted with control over the collection and usage of their personal information. There are several ways to protect data. And most of them overlap with the former dimensions of governance. The tools developed for security and compliance shall be leveraged towards ad-hoc ways to meet regional laws and regulation. At this point it is relevant to highlight the ease at which we have been able to unlock new ways of security and compliance based on Data MAPs. We will see several examples in chapter 4 but they are not all - just an eloquent beginning. For instance, we internally use obfuscation and encryption strategies to protect our own digital assets. By systematically doing so we allow for them to change dynamically and that is a crucial advantage in case there is a Computer Network Exploitation attack as mentioned above. 3.4.5 Documentation Being Data MAPs thoroughly API-fied and micro-serviced it is easy to track the different steps involved behind both data and algorithms. As such, companies can grant minimum documentation processes. Beyond those there must be on-platform documentation protocols (wiki-like) for the employees to provide more detailed information around metadata from algos and data sets, context, schemes of the MAPs, possible synergies, etc. As always, we expect the equilibrium to be somewhere between human and machine tasks - and, in particular, augmenting the latter with the former. 3.5 Interface Chapter 9 is devoted to a deeper explanation of the different interfaces required along the algorith- mization process. As we will see, interfaces are often architecturally forgotten. However, they are crucial at optimising the aforementioned business and technology layers. They are a crucial part in algorithm-driven, expert-controlled organisations. They are the channel to unlock Augmented Machines and the way to control, by design, the federation of the company’s overall IP. 3.6 Two crucial steps before delivering When we started implementing our own instance of Data MAPs at SciTheWorld, SW FRACTAL ®, we realised there were a couple of steps that should be contemplated from inception. 3.6.1 Smooth onboarding through EPAs Since we wanted to take a further step, beyond theory, to prove for real our technology proposal we forced ourselves to face the challenges of the industry at onboarding new technology. It is crucial to be realistic in terms of the compatibility between the proposed architecture and the current one that organisations have - their production architecture (PA). PAs are the legacy ecosystems. For good (they are the current core framework of a company) and bad (they are the bottleneck that strangles the evolution of the company). Hence, it is key to grant a smooth onboarding of a company’s technology therein - they are literally a barrier to entry. And we surpassed it as follows. First, there was a major issue of culture. IT departments are naturally used to platforms with the utmost resilience granted by expensive 24/7 service level agreements (SLAs). As a result, their architectures are very much static. However, algorithmics call for very dynamic systems. Hence, ceteris paribus, very expensive. The solution, as we shall see, is the negotiation of SLAs dependent on the risk of the use case agreed with the business units following a governance based on risk-reward (The business unit proposes whether a new technology development shall be in the PA or the EPA dependent on the risk and the reward expected from each environment.) . Second, the architecture. The algorithmic infrastructure shall not interfere with the PA’s SLAs. It shall not substitute it nor cannibalise its resources. For that, we proposed the creation of extended production architectures (EPAs). These surround a PA and grow far from it towards the adaptation of new paradigms. Figure 23: Sketch of an extended production architecture (EPA) growing asymmetrically around a PA. The way it was being done in the industry was significantly inefficient. Basically, production databases were systematically cloned from time to time through so-called job schedulers that provided ETLs to further reporting and analytics architectures. These, hence implied three ecosystems (operations, reports and analytics) that often led to a number of operational errors starting from data mismatches. Another complaint by the PA’s managers was that they had to keep data that they did not strictly need. On the business side the complaints were basically various as well: the time it takes to launch a non-risky project in the PA, the amount of available data variables, the latency of the data and the incapacity to affect the PA (hence, the popularity of static reports over autonomous actions (Creating isolated labs is a tactical solution yet not strategic. The overall strategy shall include the capacity to launch the models interactively and, in the limit, autonomously upon a granted communication with the PA.) ). By substituting the scheduler for database listeners (like CDCs) the PA’s databases can be timely mimicked. By further including an event manager within the PA the data consumed can span beyond the data persistent by the PA (A best practice is actually to deploy a class for data management at the PA that can subsequently include event communication at minimal erosion of the PA’s resources.) and actions can be easily absorbed by it - unlocking algorithmic interaction at PA level. 3.6.2 Architecture bootstrap Data MAPs does not distinguish between technology and business architectures. The only difference is the type of action that they trigger as a consequence of an algorithmic strategy. As such, we soon started reinforcing our business architectures with algorithms around the hardware. As said, this is basically the way big techs reach flexibility and smartness around their own archi- tectures. In a way, it can be appraised as tactical big data and cyber security technology as assessed herein. Figure 24: Architectural bootstrap of smart actions. 3.7 Summary In this chapter, we have thoroughly described Data MAPs as an algorithm-driven architecture. These unlock smart actions towards future-ready businesses. While doing so they also intend to optimise the technology and business dimensions of an organisation’s platform trying to achieve as much efficiency as big techs do, organically. It is built upon minimal smart microservices that we call micro architecture units (MAUs). These can be extended (MAEs) and combined towards services upon open platforms by design (MAPs). Being open by design shall allow them to reach maximal federation. We then saw the role of the governance of these platforms as well as that of the interface, which is intimately related to the former. Last, we introduced the EPAs as an efficient onboarding of algorithmic extensions in production, and the bootstrapping of the architecture towards resilience upon technology smart actions.`,
      llmLinks: [
        { label: 'ChatGPT', url: 'https://chat.openai.com' },
        { label: 'Claude.AI', url: 'https://claude.ai' },
        { label: 'Gemini', url: 'https://gemini.google.com' },
      ],
      markers: [
        { id: 'madrid', city: 'MADRID', country: 'SPAIN', x: 49.0, y: 27.55, description: 'European HQ — where the national transformation strategy was born. Home to the core research team driving AI-geostrategy policy.lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua  lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
        { id: 'barcelona', city: 'BARCELONA', country: 'SPAIN', x: 50.6, y: 27.0, description: 'Innovation Hub — key center for AI research and development, collaborating with top technical universities and startups in the Mediterranean corridor.' },
      ],
      testimonials: [
        {
          name: 'IBEX Bank',
          role: "SVP'24",
          quote: 'We saw the potential early and started together the transformation of our Asset Manager - 50% personnel reduction followed',
        },
        {
          name: 'Global Energy Company',
          role: "Regional head of trading'25",
          quote: "It took us time to understand SciTheWorld's proposition but their track record was pristine and their approach gradual and realistic. We are ready to push for the whole lot - up to speedboats.",
        },
      ],
    },
    {
      title: 'A PRISTINE TRACK RECORD ON INNOVATION',
      description: 'Those who have known us for years have already witnessed the track record in real time.\n\nFor the rest, a good KPI is to see how much they anticipate the wish lists published year after year by Y Combinator. We can’t give details but you can work it out throughout our literature and co.',
      icon: '',
      images: [{ src: './img/highlights/sergio_talk1.png', alt: 'Sergio Talk 1' }],
      backgroundColor: 'rgba(59, 25, 180, 0.85)',
      testimonials: [
        {
          name: 'Tier one university',
          role: "Professor'26",
          quote: 'We were utterly surprised by the capacity they had to see crystal clear the roadmap in innovation. Thus, we had no other choice but to create a partnership to better understand and value companies in a world where intangibles (e.g. innovation) is the engine.',
        },
      ],
    },
  ]);

  sections = signal<SectionData[]>([
    { id: 1, title: 'Extreme-Efficient Group', subtitle: '', backgroundColor: '#4AB5EA', image: 'img/Extreme-Efficient_group.png', modalContent: 'We agree with Silicon Valley\'s Naval and others on the vision - in a future built upon more companies of smaller sizes.\n\nWe simply aimed, back in 2015, at being the first to reach it. And to do so with an academically-and-industrially solid approach. This is, sound Applied Science instead of Science Applied.\n\nTo take it to the limit, the group is strategically built upon companies that reinforce each other, creating a privileged ecosystem.\n\nIn spite of having been valued at unicorn level we have decided to remain independent - the group is organically bootstrapped.' },
    { id: 2, title: 'State-of-the-Art Platforms', subtitle: '', backgroundColor: '#FA715E', image: 'img/state_of_the_art_platforms.png', modalContent: 'There is no magic behind our delivery. We leverage to fully proprietary platforms that have taken 10 years to fine tune.\n\n<b>Fractal</b>\nAn extended-production architecture (EPA) that acts as an AI-driven operating system of the company. This is, this platform is the factory that allow our clients unlock all sorts of algorithmic use cases.\n\n<b>Alpha Dynamics</b>\nAn smaller EPA than Fractal but much deeper in terms of technology sophistication. It covers advanced finance so that our clients (from traders to SMEs’ CFOs) can control their investments better than ever - in the limit, creating custom strategies to hedge currency risks, credit, commodities...' },
    { id: 3, title: 'Ecosystem', subtitle: '', backgroundColor: '#4CD6BC' },
    { id: 4, title: 'World-Class Vision', subtitle: '', backgroundColor: '#EECA46', modalContent: 'World-class vision is a probably the main track record nowadays.\n\nWe believe the co-founders of deeptech shall have pioneered one or more fields to be considered true visionaries.\n\nOurs, have pioneered the fields of:\n<ul>\n<li><b>Corporate transformation</b> by creating a department of gas prediction at a major energy company in 2001.</li>\n<li><b>Algorithmic Trading</b> by first going to Japan in 2005 to research on the role of bots in Finance. Then, by quadrupling P&L at a major US investment bank in 2009 leveraging algos and data. Then, by writing an early book on Algorithmic Trading (the seed of Learning-Adaptive and, as such, the seed of the rest of the group).</li>\n<li><b>Entrepreneurship</b>. Globally respected agencies have awarded us. We account for a pristine track record foreseeing where the world moves towards and, more importantly, anticipating the technology as well. For being the smartest in the room? We wished. For truly respecting the Algorithmization challenge, instead. Judgement is simply built upon hands-on findings. And we are the first fully on-platform organization hence, we have a lot of those.</li>\n</ul>' },
    { id: 5, title: 'In a sentence', subtitle: '', backgroundColor: '#FD5F65' }
  ]);

  ecosystemItems = signal<CollapsibleItem[]>([
    {
      title: 'Learning-Adaptative: Challenges',
      subtitle: 'We agree with Jimmy Simons on the opinion that the most complex of all challenges is that of trading.',
      content: 'L~A is where our co-founders manage their investments (“their Family Office”). And, more importantly, where they keep updating their algorithmic technology challenges at the bleeding-edge.',
      image: 'img/chistera.png'
    },
    {
      title: 'Algorithmization: Solutions',
      subtitle: 'We agree with Andrew Ng on the opinion that the ability to innovate can be systematized.',
      content: 'In this Center of Excellence we  create use cases that prove innovation can become business-as-usual so that extreme-efficiency can be unlocked. We publish our work to get exposed to academia and industry and grant rigour. The method has proved to be efficient itself - great byproducts include the pioneering of both Agentic AI (strategies-based) and Software-as-a-Service (Custom SaaS).',
      image: 'img/birrete.png'
    },
    {
      title: '41OPS: Execution',
      subtitle: 'We agree with Elon Musk on the opinion that the factory is the product - the real deal.',
      content: 'Here is where we underpin Algorithmization’s theory by unlocking it at companies that gradually become white collar factories upon our Extended Production Architectures (EPAs).',
      image: 'img/casco.png'
    },
    {
      title: 'SystematicMe: Training',
      subtitle: 'We agree with Taleb on the relevance of being Antifragile.',
      content: 'Here is where our co-founders disrupt themselves by letting others follow their path. It is a career management system that allows professionals update their skills timely so that they keep active in the job market. Uniquely, in the limit, we can become the tech companions of those who are forced to leave the job market and need to create their own opportunities.',
      image: 'img/peluca.png'
    },
    {
      title: 'An army of spin-offs: Scale',
      subtitle: 'We agree with Ana Botín on the relevance of speedboats to accelerate transformation beyond the legacies of a large company.',
      content: 'Here is where we launch independent spin-offs as venture tech - equity in exchange of technology. Whether with our clients (joint ventures as speedboats), with our employees or with external professionals trained through SystematicMe.\nThe beauty of this companies is their attractive risk-reward ratio. This is, they are borned timely and with maximal EPA - AI-native OPS, low-risk tech and no production-architecture legacies',
      image: 'img/Ecosystem_to_cut.png'
    }
  ]);

  sectionsContainerRef = viewChild<SectionsContainerComponent>('sectionsContainer');

  onSectionChanged(index: number) {
    this.currentSection.set(index);
  }

  handleNavigateRequest(index: number) {
    this.currentSection.set(index);
  }

  setExpandedCard(index: number) {
    this.expandedCard.set(index);
  }
}
