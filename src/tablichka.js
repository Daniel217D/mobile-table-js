import './tablichka.scss'

class Tablichka {
    constructor(options) {
        if (options instanceof Element || options instanceof HTMLDocument) {
            this.options = {table: options}
        } else if (typeof options === 'object' && options !== null) {
            this.options = options;
        } else {
            throw new Error('Something wrong with your options');
        }

        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('tablichka');
        this.options.table.parentNode.insertBefore(this.wrapper, options.table);
        this.wrapper.appendChild(this.options.table);

        this.shadow_l = document.createElement('div');
        this.shadow_r = document.createElement('div');

        this.shadow_l.classList.add('tablichka-shadow', 'tablichka-shadow_left');
        this.shadow_r.classList.add('tablichka-shadow', 'tablichka-shadow_right');
        this.wrapper.appendChild(this.shadow_l);
        this.wrapper.appendChild(this.shadow_r);

        this.resizeHandler();
        this.scrollHandler();

        window.addEventListener('resize', this.resizeHandler.bind(this))
        this.wrapper.addEventListener('scroll', this.scrollHandler.bind(this))
    }

    resizeHandler = () => {
        if (this.wrapper.offsetWidth >= this.options.table.offsetWidth) {
            this.wrapper.classList.add('tablichka_noshadow')
        } else {
            this.wrapper.classList.remove('tablichka_noshadow');
            this.scrollHandler();
        }
    };

    scrollHandler = () => {
        this.shadow_l.style.left = this.wrapper.scrollLeft + 'px';
        this.shadow_r.style.right = -this.wrapper.scrollLeft +'px';

        let shadow_r = this.options.table.offsetWidth - this.wrapper.offsetWidth-this.wrapper.scrollLeft;
        if(shadow_r >= 45) {
            this.shadow_r.style.boxShadow = "0 0 30px 15px black"
        } else {
            this.shadow_r.style.boxShadow = "0 0 30px "+shadow_r/3+"px black"
        }

        let shadow_l = this.wrapper.scrollLeft;
        if(shadow_l >= 45) {
            this.shadow_l.style.boxShadow = "0 0 30px 15px black"
        } else {
            this.shadow_l.style.boxShadow = "0 0 30px "+shadow_l/3+"px black"
        }
        console.log();
    }
}

export default function tablichka(options) {
    return new Tablichka(options)
}