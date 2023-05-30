import { t } from 'lance-element-vue2/src/locale'
export default {
  methods: {
    t(...args) {
      return t.apply(this, args)
    }
  }
}
