import {LitElement, css, html} from "lit";
import {createYuEvent, YuEvent} from '../eventFactory';

export const YuDesignerConfigureClicked: YuEvent<void> = createYuEvent('YuDesignerBase_ConfigureClick');

export class YuDesignerBase extends LitElement {
    static styles =
        css`
            .frame {
                border: 1px solid #d5d5d5;
                position: relative;
                display: inline-block; /* shrink to fit the child’s size */
                max-width: 100%;
            }

            .config-btn {
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
                cursor: pointer;
                font-size: 14px;
                line-height: 1;
            }
        `;

    render() {
        return html`
            <div>
                <div class="frame">
                    <slot></slot>
                    <button
                            class="config-btn"
                            aria-label="Configure"
                            title="Configure"
                            @click=${this.onConfigureClick}
                    >⚙</button>
                </div>
            </div>
        `;
    }

    private onConfigureClick = () => {
        this.dispatchEvent(
            YuDesignerConfigureClicked.createInstance(this.id)
        );
    };
}