import {css, html} from "lit";
import {customElement, property} from 'lit/decorators.js';
import {createYuEvent, YuEvent} from '../../system';
import {ComponentConfiguration} from '../componentConfiguration';
import {YuElement} from '../yuElement';

export const YuExpanderToggledEvent: YuEvent<{ isOpen: boolean }> = createYuEvent('YuExpanderToggledEvent');

export interface YuExpanderConfiguration extends ComponentConfiguration {
    headerText: string;
    isExpanded: boolean;
}

@customElement('yu-expander')
export class YuExpander extends YuElement {
    @property({attribute: true})
    accessor headerText: string = null;

    @property({ attribute: true })
    accessor isExpanded: boolean = true;

    @property({ type: Object, attribute: false })
    accessor configuration: YuExpanderConfiguration;

    configurationUpdated(): void {
        this.headerText = this.configuration.headerText;
        this.isExpanded = this.configuration.isExpanded;
    }

    render() {
        return html`
            <div class="expander">
                <div
                    class="header"
                    role="button"
                    tabindex="0"
                    aria-expanded=${String(this.isExpanded)}
                    @click=${this.toggleOpen}
                    @keydown=${this.onKeydown}
                >
                    <slot name="header">${this.headerText}</slot>
                    <span class="chevron" aria-hidden="true">${this.isExpanded ? '▾' : '▸'}</span>
                </div>
                <div class="body" ?hidden=${!this.isExpanded}>
                    <slot name="children"></slot>
                </div>
            </div>
        `;
    }

    private toggleOpen() {
        this.isExpanded = !this.isExpanded;
        this.requestUpdate();
        this.dispatchEvent(
            YuExpanderToggledEvent.createAsCustomEvent({isOpen: this.isExpanded}, this.id)
        );
    }

    private onKeydown(e: KeyboardEvent) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.toggleOpen();
        }
    }

    static styles = css`
        .expander {
            border: 1px solid #d5d5d5;
            border-radius: 6px;
            overflow: hidden;
            background: #fff;
        }
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            padding: 8px 10px;
            cursor: pointer;
            user-select: none;
            border-bottom: 1px solid #e9e9e9;
            font-weight: 600;
            background: #f9fafb;
            outline: none;
        }
        .header:focus-visible {
            box-shadow: 0 0 0 2px #6ea8ff;
        }
        .chevron {
            font-size: 0.9rem;
            opacity: 0.75;
        }
        .body {
            padding: 10px;
        }
    `;

}

declare global {
    interface HTMLElementTagNameMap {
        'yu-expander': YuExpander;
    }
}
