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
    <v-card class="mx-auto" width="85%" height="85%" elevation="7">
      <v-card-title>
        {{ companySelect }} → {{ project.project_description }} → Historias de
        usuario:
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-row
        dense
        style="margin-top: 2%; margin-left: 2%; margin-right: 2%; height: 81.8%"
      >
        <v-col
          v-for="userHistory in userHistories"
          :value="userHistory.id_userHistory"
          cols="2"
          row="2"
          v-bind:key="userHistory.id_userHistory"
        >
          <v-card elevation="3" style="margin: 2%" @click="selectUserHistory(userHistory)">
            <v-card-text>
              {{ userHistory.userHistory_description }}
            </v-card-text>
            <v-img
              :src="userHistory.userHistory_image"
              width="50%"
              height="50%"
              class="ma-3"
              style="left: 20%"
            ></v-img>
          </v-card>
        </v-col>
      </v-row>
      <div id="mainFooterDiv">
        <div id="footer1CardDiv">
          <v-dialog
            v-model="dialog"
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                flat
                style="margin: 2%; "
                v-bind="attrs"
                v-on="on"
                @click="dialog = true"
              >
                Crear historia de usuario
              </v-btn>
            </template>
            <v-card width="45vh" height="45vh">
              <div id="titleCard">
                <h2>Crear historia de usuario</h2>
              </div>
              <div id="bodyCard">
                <div class="inputBodyCard">
                  <input
                    type="text"
                    class="inputComponent"
                    placeholder="Ingrese el nombre de la historia"
                    v-model="userHistoryDescription"
                  />
                </div>
                <div class="inputBodyCard">
                  <input
                    type="text"
                    class="inputComponent"
                    placeholder="Ingrese el url de la imagen"
                    v-model="userHistoryImage"
                  />
                </div>
              </div>
              <div id="footerCard">
                <div class="buttonFooterCard">
                  <v-btn flat style="margin: 2%" @click="validateFields">
                    Crear
                  </v-btn>
                </div>
                <div class="buttonFooterCard">
                  <v-btn flat style="margin: 2%" @click="dialog = false">
                    Cancelar
                  </v-btn>
                </div>
              </div>
            </v-card>
          </v-dialog>
        </div>
        <div id="footer2CardDiv">
          <v-btn flat @click="backRoute" style="margin: 2%"> ↰ Volver </v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["project", "companySelect"]),
  },
  data() {
    return {
      userHistories: [],
      companyName: "",
      dialog: false,
      userHistoryDescription: "",
      userHistoryImage: "",
      loadedAlert: false,
    };
  },
  methods: {
    ...mapMutations(["setUserHistory"]),
    getUserHistories() {
      this.loadedAlert = true;
      this.axios
        .get(
          "https://e-ticketsfrontend.herokuapp.com/api/userHistory/project=" +
            this.project.id_project
        )
        .then((response) => {
          this.loadedAlert = false;
          this.userHistories = response.data.data;
        })
        .catch((error) => {
          this.loadedAlert = false;
          console.log(error);
        });
    },
    selectUserHistory(userHistory) {
      this.setUserHistory(userHistory);
      this.$router.push({ name: "Tickets"});
    },
    backRoute() {
      this.$router.back();
    },
    validateFields() {
      if (this.userHistoryDescription == "") {
        this.alert(
          "Error",
          "¡Debe ingresar el nombre de la historia!",
          "error"
        );
      } else {
        this.createUserHistory();
      }
    },
    createUserHistory() {
      this.loadedAlert = true;
      let userHistory = {
        id_project: this.project.id_project,
        userHistory_description: this.userHistoryDescription,
        userHistory_image: this.userHistoryImage,
      };
      this.axios
        .post(
          "https://e-ticketsfrontend.herokuapp.com/api/userHistory",
          userHistory
        )
        .then((response) => {
          this.loadedAlert = false;
          console.log(response);
          this.getUserHistories();
          this.dialog = false;
          this.alert(
            "Historia creada",
            "¡La historia de usuario de ha creado con éxito!",
            "success"
          );
          this.userHistoryDescription="";
          this.userHistoryImage="";
        })
        .catch((error) => {
          this.loadedAlert = false;
          console.log(error);
          if (error.message == "Request failed with status code 400") {
            this.alert(
              "Error",
              "¡Ingrese una url más corta como imagen!",
              "error"
            );
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
    this.getUserHistories();
  },
};
</script>
<style scoped>
#containerDiv {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#mainFooterDiv {
  height: 11%;
  display: flex;
}
#footer1CardDiv {
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
#footer2CardDiv {
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
#titleCard {
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#bodyCard {
  height: 70%;
}
#footerCard {
  height: 15%;
  display: flex;
}
.buttonFooterCard {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inputBodyCard {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
}
.inputComponent {
  text-align: center;
  height: 3.5vh;
  width: 34vh;
  border: 1px solid black;
}
.sd{
  background: #02aa0294;
}
</style>
