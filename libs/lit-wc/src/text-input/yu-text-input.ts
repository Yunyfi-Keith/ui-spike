import {LitElement, css, html} from "lit";
import {customElement, property} from 'lit/decorators.js';
import {createYuEvent, YuEvent} from '../eventFactory';
import {ComponentConfiguration} from '../componentConfiguration';

export const YuTextInputTextChangedEvent: YuEvent<void> = createYuEvent('YuTextInput_ClickEvent');

export interface YuTextInputConfiguration extends ComponentConfiguration {
    label: string;
    value: string;
}

@customElement('yu-text-input')
export class YuTextInput extends LitElement {
    @property({attribute: true})
    accessor label: string = null;

    @property({attribute: true})
    accessor value: string = null;

    @property({ type: Object, attribute: false })
    accessor configuration: YuTextInputConfiguration;

    static styles =
        css`
            ::slotted(*) {
                border: 1px solid blue;
                padding: 6px;
            }
        `;

    render() {
        return html`
            <div>
                <p>${this.label}</p>
                <input id="my-id" type="text" value="${this.value}"></input>
            </div>
        `;
    }

    private onClick = () => {
        this.dispatchEvent(
            YuTextInputTextChangedEvent.createInstance(this.id)
        );
    };
}

declare global {
    interface HTMLElementTagNameMap {
        'yu-text-input': YuTextInput;
    }
}