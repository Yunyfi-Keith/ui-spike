import {Store, StoreBuilder, YuEventDetail} from '../../system';

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
    .build();
