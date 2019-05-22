<template>
    <mdb-container>
        <div style="display:flex; justify-content: center;">
            <mdb-btn @click.native="modal = true, OpenClicked()" gradient="peach" size="sm"><mdb-icon icon="user-plus" class="mr-2"/>Add Connection</mdb-btn>
        </div>
      <mdb-modal removeBackdrop :show="modal" @close="modal = false, ClosedClicked()">
      <mdb-modal-header class="text-center">
        <mdb-modal-title tag="h4" bold class="w-100">New Connection</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body class="mx-3 grey-text">
        <mdb-input v-model="email" label="Connection Email" icon="envelope" type="email" class="mt-2"/>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn @click="AddConnection()" gradient="peach">Submit</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    </mdb-container>
</template>

<script>
import { mdbNumericInput, mdbIcon, mdbBtn, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbTooltip, mdbPopover, mdbInput, mdbTextarea, mdbContainer, mdbRow, mdbCol } from 'mdbvue'
import axios from 'axios'

export default {
  name: 'ModalPage',
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
    mdbIcon,
    mdbNumericInput
  },
  data () {
    return {
      modal: false,
      email: null
    }
  },
  methods: {
    AddConnection () {
      axios.post('/api/record/addConnection', {
        email: this.email
      }).then(res => {
        if (res) {
          this.ClearFields()
          this.$toasted.show('Connection Added successfully', {
            theme: 'bubble',
            position: 'top-right',
            duration: 5000,
            type: 'success',
            icon: 'check_circle'
          })
        } else {
          this.$toasted.show('Failed to Add connection. Please try again.', {
            theme: 'bubble',
            position: 'top-right',
            duration: 5000,
            type: 'error',
            icon: 'error'
          })
        }
        this.ClosedClicked()
      }).catch(e => {
        this.$toasted.show('Failed to Add connection. Please try again.', {
          theme: 'bubble',
          position: 'top-right',
          duration: 5000,
          type: 'error',
          icon: 'error'
        })
      })
    },
    OpenClicked () {
      this.$root.$emit('AddConnectionClicked')
    },
    ClosedClicked () {
      this.$root.$emit('AddConnectionCloseClicked')
    },
    ClearFields () {
      this.modal = false
      this.email = null
    }
  }
}
</script>
