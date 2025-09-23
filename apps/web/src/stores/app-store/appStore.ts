import {Store, StoreBuilder, YuEventDetail} from '../../system';
import {createDefaultSurfaceState, SurfaceState} from './surfaceState';
import {SurfaceDisplayMode} from './surfaceDisplayMode';

export type AppState = {
    surfaceState: SurfaceState;
};

export type DisplayModelChangedEventDetails = { mode: SurfaceDisplayMode };

export const appStore: Store<AppState> = StoreBuilder.create<AppState>()
    .withInitialData(
        {
            surfaceState: createDefaultSurfaceState()
        })
    .withEventHandler<DisplayModelChangedEventDetails>(
        'set-display-mode',
        (appState, yuEventDetail: YuEventDetail<DisplayModelChangedEventDetails>) => {
            appState.surfaceState.displayMode = yuEventDetail.detail.mode;
        })
    .build();
