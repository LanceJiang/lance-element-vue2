<template>
  <div
    :class="{ pdfPreviewWrap: true, 'pdfPreviewWrap-loading': loading }"
    ref="pdfViewerContainer"
    v-loading="loading"
  ></div>
</template>

<script>
import PDFJS from 'pdfjs-dist'

PDFJS.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.min.js')

// console.error(process.env.NODE_ENV, 'NODE_ENV   env', process.env)

const props = {
  // id: {
  //   type: String,
  //   default: `pdf_${Math.random().toString().slice(-10)}_${+new Date()}`,
  // },
  /**
   * pdf缩放比例
   */
  scale: {
    type: Number,
    default: 1
  },
  /**
   * pdf文件路径
   */
  url: {
    type: String,
    default: ''
  }
}
// pdf 渲染
const renderPdfPage = (pdfViewerContainer, pdfDoc, pageNum, scale) => {
  // 创建画布
  const canvas = document.createElement('canvas')
  pdfViewerContainer.appendChild(canvas)
  const context = canvas.getContext('2d')
  pdfDoc.getPage(pageNum).then((page) => {
    // 获取当前pdf页内容, 并设置缩放
    const viewport = page.getViewport({ scale })
    const realCanvas = context.canvas
    realCanvas.width = viewport.width
    realCanvas.height = viewport.height
    // 将pdf当前页内容画到2d画板中
    page.render({ canvasContext: context, viewport })
  })
}
export default {
  name: 'AdPdfPreview',
  props,
  data() {
    return {
      loading: false
    }
  },
  created() {
    this.pdfDoc = null
    this.$nextTick(() => {
      this.loadPdfFile(this.url)
    })
  },
  watch: {
    url: 'loadPdfFile'
  },
  methods: {
    async loadPdfFile(url) {
      // console.error(url, 'url........')
      this.loading = true
      PDFJS.getDocument(url)
        .promise.then((pdf) => {
          // pdf 实例
          this.pdfDoc = pdf
          const { pdfViewerContainer } = this.$refs
          this.renderPdfCanvas(pdfViewerContainer)
        })
        .finally(() => {
          this.loading = false
        })
    },
    renderPdfCanvas(pdfViewerContainer) {
      const { scale } = this
      pdfViewerContainer.querySelectorAll('canvas').forEach((el) => el?.remove?.())
      // pdfViewerContainer.innerHTML = ''
      // 获取总页数
      const totalPage = this.pdfDoc.numPages
      // 获取显示容器
      for (let i = 1; i <= totalPage; i++) {
        // 循环处理pdf的每页
        renderPdfPage(pdfViewerContainer, this.pdfDoc, i, scale)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.pdfPreviewWrap {
  &-loading {
    min-height: 200px;
  }
}
</style>
