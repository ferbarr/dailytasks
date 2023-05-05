<template>
  <div v-if="!active">
    <v-alert
      v-if="errorA"
      color="red"
      dense
      type="error"
      class="d-flex mx-auto col-sm-8"
      >Ya existe una cuenta con la misma dirección de correo electrónico
    </v-alert>

    <v-row class="justify-center mt-2">
      <v-col class="col-12 col-sm-8 col-md-6 col-xl-4">
        <v-card>
          <v-card-text
            class="
              text-center
              display-1
              dark--text
              text-uppercase
              ingreso
              rounded-t
              elevation-5
            "
          >
            <span>Ingreso</span>
          </v-card-text>

          <v-card-text>
            <v-btn
              @click="inicioG"
              block
              color="red darken-1"
              class="mb-4 white--text"
            >
              <v-icon class="mr-2">mdi-gmail</v-icon> Google</v-btn
            >
            <v-btn
              @click="inicioF"
              block
              color="blue darken-1"
              class="white--text"
              ><v-icon class="mr-2">mdi-facebook</v-icon>Facebook
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import { firebase,db } from "../firebase";
import router from "../router";

export default {
  methods: {
    // INICIO DE SESION CON GOOGLE
    async inicioG() {
      const provider = new firebase.auth.GoogleAuthProvider();//INIDICAMOS EL PROVEDOR DE SESION
      firebase.auth().languageCode = "es";
      try {
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        const usuario = {
          nombre: user.displayName,
          email: user.email,
          uid: user.uid,
          foto: user.photoURL,
        };
         this.nuevoUsuario(usuario);
        // GUARDAR USUARIO EN FIRESTORE
        await db.collection('usuarios').doc(usuario.uid).set(
          usuario
        )

       
        this.setError(null);
        router.replace("/");
      } catch (e) {
        const error = e;
        this.setError(error);
      }
    },
    // INICIO DE SESION CON FACEBOOK
    async inicioF() {
      const provider = new firebase.auth.FacebookAuthProvider();//INIDICAMOS EL PROVEDOR DE SESION
      firebase.auth().languageCode = "es";
      try {
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        const usuario = {
          nombre: user.displayName,
          email: user.email,
          uid: user.uid,
          foto: user.photoURL,
        };
        this.nuevoUsuario(usuario);
        // GUARDAR USUARIO EN FIRESTORE
        await db.collection('usuarios').doc(usuario.uid).set(
          usuario
        ) 
        
        this.setError(null);
        router.replace("/");
      } catch (e) {
        const error = e;
        this.setError(error);
      }
    },
    ...mapMutations(["setError", "nuevoUsuario"]),
  },
  computed: {
    ...mapGetters(["active", "errorA"]),
    ...mapState(["error"]),
  },
};
</script>
<style>
.swal2-popup {
  font-family: Tahoma;
}
</style>