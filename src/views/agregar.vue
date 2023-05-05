<template>
  <div v-if="active">
    <h1>Agregar tarea</h1>
    <v-form class="col-12 col-sm-7" ref="form">
      <v-text-field
        :rules="rules"
        label="Materia"
        placeholder="Ingresa la materia"
        v-model="datosTarea.materia"
      ></v-text-field>
      <v-text-field
        :rules="rules"
        label="Entrega"
        type="date"
        v-model="datosTarea.fecha"
      ></v-text-field>
      <v-textarea
        :rules="rules"
        label="Descripción"
        height="50"
        class="mt-2"
        placeholder="Ingresa la descripcion de la tarea"
        v-model="datosTarea.desc"
      ></v-textarea>
      <v-label>Elige color para la tarea</v-label>
      <v-color-picker
        dot-size="14"
        readonly
        hide-inputs
        swatches-max-height="200"
        :rules="rules"
        v-model="datosTarea.color"
      ></v-color-picker>

      <v-btn @click="guardar(datosTarea)" :disabled="bloquearBtn" color="success" block
        >Guardar</v-btn
      >
    </v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      datosTarea: {
        materia: "",
        fecha: "",
        desc: "",
        color: "",
      },
      rules: [(v) => !!v || "Campo obligatorio"],
    };
  },
  methods: {
    ...mapActions(["agregarTarea"]),

    guardar(guardar) {
      if (this.$refs.form.validate()) {
        // console.log("Datos validos");
        this.agregarTarea(guardar);
        this.modal = false;
      }
    },
  },
  computed: {
    ...mapGetters(["active"]),
    bloquearBtn(){
      if(this.datosTarea.materia===""||this.datosTarea.fecha===""||this.datosTarea.desc===""||this.datosTarea.color===""){
        return true
      }else{
        return false
      }
    }
  },
};
</script>
<style>
.swal2-popup {
  font-family: Tahoma;
}
</style>