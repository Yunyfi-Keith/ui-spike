import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {
    isCustomEventOfYuEventDetail,
    YuEventDetail,
    YuEventTypeChannel
} from '@yunyfi/lit-wc';

@customElement('yu-store-connector')
export class YuStoreConnector extends LitElement {

    @property()
    accessor storeName: string = 'store-not-set';

    // Make host contribute no box; keep it in the DOM tree so it can hear events.
    static styles = css`:host{ display: contents; }`;

    // Render nothing
    render() { return html``; }

    // Use light DOM so bubbling events from children reach us as usual.
    protected createRenderRoot() {
        return this;
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener(YuEventTypeChannel, this._onYuEvent as EventListener, {capture: true});
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.removeEventListener(YuEventTypeChannel, this._onYuEvent as EventListener, {capture: true});
    }

    private _onYuEvent = (e: Event) => {
        if (!isCustomEventOfYuEventDetail(e)) {
            throw new Error(`Expected event on well known channel ${YuEventTypeChannel}`);
        }
        e.stopPropagation();
        const yuEventDetail: YuEventDetail<any> = e.detail;

        console.log(`Event for ${this.storeName} intercepted ${yuEventDetail.componentId} ${yuEventDetail.eventAction}`)
    };
}

declare global {
    interface HTMLElementTagNameMap {
        'yu-store-connector': YuStoreConnector;
    }
}