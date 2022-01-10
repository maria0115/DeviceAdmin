import config from "../config/user.json";
import { mapState, mapGetter } from "vuex";

export default {
    created() {
    },
    data() {
        return {
            userInfoOption:{
                companycode:"",
                departmentcode:"",
                type:"userInfo",
                filter:"all",
                keyword:"",
                page:0,
                size:config.limit
            },
        }
    },
    computed: {
        ...mapState("user", ["list","option","name",]),
        ...mapState( ["isCreated"]),
    },
    methods: {
        setOptionC(option){
            this.$store.commit("user/setOption",option);
        },
        getList(option) {
            var state = true;
            this.name=="Lost"?state = false:state = true;
            option.state = state;
            option.size = config.limit;
            option.type = "lostDeviceList";
            // this.setOptionC(option);
            this.$store.dispatch("user/GetAdmin", option);
        },
        getUserList(option){
            option.size = config.limit;
            option.type = "userInfo";
            // this.setOptionC(option);
            this.$store.dispatch("user/GetAdmin", option)
            .then(res=>{
                if (res) {
                  // this.$router.push({ name: "UserInfo" });
                  this.setName("UserInfo");
                  return res;
                }
              })
        },
        getDeviceList(id){
            var option = {};
            option.type = "selectUserInfo";
            option.notesId = id
            this.$store.dispatch("user/GetAdmin", option)
            .then(res=>{
                if (res) {
                    this.setName("Register");
                  // this.$router.push({ name: "UserInfo" });
                }
              })
        },
        Init() {
            var data = {};
            data.companycode = "";
            data.departmentcode = "";
            data.filter = "all";
            data.keyword = "";
            data.page = 0;
            // this.setOptionC(data);
            this.getUserList(data)
            
          },
          setName(value){
              this.$store.commit("user/setName",value);
          },
    },
}