import {atom as immerAtom, PreinitializedWritableAtom} from '@illuxiza/nanostores-immer'
import {isCustomEventOfYuEventDetail, isYuEvent, YuEvent, YuEventDetail} from './eventFactory';

export interface Store<TState> {
    state: TState;

    dispatch(customEvent: CustomEvent<YuEventDetail<any>>): void;

    dispatch(yuEventDetail: YuEventDetail<any>): void;

    dispatch(...args: any[]): void;

    subscribe: (subscriber: (state: TState) => void) => () => void;
}

export type StoreEventHandler<TState, TEventData> = (state: TState, eventData: TEventData) => void;


type EventHandler<TState> = {
    eventAction: string,
    handler: StoreEventHandler<TState, any>
};

export class StoreBuilder<TState> {
    #initialState: TState;
    #eventHandlerByEventAction: Map<string, StoreEventHandler<TState, any>> = new Map();

    public static create<TState>() {
        return new StoreBuilder<TState>();
    }

    withInitialState(initialState: TState): this {
        this.#initialState = initialState;
        return this;
    }

    withEventHandler<TEventData>(eventAction: string, handler: StoreEventHandler<TState, YuEventDetail<TEventData>>): this;
    withEventHandler<TEventData>(yuEvent: YuEvent<TEventData>, handler: StoreEventHandler<TState, YuEventDetail<TEventData>>): this;
    withEventHandler(...args: any[]): this {
        if (isYuEvent(args[0])) {
            this.#eventHandlerByEventAction.set(args[0].eventAction, args[1]);
        } else {
            this.#eventHandlerByEventAction.set(args[0], args[1]);
        }
        return this;
    }

    build(): DefaultStore<TState> {
        return new DefaultStore<TState>(this.#initialState, this.#eventHandlerByEventAction);
    }
}

export class DefaultStore<TState> implements Store<TState> {
    #atomStore: PreinitializedWritableAtom<TState> & object; // typings as per the nanostores library
    #eventHandlerByEventAction: Map<string, StoreEventHandler<TState, any>> = new Map();

    constructor(initialState: TState, eventHandlerByEventAction: Map<string, StoreEventHandler<TState, any>>) {
        this.#atomStore = immerAtom<TState>(initialState);
        this.#eventHandlerByEventAction = eventHandlerByEventAction;
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
        let handler = this.#eventHandlerByEventAction.get(yuEventDetail.eventAction);
        if (!handler) {
            let errorMessage = `Unknown event action ${yuEventDetail.eventAction}`;
            console.error(errorMessage);
            throw new Error(errorMessage)
        }
        if (handler) {
            // `mut` handles mutation and nanostores handles publishing of changes
            this.#atomStore.mut(draft => {
                handler(draft, yuEventDetail)
            })
        }
    };

    subscribe = (subscriber: (state: TState) => void) => {
        return this.#atomStore.subscribe(subscriber);
    };

    get state() {
        return this.#atomStore.get()
    }
}