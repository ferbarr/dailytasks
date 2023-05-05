<template>
  <div>
    <h3 class="text-center">Tareas pendientes</h3>
    <div v-if="spinner" class="mt-10"> <rise-loader :loading="spinner"></rise-loader></div>
    <pendiente />
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
import RiseLoader from 'vue-spinner/src/RiseLoader.vue'
import pendiente from '../components/pendiente.vue'
export default {
  components: { pendiente,RiseLoader },
  computed:{
    ...mapState(["spinner"]),
  }

}
</script>
<style>
.swal2-popup {
  font-family: Tahoma;
}
</style>