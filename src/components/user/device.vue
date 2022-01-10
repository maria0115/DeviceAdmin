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
              <!-- 이거바뀜 -->
              <!-- 분실해제 -->
              <button
                type="button"
                v-if="name == 'Lost'"
                class="loss_release"
                @click="SetLost('setTrue')"
              >
                <span>{{lang.btn.setRelease}}</span>
              </button>
              <!-- 분실신고 -->
              <button
                type="button"
                v-if="name == 'Register'"
                class="loss_report"
                @click="SetLost('setFalse')"
              >
                <span>{{lang.btn.setLost}}</span>
              </button>
              <!-- 단말기 삭제 -->
              <button
                type="button"
                class="delete_terminal"
                @click="SetLost('deleteItem')"
              >
                <span>{{lang.deleteItem}}</span>
              </button>
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
              <col style="width: 45px" />
              <col style="width: 80px" />
              <col style="width: 80px" />
              <col style="width: 100px" />
              <col style="width: 320px" />
              <col style="width: 130px" />
              <col style="width: 123px" />
            </colgroup>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    class="check_off"
                    :class="{ checked: this.allchecked }"
                    @click="AllCheck"
                  />
                </th>
                <th v-for="(value,index) in lang.table" :key="index">{{value}}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="nodevice" v-if="this.list&&this.list.data&&this.list.data.length===0">
                <td colspan="7">{{lang.comment}}</td>
              </tr>
              <tr v-for="(value, index) in this.list.data" :key="index">
                <td>
                  <input
                    type="checkbox"
                    class="check_off"
                    :class="{ checked: isInclude(value) }"
                    @click="CheckUser(value)"
                  />
                </td>
                <td>{{ value.name }}</td>
                <td>{{ value.empno || value.mycode }}</td>
                <td>{{ value.deviceKind }}</td>
                <td class="phone_code">{{ value.deviceId }}</td>
                <td>{{ value.deviceName }}</td>
                <td>{{ status[value.state] }}</td>
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
  name: "device",
  // deactivated(){
  //   this.list.data=[];
  // },
  created() {
    this.lang = this.adminl.device;
    var l = this.lang;
    this.status = l.status;
    this.title = l.mounted.title;

    if (!this.isCreated) {
      this.getList({
        page: 0,
        filter: "all",
        keyword: "",
      });
      this.$store.commit("beCreate");
    }
    if (this.name == "Register") {
      this.title = this.lang.created.reTitle;
      this.option.type = "lostDeviceList";
      this.option.state = true;
      this.option.page = 0;
    }
  },
  mounted() {},
  activated() {
  },
  watch:{
    name(newval){
      if (newval == "Register") {
      this.title = this.lang.created.reTitle;
      this.option.type = "lostDeviceList";
      this.option.state = true;
      this.option.page = 0;
    } else if (newval == "Lost") {
      this.title = this.lang.created.loTitle;
      this.option.type = "lostDeviceList";
      this.option.state = false;
      this.option.page = 0;
    }
    },
  },
  components: { Page, Search },
  mixins: [mixin],
  data() {
    return {
      title: "사용자 정보",
      status: { true: "사용중", false: "미사용" },
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
    SetLost(type) {
      var idstr = "";
      var patch = "";
      type == "deleteItem" ? (patch = "DelLost") : (patch = "SetLost");
      for (var i = 0; i < this.checkUser.length; i++) {
        this.checkUser.length - 1 == i
          ? (idstr += this.checkUser[i].deviceId)
          : (idstr += this.checkUser[i].deviceId + ";");
      }
      this.$store
        .dispatch(`user/${patch}`, { type, deviceId: idstr })
        .then((res) => {
          if (res) {
            setTimeout(() => {
              this.SetPage();
              this.checkUser = [];
            }, 1000);
          }
        });
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
.nodevice{width:100%;text-align:center;}
.nodevice td{width:100%;white-space:nowrap;}
</style>