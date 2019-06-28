<template>
<v-layout row wrap>
    <v-flex xs12 class="mt-2 mb-5">
        <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        lazy
        full-width
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            label="Please Select Month"
            prepend-icon="event"
            readonly
            v-on="on"
            :loading="!loaded"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" type="month" scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.dialog.save(date), ClearLocals(), GetMonthRecords()">OK</v-btn>
        </v-date-picker>
      </v-dialog>
    </v-flex>
    <v-flex xs12>
      <pie-chart v-if="loaded" :chart-data="categoryData" :options="options"/>
    </v-flex>
    <v-flex xs12>
      <h3 v-if="loaded">Monthly Expenses Summary: {{ sum }}</h3>
    </v-flex>
</v-layout>
</template>

<script>
import PieChart from './charts/PieChart'
import RandomColor from 'randomcolor'
import axios from 'axios'
export default {
  props: ['active'],
  components: {
    PieChart
  },
  data () {
    return {
      date: new Date().toISOString().substr(0, 7),
      modal: false,
      loaded: false,
      sum: 0,
      categoryData: {
        labels: [],
        datasets: [
          {
            label: 'Categories',
            data: [],
            backgroundColor: []
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    this.GetMonthRecords()
  },
  methods: {
    ClearLocals () {
      this.loaded = false
      this.categoryData.labels = []
      this.categoryData.datasets[0].data = []
      this.categoryData.datasets[0].backgroundColor = []
      this.sum = 0
    },
    GetMonthRecords () {
      axios.get('/api/record/getRecordsMonth', {
        params: {
          month: this.date
        }
      }).then(records => {
        records.data.sort((a, b) => {
          if (a.Category < b.Category) {
            return -1
          }
          if (a.Category > b.Category) {
            return 1
          }
          return 0
        })
        let index = -1
        records.data.forEach(record => {
          if (!this.categoryData.labels.includes(record.Category)) {
            this.categoryData.labels.push(record.Category)
            this.categoryData.datasets[0].data.push(0)
            this.categoryData.datasets[0].backgroundColor.push(RandomColor())
            index++
          }
          let rounded = Math.round(record.Cost)
          this.categoryData.datasets[0].data[index] += +rounded
          this.sum += +rounded
        })
      }).catch(e => {
        this.$toasted.show('Failed to get records. Please try again.', {
          theme: 'bubble',
          position: 'top-right',
          duration: 5000,
          type: 'error',
          icon: 'error'
        })
      }).finally(() => {
        this.loaded = true
      })
    }
  }
}
</script>
