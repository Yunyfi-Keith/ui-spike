import {Store, StoreBuilder, YuEventDetail} from '../../system';
import {DecrementEvent, IncrementEvent} from '../../web-components';

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
    .withEventHandler(IncrementEvent,(state, eventData) => {
        console.log(`Ignoring increment event in design mode`);
    })
    .withEventHandler(DecrementEvent,(state, eventData) => {
        console.log(`Ignoring decrement event in design mode`);
    })
    .build();
