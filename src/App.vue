<template>
  <div id="app">
      <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import common from "./library/js/common.js";
// import jquery from "./library/js/jquery.min.js";
import prefixfree from "./library/js/prefixfree.min.js";
// import scroll from "./library/js/jquery.mCustomScrollbar.concat.min.js";
// import wheel from "./library/js/wheel.js";
export default {
  created(){
  },
    mixin:[common,prefixfree],
}
</script>
<style>
@import "./library/css/common.css";
@import "./library/css/style.css";
@import "./library/css/mcustomscrollbar.css";
</style>

