import './common.scss';

// SVG
const requireAll = (r) => r.keys().forEach(r);
requireAll(require.context('../src/assets/icons', true, /\.svg$/));


