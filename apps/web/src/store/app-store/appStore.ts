import {createStore, Store, WritableStore} from '../store';
import {createDefaultSurfaceState, SurfaceState} from './surfaceState';
import {SurfaceDisplayMode} from './surfaceDisplayMode';

export type AppStore = {
    surfaceState: SurfaceState;
};

export type AppStoreActions = {
    setDisplayMode(displayMode: SurfaceDisplayMode): void;
};

export const appStore: Store<AppStore, AppStoreActions> = createStore<AppStore, AppStoreActions>(
    // Initial state
    {
        surfaceState: createDefaultSurfaceState()
    },
    // Store Actions
    (writableStore: WritableStore<AppStore>) => {
        return <AppStoreActions>{
            setDisplayMode(displayMode: SurfaceDisplayMode) {
                let store = writableStore.get();
                writableStore.set({
                    ...store,
                    surfaceState: {
                        ...store.surfaceState,
                        displayMode: displayMode
                    }
                });
            },
        }
    }
);