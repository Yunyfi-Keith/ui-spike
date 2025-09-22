import {LitElement, css, html} from "lit";
import {customElement, property} from 'lit/decorators.js';

@customElement('yu-container')
class YuContainer extends LitElement {
    static styles = css`
        div {
            border: 1px solid #d5d5d5;
            padding: 10px;
        }
    `;

    render() {
        return html`
            <div>
                <slot name="children"></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'yu-container': YuContainer;
    }
}