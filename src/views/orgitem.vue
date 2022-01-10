<template>
  <li title="협업사업부">
    <div class="depth_box">
      <div class="standartTreeImage tree_line">
        <!--하위 폴더 열려있을때 이미지 -->
        <img
          v-if="isFolder"
          @click="toggle"
          :src="`../library/images/${IsOpened}${isLast}.png`"
        />
        <img v-else :src="`../library/images/line${isLast}.png`" />
      </div>
      <div
        class="standartTreeImage"
        :class="{ tree_file: isFolder }"
        @click="GetList"
      >
        <img v-if="isFolder" :src="`../library/images/folder${IsOpen}.png`" />
        <img v-else src="../library/images/person.png" />
      </div>
      <div class="standartTreeRow" @click="GetList">
        <span class="standartTreeRow">{{ item.name }}</span>
        <!--클릭하면 클래스가 standartTreeRow 에서 selectedTreeRow로 변경되어야함 -->
      </div>
    </div>
    <ul class="depth2" :style="{ display: this.isBlock }">
      <div class="null"></div>
      <li>
        <!--폴더를 접으면 display:none 처리 되어야합니다-->
        <div>
          <ul>
            <li>
              <!--폴더를 접으면 display:none 처리 되어야합니다-->
              <div>
                <ul>
                  <OrgItem
                    :length="children.length"
                    v-for="(child, index) in children"
                    :index="index"
                    :key="index"
                    :item="child"
                    @OpenFolder="OpenFolder"
                    @setOption="setOption"
                  ></OrgItem>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </li>
</template>

<script>
// import { mapState, mapGetters } from "vuex";
import OrgItem from "./orgitem.vue";
// import config from "../config/user.json";
import user from "../mixins/user";

export default {
  name: "OrgItem",
  props: {
    item: Object,
    index: Number,
    length: Number,
  },
  components: {
    OrgItem,
  },
  data() {
    return {
      children: [],
      isOpen: false,
    };
  },
  computed: {
    // 다른것들을 끌어왔을때 렝스가 1이상이면
    isFolder: function () {
      if (this.item.kinds == "Department") {
        return true;
      }
      return false;
    },
    isBlock: function () {
      if (this.isOpen) {
        return "";
      }
      return "none";
    },
    IsOpen() {
      return this.isOpen ? "Open" : "Closed";
    },
    IsOpened() {
      return this.isOpen ? "minus" : "plus";
    },
    isLast() {
      return this.index == this.length - 1 ? 3 : 2;
    },
  },
  methods: {
    toggle() {
      if (this.item.kinds == "Department" && this.children.length === 0) {
        this.GetChildren();
      }
      this.isOpen = !this.isOpen;
    },
    async GetChildren() {
      this.children = await this.$store.dispatch("user/Org", this.item);
    },
    OpenFolder() {
      this.$emit("OpenFolder");
      this.isOpen = true;
    },
    GetList() {
      if (this.item.kinds == "Department") {
        var data = {};
        data.companycode = this.item.companycode;
        data.departmentcode = this.item.mycode;
        data.filter = "all";
        data.keyword = "";
        data.page = 0;

        this.setOptionC(data);

        this.getUserList(data);
      } else if (this.item.kinds == "Person") {
        this.getDeviceList(this.item.notesId);
      }
    },
    setOption(option) {
      this.$emit("setOption", option);
    },
  },
  mixins: [user],
};
</script>

<style>
</style>