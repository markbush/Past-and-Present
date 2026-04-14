class ImageComparisonSlider extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.initSlider();
    }

    static get observedAttributes() {
        return ['before-src', 'after-src', 'before-alt', 'after-alt', 'before-label', 'after-label'];
    }

    attributeChangedCallback() {
        this.render();
    }

    initSlider() {
        const slider = this.shadowRoot.querySelector('.slider');
        const container = this.shadowRoot.querySelector('.container');
        
        if (slider && container) {
            slider.addEventListener('input', (e) => {
                container.style.setProperty('--position', `${e.target.value}%`);
            });
        }

        const images = this.shadowRoot.querySelectorAll('.slider-image');
        images.forEach(img => {
            if (img.complete) {
                this.updateAspectRatio(img);
            } else {
                img.onload = () => this.updateAspectRatio(img);
            }
        });
    }

    updateAspectRatio(img) {
        const container = this.shadowRoot.querySelector('.image-container');
        if (container && img.naturalWidth && img.naturalHeight) {
            const aspectRatio = img.naturalWidth / img.naturalHeight;
            container.style.setProperty('--aspect-ratio', aspectRatio.toString());
        }
    }

    render() {
        const beforeSrc = this.getAttribute('before-src') || '';
        const afterSrc = this.getAttribute('after-src') || '';
        const beforeAlt = this.getAttribute('before-alt') || 'Before';
        const afterAlt = this.getAttribute('after-alt') || 'After';
        const beforeLabel = this.getAttribute('before-label') || '';
        const afterLabel = this.getAttribute('after-label') || '';

        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                width: 100%;
                margin: 1rem 0;
            }
            .container {
                position: relative;
                display: grid;
                place-content: center;
                --position: 50%;
                width: 100%;
            }
            .image-container {
                max-width: 100%;
                width: 100%;
                aspect-ratio: var(--aspect-ratio, 16/9);
                position: relative;
                overflow: hidden;
                border-radius: 0.5rem;
                box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            }
            .slider-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
            }
            .image-before {
                position: absolute;
                inset: 0;
                width: var(--position);
                z-index: 1;
                object-position: left;
            }
            .slider {
                position: absolute;
                inset: 0;
                cursor: pointer;
                opacity: 0;
                width: 100%;
                height: 100%;
                z-index: 10;
                margin: 0;
            }
            .slider-line {
                position: absolute;
                inset: 0;
                width: 2px;
                height: 100%;
                background-color: white;
                z-index: 2;
                left: var(--position);
                transform: translateX(-50%);
                pointer-events: none;
                box-shadow: 0 0 10px rgba(0,0,0,0.5);
            }
            .slider-button {
                position: absolute;
                background-color: white;
                color: black;
                padding: 0.5rem;
                border-radius: 50%;
                display: grid;
                place-content: center;
                z-index: 3;
                top: 50%;
                left: var(--position);
                transform: translate(-50%, -50%);
                pointer-events: none;
                box-shadow: 0 0 10px rgba(0,0,0,0.5);
            }
            .labels {
                display: flex;
                justify-content: space-between;
                margin-top: 0.5rem;
                font-size: 0.875rem;
                font-weight: bold;
                color: var(--pico-color, #444);
            }
            .attribution {
                margin-top: 0.25rem;
                font-size: 0.75rem;
                font-style: italic;
                color: var(--pico-muted-color, #666);
                text-align: center;
            }
        </style>
        <div class="container">
            <div class="image-container">
                <img class="image-before slider-image" src="${beforeSrc}" alt="${beforeAlt}">
                <img class="image-after slider-image" src="${afterSrc}" alt="${afterAlt}">
            </div>
            <input type="range" min="0" max="100" value="50" aria-label="Percentage of before photo shown" class="slider">
            <div class="slider-line" aria-hidden="true"></div>
            <div class="slider-button" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                    <line x1="128" y1="40" x2="128" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
                    <polyline points="48 160 16 128 48 96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline>
                    <polyline points="208 96 240 128 208 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline>
                </svg>
            </div>
        </div>
        <div class="labels">
            <span>${beforeLabel}</span>
            <span>${afterLabel}</span>
        </div>
        <div class="attribution">
            <slot name="attribution"></slot>
        </div>
        `;
    }
}

customElements.define('image-comparison-slider', ImageComparisonSlider);
