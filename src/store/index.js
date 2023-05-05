import Vue from 'vue'
import Vuex from 'vuex'
import { auth, db } from '../firebase.js'
import router from '../router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tareas: [],
    tarea: {},
    usuario: null,
    error:null,
    spinner:false,
    texto:''


  },
  //***  Mutaciones ****/
  mutations: {
    spinner(state,payload){
      state.spinner=payload
    },
    setError(state,payload){
      state.error=payload
    },
    nuevoUsuario(state, payload) {
      state.usuario = payload
    },
    setTareas(state, payload) {
      state.tareas = payload
    },
    obtenerTarea(state, payload) {
      state.tarea = payload
    }
  },
  //***  ACCIONES ****/
  actions: {
    buscador({commit},payload){
      console.log(payload)
    },
    setUsuario({ commit }, user) {
      const usuario = {
        nombre: user.displayName,
        email: user.email,
        uid: user.uid,
        foto: user.photoURL
      }
      commit('nuevoUsuario', usuario)
    },
    agregarTarea({ commit, state }, datosTarea) {
      db.collection(state.usuario.email).add({
        desc: datosTarea.desc,
        fecha: datosTarea.fecha,
        materia: datosTarea.materia,
        color: datosTarea.color,
        estadoT:'Pendiente',

      })
        .then(() => {
          Vue.swal({
            position: "top",
            icon: "success",
            title: "Tarea agregada",
            showConfirmButton: false,
            timer: 2000,
          });
          router.replace('/')

        }).catch(() => {
          Vue.swal({
            position: "top",
            icon: "error",
            title: "Opps! Ocurrio un error",
            showConfirmButton: false,
            timer: 2000,
          })
          router.replace('/')
        })
    },

    getTareas({ commit, state }) {
      commit('spinner',true)
      const tareas = []
      db.collection(state.usuario.email).get()
        .then(res => {
          res.forEach(doc => {
            let tarea = doc.data()
            tarea.id = doc.id
            tareas.push(tarea)

          })
          commit('spinner',false)
          commit('setTareas', tareas)
        })
    },
    obtenerTarea({ commit, state }, idTarea) {
      db.collection(state.usuario.email).doc(idTarea).get()
        .then(doc => {

          let tarea = doc.data()
          tarea.id = doc.id
          commit('obtenerTarea', tarea)
        })
    },
    editarTarea({ commit, state }, tarea) {
      db.collection(state.usuario.email).doc(tarea.id).update({
        desc: tarea.desc,
        fecha: tarea.fecha,
        materia: tarea.materia,
        color: tarea.color,
        estadoT: 'Pendiente',
      }).then(() => {
        Vue.swal({
          position: "top",
          icon: "success",
          title: "Tarea editada",
          showConfirmButton: false,
          timer: 2000,
        })
        router.replace('/')

      }).catch(() => {
        Vue.swal({
          position: "top",
          icon: "error",
          title: "Opps! Ocurrio un error",
          showConfirmButton: false,
          timer: 2000,
        })
        router.replace('/')
      })
    },
    finalizarTarea({ commit, state }, idTarea) {
      db.collection(state.usuario.email).doc(idTarea).update({
        estadoT: 'Finalizada',
      }).then(() => {
        Vue.swal({
          position: "top",
          icon: "success",
          title: "Tarea finalizada",
          showConfirmButton: false,
          timer: 2000,
        })
        router.replace('/finalizada')

      }).catch(() => {
        Vue.swal({
          position: "top",
          icon: "error",
          title: "Opps! Ocurrio un error",
          showConfirmButton: false,
          timer: 2000,
        })
        router.replace('/')
      })
    },
    eliminarTarea({ commit, state }, idTarea) {
      db.collection(state.usuario.email).doc(idTarea).delete()
        .then(() => {
          Vue.swal({
            position: "top",
            icon: "success",
            title: "Tarea eliminada",
            showConfirmButton: false,
            timer: 2000,
          })
          router.replace('/')
        }).catch(() => {
          Vue.swal({
            position: "top",
            icon: "error",
            title: "Opps! Ocurrio un error",
            showConfirmButton: false,
            timer: 2000,
          })
          router.replace('/finalizada')
        })
    },
    cerrarSesion({ commit }) {
      auth.signOut()
      commit('nuevoUsuario', null)
     
      router.push('/ingreso')
    }
  },
  getters: {
    active(state) {
      if (state.usuario === null) {
        return false
      } else {
        return true
      }
    },
    errorA(state) {
      if (state.error === null) {
        return false
      } else {
        return true
      }
    }
  }
})
