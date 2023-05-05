<template>
  <div v-if="active">
    <h3 class="text-center">Tareas finalizadas</h3>
    <div v-if="spinner" class="mt-10"> <rise-loader :loading="spinner"></rise-loader></div>
   <finalizada/>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import RiseLoader from 'vue-spinner/src/RiseLoader.vue'
import finalizada from '../components/finalizada.vue'
export default {
  components: { finalizada,RiseLoader },
  computed:{
    ...mapGetters(["active"]),
    ...mapState(["spinner"]),
  }
}
</script>t
<style>
.swal2-popup {
  font-family: Tahoma;
}
</style>