<template>
  <div id="containerDiv">
    <v-card class="mx-auto" width="85%" height="85%" elevation="7">
      <v-card-title> {{ companyName }} → Proyectos: </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-row
        dense
        style="margin-top: 2%; margin-left: 2%; margin-right: 2%; height: 81%"
      >
        <v-col
          v-for="project in projects"
          :value="project.id_project"
          v-model="projectSelected"
          cols="2"
          row="2"
          v-bind:key="project.id_project"
        >
          <v-card
            elevation="3"
            @click="selectProject(project)"
            style="margin: 2%"
          >
            <v-card-text>
              {{ project.project_description }}
            </v-card-text>
            <v-img
              :src="project.project_image"
              width="50%"
              height="50%"
              class="ma-3"
              style="left: 20%"
            ></v-img>
          </v-card>
        </v-col>
      </v-row>
      <div id="footerDiv">
        <div id="footer2CardDiv">
          <v-btn flat style="right: 6%; width: 100%;" @click="logout"> Cerrar sesión </v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      projects: [],
      projectSelected: "",
      companyName: "",
    };
  },
  methods: {
    ...mapMutations(["setProject", "setCompany"]),
    getProjects() {
      this.axios
        .get(
          "https://e-ticketsfrontend.herokuapp.com/api/project/company=" +
            this.user.id_company
        )
        .then((response) => {
          this.projects = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selectProject(projectS) {
      this.setProject(projectS);
      this.$router.push({ name: "UserHistories" });
    },
    logout(){
      this.$router.push({ name: "Login" });
    },
    getCompany() {
      this.axios
        .get(
          "https://e-ticketsfrontend.herokuapp.com/api/company/id=" +
            this.user.id_company
        )
        .then((response) => {
          this.setCompany(response.data.data.company_name);
          this.companyName = response.data.data.company_name;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getProjects();
    this.getCompany();
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
#footerDiv {
  height: 11.3%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
