<template>
  <v-row v-if="!spinner">
    <v-col
      class="col-sm-6 col-lg-4 col-12"
      v-for="item in proceso"
      :key="item.id"
    >
      <v-card elevation="10" class="mt-5">
        <v-sheet :color="item.color" elevation="1" height="250">
          <v-btn
          class="amarillo white--text"
            fab
            small
            absolute
            top
            right
            :to="{ name: 'editar', params: { id: item.id } }"
            ><v-icon>mdi-pencil-outline</v-icon></v-btn
          >
          <v-btn
            fab
            class="green lighten-1 white--text"
            small
            absolute
            top
            left
            @click="finalizarTarea(item.id)"
            ><v-icon>mdi-check</v-icon></v-btn
          >
        </v-sheet>
        <v-card-title
          >{{ item.materia }}
          <v-icon>mdi-book-open-blank-variant</v-icon>
        </v-card-title>
        <v-card-subtitle>Entrega: {{ item.fecha }}</v-card-subtitle>
        <v-card-text class="dark--text">
          <h2>{{ item.desc }}</h2>
          <br />

          <h4 class="rounded warning">
            {{ item.estadoT }}
          </h4>
          <v-rating
            readonly
            disabled
            v-if="item.estadoT == 'Pendiente'"
            color="warning"
            length="5"
            size="25"
            :value="1"
          ></v-rating>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>


<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      texto:''
    };
  },

  methods: {
    ...mapActions(["getTareas","finalizarTarea",'setUsuario']),
  },
  computed: {
    ...mapState(["tareas", "spinner"]),
    ...mapGetters(["active"]),

    proceso() {
      const tareaP = this.tareas.filter((tar) => tar.estadoT == "Pendiente");
      return tareaP;
    },

  },
  created() {
  
    this.getTareas();
  },
};
</script>
<style>
.swal2-popup {
  font-family: Tahoma;
}
</style>