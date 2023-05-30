import Vue from 'vue'

/** LanceElement component common definition */
export declare class LanceElementComponent extends Vue {
  /** Install component into Vue */
  static install (vue: typeof Vue): void
}

/** Component size definition for button, input, etc */
export type LanceElementComponentSize = 'large' | 'medium' | 'small' | 'mini'

/** Horizontal alignment */
export type LanceElementHorizontalAlignment = 'left' | 'center' | 'right'
