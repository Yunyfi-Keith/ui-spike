import {isCustomEventOfYuEventDetail, YuCustomEventChannel, Store} from './system';

export type ConnectParameters = { store: Store<any>; stateProp: string };

export function connect<T>(
    htmlElement: HTMLElement,
    initialParams: ConnectParameters
) {
    let unsubscribe: () => void | null = null;
    let params: ConnectParameters = initialParams;

    const setupBinding = () => {
        console.log('bindStoreToProp:setup');
        htmlElement.addEventListener(YuCustomEventChannel, onYuEvent as EventListener, {capture: true});
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
        htmlElement.removeEventListener(YuCustomEventChannel, onYuEvent as EventListener, {capture: true});
        if (unsubscribe) {
            unsubscribe();
            unsubscribe = null;
        }
    }

    const onYuEvent = (e: Event) => {
        if (!isCustomEventOfYuEventDetail(e)) {
            let errorMessage = `Unexpected event on well known channel ${YuCustomEventChannel}`;
            console.error(errorMessage, e);
            throw new Error(errorMessage);
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