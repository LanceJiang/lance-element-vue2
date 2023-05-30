import Vue from 'vue'

/** AdminUI component common definition */
export declare class AdminUIComponent extends Vue {
  /** Install component into Vue */
  static install (vue: typeof Vue): void
}

/** Component size definition for button, input, etc */
export type AdminUIComponentSize = 'large' | 'medium' | 'small' | 'mini'

/** Horizontal alignment */
export type AdminUIHorizontalAlignment = 'left' | 'center' | 'right'
