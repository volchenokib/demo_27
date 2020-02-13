<template>
  <v-container>
    <v-layout column>
      <v-card class="pa-4 my-0 mx-auto dropDown" max-width="650" elevation="8">
        <v-form v-model="demoForm" ref="form" name="demoForm" class="text-xs-center">
          <v-layout row wrap justify-space-between>
            <!-- picker #1 -->
            <v-flex xs12 sm5>
              <v-menu
                ref="menuFrom"
                v-model="menuFrom"
                :close-on-content-click="false"
                lazy
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
                offset-y
                full-width
                :nudge-right="0"
                :nudge-bottom="30"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="computedDateFrom"
                    label="от"
                    persistent-hint
                    prepend-icon="event"
                    readonly
                    required
                    :rules="fromDateRules"
                    v-on="on"
                    color="primary"
                  ></v-text-field>
                </template>

                <v-date-picker
                  v-model="dateFrom"
                  min="2014-01-01"
                  :max="dateTo || today"
                  no-title
                  @input="menuFrom = false"
                  scrollable
                  first-day-of-week="1"
                  locale="ru-RU"
                  color="primary"
                ></v-date-picker>
              </v-menu>
            </v-flex>
            <!-- picker #2 -->
            <v-flex xs12 sm5>
              <v-menu
                v-model="menuTo"
                :close-on-content-click="false"
                lazy
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
                offset-y
                full-width
                :nudge-right="0"
                :nudge-bottom="30"
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
                    color="primary"
                  ></v-text-field>
                </template>

                <v-date-picker
                  v-model="dateTo"
                  :min="dateFrom || '2014-01-01'"
                  :max="today"
                  no-title
                  @input="menuTo = false"
                  scrollable
                  first-day-of-week="1"
                  locale="ru-RU"
                  color="primary"
                ></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>

          <!-- radio buttons -->
          <v-radio-group v-model="purchaseType" :mandatory="true">
            <v-radio
              name="singleProvider"
              label="закупка у единственного поставщика"
              value="singleProvider"
              color="primary"
            ></v-radio>
            <v-radio name="eAuction" label="электронный аукцион" value="eAuction" color="primary"></v-radio>
          </v-radio-group>

          <!-- switcher -->
          <v-switch
            name="localStorage"
            :value="true"
            v-model="localStorage"
            label="Взять из локального хранилища"
            color="primary"
          ></v-switch>

          <v-divider></v-divider>

          <!-- button -->
          <v-btn
            ref="downloadButton"
            color="primary"
            flat
            :disabled="buttonDisable"
            :loading="dataLoading"
            @click="submit"
          >
            сформировать
            <template v-slot:loader>
              <span class="d-flex mt-2">
                <v-icon class="loader mr-1" light>cached</v-icon>Загрузка
              </span>
            </template>
          </v-btn>
        </v-form>
      </v-card>
    </v-layout>
  </v-container>
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
// TODO:
// + formData
// - remove getters
// - error handler
// - notifications
export default {
  name: "demo1",
  data: () => ({
    demoForm: "",
    fromDateRules: [v => !!v || "Это обязательное поле"],
    toDateRules: [v => !!v || "Это обязательное поле"],
    formattedDateFrom: null,
    dateFrom: null,
    formattedDateTo: null,
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
          return (this.formattedDateFrom = `${day}.${month}.${year}`);
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
          return (this.formattedDateTo = `${day}.${month}.${year}`);
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
    }
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const payload = new FormData(demoForm);

        payload.append("dateFrom", this.formattedDateFrom);
        payload.append("dateTo", this.formattedDateTo);

        // Display the keys
        // for (let key of payload.keys()) {
        //   console.log(key);
        // }

        // Display the values
        // for (let value of payload.values()) {
        //   console.log(value);
        // }

        this.$store
          .dispatch("getFile", payload)
          .then(response => this.download(response));
      }
    },

    download(response) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.xlsx");
      document.body.appendChild(link);
      link.click();
    }
  }
};
</script>
