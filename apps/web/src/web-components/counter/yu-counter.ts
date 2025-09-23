import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {createYuEvent, YuEvent} from '../../system/eventFactory';
import {ComponentConfiguration} from '../componentConfiguration';

export interface CounterState {
    label: string;
    count: number;
}

export const IncrementEvent: YuEvent<{ by: number }> = createYuEvent('YuCounter_Increment');
export const DecrementEvent: YuEvent<{ by: number }> = createYuEvent('YuCounter_Decrement');

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
            DecrementEvent.createInstance(this.id, {by: 1})
        );
    };

    private onIncrement = () => {
        this.dispatchEvent(
            IncrementEvent.createInstance(this.id, {by: 1})
        );
    };


}

declare global {
    interface HTMLElementTagNameMap {
        'yu-counter': YuCounter;
    }
}