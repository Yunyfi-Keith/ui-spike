import {LitElement, css, html} from "lit";
import {customElement, property} from 'lit/decorators.js';
import {ComponentConfiguration} from '../componentConfiguration';

export interface YuPageConfiguration extends ComponentConfiguration {
    title: string;
}

// export interface YuPageConfiguration extends ComponentConfiguration, Pick<YuPage, 'title'>
// {
// }

@customElement('yu-page')
export class YuPage extends LitElement {

    @property({attribute: true})
    accessor title: string = null;

    @property({ type: Object, attribute: false })
    accessor configuration: YuPageConfiguration;

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