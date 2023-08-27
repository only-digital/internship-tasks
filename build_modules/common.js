import './common.scss';

// SVG
const requireAll = (r) => r.keys().forEach(r);
requireAll(require.context('../src/assets/icons', true, /\.svg$/));

fetch('/form', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: 'sd', confirm: 0})
})
