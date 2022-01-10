<template>
  <div class="dwp-search-grouping active" id="searchbox">
    <div class="dwp-search-area">
      <div class="dwp-search-form">
        <!--검색범위선택-->
        <div class="dwp-selectbox">
          <select
            id="SelCate"
            class="selectSearch"
            v-model="searchfield"
            @change="fieldChange"
          >
            <option :value="name" type="string" v-for="(value,name) in lang.filter" :key="name">{{value}}</option>
          </select>
        </div>
        <!--검색어입력-->
        <div class="dwp-input" name="_textSearch">
          <input
            type="text"
            name="search"
            id="searchtext"
            maxlength="30"
            valign="top"
            @keyup.enter="Search"
            v-model="keyword"
            @input="updateModel($event)"
          />
        </div>
        <!--검색-->
        <div class="dwp-btn icon search" @click="Search">
          <button type="button" class="icon-search"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import mixin from "../../mixins/user";
export default {
  created() {
    this.lang = this.adminl.search
  },
  data() {
    return {
      keyword: "",
      searchfield: "all",
    };
  },
  methods: {
    fieldChange() {},
    Search() {
      this.$emit("setOption", {
        page: 0,
        keyword: this.keyword,
        filter: this.searchfield,
      });
    },
    updateModel(e) {
      this.keyword = e.target.value;
    },
  },
  // mixins: [mixin],
};
</script>

<style>
</style>