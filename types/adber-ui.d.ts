import Vue from 'vue'
import { AdberUIComponent, AdberUIComponentSize, AdberUIHorizontalAlignment } from './component'

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

/** The version of adber-ui */
export const version: string

export function install(vue: typeof Vue, options: InstallationOptions): void

/** AdberUI component common definition */
export type Component = AdberUIComponent

/** Component size definition for button, input, etc */
export type ComponentSize = AdberUIComponentSize

/** Horizontal alignment */
export type HorizontalAlignment = AdberUIHorizontalAlignment

/** Icon Component */
export class Icon extends AdIcon {}

/** Table Component */
export class Table extends AdTable {}





// export class FilterButtonItem extends AdbFilterButtonItem {
// }
