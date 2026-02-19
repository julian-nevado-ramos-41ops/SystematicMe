import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-contact-us',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
    // Inputs for customization
    addressLines = input<string[]>(['C. de Pradillo, 68', '28002 Madrid, Spain']);
    linkedinUrl = input<string>('https://es.linkedin.com/company/scitheworld');
    mapUrl = input<string>('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.215569477028!2d-3.6761081!3d40.448518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4228e939d8888b%3A0x6a0c56e30096956!2sC.%20de%20Pradillo%2C%2068%2C%20Chamart%C3%ADn%2C%2028002%20Madrid!5e0!3m2!1ses!2ses!4v1740000000000!5m2!1ses!2ses');

    // Theme customization if needed
    backgroundColor = input<string>('#0d0d0d');
    textColor = input<string>('#ffffff');

    constructor(private sanitizer: DomSanitizer) { }

    get safeMapUrl(): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.mapUrl());
    }

    openLinkedin() {
        window.open(this.linkedinUrl(), '_blank', 'noopener,noreferrer');
    }
}
