<template>
<div class="flexible-content">
  <navbar />
  <main>
    <mdb-container class="mt-5">
      <mdb-datatable
        :data="data"
        class="grey lighten-5 records-table"
        striped
        hover
        responsive 
        fixed
        v-bind:class="{ active: !addRecordcliked, disabled: addRecordcliked }"
      />
    </mdb-container>
  </main>
</div>
</template>

<script>
import Navbar from './Navbar'
import { mdbDatatable, mdbContainer } from 'mdbvue'
import axios from 'axios'

export default {
  components: {
    Navbar,
    mdbDatatable,
    mdbContainer
  },
  data () {
    return {
      addRecordcliked: false,
      data: {
        columns: [
          {
            label: 'Name',
            field: 'Name'
          },
          {
            label: 'Date',
            field: 'Date',
            sort: 'desc'
          },
          {
            label: 'Category',
            field: 'Category'
          },
          {
            label: 'Description',
            field: 'Description'
          },
          {
            label: 'Cost',
            field: 'Cost'
          }
        ],
        rows: []
      }
    }
  },
  mounted () {
    this.$root.$on('AddRecordClicked', () => {
      this.addRecordcliked = true
    })
    this.$root.$on('AddRecordCloseClicked', () => {
      this.addRecordcliked = false
    })
  },
  created () {
    this.GetRecords()
  },
  methods: {
    GetRecords () {
      axios.get('/api/record/getRecords').then(res => {
        res.data.forEach(record => {
          this.data.rows.push(record)
        })
      }).catch(e => {
      })
    }
  }
}
</script>

<style scoped>
.active {
  opacity: 0.85;
  pointer-events: all;
}

.disabled {
  opacity: 0.1;
  pointer-events: none;
}
</style>

<style scoped>
.records-table {
  table-layout: fixed;
}
</style>

