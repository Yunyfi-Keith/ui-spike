import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {createYuEvent, YuEvent} from '../../system/eventFactory';
import {ComponentConfiguration} from '../componentConfiguration';

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
export class YuCounter extends LitElement {

    @property({attribute: false})
    accessor state: CounterState = {count: 0, label: 'Label Not Set'};

    @property({ type: Object, attribute: false })
    accessor configuration: YuCounterConfiguration;

    // this wasn't firing as my ts config was incorrect
    // I had to set this tsconfig prop: `"useDefineForClassFields": false` https://lit.dev/docs/components/properties/#avoiding-issues-with-class-fields
    // Something to do with how state is bound or set, I need to better read that above link.
    updated(changed: Map<string, unknown>) {
        // if (changed.has('state')) {
        //     // If the store pushed a new state, we can update any derived state here
        //     this._internalCount = this.state.count;
        // }
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