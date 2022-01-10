export default {
    List(state, {value,data}) {
        state.list = value;
        state.list.type = data.type;
    },
    InitOrg(state,data){
        state.org = data;
    },
    setOption(state,option){
        state.option = option;
    },
    setName(state,name){
        state.name = name;
    },
}