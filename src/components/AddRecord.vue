<template>
    <mdb-container>
        <div style="display:flex; justify-content: center;">
            <mdb-btn @click.native="modal = true, OpenClicked()" gradient="peach" size="sm"><mdb-icon icon="file-alt" class="mr-2"/>Add Record</mdb-btn>
        </div>
      <mdb-modal removeBackdrop :show="modal" @close="modal = false, ClosedClicked()">
      <mdb-modal-header class="text-center">
        <mdb-modal-title tag="h4" bold class="w-100">New Record</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body class="mx-3 grey-text">
        <mdb-input v-model="date" label="Date" icon="calendar-alt" type="date" class="mb-5"/>
        <div class="form-group mb-5" style="width:100%">
          <div class="input-group" style="width:100%">
          <div class="input-group-addon">
          <mdb-icon icon="file-alt" class="mr-2" style="font-size: 1.75rem;"/>
          </div>
          <select v-model="category" class="browser-default custom-select" >
          <option value="Category" selected disabled>Category</option>
          <option value="One">One</option>
          <option value="Two">Two</option>
          <option value="Three">Three</option>
        </select>
          </div>
        </div>
          <mdb-input v-model="cost" label="Cost" icon="dollar-sign" type="number" class="mb-5"/>
        <mdb-input v-model="description" type="textarea" id="descriptionInput" label="Description" icon="edit" class="mb-5" />
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn @click="AddRecord()" gradient="peach">Submit</mdb-btn>
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
      date: new Date().toISOString().slice(0, 10),
      category: 'Category',
      cost: null,
      description: null
    }
  },
  methods: {
    AddRecord () {
      axios.post('/api/record/addRecord', {
        date: this.date,
        category: this.category,
        description: this.description,
        cost: this.cost
      }).then(res => {
        if (res) {
          this.ClearFields()
          this.$toasted.show('Record Added successfully', {
            theme: 'bubble',
            position: 'top-right',
            duration: 5000,
            type: 'success',
            icon: 'check_circle'
          })
        } else {
          this.$toasted.show('Failed to Add record. Please try again.', {
            theme: 'bubble',
            position: 'top-right',
            duration: 5000,
            type: 'error',
            icon: 'error'
          })
        }
        this.ClosedClicked()
      }).catch(e => {
        this.$toasted.show('Failed to Add record. Please try again.', {
          theme: 'bubble',
          position: 'top-right',
          duration: 5000,
          type: 'error',
          icon: 'error'
        })
      })
    },
    OpenClicked () {
      this.$root.$emit('AddRecordClicked')
    },
    ClosedClicked () {
      this.$root.$emit('AddRecordCloseClicked')
    },
    ClearFields () {
      this.modal = false
      this.date = new Date().toISOString().slice(0, 10)
      this.category = 'Category'
      this.cost = null
      this.description = null
    }
  }
}
</script>
