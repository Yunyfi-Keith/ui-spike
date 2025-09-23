import {
    ComponentConfiguration,
    YuButtonConfiguration,
    YuCounterConfiguration,
    YuTextInputConfiguration
} from '../../web-components';

export const getDefaultComponentState: (tagName: string) => ComponentConfiguration = (tagName: string) => {
    // TODO, make this less hardcoded (see componentMetadata.ts for ideas).
    switch (tagName) {
        case 'yu-counter':
            return {
                label: 'Counter Label',
                count: 0
            } as YuCounterConfiguration;
        case 'yu-text-input':
            return {
                label: 'Text Input Label',
                value: 'Text Input Value'
            } as YuTextInputConfiguration
        case 'yu-button':
            return {
                text: 'Click ME!',
            } as YuButtonConfiguration
    }
};