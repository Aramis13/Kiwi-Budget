<template>
  <v-container class="mt-5">
    <v-toolbar flat>
      <v-toolbar-title>Records</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">Add Record</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex>
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="editedItem.Date"
            label="Date"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="editedItem.date" @input="menu2 = false"></v-date-picker>
          </v-menu>
            </v-flex>
                <v-flex xs12>
                  <v-select
                    v-model="editedItem.Category"
                    :items="categories"
                    menu-props="auto"
                    label="Category"
                    hide-details
                    prepend-icon="list"
                    single-line
                  ></v-select>
                </v-flex>
                <v-flex xs12 class="mt-4">
                  <v-text-field prepend-icon="attach_money" type="number" v-model="editedItem.Cost" label="Cost"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea prepend-icon="edit" maxlength="50" counter v-model="editedItem.Description" label="Description"></v-textarea>
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
      :items="data"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.Name }}</td>
        <td>{{ props.item.Date }}</td>
        <td>{{ props.item.Category }}</td>
        <td>{{ props.item.Description }}</td>
        <td>{{ props.item.Cost }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="GetRecords">Reset</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    dialog: false,
    menu2: false,
    categories: ['groceries', 'Rent'],
    headers: [
      {
        text: 'Name',
        sortable: false,
        value: 'Name'
      },
      { text: 'Date', value: 'Date' },
      { text: 'Category', value: 'Category' },
      { text: 'Description', value: 'Description' },
      { text: 'Cost', value: 'Cost' },
      { text: 'Actions', value: 'name', sortable: false }
    ],
    data: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      date: 0,
      category: null,
      description: '',
      cost: 0
    },
    defaultItem: {
      name: '',
      date: new Date().toISOString().substr(0, 10),
      category: null,
      description: '',
      cost: 0
    }
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Record' : 'Edit Record'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  created () {
    axios.get('/api/configuration/getTheme').then(res => {
      this.$root.$emit('ThemeChanged', res.data)
    }).catch(e => {
      // ToDo
    })
    this.GetRecords()
  },
  // mounted () {
  //   axios.get('/api/configuration/getTheme').then(res => {
  //     this.$root.$emit('ThemeChanged', res.data)
  //   }).catch(e => {
  //     // ToDo
  //   })
  // },
  methods: {
    AddRecord () {
      axios.post('/api/record/addRecord', {
        date: this.editedItem.date,
        category: this.editedItem.category,
        description: this.editedItem.description,
        cost: this.editedItem.cost
      }).then(res => {
        if (res) {
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
    GetRecords () {
      axios.get('/api/record/getRecords').then(res => {
        res.data.forEach(record => {
          this.data.push(record)
        })
      }).catch(e => {
        this.$toasted.show('Failed to get records. Please refresh page.', {
          theme: 'bubble',
          position: 'top-right',
          duration: 5000,
          type: 'error',
          icon: 'error'
        })
      })
    },
    editItem (item) {
      this.editedIndex = this.data.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.data.indexOf(item)
      if (confirm('Are you sure you want to delete this record?')) {
        axios.post('/api/record/deleteRecord', {id: item.id}).then(res => {
          if (res) {
            this.data.splice(index, 1)
          } else {
            this.$toasted.show('Failed to delete record. Please try again.', {
              theme: 'bubble',
              position: 'top-right',
              duration: 5000,
              type: 'error',
              icon: 'error'
            })
          }
        }).catch(e => {
          this.$toasted.show('Failed to delete record. Please try again.', {
            theme: 'bubble',
            position: 'top-right',
            duration: 5000,
            type: 'error',
            icon: 'error'
          })
        })
      }
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    EditRecord () {
      axios.post('/api/record/editRecord', {
        record: this.editedItem
      }).then(res => {
        if (res) {
          this.$toasted.show('Record edited successfully', {
            theme: 'bubble',
            position: 'top-right',
            duration: 5000,
            type: 'success',
            icon: 'check_circle'
          })
        } else {
          this.$toasted.show('Failed to edite record. Please try again.', {
            theme: 'bubble',
            position: 'top-right',
            duration: 5000,
            type: 'error',
            icon: 'error'
          })
        }
      }).catch(e => {
        this.$toasted.show('Failed to edite record. Please try again.', {
          theme: 'bubble',
          position: 'top-right',
          duration: 5000,
          type: 'error',
          icon: 'error'
        })
      })
    },
    save () {
      if (this.editedIndex > -1) {
        this.EditRecord()
        Object.assign(this.data[this.editedIndex], this.editedItem)
      } else {
        this.AddRecord()
        this.data.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
