<template>

  <div class="case-paging">
    <ul>
      <li
        :class="['paging-item', 'paging-item--first', {'paging-item--disabled' : index === 1}]"
        @click="first">首页
      </li>
      <li
        :class="['paging-item', 'paging-item--prev', {'paging-item--disabled' : index === 1}]"
        @click="prev">上一页
      </li>
      <li
        :class="['paging-item', 'paging-item--more']"
        v-if="showPrevMore">...
      </li>
      <li
        :class="['paging-item', {'paging-current' : index === pager}]"
        v-for="(pager,index) in pagers" :key="index"
        @click="go(pager)">{{ pager }}
      </li>
      <li
        :class="['paging-item', 'paging-item-more']"
        v-if="showNextMore">...
      </li>
      <li
        :class="['paging-item', 'paging-item--next', {'paging-item--disabled' : index === pages}]"
        @click="next">下一页
      </li>
      <li
        :class="['paging-item', 'paging-item--last', {'paging-item--disabled' : index === pages}]"
        @click="last">末页
      </li>
    </ul>
  </div>

</template>

<script>
  import "./../assets/css/mopaging.css"

  export default {
    name: 'MoPaging',
    props: {
      perPages: {
        type: Number,
        default: 3
      },
      pageIndex: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 6
      },
      total: {
        type: Number,
        default: 1
      }
    },
    computed: {
      pages() {
        return Math.ceil(this.size / this.limit);
      },
      pagers() {
        const array = [];
        const perPages = this.perPages;
        const pageCount = this.pages;
        let current = this.index;
        const _offset = (perPages - 1) / 2;
        const offset = {
          start: current - _offset,
          end: current + _offset
        }

        //-1, 3
        if (offset.start < 1) {
          offset.end = offset.end + (1 - offset.start)
          offset.start = 1
        }
        if (offset.end > pageCount) {
          offset.start = offset.start - (offset.end - pageCount)
          offset.end = pageCount
        }
        if (offset.start < 1) offset.start = 1

        this.showPrevMore = (offset.start > 1)
        this.showNextMore = (offset.end < pageCount)

        for (let i = offset.start; i <= offset.end; i++) {
          array.push(i)
        }
        return array
      }
    },
    methods: {
      prev() {
        if (this.index > 1) {
          this.go(this.index - 1)
        }
      },
      next() {
        if (this.index < this.pages) {
          this.go(this.index + 1)
        }
      },
      first() {
        if (this.index !== 1) {
          this.go(1)
        }
      },
      last() {
        if (this.index != this.pages) {
          this.go(this.pages)
        }
      },
      go(page) {
        if (this.index !== page) {
          this.index = page;
          localStorage.setItem("PageIndex",(this.index));
          this.$emit('change', this.index);
          var cc = Number(localStorage.getItem("PageIndex"));
        }
      }
    },
    watch: {
      pageIndex(val) {
        this.index = val || 1
      },
      pageSize(val) {
        this.limit = val || 6
      },
      total(val) {
        this.size = val || 1
      }
    },
    data() {
      return {
        size: this.total || 1,
        index: this.pageIndex, //当前页码
        limit: this.pageSize, //每页显示条数
        size: this.total || 1, //总记录数
        showPrevMore: false,
        showNextMore: false
      }
    }
  }
</script>

<style scoped>

</style>
