<template>
<v-layout row wrap>
    <v-flex xs12 class="mt-2 mb-5">
        <v-select
          v-model="selectedYear"
          :items="years"
          menu-props="auto"
          label="Select"
          hide-details
          prepend-icon="calendar_today"
          single-line
          :loading="!loaded"
          v-on:change="ClearLocals(), GetYearRecords()"
        ></v-select>
    </v-flex>
    <v-flex xs5>
      <pie-chart v-if="loaded" :chart-data="monthData" :options="options"/>
    </v-flex>
    <v-flex xs2>
      <v-spacer></v-spacer>
    </v-flex>
    <v-flex xs5>
      <pie-chart v-if="loaded" :chart-data="categoryData" :options="options"/>
    </v-flex>
    <v-flex xs12>
      <h3 v-if="loaded">Yearly Expenses Summary: {{ sum }}</h3>
    </v-flex>
</v-layout>
</template>

<script>
import PieChart from './charts/PieChart'
import RandomColor from 'randomcolor'
import axios from 'axios'
export default {
  components: {
    PieChart
  },
  data () {
    return {
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'],
      selectedYear: new Date().getFullYear(),
      loaded: false,
      sum: 0,
      years: [],
      monthData: {
        labels: [],
        datasets: [
          {
            label: 'Months',
            data: [],
            backgroundColor: []
          }
        ]
      },
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
        responsive: false,
        maintainAspectRatio: true
      }
    }
  },
  created () {
    let curr = new Date().getFullYear()
    for (let i = 0; i < 30; i++, curr--) {
      this.years.push(curr)
    }
    this.GetYearRecords()
  },
  methods: {
    ClearLocals () {
      this.loaded = false
      this.monthData.labels = []
      this.monthData.datasets[0].data = []
      this.monthData.datasets[0].backgroundColor = []
      this.categoryData.labels = []
      this.categoryData.datasets[0].data = []
      this.categoryData.datasets[0].backgroundColor = []
      this.sum = 0
    },
    GetYearRecords () {
      axios.get('/api/record/getYearRecords', {
        params: {
          year: this.selectedYear
        }
      }).then(records => {
        let index = -1
        records.data.forEach(record => {
          let month = this.months[new Date(record.Date).getMonth() - 1]
          if (!this.monthData.labels.includes(month)) {
            this.monthData.labels.push(month)
            this.monthData.datasets[0].data.push(0)
            this.monthData.datasets[0].backgroundColor.push(RandomColor())
            index++
          }
          let rounded = Math.round(+record.Cost)
          this.monthData.datasets[0].data[index] += +rounded
          this.sum += +rounded
        })
        return records
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
          this.categoryData.datasets[0].data[index] += Math.round(+record.Cost)
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
