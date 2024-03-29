<template>
  <div class="app-box">
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

  .app-box {
    width: 100vw;
    height: 100vh;
  }

  :root {
    --app-backgorund: #DDDBDB;
    --app-white-background: #e9e8e8;
    --app-nav-background:#192734;
    --app-green-color: #1ABC9C;
    --text-light: #FDFEFE;
    --font: Calibri;
  }

  textarea:focus, input:focus, select:focus {
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: 0;
  } 
  .app-logo {
    text-decoration: none;
    color: var(--text-light);
    font-family: Comic Sans MS, Comic Sans, cursive;
  }

  .app-font-navbar {
      text-decoration: none;
      color: var(--text-light);
      font-family: Arial, Helvetica, sans-serif;
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

  .glow-effect {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px transparent;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: box-shadow;
  transition-property: box-shadow;
  box-shadow: 0 0 8px  #979A9A;
}
</style>
