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
        <h1 id="titleDiv">Registro</h1>
      </div>
      <div class="fieldsDiv">
        <div class="fieldDiv">
          <input
            type="text"
            class="inputComponent"
            placeholder="Ingrese su nombre"
            v-model="username"
          />
        </div>
        <div class="fieldDiv">
          <input
            type="text"
            class="inputComponent"
            placeholder="Ingrese un email válido"
            v-model="email"
          />
        </div>
        <div class="fieldDiv">
          <input
            type="password"
            class="inputComponent"
            placeholder="Ingrese una contraseña"
            v-model="password"
          />
        </div>
        <div class="fieldDiv">
          <select v-model="selectedCompany" id="selectComponent">
            <option disabled value="">Seleccione una compañia</option>
            <option
              v-for="option in options"
              :value="option.id_company"
              v-bind:key="option.id_company"
            >
              {{ option.company_name }}
            </option>
          </select>
        </div>
        <div class="fieldDiv">
          <v-btn flat @click="validateFields"> Crear cuenta </v-btn>
        </div>
        <div class="fieldDiv">
          <router-link to="/" :style="styleRouterLink">
            <v-btn flat> ¿Ya tienes una cuenta? </v-btn>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';

export default {
  computed:{
    ...mapState(['companySelect'])
  },
  data() {
    return {
      email: "",
      password: "",
      username: "",
      selectedCompany: "",
      route: "register",
      styleRouterLink: "text-decoration: none; color: inherit;",
      options: [{ company_name: "compañia 1", id_company: 1 }],
      loadedAlert: true,
    };
  },
  methods: {
    ...mapMutations(['setUser']),
    getCompanies() {
      this.axios
        .get("https://e-ticketsfrontend.herokuapp.com/api/company")
        .then((response) => {
          this.loadedAlert = false;
          this.options = response.data.data;
        })
        .catch((error) => {
          this.loadedAlert = false;
          console.log(error);
        });
    },
    validateFields() {
      if (
        this.email == "" ||
        this.password == "" ||
        this.username == "" ||
        this.selectedCompany == ""
      ) {
        this.alert("Error", "¡Debe llenar todos los campos!", "error");
      } else {
        this.createUser();
      }
    },
    createUser() {
      this.loadedAlert = true;
      let user = {
        user_name: this.username,
        user_email: this.email,
        user_password: this.password,
        id_company: this.selectedCompany,
      };
      this.axios
        .post("https://e-ticketsfrontend.herokuapp.com/api/user", user)
        .then((response) => {
          this.loadedAlert = false;
          if (response.statusText == "Created") {
            this.alert(
              "Registro de usuario",
              "¡Bienvenido " + this.username + "!",
              "success"
            );
            this.$router.push({ name: "Projects", params: response.data.data });
            this.setUser(response.data.data);
          }
        })
        .catch((error) => {
          this.loadedAlert = false;
          if (error.message == "Request failed with status code 400") {
            this.alert("Error", "¡El email ya existe, ingrese otro!", "error");
          }
        });
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
  created() {
    this.getCompanies();
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
#selectComponent {
  text-align: center;
  height: 3.5vh;
  width: 24vh;
  border: 1px solid black;
}
</style>
