import type {Readable, Unsubscriber} from 'svelte/store';
import {Store} from './store/store';
import {isCustomEventOfYuEventDetail, YuEventTypeChannel, YuEventDetail} from '@yunyfi/lit-wc';

type ConnectParameters = { store: Store<any>; stateProp: string };

// A Svelte action that binds a store to a property of a custom element.
// Usage: <counter-element use:bindStoreToProp={{ store: appStore, prop: 'state' }} />
// See https://svelte.dev/docs/svelte/svelte-action
export function connect<T>(
    htmlElement: HTMLElement,
    initialParams: ConnectParameters
) {
    let unsubscribe: Unsubscriber | null = null;
    let params: ConnectParameters = initialParams;

    const setupBinding = () => {
        console.log('bindStoreToProp:setup');
        htmlElement.addEventListener(YuEventTypeChannel, onYuEvent as EventListener, {capture: true});
        let genericElement = htmlElement as any;
        if (genericElement[params.stateProp] === undefined) {
            console.warn('connect:setup, no prop found to bind updates to');
            return;
        }
        unsubscribe = params.store.subscribe((value) => {
            console.log('connect:update', value);
            genericElement[params.stateProp] = value;
        });
    }

    const cleanupBinding = () => {
        console.log('bindStoreToProp:cleanup');
        htmlElement.removeEventListener(YuEventTypeChannel, onYuEvent as EventListener, {capture: true});
        if (unsubscribe) {
            unsubscribe();
            unsubscribe = null;
        }
    }

    const onYuEvent = (e: Event) => {
        if (!isCustomEventOfYuEventDetail(e)) {
            throw new Error(`Expected event on well known channel ${YuEventTypeChannel}`);
        }
        e.stopPropagation();
        console.log(`Event ${e.detail.eventAction} intercepted for component ID ${e.detail.componentId} `)
        params.store.dispatch(e);
    };

    setupBinding();

    return {
        update(newParams: ConnectParameters) {
            console.log('bindStoreToProp:update');
            cleanupBinding();
            params = newParams;
            setupBinding();
        },
        destroy() {
            console.log('bindStoreToProp:destroy');
            cleanupBinding();
        },
    };
}
