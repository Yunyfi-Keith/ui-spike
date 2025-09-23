import {LitElement, PropertyValues} from 'lit';
import {ComponentConfiguration} from './componentConfiguration';

export abstract class YuElement extends LitElement{

    abstract accessor configuration: ComponentConfiguration;

    protected willUpdate(changed: PropertyValues<this>) {
        if (changed.has('configuration')) {
            this.configurationUpdated();
        }
    }

    abstract configurationUpdated(): void;
}