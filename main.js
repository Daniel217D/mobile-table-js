import tablichka from './src/tablichka.js'

if (process.env.NODE_ENV === 'development') {
    import('./src/example.scss').then();
}

tablichka(document.getElementById('tablichka'));