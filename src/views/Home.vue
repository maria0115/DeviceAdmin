<template>
  <div class="wrap">
    <form @submit.prevent="$event.preventDefault();">
      <Header></Header>

      <AppList></AppList>
      <router-view></router-view>
    </form>
  </div>
</template>

<script>
import AppList from "./appList.vue";
import Header from "./header.vue";
export default {
  name: "Home",
  components: {
    AppList,
    Header,
  },
  created() {},
};
</script>
