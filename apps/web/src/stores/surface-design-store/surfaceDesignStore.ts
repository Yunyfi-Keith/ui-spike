import {createYuEvent, Store, StoreBuilder, YuEvent, YuEventInstance} from '../../system';

export type SurfaceDesignState = {
    components: { componentClassName: string, tagName: string }[];
};

export const YuSavePageEvent: YuEvent<void> = createYuEvent('YuSavePageEvent');
export const YuAddComponentEvent: YuEvent<{
    componentClassName: string,
    tagName: string
}> = createYuEvent('YuAddComponentEvent');

export const surfaceDesignStore: Store<SurfaceDesignState> = StoreBuilder.create<SurfaceDesignState>()
    .withInitialState(
        {
            components: []
        }
    )
    .withEventHandler(YuAddComponentEvent, (state, eventData) => {
        console.log(`on_${YuAddComponentEvent.eventAction} - adding - ${eventData.data.tagName}`);
        state.components.push(eventData.data)
    })
    .withEventHandler(YuSavePageEvent, (state, eventData) => {
        console.log(`on_${YuSavePageEvent.eventAction}`);
    })
    .build();
