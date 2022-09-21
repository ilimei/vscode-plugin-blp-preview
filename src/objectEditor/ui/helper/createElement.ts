
export default function createElement(name: string, className?: string, attrs?: object) {
    const div = document.createElement(name);
    if (className) {
        div.className = className;
    }
    if (attrs) {
        Object.keys(attrs).forEach(key => {
            div.setAttribute(key, attrs[key]);
        });
    }
    return div;
}
