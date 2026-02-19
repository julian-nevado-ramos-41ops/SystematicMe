import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Logo {
  src: string;
  name: string;
  offsetY: number; // Ajuste vertical en píxeles (positivo = abajo, negativo = arriba)
}

@Component({
  selector: 'app-logo-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="carousel-header">
      <span class="bracket">[</span>
      <h2 class="carousel-title">Brands that trust us</h2>
      <span class="bracket">]</span>
      <!--<span class="arrow">▼</span>-->
    </div>
    
    <!-- Main Carousel Wrapper -->
    <div class="carousel-wrapper">
      <div class="track-container">
        <div class="track animate-scroll"
             (mouseenter)="isPaused = true"
             (mouseleave)="isPaused = false; resetAllMagnets()">
          
          <!-- Original Set -->
          <div *ngFor="let logo of logos; let i = index" 
               class="logo-item"
               style="flex-shrink: 0; display: flex; align-items: center; justify-content: center; width: 200px; height: 100px; cursor: pointer;"
               (mousemove)="handleMouseMove($event, i)" 
               (mouseleave)="handleMouseLeave(i)"
               [style.transform]="getTransform(i)">
            <img 
              [src]="logo.src" 
              [alt]="logo.name" 
              style="height: 50px; width: auto; max-width: 150px; object-fit: contain; transition: all 0.3s ease; display: block;"
              [style.transform]="'translateY(' + logo.offsetY + 'px)'"
              [style.filter]="hoveredIndex === i ? 'grayscale(0) brightness(1.2)' : 'grayscale(1) brightness(1.1)'"
              [style.opacity]="hoveredIndex === i ? '1' : '0.8'"
            />
          </div>

          <!-- Duplicate Set for Infinite Scroll -->
          <div *ngFor="let logo of logos; let i = index" 
               class="logo-item"
               style="flex-shrink: 0; display: flex; align-items: center; justify-content: center; width: 200px; height: 100px; cursor: pointer;"
               (mousemove)="handleMouseMove($event, i + logos.length)" 
               (mouseleave)="handleMouseLeave(i + logos.length)"
               [style.transform]="getTransform(i + logos.length)">
            <img 
              [src]="logo.src" 
              [alt]="logo.name" 
              style="height: 50px; width: auto; max-width: 150px; object-fit: contain; transition: all 0.3s ease; display: block;"
              [style.transform]="'translateY(' + logo.offsetY + 'px)'"
              [style.filter]="hoveredIndex === (i + logos.length) ? 'grayscale(0) brightness(1.2)' : 'grayscale(1) brightness(1.1)'"
              [style.opacity]="hoveredIndex === (i + logos.length) ? '1' : '0.8'"
            />
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .carousel-header {
      display: flex;
      align-items: center;
      justify-content: flex-start; 
      justify-content: left;
      margin-left: 6rem;
      gap: 0.5rem;
      margin-bottom: 2rem;
      color: rgba(0, 0, 0, 0.4);
      font-family: "PP Supply Mono Regular", "PP Supply Mono Regular Placeholder", monospace;
      font-size: 1.1rem;
      font-weight: 800;
      text-align: left;
    }

    .carousel-title {
      font-family: "PP Supply Mono Regular", "PP Supply Mono Regular Placeholder", monospace;
      font-size: 1.1rem;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.5);
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .bracket {
      font-size: 1.1rem;
      color: var(--color-1, #E85D04);
    }

    .arrow {
      font-size: 0.8rem;
      margin-left: 0.5rem;
      color: rgba(0, 0, 0, 0.4);
    }

    .carousel-wrapper {
      position: relative;
      width: 100%;
      max-width: none;
      margin: 2rem 0;
      overflow: hidden;
      padding: 2rem 0;
      /* Fading effect on the edges */
      mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
      -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
    }

    .track-container {
      display: flex;
      flex-direction: row;
      overflow: hidden;
      align-items: center;
    }

    .track {
      display: flex;
      flex-direction: row;
      gap: 4rem;
      flex-shrink: 0;
      align-items: center;
    }

    @media (max-width: 768px) {
      .carousel-header {
        flex-wrap: wrap;
      }
      
      .carousel-wrapper {
        padding: 1rem 0 !important;
      }
    }

    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    .animate-scroll {
      animation: scroll 180s linear infinite; /* Increased duration for a much slower, more elegant scroll */
    }

    .animate-scroll:hover {
      animation-play-state: paused;
    }

    .logo-item {
      transition: transform 0.15s ease-out;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class LogoCarouselComponent {
  transforms: { [key: number]: { x: number, y: number } } = {};
  hoveredIndex: number | null = null;
  isPaused = false;

  logos: Logo[] = [
    { src: 'img/brands/acciona_logo.svg', name: 'Acciona', offsetY: 0 },
    { src: 'img/brands/alastria_logo.png', name: 'Alastria', offsetY: 0 },
    { src: 'img/brands/altamar_logo.svg', name: 'Altamar', offsetY: 0 },
    { src: 'img/brands/antena_3_logo.svg', name: 'Antena 3', offsetY: 0 },
    { src: 'img/brands/banco_españa_logo.svg', name: 'Banco España', offsetY: 0 },
    { src: 'img/brands/banco_inglaterra_logo.svg', name: 'Bank of England', offsetY: 0 },
    { src: 'img/brands/bank_new_york_melon.svg', name: 'BNY Mellon', offsetY: 0 },
    { src: 'img/brands/bbva_logo.svg', name: 'BBVA', offsetY: 0 },
    { src: 'img/brands/cfa_logo.svg', name: 'CFA Institute', offsetY: 0 },
    { src: 'img/brands/crealsa_logo.svg', name: 'Crealsa', offsetY: 0 },
    { src: 'img/brands/edp_logo.svg', name: 'EDP', offsetY: 0 },
    { src: 'img/brands/el_mundo_logo.svg', name: 'El Mundo', offsetY: 0 },
    { src: 'img/brands/el_pais_logo.svg', name: 'El País', offsetY: 0 },
    { src: 'img/brands/ferma_logo.svg', name: 'FERMA', offsetY: 0 },
    { src: 'img/brands/forctis_logo.png', name: 'Forctis', offsetY: 0 },
    { src: 'img/brands/frutas_zelaia.png', name: 'Frutas Zelaia', offsetY: 0 },
    { src: 'img/brands/garp_logo.webp', name: 'GARP', offsetY: 0 },
    { src: 'img/brands/guardia_civil_logo.png', name: 'Guardia Civil', offsetY: 0 },
    { src: 'img/brands/icade_logo.png', name: 'ICADE', offsetY: 0 },
    { src: 'img/brands/icex_logo.png', name: 'ICEX', offsetY: 0 },
    { src: 'img/brands/icma_logo.svg', name: 'ICMA', offsetY: 0 },
    { src: 'img/brands/idb_logo.svg', name: 'IDB', offsetY: 0 },
    { src: 'img/brands/ie_logo.svg', name: 'IE University', offsetY: 0 },
    { src: 'img/brands/isms_logo.svg', name: 'ISMS Forum', offsetY: 0 },
    { src: 'img/brands/jpmorgan_logo.svg', name: 'JP Morgan', offsetY: 0 },
    { src: 'img/brands/logo-santander.svg', name: 'Santander', offsetY: 0 },
    { src: 'img/brands/logo_vozpopuli.svg', name: 'Vozpópuli', offsetY: 0 },
    { src: 'img/brands/ministerio_defensa_españa.svg', name: 'Ministerio de Defensa', offsetY: 0 },
    { src: 'img/brands/ministerio_economia_español.svg', name: 'Ministerio de Economía', offsetY: 0 },
    { src: 'img/brands/ministerio_finanzas_japon.jpg', name: 'Ministry of Finance Japan', offsetY: 0 },
    { src: 'img/brands/mnemo_logo.png', name: 'Mnemo', offsetY: 0 },
    { src: 'img/brands/moeve_logo.svg', name: 'Moeve', offsetY: 18 },
    { src: 'img/brands/morabanc_logo.png', name: 'Morabanc', offsetY: 0 },
    { src: 'img/brands/mubadala_logo.svg', name: 'Mubadala', offsetY: 0 },
    { src: 'img/brands/nebrija_logo.svg', name: 'Nebrija', offsetY: 0 },
    { src: 'img/brands/nova_talent_logo.svg', name: 'Nova Talent', offsetY: 0 },
    { src: 'img/brands/oecd_logo.svg', name: 'OECD', offsetY: 0 },
    { src: 'img/brands/oliver_wyman_logo.png', name: 'Oliver Wyman', offsetY: 0 },
    { src: 'img/brands/panasonic_logo.svg', name: 'Panasonic', offsetY: 0 },
    { src: 'img/brands/policia_nacional_logo.svg', name: 'Policía Nacional', offsetY: 0 },
    { src: 'img/brands/politecnica_madrid_logo.svg', name: 'UPM', offsetY: 0 },
    { src: 'img/brands/rentfrio_logo.png', name: 'Rentfrio', offsetY: 0 },
    { src: 'img/brands/repsol_logo.png', name: 'Repsol', offsetY: 0 },
    { src: 'img/brands/revista_car_logo.svg', name: 'Revista Car', offsetY: 0 },
    { src: 'img/brands/sacyr_logo.svg', name: 'Sacyr', offsetY: 0 },
    { src: 'img/brands/santander_assets_logo.png', name: 'Santander Asset Management', offsetY: 0 },
    { src: 'img/brands/swiss_six_logo.png', name: 'Swiss SIX', offsetY: 0 },
    { src: 'img/brands/TEDX_logo.svg', name: 'TEDx', offsetY: 0 },
    { src: 'img/brands/telefonica_logo.svg', name: 'Telefónica', offsetY: 0 },
    { src: 'img/brands/twitter_logo.svg', name: 'Twitter', offsetY: 0 },
    { src: 'img/brands/ucl_logo.svg', name: 'UCL', offsetY: 0 },
    { src: 'img/brands/unicaja_logo.svg', name: 'Unicaja', offsetY: 0 },
    { src: 'img/brands/uniper_logo.svg', name: 'Uniper', offsetY: 0 },
    { src: 'img/brands/universidad_autonoma_madrid.svg', name: 'UAM', offsetY: 0 },
    { src: 'img/brands/universidad_complutense_madrid_logo.svg', name: 'UCM', offsetY: 0 },
    { src: 'img/brands/universidad_oviedo_logo.png', name: 'Universidad de Oviedo', offsetY: 0 },
    { src: 'img/brands/wbs_logo.svg', name: 'Warwick Business School', offsetY: 0 },
    { src: 'img/brands/x_logo.svg', name: 'X', offsetY: 0 },
  ];

  handleMouseMove(e: MouseEvent, index: number) {
    this.hoveredIndex = index;
    const element = e.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    this.transforms[index] = {
      x: x / 4,
      y: y / 4
    };
  }

  handleMouseLeave(index: number) {
    this.hoveredIndex = null;
    this.transforms[index] = { x: 0, y: 0 };
  }

  resetAllMagnets() {
    Object.keys(this.transforms).forEach(key => {
      this.transforms[+key] = { x: 0, y: 0 };
    });
  }

  getTransform(index: number): string {
    const t = this.transforms[index] || { x: 0, y: 0 };
    return `translate(${t.x}px, ${t.y}px)`;
  }
}
