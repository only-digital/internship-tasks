import './common.scss';
import '../src/app/js/common';
import SpoilerComponent from "../src/components/spoiler-component/spoiler-component";

// SVG
const requireAll = (r) => r.keys().forEach(r);
requireAll(require.context('../src/assets/icons', true, /\.svg$/));

