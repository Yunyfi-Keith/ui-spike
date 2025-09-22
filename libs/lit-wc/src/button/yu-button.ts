import {LitElement, css, html} from "lit";
import {customElement, property} from 'lit/decorators.js';
import {createYuEvent, YuEvent} from '../eventFactory';
import {ComponentConfiguration} from '../componentConfiguration';

export const YuButtonClickEvent: YuEvent<void> = createYuEvent('YuButton_ClickEvent');

export interface YuButtonConfiguration extends ComponentConfiguration {
    text: string;
}

@customElement('yu-button')
class YuButton extends LitElement {

    @property({attribute: true})
    accessor text: string = null;

    @property({ type: Object, attribute: false })
    accessor configuration: YuButtonConfiguration;

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
            YuButtonClickEvent.createInstance(this.id)
        );
    };
}

declare global {
    interface HTMLElementTagNameMap {
        'yu-button': YuButton;
    }
}
