import {css, html} from "lit";
import {customElement, property} from 'lit/decorators.js';
import {createYuEvent, YuEvent} from '../../system';
import {ComponentConfiguration} from '../componentConfiguration';
import {YuElement} from '../yuElement';

export const YuButtonClickEvent: YuEvent<void> = createYuEvent('YuButtonClickEvent');

export interface YuButtonConfiguration extends ComponentConfiguration {
    text: string;
}

@customElement('yu-button')
export class YuButton extends YuElement {

    @property({attribute: true})
    accessor text: string = null;

    @property({type: Object, attribute: false})
    accessor configuration: YuButtonConfiguration;

    configurationUpdated(): void {
        this.text = this.configuration.text;
    }

    static styles =
        css`
            ::slotted(*) {
                border: 1px solid blue;
                padding: 6px;
            }
        `;

    render() {
        return html`
            <button @click=${this.onClick}>${this.text}</button>
        `;
    }

    private onClick = () => {
        this.dispatchEvent(
            YuButtonClickEvent.createAsCustomEvent(null, this.id)
        );
    };
}

declare global {
    interface HTMLElementTagNameMap {
        'yu-button': YuButton;
    }
}
