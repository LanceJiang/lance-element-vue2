import Vue from 'vue'
import { LanceElementComponent, LanceElementComponentSize, LanceElementHorizontalAlignment } from './component'
// 相关ts声明 后续再做 todo...
import { LeIcon } from './icon'
import { LeTable } from './table'
// import { LeFormConfig } from './formConfig'

// import {LeFilterButtonItem} from './filter';
// import './dayjs';

export interface InstallationOptions {
  locale: any;
  i18n: any;
  // size: string;
}

/** The version of lance-element-vue2 */
export const version: string

export function install(vue: typeof Vue, options: InstallationOptions): void

/** LanceElement component common definition */
export type Component = LanceElementComponent

/** Component size definition for button, input, etc */
export type ComponentSize = LanceElementComponentSize

/** Horizontal alignment */
export type HorizontalAlignment = LanceElementHorizontalAlignment

/** Icon Component */
export class Icon extends LeIcon {}

/** Table Component */
export class Table extends LeTable {}





// export class FilterButtonItem extends LeFilterButtonItem {
// }
