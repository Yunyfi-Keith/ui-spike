import {LitElement, css, html} from "lit";
import {customElement, property} from 'lit/decorators.js';

@customElement('yu-page')
export class YuPage extends LitElement {

    @property({attribute: true})
    accessor title: string = null;

    render() {
        return html`
            <div>
                <h1>${this.title}</h1>
                <slot name="children"></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'yu-page': YuPage;
    }
}