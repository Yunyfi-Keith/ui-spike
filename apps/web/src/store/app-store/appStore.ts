import {Store, StoreBuilder} from '../store';
import {createDefaultSurfaceState, SurfaceState} from './surfaceState';
import {SurfaceDisplayMode} from './surfaceDisplayMode';

export type AppStore = {
    surfaceState: SurfaceState;
};

export type AppStoreActions = {
    setDisplayMode(displayMode: SurfaceDisplayMode): void;
};

export const appStore: Store<AppStore> = StoreBuilder.create<AppStore>()
    .withInitialData(
        {
            surfaceState: createDefaultSurfaceState()
        })
    .withEventHandler<{ mode: SurfaceDisplayMode }>(
        'set-display-mode',
        (data, yuEventDetail) => {
            data.surfaceState.displayMode = yuEventDetail.mode;
        })
    .build();
