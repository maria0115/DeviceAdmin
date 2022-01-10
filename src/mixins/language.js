import { mapGetters} from "vuex";
export default{
    created(){
        this.adminl = this.GetLanguage.admin;
    },
    computed:{
        ...mapGetters(["GetLanguage"])
    },
    methods:{
    }

}