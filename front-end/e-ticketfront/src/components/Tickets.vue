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
      <v-dialog
        v-model="dialogTicket"
        hide-overlay
        persistent
        transition="dialog-bottom-transition"
      >
        <v-card width="45vh" height="45vh">
          <div class="titleCard">
            <h2 style="margin-left: 7%">Editar ticket</h2>
            <v-btn
              fab
              dark
              small
              color="red"
              style="left: 18%"
              @click="deleteTicket"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
          <div style="height: 70%">
            <div class="inputBodyEditCard">
              <input
                type="text"
                class="inputComponent"
                placeholder="Ingrese una descripción del ticket"
                v-model="ticketDescription"
              />
            </div>
            <div class="inputBodyEditCard">
              <select v-model="selectState" id="selectComponent">
                <option disabled value="">Seleccione un estado</option>
                <option
                  v-for="option in stateList"
                  :value="option.state_value"
                  v-bind:key="option.state_value"
                >
                  {{ option.state_name }}
                </option>
              </select>
            </div>
          </div>
          <div style="height: 15%; display: flex">
            <div class="buttonFooterCard">
              <v-btn flat style="margin: 2%" @click="validateFieldToEdit">
                Editar
              </v-btn>
            </div>
            <div class="buttonFooterCard">
              <v-btn flat style="margin: 2%" @click="dialogTicket = false">
                Cancelar
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-dialog>
      <v-card-title>
        {{ companySelect }} → {{ project.project_description }} →
        {{ userHistory.userHistory_description }} → Tickets:
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <div id="bodyCard">
        <div class="ticketColDiv">
          <h3 style="text-align: center">Activo</h3>
          <v-divider style="margin-top: 1%"></v-divider>
          <div class="contentColDiv">
            <v-col
              v-for="activeTicket in activeTickets"
              :value="activeTicket.id_ticket"
              cols="12"
              v-bind:key="activeTicket.id_ticket"
            >
              <v-card
                elevation="3"
                style="margin: 2%"
                @click="selectTicket(activeTicket)"
              >
                <v-card-title>
                  {{ activeTicket.ticket_comment }}
                </v-card-title>
                <v-card-text>
                  Estado: {{ activeTicket.ticket_state }}
                </v-card-text>
              </v-card>
            </v-col>
          </div>
        </div>
        <v-divider vertical></v-divider>
        <div class="ticketColDiv">
          <h3 style="text-align: center">En proceso</h3>
          <v-divider style="margin-top: 1%"></v-divider>
          <div class="contentColDiv">
            <v-col
              v-for="activeTicket in inProcessTickets"
              :value="activeTicket.id_ticket"
              cols="12"
              v-bind:key="activeTicket.id_ticket"
            >
              <v-card
                elevation="3"
                style="margin: 2%"
                @click="selectTicket(activeTicket)"
              >
                <v-card-title>
                  {{ activeTicket.ticket_comment }}
                </v-card-title>
                <v-card-text>
                  Estado: {{ activeTicket.ticket_state }}
                </v-card-text>
              </v-card>
            </v-col>
          </div>
        </div>
        <v-divider vertical></v-divider>
        <div class="ticketColDiv">
          <h3 style="text-align: center">Finalizado</h3>
          <v-divider style="margin-top: 1%"></v-divider>
          <div class="contentColDiv">
            <v-col
              v-for="activeTicket in finalizedTickets"
              :value="activeTicket.id_ticket"
              cols="12"
              v-bind:key="activeTicket.id_ticket"
            >
              <v-card
                elevation="3"
                style="margin: 2%"
                @click="selectTicket(activeTicket)"
              >
                <v-card-title>
                  {{ activeTicket.ticket_comment }}
                </v-card-title>
                <v-card-text>
                  Estado: {{ activeTicket.ticket_state }}
                </v-card-text>
              </v-card>
            </v-col>
          </div>
        </div>
      </div>
      <div id="footerCard">
        <div id="footer1CardDiv">
          <v-dialog
            v-model="dialog"
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                flat
                style="margin: 2%"
                v-bind="attrs"
                v-on="on"
                @click="openDialog"
              >
                Crear Ticket
              </v-btn>
            </template>
            <v-card width="45vh" height="25vh">
              <div class="titleCard">
                <h2>Crear Ticket</h2>
              </div>
              <div id="bodyCardInDialog">
                <div class="inputBodyCard">
                  <input
                    type="text"
                    class="inputComponent"
                    placeholder="Ingrese una descripción del ticket"
                    v-model="ticketDescription"
                  />
                </div>
              </div>
              <div id="footerCardInDialog">
                <div class="buttonFooterCard">
                  <v-btn flat style="margin: 2%" @click="validateFieldToCreate">
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
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["project", "companySelect", "userHistory"]),
  },
  data() {
    return {
      activeTickets: [],
      inProcessTickets: [],
      finalizedTickets: [],
      scrollInvoked: 0,
      dialog: false,
      ticketSelected: {},
      ticketDescription: "",
      dialogTicket: false,
      selectState: "",
      stateList: [
        { state_name: "Activo", state_value: "active" },
        { state_name: "En proceso", state_value: "inProcess" },
        { state_name: "Finalizado", state_value: "finalized" },
      ],
      loadedAlert: false,
    };
  },
  methods: {
    onScroll() {
      this.scrollInvoked++;
    },
    backRoute() {
      this.$router.back();
    },
    getTickets() {
      this.loadedAlert = true;
      this.activeTickets = [];
      this.inProcessTickets = [];
      this.finalizedTickets = [];
      this.axios
        .get(
          "https://e-ticketsfrontend.herokuapp.com/api/ticket/userHistory=" +
            this.userHistory.id_userHistory
        )
        .then((response) => {
          this.loadedAlert = false;
          for (var ticket of response.data.data) {
            switch (ticket.ticket_state) {
              case "active":
                this.activeTickets.push(ticket);
                break;
              case "inProcess":
                this.inProcessTickets.push(ticket);
                break;
              case "finalized":
                this.finalizedTickets.push(ticket);
                break;
            }
          }
        })
        .catch((error) => {
          this.loadedAlert = false;
          console.log(error);
        });
    },
    selectTicket(ticket) {
      this.dialogTicket = true;
      this.ticketSelected = ticket;
      this.ticketDescription = ticket.ticket_comment;
      this.selectState = ticket.ticket_state;
    },
    validateFieldToEdit() {
      if (this.ticketDescription == "") {
        this.alert("Error", "¡Ingrese una descripción del ticket!", "error");
      } else {
        this.editTicket();
      }
    },
    validateFieldToCreate() {
      if (this.ticketDescription == "") {
        this.alert("Error", "¡Ingrese una descripción del ticket!", "error");
      } else {
        this.createTicket();
      }
    },
    openDialog() {
      this.ticketDescription = "";
      this.dialog = true;
    },
    createTicket() {
      this.loadedAlert = true;
      let ticket = {
        id_userHistory: this.userHistory.id_userHistory,
        ticket_comment: this.ticketDescription,
        ticket_state: "active",
      };
      this.axios
        .post("https://e-ticketsfrontend.herokuapp.com/api/ticket", ticket)
        .then((response) => {
          this.loadedAlert = false;
          this.getTickets();
          this.dialog = false;
          if (response.statusText == "Created") {
            this.loadedAlert = false;
            this.alert(
              "Ticket creado",
              "¡El ticket se ha creado con éxito!",
              "success"
            );
          }
        })
        .catch((error) => {
          if (error.message == "Request failed with status code 400") {
            this.alert(
              "Error",
              "¡Ingrese una descripción del ticket válido!",
              "error"
            );
          }
          this.dialog = false;
        });
    },
    deleteTicket() {
      this.loadedAlert = true;
      this.axios
        .delete(
          "https://e-ticketsfrontend.herokuapp.com/api/ticket/id=" +
            this.ticketSelected.id_ticket
        )
        .then(() => {
          this.loadedAlert = false;
          this.getTickets();
          this.dialogTicket = false;
            this.alert(
              "Ticket borrado",
              "¡El ticket se ha borrado con éxito!",
              "success"
            );
        })
        .catch(() => {
          this.loadedAlert = false;
            this.alert(
              "Error",
              "¡No se ha podido borrar el ticket!",
              "error"
            );
          this.dialogTicket = false;
        });
    },
    editTicket() {
      this.loadedAlert = true;
      let ticket = {
        ticket_comment: this.ticketDescription,
        ticket_state: this.selectState,
      };
      this.axios
        .put(
          "https://e-ticketsfrontend.herokuapp.com/api/ticket/id=" +
            this.ticketSelected.id_ticket,
          ticket
        )
        .then((response) => {
          this.loadedAlert = false;
          this.getTickets();
          this.dialogTicket = false;
          if (response.statusText == "Created") {
            this.alert(
              "Ticket editado",
              "¡El ticket se ha editado con éxito!",
              "success"
            );
          }
        })
        .catch((error) => {
          this.loadedAlert = false;
          if (error.message == "Request failed with status code 400") {
            this.alert(
              "Error",
              "¡Ingrese una descripción del ticket válido!",
              "error"
            );
          }
          this.dialogTicket = false;
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
    this.getTickets();
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
#bodyCard {
  display: flex;
  height: 83%;
  margin-top: 1.5%;
}
#footerCard {
  height: 9%;
  display: flex;
}
.ticketColDiv {
  width: 33.5%;
}
.contentColDiv {
  overflow-y: auto;
  height: 90%;
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
.titleCard {
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#bodyCardInDialog {
  height: 60%;
}
#footerCardInDialog {
  height: 25%;
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
  height: 100%;
}
.inputComponent {
  text-align: center;
  height: 3.5vh;
  width: 34vh;
  border: 1px solid black;
}
.inputBodyEditCard {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
}
#selectComponent {
  text-align: center;
  height: 3.5vh;
  width: 24vh;
  border: 1px solid black;
}
</style>
