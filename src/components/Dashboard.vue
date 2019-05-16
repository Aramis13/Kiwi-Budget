<template>
<div class="flexible-content">
  <navbar />
  <main>
    <mdb-container class="mt-5">
      <mdb-datatable
        :data="'api/DB/'"
        class="grey lighten-5"
        striped
        hover
        style="opacity:0.85;"
      />
    </mdb-container>
  </main>
</div>
</template>

<script>
import Navbar from './Navbar'
import { mdbDatatable, mdbContainer } from 'mdbvue'
export default {
  components: {
    Navbar,
    mdbDatatable,
    mdbContainer
  }
}
</script>
