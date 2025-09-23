import {Store, StoreBuilder, YuEventDetail} from '../../system';

export type UserProfileState = {
    userName: string;
    moods: string[];
    selectedMode: string;
};

export const userProfileStore: Store<UserProfileState> = StoreBuilder.create<UserProfileState>()
    .withInitialState(
        {
            userName: "Bob Jane",
            moods: ['happy', 'very happy', 'extremely happy', 'sad', 'very sad', 'extremely sad'],
            selectedMode: 'click me'
        }
    )
    .withEventHandler('update-mood', (userProfileState, yuEventDetail: YuEventDetail<void>) => {
        userProfileState.selectedMode = userProfileState.moods[Date.now() % userProfileState.moods.length]
    })
    .build();