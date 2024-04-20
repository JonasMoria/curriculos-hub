<template>
  <div class="app-box">
    <NavbarVue :menu_icon="menu_icon" />
    <div class="body-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavbarVue from "./components/Navbar.vue";

export default {
  components: {
    NavbarVue
  },
  data: function () {
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
  --app-nav-background: #192734;
  --app-green-color: #1ABC9C;
  --text-light: #FDFEFE;
  --font: Calibri;
}

textarea:focus,
input:focus,
select:focus {
  box-shadow: 0 0 0 0;
  border: 0 none;
  outline: 0;
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
  box-shadow: 0 0 8px #979A9A;
}

/* HTML: <div class="loader"></div> */
.loader {
  width: 30px;
  aspect-ratio: 2;
  --_g: no-repeat radial-gradient(circle closest-side, #fff 90%, #0000);
  background:
    var(--_g) 0% 50%,
    var(--_g) 50% 50%,
    var(--_g) 100% 50%;
  background-size: calc(100%/3) 50%;
  animation: l3 1s infinite linear;
}

@keyframes l3 {
  20% {
    background-position: 0% 0%, 50% 50%, 100% 50%
  }

  40% {
    background-position: 0% 100%, 50% 0%, 100% 50%
  }

  60% {
    background-position: 0% 50%, 50% 100%, 100% 0%
  }

  80% {
    background-position: 0% 50%, 50% 50%, 100% 100%
  }
}
</style>
