<template>
<mdbContainer>
  <section class="form-simple">
    <mdb-row class="justify-content-center mx-auto mt-5">
      <mdb-col md="5">
        <mdb-card>
          <div class="header pt-3 blue lighten-2">
            <mdb-row class="d-flex justify-content-center">
              <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Log in</h3>
            </mdb-row>
          </div>
          <mdb-card-body class="mx-4 mt-4">
            <mdb-input v-model="email" label="Your email" type="text"/>
            <mdb-input v-model="password" label="Your password" type="password" containerClass="mb-0"/>
            <div class="text-center mb-4 mt-5">
              <mdb-btn type="button" gradient="blue" rounded class="btn-block z-depth-1a" :disabled="!emailValidated || !passwordValidated">Sign in</mdb-btn>
            </div>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>
  </section>
</mdbContainer>
</template>

<script>
import { mdbRow, mdbCol, mdbCard, mdbCardBody, mdbInput, mdbBtn, mdbContainer } from 'mdbvue'
export default {
  name: 'FormsPage',
  components: {
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardBody,
    mdbInput,
    mdbBtn,
    mdbContainer
  },
  data () {
    return {
      email: null,
      password: null,
      emailValidated: false,
      passwordValidated: false
    }
  },
  watch: {
    email (val) {
      console.log(val)
    },
    password (val) {
      console.log(val)
    }
  }
}
</script>

<style scoped>
  .form-simple .font-small {
    font-size: 0.8rem; }

  .form-simple .header {
    border-top-left-radius: .3rem;
    border-top-right-radius: .3rem; }

  .form-simple input[type=text]:focus:not([readonly]) {
    border-bottom: 1px solid #ff3547;
    -webkit-box-shadow: 0 1px 0 0 #ff3547;
    box-shadow: 0 1px 0 0 #ff3547; }

  .form-simple input[type=text]:focus:not([readonly]) + label {
    color: #4f4f4f; }

  .form-simple input[type=password]:focus:not([readonly]) {
    border-bottom: 1px solid #ff3547;
    -webkit-box-shadow: 0 1px 0 0 #ff3547;
    box-shadow: 0 1px 0 0 #ff3547; }

  .form-simple input[type=password]:focus:not([readonly]) + label {
    color: #4f4f4f; }
</style>
