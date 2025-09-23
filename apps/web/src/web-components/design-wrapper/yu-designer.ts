import {css, html} from "lit";
import {createYuEvent, YuEvent} from '../../system';
import {customElement, property} from 'lit/decorators.js';
import {YuElement} from '../yuElement';
import {ComponentConfiguration} from '../componentConfiguration';

export const YuDesignerElementSelectedEvent: YuEvent<{
    componentId: string
}> = createYuEvent('YuDesignerElementSelectedEvent');

@customElement('yu-designer')
export class YuDesigner extends YuElement {
    @property({attribute: true})
    accessor componentId: string = null;

    @property({type: Object, attribute: false})
    accessor configuration: ComponentConfiguration;

    configurationUpdated(): void {

    }

    static styles =
        css`
            .frame {
                border: 1px solid #d5d5d5;
                position: relative;
                display: inline-block; /* shrink to fit the child’s size */
                max-width: 100%;
            }

            .drag-handle {
                position: absolute;
                top: 4px;
                right: 4px;
                width: 28px;
                height: 28px;
                display: inline-grid;
                place-items: center;
                border: 1px solid #d9d9d9;
                background: #f7f7f7;
                color: #444;
                border-radius: 6px;
                cursor: grab;
                font-size: 14px;
                line-height: 1;
                user-select: none;
            }

            .drag-handle:active {
                cursor: grabbing;
            }
        `;

    render() {
        return html`
            <div @click=${this.onSelected}>
                <div class="frame">
                    <slot></slot>
                    <button
                            class="drag-handle"
                            type="button"
                            draggable="true"
                            aria-label="Drag"
                            title="Drag"
                    >⋮⋮
                    </button>
                </div>

            </div>
        `;
    }

    private onSelected = () => {
        this.dispatchEvent(
            YuDesignerElementSelectedEvent.createAsCustomEvent({componentId: this.componentId}, this.id)
        );
    };
}

declare global {
    interface HTMLElementTagNameMap {
        'yu-designer': YuDesigner;
    }
}
