<template>
  <div class="tree_box">
    <ul>
      <li v-for="(value, index) in items" :key="index" title="새롬정보시스템">
        <div class="depth_box">
          <div class="standartTreeImage tree_line">
            <img
              @click="toggle(index)"
              :src="`../library/images/${IsOpened(index)}.png`"
            />
          </div>
          <div class="standartTreeImage tree_file">
            <img :src="`../library/images/folder${IsOpen(index)}.png`" />
          </div>
          <div class="standartTreeRow"  @click="GetList(value)">
            <span class="standartTreeRow">{{value.name}}</span>
          </div>
        </div>
        <ul class="depth2" :style="{ display: isBlock(index) }">
          <li v-for="(v, i) in value.children" :key="i">
            <div class="null2"></div>
            <div>
              <ul>
                <OrgItem
                  :item="v"
                  :index="i"
                  :length="value.children.length"
                  @OpenFolder="OpenFolder"
                  @setOption="setOption"
                ></OrgItem>
              </ul>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import OrgItem from "./orgitem.vue";
import user from "../mixins/user";
export default {
  name: "Org",
  components: {
    OrgItem,
  },
  activated(){
  },
  created() {
    var here = this;

    this.$store.dispatch("user/InitOrg", {}).then((res) => {
      here.items = res;
      for (var i = 0; i < res.length; i++) {
        res[i].text = res[i].name;
        here.$store.dispatch("user/Org", res[i]).then((r) => {
          here.items[0].children = r;
          this.$forceUpdate();
        });
      }
    });
  },
  computed: {
    ...mapState("user", ["org"]),
  },
  data() {
    return {
      items: [],
      isOpen: 0,
    };
  },
  methods: {
    IsOpened(index) {
      return this.isOpen == index ? "minus" : "plus";
    },
    IsOpen(index) {
      return this.isOpen == index ? "Open" : "Closed";
    },
    isBlock(index) {
      return this.isOpen == index ? "" : "none";
    },
    OpenFolder() {},
    toggle(index) {
      this.isOpen == index ? (this.isOpen = -1) : (this.isOpen = index);
    },
    setOption(option){
      this.$emit("setOption",option);
    },
    GetList(value){
      if (value.kinds == "Department"){
        var data = {};
        data.companycode = value.companycode;
        data.departmentcode = value.mycode;
        data.filter = "all";
        data.keyword = "";
        data.page = 0;

        this.$emit("setOption",data);

        
        this.getUserList(data);
      }
    },
  },
  mixins:[user],
};
</script>

<style>
</style>