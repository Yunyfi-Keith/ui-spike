import {html, literal} from 'lit/static-html.js';

export const selectionWrapper = (onSelected: () => void) => {
    return html`<div @click=${onSelected}>
        <slot name="children"></slot>
    </div>`;
}