import type {Readable, Unsubscriber} from 'svelte/store';
import {Store} from './store/store';

type ConnectParameters = { store: Store<any, any>; stateProp: string, actionsProp: string  };

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
        (htmlElement as any)[params.actionsProp] = params.store.actions;
        unsubscribe = params.store.subscribe((value) => {
            console.log('bindStoreToProp:update', value);
            (htmlElement as any)[params.stateProp] = value;
        });
    }

    const cleanupBinding = () => {
        console.log('bindStoreToProp:cleanup');
        (htmlElement as any)[params.actionsProp] = null;
        if (unsubscribe) {
            unsubscribe();
            unsubscribe = null;
        }
    }

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
