<template>
  <v-app>
    <!-- ENCABEZADO -->
    <v-app-bar app class="rounded" color="#3196E2">
      <v-img
        class="mr-0"
        v-if="!active"
        max-width="50"
        src="./assets/logo1.png"
      ></v-img>
      <v-btn x-large icon color="dark" to="/" v-if="pintarReturn">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title v-if="!active">DailyTasks</v-toolbar-title>

      <v-btn
        v-if="pintarBoton"
        to="/agregar"
        fab
        color="#FF826C"
        class="dark--text"
        absolute
        bottom
        left
        elevation="5"
        ><v-icon>mdi-plus</v-icon></v-btn
      >
      <v-spacer></v-spacer>
      <router-link to="/perfil" v-if="active">
        <v-avatar>
          <img
            size="36"
            :src="usuario.foto"
            :alt="usuario.nombre"
            :title="usuario.nombre"
          />
        </v-avatar>
      </router-link>
    </v-app-bar>
    <!-- CONTENIDO -->
    <v-main>
      <v-container>
        <router-view />
      </v-container>
      <!-- bottom -->
      <v-bottom-navigation
        v-if="active"
        v-show="pintarNav"
        app
        class="rounded-lg"
        grow
        background-color="#3196E2"
        color="white"
      >
        <v-btn to="/" class="rounded">
          <span>Pendientes</span>
          <v-icon>mdi-bell-ring mdi-36px</v-icon>
        </v-btn>

        <v-btn to="/finalizada" class="rounded">
          <span>Finalizadas</span>
          <v-icon>mdi-clipboard-check mdi-36px</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-main>

    <!-- Pie de pagina -->
    <v-footer app v-if="!active" color="ingreso">
      <v-col class="text-center" cols="12">
        Developed by: <strong> { Fernando BR } </strong> —
        {{ new Date().getFullYear() }}
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["active"]),
    ...mapState(["usuario"]),
    nameRuta() {
      return this.$route.path;
    },
    pintarBoton() {
      if (this.active && this.nameRuta === "/") {
        return true;
      } else {
        return false;
      }
    },
    pintarNav() {
      if (
        this.nameRuta === "/" ||
        this.nameRuta === "/finalizada" ||
        this.nameRuta === "/perfil"
      ) {
        return true;
      } else {
        return false;
      }
    },
    pintarReturn() {
      if (
        this.nameRuta === "/finalizada" ||
        this.nameRuta === "/" ||
        this.nameRuta === "/ingreso" ||
        this.nameRuta === "/perfil"
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style>
.swal2-popup {
  font-family: Tahoma;
}
</style>