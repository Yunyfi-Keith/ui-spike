import {Store, StoreBuilder, YuEventInstance} from '../../system';
import {SurfaceDisplayMode} from './surfaceDisplayMode';

export type AppState = {
    displayMode: SurfaceDisplayMode;
};

export type DisplayModelChangedEventDetails = { mode: SurfaceDisplayMode };

export const appStore: Store<AppState> = StoreBuilder.create<AppState>("AppStore")
    .withInitialState(
        {
            displayMode: SurfaceDisplayMode.Design
        })
    .withEventHandler<DisplayModelChangedEventDetails>(
        'set-display-mode',
        (appState, yuEventDetail: YuEventInstance<DisplayModelChangedEventDetails>) => {
            appState.displayMode = yuEventDetail.data.mode;
        })
    .build();
