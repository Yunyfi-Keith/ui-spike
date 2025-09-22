import {customElement} from 'lit/decorators.js';
import {YuDesignerBase} from '../design-wrapper/yu-designer-base';

@customElement('yu-text-input-designer')
export class YuTextInputDesigner extends YuDesignerBase {

}

declare global {
    interface HTMLElementTagNameMap {
        'yu-text-input-designer': YuTextInputDesigner;
    }
}