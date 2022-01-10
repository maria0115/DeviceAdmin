<template>
  <div class="wrap btm_b">
    <div class="main_wrap">
      <h1 class="main_logo">
        <img src="../library/images/main_logo.png" alt="로고" />
      </h1>
      <div class="login_input">
        <input type="text" placeholder="아이디" v-model="id" />
        <input
          type="password"
          placeholder="비밀번호"
          v-model="password"
          @keyup.enter="login"
        />
      </div>
      <select id="mult_lan" v-model="language">
        <option value="ko">한국어</option>
        <option value="en">English</option>
      </select>
      <p class="login_check">
        <span class="check_lf" @click="toggleidSave">
          <b :class="{ active: this.idSave }"></b>
          <em>아이디저장</em>
        </span>
        <span class="check_ri" @click="toggleautoLogin">
          <b :class="{ active: this.autoLogin }"></b>
          <em>자동로그인</em>
        </span>
      </p>
      <button @click="login">로그인</button>
    </div>
  </div>
</template>

<script>
import config from "../config/config.json";
import cookie from "vue-cookies";

export default {
  computed: {
  },
  created() {

    var storage = JSON.parse(
      localStorage.getItem(`${config.packageName}deviceInformation`)
    );

    if (storage) {
      this.language = storage.strLocale;
        this.query = storage;
    } else {
        this.query = {};
        this.query.strLocale = this.language.toLowerCase();
    }
    this.idSave = JSON.parse(localStorage.getItem("idSave"));
    this.autoLogin = JSON.parse(localStorage.getItem("autoLogin"));
    // this.autoLogin = JSON.parse(localStorage.getItem("autoLogin"));
    if (this.autoLogin ) {
      this.id = localStorage.getItem(`${config.packageName}id`);
      this.password = localStorage.getItem(`${config.packageName}pass`);
      if (this.password&&this.password.length > 0) {
        this.login();
        return;
      }
    }
    if (this.idSave) {
      this.id = localStorage.getItem(`${config.packageName}id`);
    }
  },
  data() {
    return {
      id: "",
      password: "",
      language: "ko",
      idSave: false,
      autoLogin: false,
      strLocale: "ko",
    };
  },
  methods: {
    login() {
      this.query.strLocale = this.language.toLowerCase();

      localStorage.setItem(
        `${config.packageName}deviceInformation`,
        JSON.stringify(this.query)
      );
      var data = {
        Username: this.id,
        Password: this.password,
        idSave: this.idSave,
        autoLogin: this.autoLogin,
        data: this.query,
      };
      this.$store.dispatch("login", data).then((res) => {
        if (res.success) {
          this.setConfig();
          this.$router.push({ name: "Home" });
        } else {
          if (res.alert) {
            alert("로그인 실패, reason = > " + res.message);
          }
          localStorage.setItem("autoLogin", false);
          localStorage.setItem(`${config.packageName}pass`, "");
          this.password = "";
          cookie.set("LtpaToken", "");
          cookie.set("language", "");
          // console.log(this.$cookie.get("LtpaToken"))
        }
      });
    },
    toggleidSave() {
      this.idSave = !this.idSave;
    },
    toggleautoLogin() {
      this.autoLogin = !this.autoLogin;
    },
    setConfig() {
      localStorage.setItem("autoLogin", this.autoLogin);
    },
  },
};
</script>

<style>
</style>