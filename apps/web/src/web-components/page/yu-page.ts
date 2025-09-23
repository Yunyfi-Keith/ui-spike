import {html} from "lit";
import {customElement, property} from 'lit/decorators.js';
import {ComponentConfiguration} from '../componentConfiguration';
import {YuElement} from '../yuElement';

export interface YuPageConfiguration extends ComponentConfiguration {
    title: string;
}

@customElement('yu-page')
export class YuPage extends YuElement {
    @property({attribute: true})
    accessor title: string = null;

    @property({ type: Object, attribute: false })
    accessor configuration: YuPageConfiguration;

    configurationUpdated(): void {
        this.title = this.configuration.title;
    }

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