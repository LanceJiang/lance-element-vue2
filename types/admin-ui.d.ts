import Vue from 'vue'
import { AdminUIComponent, AdminUIComponentSize, AdminUIHorizontalAlignment } from './component'
// 相关ts声明 后续再做 todo...
import { AdIcon } from './icon'
import { AdTable } from './table'
// import { AdFormConfig } from './formConfig'

// import {AdbFilterButtonItem} from './filter';
// import './dayjs';

export interface InstallationOptions {
  locale: any;
  i18n: any;
  // size: string;
}

/** The version of admin-ui */
export const version: string

export function install(vue: typeof Vue, options: InstallationOptions): void

/** AdminUI component common definition */
export type Component = AdminUIComponent

/** Component size definition for button, input, etc */
export type ComponentSize = AdminUIComponentSize

/** Horizontal alignment */
export type HorizontalAlignment = AdminUIHorizontalAlignment

/** Icon Component */
export class Icon extends AdIcon {}

/** Table Component */
export class Table extends AdTable {}





// export class FilterButtonItem extends AdbFilterButtonItem {
// }
