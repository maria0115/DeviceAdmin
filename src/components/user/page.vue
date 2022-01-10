<template>
  <div class="paging clfix" v-if="pagelist.length>0">
    <div class="prev_btn">
      <span class="fir_pg" @click="pagingMethod(0)"></span>
      <span class="prev" v-if="first" @click="pagingMethod(first)"></span>
    </div>
    <ul>
      <li
        @click="pagingMethod(value - 1)"
        v-for="(value, index) in pagelist"
        :key="index"
        class="dhx_page"
        :class="{ active: parseInt(page) + 1 == value }"
      >
        <a>{{ value }}</a>
      </li>
    </ul>
    <div class="next_btn">
      <span class="las_pg" v-if="end" @click="pagingMethod(end)"></span>
      <span class="next" @click="pagingMethod(totalPage - 1)"></span>
    </div>
  </div>
</template>

<script>
import mixin from "../../mixins/page";
import user from "../../mixins/user";
export default {
  props: { total: Number, page: Number },
  data() {
    return {
      startindex: 0,
      endindex: 0,
      totalPage: 0,
      pagelist: [],
      first: 0,
      end: 0,
      currentPage: 1,
    };
  },
  mounted() {
    this.pageDataSetting();
  },
  mixins: [mixin, user],
  methods: {
    pagingMethod(page) {
      this.currentPage = page + 1;
      this.option.page = page;
      if (this.name == "UserInfo") {
        this.getUserList(this.option);
      } else {
        this.getList(this.option);
      }
    },
  },
};
</script>

<style>
</style>