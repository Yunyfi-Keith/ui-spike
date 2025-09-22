import {atom as immerAtom, PreinitializedWritableAtom} from '@illuxiza/nanostores-immer'
import {YuEventDetail, isCustomEventOfYuEventDetail} from '@yunyfi/lit-wc';

export interface Store<TData> {
    data: TData;

    dispatch(customEvent: CustomEvent<YuEventDetail<any>>): void;

    dispatch(yuEventDetail: YuEventDetail<any>): void;

    dispatch(...args: any[]): void;

    subscribe: (subscriber: (value: TData) => void) => () => void;
}

type EventHandler<TData> = {
    eventAction: string,
    handler: (data: TData, eventData: any) => void
};

export class StoreBuilder<TData> {
    #initialData: TData;
    #handlers: EventHandler<TData>[];

    public static create<TData>() {
        return new StoreBuilder<TData>();
    }

    withInitialData(initialStore: TData): this {
        this.#initialData = initialStore;
        return this;
    }

    withEventHandler<TEventData>(eventAction: string, handler: (data: TData, eventData: TEventData) => void): this {
        this.#handlers.push({eventAction, handler});
        return this;
    }

    build(): DefaultStore<TData> {
        return new DefaultStore<TData>(this.#initialData, this.#handlers);
    }
}

export class DefaultStore<TData> implements Store<TData> {
    #atomStore: PreinitializedWritableAtom<TData> & object;
    #handlerByEventAction: Map<string, (data: TData) => void>;

    constructor(initialData: TData, eventHandlers: EventHandler<TData>[]) {
        this.#atomStore = immerAtom<TData>(initialData);
        this.#handlerByEventAction = eventHandlers.reduce((map, currentItem) => {
            map.set(currentItem.eventAction, currentItem.handler); // Use currentItem.id as the key
            return map;
        }, new Map());
    }

    dispatch(event: CustomEvent<YuEventDetail<any>>): void;
    dispatch(yuEventDetail: YuEventDetail<any>): void;
    dispatch(...args: any[]) {
        let yuEventDetail: YuEventDetail<any>;
        if (isCustomEventOfYuEventDetail(args[0])) {
            yuEventDetail = args[0].detail;
        } else {
            yuEventDetail = args[0];
        }
        let handler = this.#handlerByEventAction.get(yuEventDetail.eventAction);
        if (!handler) {
            let errorMessage = `Unknown event action ${yuEventDetail.eventAction}`;
            console.error(errorMessage);
            throw new Error(errorMessage)
        }
        if (handler) {
            // handles mutation and publishing of changes
            this.#atomStore.mut(draft => {
                handler(draft)
            })
        }
    };

    subscribe = (subscriber: (value: TData) => void) => {
        return this.#atomStore.subscribe(subscriber);
    };

    get data() {
        return this.#atomStore.get()
    }
}