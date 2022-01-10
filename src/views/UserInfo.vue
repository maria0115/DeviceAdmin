<template>
  <div class="dwp-container">
    <!-- <keep-alive><Side></Side></keep-alive> -->
    <!-- <router-view v-slot="{ selectedComponent }"> -->
    <transition name="fade" mode="out-in">
      <keep-alive include="Side,Org,OrgItem">
        <component v-bind:is="selectedComponent">
          <p>Default content</p>
        </component>
      </keep-alive></transition
    >
    <!-- </router-view> -->
    <!-- <router-view></router-view> -->
    <keep-alive include="UserInfo,device">
      <component v-bind:is="this.Name()">
        <p>Default content</p>
      </component>
    </keep-alive>
  </div>
</template>

<script>
import Side from "../components/user/Side.vue";
import UserInfo from "../components/user/userInfo.vue";
import Register from "../components/user/device.vue";
import Lost from "../components/user/device.vue";
import { mapState } from "vuex";
export default {
  components: { Side, UserInfo, Register, Lost },
  created() {},
  computed: {
    ...mapState("user", ["name"]),
  },
  data() {
    return {
      selectedComponent: "Side",
    };
  },
  methods: {
    Name() {
      return this.name;
    },
  },
};
</script>

<style>
</style>