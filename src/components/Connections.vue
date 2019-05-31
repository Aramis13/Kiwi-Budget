<template>
  <v-container class="mt-5">
    <v-toolbar flat>
      <v-toolbar-title>Connections</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">Add Connection</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{formTitle}}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field prepend-icon="alternate_email" v-model="editedItem.Email" label="Email"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="connections"
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.Username }}</td>
        <td>{{ props.item.Email }}</td>
        <td class="justify-left layout px-0" style="margin-left:30px !important">
          <v-icon
            medium
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="GetConnections, loading=true">Reset</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import Axios from 'axios'
export default {
  data: () => ({
    dialog: false,
    loading: true,
    headers: [
      { text: 'Username', value: 'Username' },
      { text: 'Email', value: 'Email' },
      { text: 'Action', value: 'name', sortable: false }
    ],
    connections: [],
    editedIndex: -1,
    editedItem: {
      Username: '',
      Email: ''
    },
    defaultItem: {
      Username: '',
      Email: ''
    }
  }),
  computed: {
    formTitle () {
      return 'New Connection'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  created () {
    this.GetConnections()
  },
  methods: {
    GetConnections () {
      Axios.get('/api/connection/getConnections').then(res => {
        res.data.forEach(connection => {
          this.connections.push(connection)
        })
      }).catch(e => {
        this.$toasted.show('Failed to get connections. Please refresh page.', {
          theme: 'bubble',
          position: 'top-right',
          duration: 5000,
          type: 'error',
          icon: 'error'
        })
      })
    },
    AddConnection () {
      Axios.post('/api/connection/addConnection', {
        email: this.editedItem.Email
      }).then(res => {
        this.connections.push(res.data)
        this.$toasted.show('Connection added successfully', {
          theme: 'bubble',
          position: 'top-right',
          duration: 5000,
          type: 'success',
          icon: 'check_circle'
        })
      }).catch(e => {
        this.$toasted.show('Failed to add connection. Please try again.', {
          theme: 'bubble',
          position: 'top-right',
          duration: 5000,
          type: 'error',
          icon: 'error'
        })
      })
    },
    RemoveConnection (connection) {
      Axios.post('/api/connection/removeConnection', connection).then(res => {
        this.$toasted.show('Record removed successfully', {
          theme: 'bubble',
          position: 'top-right',
          duration: 5000,
          type: 'success',
          icon: 'check_circle'
        })
      }).catch(e => {
        this.$toasted.show('Failed to remove connection. Please try again.', {
          theme: 'bubble',
          position: 'top-right',
          duration: 5000,
          type: 'error',
          icon: 'error'
        })
      })
    },
    editItem (item) {
      this.editedIndex = this.connections.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.connections.indexOf(item)
      if (confirm('Are you sure you want to delete this connection?')) {
        this.RemoveConnection(item)
        this.connections.splice(index, 1)
      }
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      this.AddConnection()

      // Axios.get('/api/user/getUserName', {email: this.editedItem.Email}).then(res => {
      //   this.editedItem.Username = res.data
      //   this.connections.push({
      //     Username: res.data,
      //     Email: this.editedItem.email
      //   })
      // }).catch(e => {
      //   // Todo
      // })
      this.close()
    }
  }
}
</script>
