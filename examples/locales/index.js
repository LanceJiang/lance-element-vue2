import ElementLocale from 'element-ui/lib/locale'
// import element ui locale
import EnElementLocale from 'element-ui/lib/locale/lang/en'
import CNElementLocale from 'element-ui/lib/locale/lang/zh-CN'

// import adber-ui locale 公用国际化 引入
import AdbLocale from '@adber/adber-ui/src/locale'
import EnAdbLocale from '@adber/adber-ui/src/locale/lang/en'
import CNAdbLocale from '@adber/adber-ui/src/locale/lang/zh-cn'

// 正式环境使用
/* import AdbLocale from '@adber/adber-ui/lib/locale'
import EnAdbLocale from '@adber/adber-ui/lib/locale/lang/en'
import CNAdbLocale from '@adber/adber-ui/lib/locale/lang/zh-cn' */
import Vue from 'vue'
import VueI18n from 'vue-i18n'

// import defined locale
import enLocale from '@/locales/lang/en'
import zhLocale from '@/locales/lang/zh-cn'

Vue.use(VueI18n)

const messages = {
  en: {
    ...EnElementLocale,
    ...EnAdbLocale,
    ...enLocale
  },
  zh: {
    ...CNElementLocale,
    ...CNAdbLocale,
    ...zhLocale
  }
}

export const getLocale = () => {
  const cookieLanguage = 'zh'
  if (cookieLanguage) {
    document.documentElement.lang = cookieLanguage
    return cookieLanguage
  }
  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }

  return 'en'
}
// init i18n
const i18n = new VueI18n({
  locale: getLocale(),
  messages,
  silentTranslationWarn: true
})

ElementLocale.i18n((key, value) => i18n.t(key, value))
AdbLocale.i18n((key, value) => i18n.t(key, value))

export default i18n
