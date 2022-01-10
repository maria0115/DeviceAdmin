<template>
  <div class="dwp-lnb-wrap">
    <div class="dwp-menu-head">
      <div class="dwp-menu-title">{{lang.menutitle}}</div>
    </div>
    <div class="dwp-lnb" id="scroll">
      <div
        id="section_A02"
        class="dwp-lnb-depth2"
        v-if="this.GetMyInfo.isAdmin"
      >
        <div id="menu_A02" class="dwp-lnb-item">
          <a @click="Go('UserInfo')" class="dwp-link btn-fold">{{lang.userInfo}}</a>
        </div>
        <Org></Org>
      </div>
      <div id="section_A02" class="dwp-lnb-depth2">
        <div id="menu_A02" class="dwp-lnb-item">
          <a class="dwp-link btn-fold">{{lang.setting}}</a>
        </div>
        <div id="menugroup_A03" class="dwp-lnb-depth3">
          <div class="left-body">
            <div class="lnb-nav">
              <ul id="nav_A03">
                <li
                  @click="Go('Register')"
                  id="li_A03"
                  class="dwp-lnb-item"
                  :class="{ selected: this.name == 'Register' }"
                >
                  <!-- selected -->
                  <a class="dwp-link selected">{{lang.deviceInfo}}</a>
                </li>
                <li
                  @click="Go('Lost')"
                  id="li_A03"
                  class="dwp-lnb-item"
                  :class="{ selected: this.name == 'Lost' }"
                >
                  <a class="dwp-link">{{lang.lostDeviceInfo}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import wheel from "jquery-mousewheel";

import Org from "@/views/Org.vue";
import user from "../../mixins/user";
import { mapGetters } from "vuex";
import "jquery-mousewheel";
import "malihu-custom-scrollbar-plugin";
export default {
  created() {
    this.lang = this.adminl.side;
    },
  mounted() {
    // mCustomScrollbar 소스
    $("#scroll").mCustomScrollbar({
      theme: "minimal-dark",
      scrollInertia: 500,
      autoHideScrollbar: true,
      advanced: {
        updateOnContentResize: true,
      },
    });
  },
  activated() {},
  name: "Side",
  components: { Org },
  mixins: [user],
  computed: {
    ...mapGetters(["GetMyInfo"]),
  },
  data() {
    return {
      selectedComponent: "Org",
    };
  },
  methods: {
    Go(name) {
      this.$store.commit("user/setName", name);
      if (name == "UserInfo") {
        this.Init();
      } else {
        this.getList({
          page: 0,
          filter: "all",
          keyword: "",
        });
      }
    },
  },
};
</script>

<style>
</style>