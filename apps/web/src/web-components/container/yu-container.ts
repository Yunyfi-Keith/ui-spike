import {css, html} from "lit";
import {customElement, property} from 'lit/decorators.js';
import {YuElement} from '../yuElement';
import {ComponentConfiguration} from '../componentConfiguration';

@customElement('yu-container')
export class YuContainer extends YuElement {

    @property({type: Object, attribute: false})
    accessor configuration: ComponentConfiguration;

    configurationUpdated(): void {
    }

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