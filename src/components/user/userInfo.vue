<template>
  <div class="dwp-wrapping content">
    <div class="dwp-page-heading view-head">
      <div class="dwp-page-title">
        <!-- 이거 바뀜 -->
        <span>{{ title }}</span>
      </div>
      <div class="aligner clfix">
        <div class="left">
          <div class="dwp-grouping" name="dwp-search-area">
            <Search @setOption="setOption"></Search>
          </div>
        </div>
        <div class="right">
          <div class="dwp-btn-group">
            <div class="dwp-btn">
              <!--메뉴권한관리-->
              <!-- <button
                type="button"
                v-if="name == 'UserInfo'"
                class="menu_manage"
              >
                <span>메뉴권한관리</span>
              </button> -->
              <!-- 엑셀다운로드 -->
              <button type="button" @click="download" class="excel_down">
                <span>{{lang.excel}}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="dwp-body">
      <div class="dwp-page-body view">
        <div class="dwp-body-wrap list-grid">
          <table id="user">
            <colgroup>
              <!-- <col style="width: 45px" /> -->
              <col style="width: 100px" />
              <col style="width: 100px" />
              <col style="width: 133px" />
              <col style="width: 140px" />
              <col style="width: 120px" />
            </colgroup>
            <thead>
              <!-- 이거바뀜 -->
              <tr>
                <!-- <th>
                  <input
                    type="checkbox"
                    class="check_off"
                    :class="{ checked: this.allchecked }"
                    @click="AllCheck"
                  />
                </th> -->
                <th v-for="(value,name) in lang.table" :key="name">{{value}}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(value, index) in this.list.data"
                :key="index"
                @click="getDeviceList(value.notesId)"
              >
                <!-- <td>
                  <input type="checkbox" class="check_off" />
                </td> -->
                <td>{{ value.name }}</td>
                <td>{{ value.mycode }}</td>
                <td>{{ value.position }}</td>
                <td>{{ value.department }}</td>
                <td>{{ installstatus[value.isUseDevice] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Page
        :total="this.list.total"
        :page="this.option.page"
        @SetPage="SetPage"
      ></Page>
    </div>
  </div>
</template>

<script>
import Page from "./page.vue";
import mixin from "../../mixins/user";
import Search from "./search.vue";
import exportFromJSON from "export-from-json";
export default {
  name: "UserInfo",
  // deactivated() {
  //   this.list.data = [];
  // },
  created() {
    this.lang = this.adminl.userInfo;
    this.installstatus = this.lang.mounted.installstatus;
    this.title = this.lang.mounted.title;

    if (!this.isCreated) {
      this.Init();
      this.$store.commit("beCreate");
    }
  },
  mounted() {},
  components: { Page, Search },
  mixins: [mixin],
  data() {
    return {
      title: "사용자 정보",
      installstatus: { true: "설치", false: "미설치" },
      checkUser: [],
      allchecked: false,
    };
  },
  methods: {
    AllCheck() {
      this.allchecked = !this.allchecked;
      this.allchecked
        ? (this.checkUser = this.list.data)
        : (this.checkUser = []);
    },
    isInclude(value) {
      return this.checkUser.includes(value);
    },
    SetPage() {
      this.getList(this.option);
    },
    CheckUser(value) {
      if (this.isInclude(value)) {
        this.checkUser = this.checkUser.filter((item, idx) => {
          return item !== value;
        });
      } else {
        this.checkUser.push(value);
      }
    },
    setOption(option) {
      // this.option = option;
      for (var i in option) {
        this.option[i] = option[i];
      }
      this.setOptionC(this.option);
      if (this.name == "UserInfo") {
        this.getUserList(this.option);
      } else {
        this.getList(this.option);
      }
    },
    download() {
      this.option.size = this.list.total;
      this.option.page = 0;
      this.$store.dispatch("user/GetAdminDownload", this.option).then((res) => {
        const data = res.data;
        const fileName = "userInfo";
        const exportType = "xls";
        const fields = [];

        exportFromJSON({ data, fileName, fields, exportType });
      });
    },
  },
};
</script>

<style>
</style>