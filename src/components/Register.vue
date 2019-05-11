<template>
    <mdb-container class="mt-5">
        <div style="display:flex; justify-content: center;">
            <mdb-btn @click.native="modal = true" gradient="peach"><mdb-icon icon="plus" class="mr-2"/>Register New User</mdb-btn>
        </div>
      <mdb-modal :show="modal" @close="modal = false">
      <mdb-modal-header class="text-center">
        <mdb-modal-title tag="h4" bold class="w-100">Sign up</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body class="mx-3 grey-text">
        <mdb-input label="Username" icon="user" class="mb-5"/>
        <mdb-input label="Email" icon="envelope" type="email" class="mb-5"/>
        <mdb-input label="Password" icon="lock" type="password"/>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn @click="modal = false" gradient="peach">Sign Up</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    </mdb-container>
</template>

<script>
/* eslint-disable */
    import { mdbIcon ,mdbBtn, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbTooltip, mdbPopover, mdbInput, mdbTextarea, mdbContainer, mdbRow, mdbCol } from 'mdbvue';

    export default {
        name: 'ModalPage',
        data() {
            return {
                modal: false,
                mailAddress: '@mdo'
            };
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
        }
    };
</script>