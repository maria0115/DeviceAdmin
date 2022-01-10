import config from "../config/user.json";
import { mapState, mapGetter } from "vuex";

export default {
    computed: {
        ...mapState("user", ["list","name"]),
    },
    watch: {
        list(val) {
            this.total = val.total;
            this.pageDataSetting();
        }
    },
    methods: {
        pageDataSetting() {
            var block = config.block;
            const totalPage = Math.ceil(this.total / config.limit);
            this.totalPage = totalPage;

            var startIndex = (Math.ceil(this.currentPage / block) - 1) * block + 1;
            var endIndex =
                startIndex + block > totalPage ? totalPage : startIndex + block - 1;
            this.pagelist = [];
            for (let index = startIndex; index <= endIndex; index++) {
                this.pagelist.push(index);
            }
            this.first = startIndex - block >= 1 ? startIndex - block : null;
            this.end = totalPage >= startIndex + block ? startIndex + block : null;
            this.startindex = startIndex;
            this.endindex = endIndex;
        },
    },
}