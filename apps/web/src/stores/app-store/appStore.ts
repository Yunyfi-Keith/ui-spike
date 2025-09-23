import {Store, StoreBuilder, YuEventDetail} from '../../system';
import {SurfaceDisplayMode} from './surfaceDisplayMode';

export type AppState = {
    displayMode: SurfaceDisplayMode;
};

export type DisplayModelChangedEventDetails = { mode: SurfaceDisplayMode };

export const appStore: Store<AppState> = StoreBuilder.create<AppState>()
    .withInitialState(
        {
            displayMode: SurfaceDisplayMode.Design
        })
    .withEventHandler<DisplayModelChangedEventDetails>(
        'set-display-mode',
        (appState, yuEventDetail: YuEventDetail<DisplayModelChangedEventDetails>) => {
            appState.displayMode = yuEventDetail.detail.mode;
        })
    .build();
