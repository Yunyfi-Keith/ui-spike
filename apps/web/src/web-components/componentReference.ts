import {YuButton} from './button/yu-button';
import {YuContainer} from './container';
import {YuCounter} from './counter/yu-counter';
import {YuExpander} from './expander/yu-expander';
import {YuPage} from './page/yu-page';
import {YuTextInput} from './text-input/yu-text-input';

export type ComponentMetadata = {
    className: string,
    tagName: string,
}

let allComponents = [YuButton, YuContainer, YuCounter, YuExpander, YuPage, YuTextInput];

export const componentsMetadata = allComponents.map(component => ({
        className: component.name,
        tagName: customElements.getName(component),
    } as ComponentMetadata)
);

export const componentsMetadataByComponentClassName = componentsMetadata.reduce(
    (lookup, componentMetadata) => {
        lookup[componentMetadata.className] = componentMetadata
        return lookup;
    },
    {}
);