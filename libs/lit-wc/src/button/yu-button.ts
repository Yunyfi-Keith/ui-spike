import {LitElement, css, html} from "lit";
import {customElement, property} from 'lit/decorators.js';
import {createYuEvent, YuEvent} from '../eventFactory';
import {YuPage} from '../page/yu-page';

export const YuButtonClickEvent: YuEvent<void> = createYuEvent('YuButton_ClickEvent');

@customElement('yu-button')
class YuButton extends LitElement {

    @property({attribute: true})
    accessor text: string = null;

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
