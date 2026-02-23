import { Component, OnInit, signal, viewChild, ElementRef, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="preloader" [class.slide-up]="isComplete()">
      <div class="loader-container">
        <!-- Text Above Line -->
        <div class="text-top-container">
          <div class="revealing-text left" [class.visible]="showText()">WE</div>
          <div class="revealing-text right" [class.visible]="showText()">ARE</div>
        </div>

        <div class="vertical-line">
          <div class="fill" [style.height.%]="progress()"></div>
        </div>

        <!-- Percentage & Counter -->
        <div class="counter-container">
          <span class="percentage">{{ progress() }}%</span>
          <span class="counter-text"></span> 
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .preloader {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background-color: #1a1a1a;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
    }

    .preloader.slide-up {
      transform: translateY(-100%);
    }

    .loader-container {
      position: relative;
      height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    /* Text Top (WE ARE) */
    .text-top-container {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 120px; /* Increased gap */
      pointer-events: none;
      z-index: 20;
    }

    .revealing-text {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 8rem; /* Much larger text */
      font-weight: 400;
      color: white;
      opacity: 0;
      transform: translateY(40px);
      transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .revealing-text.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* Vertical Line */
    .vertical-line {
      width: 1px;
      height: 75vh; /* Occupy almost full height */
      background-color: rgba(255, 255, 255, 0.2);
      position: relative;
      overflow: hidden;
      margin: 0;
    }

    .fill {
      position: absolute;
      top: 0; /* Fill from top */
      left: 0;
      width: 100%;
      background-color: #fff;
      transition: height 0.05s linear;
    }

    /* Counter at Bottom */
    .counter-container {
      position: absolute;
      bottom: 5%; /* Position relative to screen bottom */
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      color: #fff;
      font-family: 'Inter', sans-serif;
    }

    .percentage {
      font-size: 1.5rem;
      font-weight: 500;
    }

    .counter-text {
      font-size: 0.8rem;
      opacity: 0.5;
      letter-spacing: 0.1em;
    }
  `]
})
export class PreloaderComponent implements OnInit {
  progress = signal(0);
  isComplete = signal(false);
  showText = signal(false);

  ngOnInit() {
    this.startLoading();
  }

  startLoading() {
    const duration = 1500; // Reduced from 2500 to 1500 (1.5 seconds total)
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      this.progress.set(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        this.finishLoading();
      }
    }, intervalTime);
  }

  finishLoading() {
    // Reveal text
    this.showText.set(true);

    // Slide up after a brief delay to read the text
    setTimeout(() => {
      this.isComplete.set(true);
    }, 500);
  }
}
