import { t } from 'adber-ui/locale'
// todo test local 多语言
export default {
  methods: {
    t(...args) {
      return t.apply(this, args)
    }
  }
}
