<template>
  <div>
     <v-row v-if="!spinner">
      <v-col class="col-sm-6 col-lg-4 col-12"  v-for="item in finalizada" :key="item.id">
        <v-card elevation="10" class="mt-5">
          <v-sheet :color="item.color" elevation="1" height="250">
            <v-btn
            class="red lighten-1 white--text"
              fab
              small
              absolute
              top
              right
              @click="
                (modal.estado = true),
                  (modal.tarea = item.materia),
                  (modal.id = item.id)
              "
              ><v-icon>mdi-delete</v-icon></v-btn
            >
          </v-sheet>
          <v-card-title
            >{{ item.materia }}
            <v-icon >mdi-book-open-blank-variant</v-icon>
          </v-card-title>
          <v-card-subtitle>Entrega: {{ item.fecha }}</v-card-subtitle>
          <v-card-text class="dark--text">
            <h2>{{ item.desc }}</h2>
            <br />

            <h4 class="rounded success">
              {{ item.estadoT }}
            </h4>
            <v-rating
              readonly
              disabled
              v-if="item.estadoT == 'Finalizada'"
              color="warning"
              length="5"
              size="25"
              :value="5"
            ></v-rating>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- MODAL PARA ELIMINAR -->
    <v-dialog class="text-center" persistent v-model="modal.estado" width="500">
      <v-card>
        <v-card-title class="text-h5 eliminar rounded"> Finalizar tarea </v-card-title>
        <v-card-text>
          <h3 class="mt-3 text-center">
            Se eliminará la tarea de {{ modal.tarea }}
          </h3>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer>
            <v-btn color="success" @click="eliminar">
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-spacer>

          <v-btn color=" red lighten-1" @click="modal.estado = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      modal: {
        estado: false,
        tarea: "",
        id: "",
      },
    };
  },

  methods: {
    ...mapActions(["getTareas", "eliminarTarea"]),
    eliminar() {
      this.modal.estado = false;
      this.eliminarTarea(this.modal.id);
    },
  },
  computed: {
    ...mapState(["tareas","spinner"]),
    ...mapGetters(["active"]),

    finalizada() {
      const tareaP = this.tareas.filter((tar) => tar.estadoT == "Finalizada");
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