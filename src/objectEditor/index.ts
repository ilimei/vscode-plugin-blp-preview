import './style.less';
import { Resizer } from './ui/resizer';

const resizer = new Resizer();
resizer.appendToDom(document.querySelector('div.container')!);
resizer.appendChild(new Resizer());
resizer.appendChild(new Resizer());