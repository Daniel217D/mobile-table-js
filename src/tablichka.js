import './tablichka.scss'

class Tablichka {
    constructor (options) {
        if (options instanceof Element || options instanceof HTMLDocument) {
            options = {table: options}
        }

        const wrapper = document.createElement('div');
        wrapper.classList.add('tablichka');
        options.table.parentNode.insertBefore(wrapper,options.table);
        wrapper.appendChild(options.table);
    }
}

export default function tablichka (options) {
    return new Tablichka(options)
}