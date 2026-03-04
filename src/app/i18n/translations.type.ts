export interface Translations {
    nav: {
        aboutUs: string;
        programs: string;
        theRoad: string;
        theGroup: string;
        contact: string;
    };
    hero: {
        title: string;
        subtitle: string;
        description: string;
    };
    partStw: {
        titleHtml: string;
        description: string;
    };
    verticalSections: {
        section1: {
            title: string;
            modalContent: string;
        };
        section2: {
            title: string;
            card1Title: string;
            card1Content: string;
            card2Title: string;
            card2Content: string;
        };
        section3: {
            title: string;
            modalContent: string;
        };
        section4: {
            title: string;
            modalContent: string;
        };
    };
    horizontalSections: {
        section1: {
            title: string;
            modalContent: string;
        };
        section2: {
            title: string;
            modalContent: string;
        };
        section3: {
            title: string;
            card1Title: string;
            card1Content: string;
            card2Title: string;
            card2Content: string;
        };
        section4: {
            title: string;
            card1Title: string;
            card1Content: string;
            card2Title: string;
            card2Content: string;
        };
        section5: {
            title: string;
            modalContent: string;
        };
        section6: {
            title: string;
            modalContent: string;
        };
        section7: {
            title: string;
            modalContent: string;
            contentHtml: string;
        };
    };
    roadmap: {
        title: string;
        joinModal: {
            title: string;
            subtitle: string;
            nameLabel: string;
            namePlaceholder: string;
            emailLabel: string;
            emailPlaceholder: string;
            monthLabel: string;
            monthPlaceholder: string;
            monthSep: string;
            monthFeb: string;
            submitBtn: string;
            successTitle: string;
            successSubtitle: string;
        };
        program1: {
            title: string;
            items: {
                nature: { name: string; content: string };
                narrative: { name: string; content: string };
                material: { name: string; content: string };
                coreDimensions: { name: string; content: string };
                distribution: { name: string; content: string };
                modules: { name: string; content: string };
                pills: { name: string; content: string };
                price: { name: string; content: string };
                availability: { name: string; content: string };
            }
        };
        program2: {
            title: string;
            items: {
                nature: { name: string; content: string };
                narrative: { name: string; content: string };
                material: { name: string; content: string };
                coreDimensions: { name: string; content: string };
                distribution: { name: string; content: string };
                modules: { name: string; content: string };
                pills: { name: string; content: string };
                customQa: { name: string; content: string };
                price: { name: string; content: string };
                availability: { name: string; content: string };
            }
        };
    };
    newsroom: {
        title: string;
        seeMore: string;
        tableHeaders: {
            date: string;
            company: string;
            title: string;
            summary: string;
            howAiSeesUs: string;
        };
        items: {
            date: string;
            company: string;
            title: string;
            summary: string;
            howAiSeesUs?: string;
            isMain?: boolean;
            isFeatured?: boolean;
        }[];
    };
    contactUs: {
        title: string;
        address: string[];
    };
    footer: {
        isoText: string;
        copyright: (year: number) => string;
    };
    cookieBanner: {
        title: string;
        text: string;
        customizeBtn: string;
        rejectBtn: string;
        acceptBtn: string;
        saveBtn: string;
        categories: {
            necessary: { name: string; description: string; label: string };
            analytics: { name: string; description: string };
            marketing: { name: string; description: string };
        };
        on: string;
        off: string;
    };
    preloader: {
        word1: string;
        word2: string;
    };
    awardsList: {
        title1: string;
        title2: string;
        subtitle: string;
        awards: {
            name: string;
            category: string;
            project: string;
            year: string;
        }[];
    };
    common: {
        seeMore: string;
    };
}
