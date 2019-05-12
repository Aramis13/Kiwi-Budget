<template>
    <mdb-container style="margin-top: 1.5rem!important;">
        <div style="display:flex; justify-content: center;">
            <mdb-btn @click.native="modal = true" gradient="peach"><mdb-icon icon="plus" class="mr-2"/>Sign Up</mdb-btn>
        </div>
      <mdb-modal :show="modal" @close="modal = false">
      <mdb-modal-header class="text-center">
        <mdb-modal-title tag="h4" bold class="w-100">Sign up</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body class="mx-3 grey-text">
        <mdb-input v-model="userName" label="Username" icon="user" class="mb-5"/>
        <mdb-input v-model="email" label="Email" icon="envelope" type="email" class="mb-5"/>
        <mdb-input v-model="password" label="Password" icon="lock" type="password"/>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn @click="modal = false, Register()" gradient="peach">Sign Up</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    </mdb-container>
</template>

<script>
import { mdbIcon, mdbBtn, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbTooltip, mdbPopover, mdbInput, mdbTextarea, mdbContainer, mdbRow, mdbCol } from 'mdbvue'
import axios from 'axios'

export default {
  name: 'ModalPage',
  data () {
    return {
      userName: null,
      email: null,
      password: null,
      modal: false
    }
  },
  components: {
    mdbBtn,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbTooltip,
    mdbPopover,
    mdbInput,
    mdbTextarea,
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbIcon
  },
  methods: {
    Register () {
      axios.post('/api/user/createUser', {
        userName: this.userName,
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
