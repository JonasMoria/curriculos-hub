<template>
  <div>
    <NavbarVue :menu_icon="menu_icon"/>
    <div class="body-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavbarVue from "./components/Navbar.vue";

export default {
  components: {
    NavbarVue
  },
  data: function() {
    return {
      menu_icon: "/icons/menu.svg"
    }
  },
}
</script>

<style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  :root {
    --app-backgorund: #f2f3fa;
    --app-nav-background:#192734;
    --app-green-color: #1ABC9C;
    --text-light: #FDFEFE;
    --font-cursive: Bradley Hand, cursive;
  }

  textarea:focus, input:focus, select:focus {
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: 0;
} 

  .app-font-comic {
      text-decoration: none;
      color: var(--text-light);
      font-family: Comic Sans MS, Comic Sans, cursive;
  }

  .app-icon-white {
      filter: invert(100%) sepia(87%) saturate(44%) hue-rotate(161deg) brightness(97%) contrast(104%);
  }

  .item-hide {
    display: none;
  }

  body {
    background-color: var(--app-backgorund);
  }

  .body-content {
    max-width: 95%;
    margin-left: 2.5%;
    margin-right: 2.5%;
  }
</style>
