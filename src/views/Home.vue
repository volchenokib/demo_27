<template>
  <v-layout column>
    <v-card class="pa-4 my-0 mx-auto" max-width="650" elevation="8">
      <v-form v-model="demoForm" ref="form">
        <v-layout row wrap justify-space-between>
          <v-flex xs12 sm5>
            <!-- picker #1 -->
            <v-menu
              ref="menuFrom"
              v-model="menuFrom"
              :close-on-content-click="false"
              :nudge-bottom="-60"
              :nudge-right="-600"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  class="input"
                  v-model="computedDateFrom"
                  label="от"
                  persistent-hint
                  prepend-icon="event"
                  readonly
                  required
                  :rules="fromDateRules"
                  v-on="on"
                  color="indigo darken-1"
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="dateFrom"
                min="2018-01-01"
                :max="dateTo || today"
                no-title
                @input="menuFrom = false"
                scrollable
                first-day-of-week="1"
                locale="ru-RU"
                color="indigo darken-1"
              ></v-date-picker>
            </v-menu>
          </v-flex>

          <v-flex xs12 sm5>
            <!-- picker #2 -->
            <v-menu
              class="menu"
              v-model="menuTo"
              :close-on-content-click="false"
              :nudge-bottom="-60"
              :nudge-right="-600"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="computedDateTo"
                  label="до"
                  persistent-hint
                  prepend-icon="event"
                  readonly
                  required
                  :rules="toDateRules"
                  v-on="on"
                  color="indigo darken-1"
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="dateTo"
                :min="dateFrom || '2018-01-01'"
                :max="today"
                no-title
                @input="menuTo = false"
                scrollable
                first-day-of-week="1"
                locale="ru-RU"
                color="indigo darken-1"
              ></v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>

        <!-- radio buttons -->
        <v-radio-group v-model="purchaseType" :mandatory="true">
          <v-radio
            label="закупка у единственного поставщика"
            value="singleProvider"
            color="indigo darken-1"
          ></v-radio>
          <v-radio label="электронный аукцион" value="eAuction" color="indigo darken-1"></v-radio>
        </v-radio-group>

        <v-switch
          v-model="localStorage"
          label="Взять из локального хранилища"
          color="indigo darken-1"
        ></v-switch>
      </v-form>

      <v-divider></v-divider>

      <!-- button -->
      <v-btn
        color="indigo darken-1"
        flat
        :disabled="buttonDisable"
        :loading="dataLoading"
        @click="download"
      >
        сформировать
        <template v-slot:loader>
          <span class="d-flex mt-2">
            <v-icon class="loader mr-1" light>cached</v-icon>Загрузка
          </span>
        </template>
      </v-btn>
    </v-card>
  </v-layout>
</template>


<style lang="scss">
.loader {
  animation: loader 1s infinite;
  margin-top: -4px;
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>


<script>
import Vue from "vue";
import { setTimeout } from "timers";
export default {
  name: "home",
  data: () => ({
    demoForm: "",
    fromDateRules: [v => !!v || "Это обязательное поле"],
    toDateRules: [v => !!v || "Это обязательное поле"],
    dateFrom: null,
    dateTo: null,
    menuFrom: false,
    menuTo: false,
    purchaseType: "singleProvider",
    localStorage: false
  }),

  computed: {
    resetForm() {
      return this.$store.getters.formResetNeed;
    },
    dataLoading() {
      return this.$store.getters.getDataState;
    },
    buttonDisable() {
      return this.$store.getters.getButtonState;
    },
    computedDateFrom: {
      set: function() {
        this.dateFrom;
      },
      get: function() {
        if (this.dateFrom) {
          const [year, month, day] = this.dateFrom.split("-");
          return `${day}.${month}.${year}`;
        }
      }
    },
    computedDateTo: {
      set: function() {
        this.dateTo;
      },
      get: function() {
        if (this.dateTo) {
          const [year, month, day] = this.dateTo.split("-");
          return `${day}.${month}.${year}`;
        }
      }
    },
    today() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      return (today = yyyy + "-" + mm + "-" + dd);
    }
  },

  watch: {
    resetForm() {
      this.$refs.form.reset();
      this.dateFrom = null;
      this.dateTo = null;
      this.purchaseType = "singleProvider";
      this.localStorage = false;
      // this.$store.state.form.isReset = false;
      this.$store.commit("API_DATA_SUCCES", false);
      console.log("watcher", this.$store.state.form.isReset);
    }
  },

  methods: {
    download() {
      if (this.$refs.form.validate()) {
        const payload = new FormData();

        payload.append("dateFrom", this.computedDateFrom);
        payload.append("dateTo", this.computedDateTo);
        payload.append("purchaseType", this.purchaseType);
        payload.append("localStorage", this.localStorage);
        console.log("payload", payload);

        this.$store.dispatch("downloadFile", payload);
      }
    }
  }
};
</script>
