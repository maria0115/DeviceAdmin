export default{
    GetLanguage(state,{data,app}){
        state.store.language[app] = data;
    },
    MyInfo(state,data){
        state.store.myinfo = data;
        data.isAdmin?state.user.name="UserInfo":state.user.name="Register"
    },
    beCreate(state){
        state.isCreated = true;
    },
}