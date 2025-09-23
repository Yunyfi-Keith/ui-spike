import {Store, StoreBuilder, YuEventInstance} from '../../system';
import {YuCounterDecrementEvent, YuCounterIncrementEvent, YuExpanderToggledEvent} from '../../web-components';

export type SurfaceDesignState = {
    counterState: { count: number, label: string };
};

export const surfaceDesignStore: Store<SurfaceDesignState> = StoreBuilder.create<SurfaceDesignState>()
    .withInitialState(
        {
            counterState: {
                count: 2,
                label: 'Counter Label - Design Mode'
            },
        }
    )
    .withEventHandler(YuCounterIncrementEvent,(state, eventData) => {
        console.log(`Ignoring increment event in design mode`);
    })
    .withEventHandler(YuCounterDecrementEvent,(state, eventData) => {
        console.log(`Ignoring decrement event in design mode`);
    })
    .withEventHandler(YuExpanderToggledEvent,(state, eventData) => {
        console.log(`Ignoring decrement event in design mode`);
    })
    .build();
