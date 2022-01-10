<template>
  <div class="dwp-header">
    <div class="dwp-logo">
      <a>
        <img src="../library/images/logo.png" />
      </a>
    </div>
    <div class="dwp-icon-wrap">
      <a class="dwp-menu-logout" @click="logout"></a>
      <div class="dwp-profile">
        <a class="dwp-photo">
          <img src="../library/images/profile.png" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "login" });
    },
  }
};
</script>

<style>
</style>