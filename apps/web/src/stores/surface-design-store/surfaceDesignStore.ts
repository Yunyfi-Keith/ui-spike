import {createYuEvent, Store, StoreBuilder, YuEvent} from '../../system';
import * as uuid from 'uuid';
import {ComponentConfiguration, YuDesignerElementSelectedEvent} from '../../web-components';
import {getDefaultComponentState} from './componentStateFactory';

export type ComponentDesignConfig<TComponentConfig extends ComponentConfiguration = ComponentConfiguration> = {
    componentId: string,
    componentClassName: string,
    tagName: string,
    configuration: TComponentConfig,
};

export type SurfaceDesignState = {
    components: ComponentDesignConfig[];
    selectedComponent: ComponentDesignConfig,
};

export const YuSavePageEvent: YuEvent<void> = createYuEvent('YuSavePageEvent');

export const YuAddComponentEvent: YuEvent<{
    componentClassName: string,
    tagName: string
}> = createYuEvent('YuAddComponentEvent');

export const ComponentConfigUpdated: YuEvent<ComponentDesignConfig> = createYuEvent('ComponentConfigUpdated');

export const surfaceDesignStore: Store<SurfaceDesignState> = StoreBuilder.create<SurfaceDesignState>("SurfaceDesignStore")
    .withInitialState(
        <SurfaceDesignState>{
            components: [],
            selectedComponent: null
        }
    )
    .withEventHandler(YuAddComponentEvent, (state, eventData) => {
        console.log(`on_${YuAddComponentEvent.eventAction} - adding - ${eventData.data.tagName}`);

        let defaultComponentState = getDefaultComponentState(eventData.data.tagName);

        let component = {
            ...eventData.data,
            componentId: uuid.v4(),
            configuration: defaultComponentState
        };
        state.components.push(component)
    })
    .withEventHandler(YuSavePageEvent, (state, eventData) => {
        console.log(`on_${YuSavePageEvent.eventAction}`);
    })
    .withEventHandler(YuDesignerElementSelectedEvent, (state, eventData) => {
        console.log(`on_${YuDesignerElementSelectedEvent.eventAction}`);
        state.selectedComponent = state.components.find(c => c.componentId === eventData.data.componentId);
    })
    .withEventHandler(ComponentConfigUpdated, (state, eventData) => {
        console.log(`on_${ComponentConfigUpdated.eventAction}. Event data:`, eventData.data);
        let componentIndex = state.components.findIndex(c => c.componentId === eventData.data.componentId);
        state.components[componentIndex].configuration = eventData.data.configuration;
    })
    .build();
