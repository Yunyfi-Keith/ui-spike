import {Store, StoreBuilder} from '../../system';
import {YuCounterDecrementEvent, YuCounterIncrementEvent} from '../../web-components/';

export type SurfaceOperationState = {
    counterState: { count: number, label: string };
};

export const surfaceOperationStore: Store<SurfaceOperationState> = StoreBuilder.create<SurfaceOperationState>("SurfaceOperationStore")
    .withInitialState(
        {
            counterState: {
                count: 2,
                label: 'Counter Label - Operation Mode'
            },
        }
    )
    .withEventHandler(YuCounterIncrementEvent,(state, eventData) => {
        state.counterState.count = state.counterState.count + 1;
    })
    .withEventHandler(YuCounterDecrementEvent,(state, eventData) => {
        state.counterState.count = state.counterState.count - 1;
    })
    .build();
