<template>
  <mdb-container>
    <mdb-line-chart dark color="stylish" :data="lineChartData" :options="lineChartOptions" :width="600" :height="300"></mdb-line-chart>
  </mdb-container>
</template>

<script>
  import { mdbLineChart, mdbContainer } from 'mdbvue';
  export default {
    name: 'ChartPage',
    components: {
      mdbLineChart,
      mdbContainer
    },
    data() {
      return {
        lineChartData: {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [
            {
              label: "My First dataset",
              color: "grey",
              backgroundColor: "rgba(255, 99, 132, 0.1)",
              borderColor: "red",
              borderWidth: 0.7,
              data: [65, 59, 80, 81, 56, 55, 40]
            }
          ]
        },
        lineChartOptions: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            xAxes: [{
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)"
              }
            }],
            yAxes: [{
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)"
              }
            }]
          }
        }
      };
    }
  }
</script>