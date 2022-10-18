import Vue from 'vue'

/** AdberUI component common definition */
export declare class AdberUIComponent extends Vue {
  /** Install component into Vue */
  static install (vue: typeof Vue): void
}

/** Component size definition for button, input, etc */
export type AdberUIComponentSize = 'large' | 'medium' | 'small' | 'mini'

/** Horizontal alignment */
export type AdberUIHorizontalAlignment = 'left' | 'center' | 'right'
