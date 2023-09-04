import './common.scss';
import '../src/app/js/common';

// SVG
const requireAll = (r) => r.keys().forEach(r);
requireAll(require.context('../src/assets/icons', true, /\.svg$/));
