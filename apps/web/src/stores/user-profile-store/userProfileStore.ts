import {createYuEvent, Store, StoreBuilder, YuEvent, YuEventInstance} from '../../system';

export type UserProfileState = {
    userName: string;
    status: string[];
    selectedStatus: string;
};

export const YuToggleStatusEvent: YuEvent<void> = createYuEvent('YuToggleStatusEvent');

export const userProfileStore: Store<UserProfileState> = StoreBuilder.create<UserProfileState>("UserProfileStore")
    .withInitialState(
        {
            userName: "Bob Jane",
            status: ['happy', 'very happy', 'extremely happy', 'sad', 'very sad', 'extremely sad'],
            selectedStatus: 'click to set'
        }
    )
    .withEventHandler(YuToggleStatusEvent, (userProfileState, yuEventDetail: YuEventInstance<void>) => {
        userProfileState.selectedStatus = userProfileState.status[Date.now() % userProfileState.status.length]
    })
    .build();