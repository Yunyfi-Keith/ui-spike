import {atom} from 'nanostores';

export interface Store<TStore, TActions>
{
    store: TStore;
    actions: TActions;
    subscribe: (subscriber: (value: TStore) => void) => () => void;
}

export interface WritableStore<TStore> {
    get(): TStore;
    set(newStore: TStore): void;
}

export const createStore = <TStore, TStoreActions>(initialStore: TStore, createActions: (writableStore: WritableStore<TStore>) => TStoreActions): Store<TStore, TStoreActions> => {
    const $store = atom<TStore>(initialStore)
    const {subscribe} = $store;
    return {
        get store() {
            return $store.get()
        },
        actions: createActions($store),
        subscribe,
    };
};

