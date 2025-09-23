import {Store, StoreBuilder, YuEventDetail} from '../../system';

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
    .build();
