<template>
  <div v-if="active">
    <h1>Editar tarea</h1>
    <v-form class="col-12 col-sm-7" ref="form">
      <v-text-field
        :rules="rules"
        label="Materia"
        placeholder="Ingresa la materia"
        v-model="tarea.materia"
        required
      ></v-text-field>
      <v-text-field
        :rules="rules"
        label="Entrega"
        type="date"
        v-model="tarea.fecha"
      ></v-text-field>
      <v-textarea
        :rules="rules"
        label="Descripción"
        height="50"
        class="mt-7"
        placeholder="Ingresa la descripcion de la tarea"
        v-model="tarea.desc"
      ></v-textarea>
      <v-color-picker
        hide-inputs
        :rules="rules"
        v-model="tarea.color"
        dot-size="25"
        swatches-max-height="200"
      ></v-color-picker>
      <v-btn @click="guardarEdit(tarea)"  :disabled="bloquearBtn" color="success" block>Guardar</v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "editar",
  data() {
    return {
      id: this.$route.params.id,
      rules: [(v) => !!v || "Campo obligatorio"],
      btn:false
    };
  },
  methods: {
    ...mapActions(["obtenerTarea", "editarTarea"]),
    guardarEdit(tarea) {
      if (this.$refs.form.validate()) {
      
        this.editarTarea(tarea);
      }
    },
  },
  created() {
    this.obtenerTarea(this.id);
  },
  computed: {
    ...mapState(["tarea"]),
    ...mapGetters(["active"]),
  bloquearBtn(){
    if(!this.tarea.materia || !this.tarea.fecha || !this.tarea.desc || !this.tarea.color){
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