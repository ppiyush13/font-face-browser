import {version} from '../package.json';

export default function styleInject(css, { insertAt } = {}) {
    if (!css || typeof document === 'undefined') return

    const head = document.head || document.getElementsByTagName('head')[0]
    const style = document.createElement('style')
    style.type = 'text/css';
    style.setAttribute('data-font-face-browser', '');
    style.setAttribute('data-version', version);

    if (insertAt === 'top') {
        if (head.firstChild) {
            head.insertBefore(style, head.firstChild)
        } else {
            head.appendChild(style)
        }
    } 
    else {
        head.appendChild(style)
    }

    if (style.styleSheet) {
        style.styleSheet.cssText = css
    } 
    else {
        style.appendChild(document.createTextNode(css))
    }
}