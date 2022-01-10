<template>
  <div class="dwp-app-list">
    <ul>
      <li>
        <a>
          <span>
            <img src="../library/images/menu_icon_user.svg" />
          </span>
          <em>{{lang.userInfo}}</em>
        </a>
      </li>
      <li>
        <a>
          <span>
            <img src="../library/images/menu_icon_authority,.svg" />
          </span>
          <em>{{lang.authority}}</em>
        </a>
      </li>
      <li>
        <a>
          <span>
            <img src="../library/images/menu_icon_stats.svg" />
          </span>
          <em>{{lang.stats}}</em>
        </a>
      </li>
      <li>
        <a>
          <span>
            <img src="../library/images/menu_icon_server.svg" />
          </span>
          <em>{{lang.server}}</em>
        </a>
      </li>
      <li>
        <a>
          <span>
            <img src="../library/images/menu_icon_adminsetting.svg" />
          </span>
          <em>{{lang.admin}}</em>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  created(){
    this.lang = this.adminl.applist;
  }
};
</script>

<style>
</style>