import {html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {createYuEvent, YuEvent} from '../../system/events';
import {ComponentConfiguration} from '../componentConfiguration';
import {YuElement} from '../yuElement';

export interface CounterState {
    label: string;
    count: number;
}

export const YuCounterIncrementEvent: YuEvent<{ by: number }> = createYuEvent('YuCounterIncrementEvent');
export const YuCounterDecrementEvent: YuEvent<{ by: number }> = createYuEvent('YuCounterDecrementEvent');

export interface YuCounterConfiguration extends ComponentConfiguration {
    label: string;
    count: number;
}

@customElement('yu-counter')
export class YuCounter extends YuElement {

    @property({attribute: false})
    accessor state: CounterState = {count: 0, label: 'Label Not Set'};

    @property({ type: Object, attribute: false })
    accessor configuration: YuCounterConfiguration;

    configurationUpdated(): void {
        this.state = {
            count: this.configuration.count,
            label: this.configuration.label,
        };
    }

    render() {
        return html`
            <div class="row">
                <p>${this.state.label}</p>
                <button @click=${this.onDecrement}>-</button>
                <strong>${this.state.count}</strong>
                <button @click=${this.onIncrement}>+</button>
            </div>
        `;
    }

    private onDecrement = () => {
        this.dispatchEvent(
            YuCounterDecrementEvent.createAsCustomEvent({by: 1}, this.id)
        );
    };

    private onIncrement = () => {
        this.dispatchEvent(
            YuCounterIncrementEvent.createAsCustomEvent({by: 1}, this.id)
        );
    };


}

declare global {
    interface HTMLElementTagNameMap {
        'yu-counter': YuCounter;
    }
}