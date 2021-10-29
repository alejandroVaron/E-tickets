<template>
  <div id="containerDiv">
    <loader
      v-show="loadedAlert"
      object="#ff9633"
      color1="#ffffff"
      color2="#17fd3d"
      size="5"
      speed="2"
      bg="#343a40"
      objectbg="#999793"
      opacity="80"
      disableScrolling="false"
      name="dots"
    ></loader>
    <div id="mainDiv">
      <div>
        <h1 id="titleDiv">Inicio de sesión</h1>
      </div>
      <div class="fieldsDiv">
        <div class="fieldDiv">
          <input
            type="text"
            class="inputComponent"
            placeholder="Ingrese el email"
            v-model="email"
          />
        </div>
        <div class="fieldDiv">
          <input
            type="password"
            class="inputComponent"
            placeholder="Ingrese la contraseña"
            v-model="password"
          />
        </div>
        <div class="fieldDiv">
          <v-btn flat @click="validateFields"> Iniciar sesión </v-btn>
        </div>
        <div class="fieldDiv">
          <router-link to="/register" :style="styleRouterLink">
            <v-btn flat> ¿Aún no tienes cuenta? </v-btn>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["companySelect"]),
  },
  data() {
    return {
      email: "",
      password: "",
      route: "",
      styleRouterLink: "text-decoration: none; color: inherit;",
      loadedAlert: false,
    };
  },
  methods: {
    ...mapMutations(["setUser"]),
    login() {
      this.loadedAlert = true;
      this.axios
        .get(
          "https://e-ticketsfrontend.herokuapp.com/api/user/email=" + this.email
        )
        .then((response) => {
          this.loadedAlert = false;

          if (
            response.data.data == undefined ||
            response.data.data.user_password != this.password
          ) {
            this.alert(
              "Usuario no encontrado",
              "¡El email o la contraseña es incorrecta!",
              "error"
            );
          } else {
            this.alert(
              "Inicio de sesión",
              "¡Bienvenido " + response.data.data.user_name + "!",
              "success"
            );
            this.$router.push({ name: "Projects", params: response.data.data });
            this.setUser(response.data.data);
          }
        })
        .catch((error) => {
          this.loadedAlert = false;
          console.log(error);
        });
    },
    validateFields() {
      if (this.email == "" || this.password == "") {
        this.alert("Error", "¡Debe llenar todos los campos!", "error");
      } else {
        this.login();
      }
    },
    alert(title, text, type) {
      this.$notify({
        title: title,
        text: text,
        duration: 1700,
        type: type,
      });
    },
  },
};
</script>
<style scoped>
#mainDiv {
  height: 80vh;
  width: 100vh;
}
#fieldsDiv {
  margin-top: 12.5%;
  margin-left: 25%;
  width: 50%;
  height: 70%;
}
.fieldDiv {
  margin-top: 5%;
  height: 10%;
  text-align: center;
}
#titleDiv {
  text-align: center;
}
.inputComponent {
  text-align: center;
  height: 3.5vh;
  width: 24vh;
  border: 1px solid black;
}
#containerDiv {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
