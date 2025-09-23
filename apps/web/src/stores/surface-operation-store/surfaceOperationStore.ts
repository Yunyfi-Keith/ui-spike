import {Store, StoreBuilder, YuEventDetail} from '../../system';
import {DecrementEvent, IncrementEvent} from '../../web-components';

export type SurfaceOperationState = {
    counterState: { count: number, label: string };
};

export const surfaceOperationStore: Store<SurfaceOperationState> = StoreBuilder.create<SurfaceOperationState>()
    .withInitialState(
        {
            counterState: {
                count: 2,
                label: 'Counter Label - Operation Mode'
            },
        }
    )
    .withEventHandler(IncrementEvent,(state, eventData) => {
        state.counterState.count = state.counterState.count + 1;
    })
    .withEventHandler(DecrementEvent,(state, eventData) => {
        state.counterState.count = state.counterState.count - 1;
    })
    .build();
