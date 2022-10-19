// import { t } from '@adber/adber-ui/src/locale'
import { t } from 'adber-ui-demo/src/locale'
export default {
  methods: {
    t(...args) {
      return t.apply(this, args)
    }
  }
}
