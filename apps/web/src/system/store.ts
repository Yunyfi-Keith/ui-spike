import {enableMapSet} from 'immer';
import {atom as immerAtom, PreinitializedWritableAtom} from '@illuxiza/nanostores-immer'
import {isCustomEventOfYuEventDetail, isYuEvent, YuEvent, YuEventInstance} from './events';

enableMapSet();

export interface Store<TState> {
    name: string

    state: TState;

    dispatch(customEvent: CustomEvent<YuEventInstance<any>>): void;

    dispatch(yuEventDetail: YuEventInstance<any>): void;

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
    #name: string
    #eventHandlerByEventAction: Map<string, StoreEventHandler<TState, any>> = new Map();

    public static create<TState>(name: string) {
        return new StoreBuilder<TState>(name);
    }

    private constructor(name: string) {
        this.#name = name;
    }

    withInitialState(initialState: TState): this {
        this.#initialState = initialState;
        return this;
    }

    withEventHandler<TEventData>(eventAction: string, handler: StoreEventHandler<TState, YuEventInstance<TEventData>>): this;
    withEventHandler<TEventData>(yuEvent: YuEvent<TEventData>, handler: StoreEventHandler<TState, YuEventInstance<TEventData>>): this;
    withEventHandler(...args: any[]): this {
        if (isYuEvent(args[0])) {
            this.#eventHandlerByEventAction.set(args[0].eventAction, args[1]);
        } else {
            this.#eventHandlerByEventAction.set(args[0], args[1]);
        }
        return this;
    }

    build(): DefaultStore<TState> {
        return new DefaultStore<TState>(this.#name, this.#initialState, this.#eventHandlerByEventAction);
    }
}

export class DefaultStore<TState> implements Store<TState> {
    #atomStore: PreinitializedWritableAtom<TState> & object; // typings as per the nanostores library
    #eventHandlerByEventAction: Map<string, StoreEventHandler<TState, any>> = new Map();
    #name: string

    constructor(name: string, initialState: TState, eventHandlerByEventAction: Map<string, StoreEventHandler<TState, any>>) {
        this.#name = name;
        this.#atomStore = immerAtom<TState>(initialState);
        this.#eventHandlerByEventAction = eventHandlerByEventAction;
    }

    get name() {
        return this.#name;
    }

    dispatch(event: CustomEvent<YuEventInstance<any>>): void;
    dispatch(yuEventDetail: YuEventInstance<any>): void;
    dispatch(...args: any[]) {
        let yuEventDetail: YuEventInstance<any>;
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
            // `mut` handles mutation via immer and nanostores handles publishing of changes
            this.#atomStore.mut(draft => {
                handler(draft, yuEventDetail)
            });
            console.log(`Store Updated: `, this.#atomStore.get());
        }
    };

    subscribe = (subscriber: (state: TState) => void) => {
        return this.#atomStore.subscribe(subscriber);
    };

    get state() {
        return this.#atomStore.get()
    }
}