<template>
  <div v-if="active">
    <v-card class="mx-auto mt-3 rounded" max-width="500">
      <v-sheet color="grey darken-3" elevation="5">
         
        <v-row align="end" class="fill-height">
          <v-btn class="mt-3 "  @click="cerrarSesion" fab
            small
            absolute
            top
            right ><v-icon>mdi-logout</v-icon></v-btn>
          <v-col align-self="start" class="pa-0 text-center mt-5"  cols="12">
            <v-avatar class="profile rounded-pill" color="grey" size="164" tile>
              
              <v-img :src="usuario.foto"   :alt="usuario.nombre" :title="usuario.nombre">
                
              </v-img>
            </v-avatar>
          </v-col>
          <v-col class="text-center" >
            <v-list-item >
              <v-list-item-content>
                <v-list-item-title class="text-h5 white--text">
                  {{ usuario.nombre }}
                </v-list-item-title>
                <v-list-item-title class="white--text">{{ usuario.email }}</v-list-item-title>
                <div>
                  <input type="file" ref="boton" class="d-none" @change="buscarImagen($event)">
                <v-btn class="mt-2 col-5 mr-2" @click="$refs.boton.click()"   >Buscar imagen</v-btn>
                <v-btn class="mt-2 col-5" :disabled="file===null" @click="subirImagen" :loading="loading">Subir imagen</v-btn>
               
               </div>
                
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-card-text v-if="file!=null" class="text-center">
            <h4 >{{file.name}}</h4>
            <v-img :src="urlTemporal" aspect-ratio="2.2"  ></v-img>
          </v-card-text>
        </v-row>
      </v-sheet>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { storage,firebase,db } from "../firebase";
export default {
  name: "perfil",

  data: () => ({
    file:null,
    urlTemporal:null,
    loading:null
  }),
  computed: {
    ...mapState(["usuario"]),
    ...mapGetters(['active'])
  },
  methods: {
    ...mapActions(["cerrarSesion"]),
    buscarImagen(event){
      // console.log(event.target.files[0])
      this.file=event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload=(e)=>{
        this.urlTemporal=e.target.result;
      }
    },
   async subirImagen(){
     try {
       this.loading=true;
      //  Creamos directorio para guardar la imagen
       const directorioImg=storage.ref().child(this.usuario.email).child('foto de perfil');
      //  Gurdamos la img en el directorio
       const res=await directorioImg.put(this.file);
      // Traemos la informacion de esa imagen como el token, la ruta completa
      const urlImg= await directorioImg.getDownloadURL();
      // Cambiamos la ruta de la foto en el usuario
      this.usuario.foto=urlImg;
      // Actualizamos los datos en la bd
      await db.collection('usuarios').doc(this.usuario.uid).update({
        foto:urlImg
      });
       
     } catch (error) {
       console.log(error)
     }finally{
       this.loading=false;
       this.file=null;
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