<template>
    <mdb-navbar expand="large" dark color="stylish" class="navbar-light lighten-5" style="opacity:0.85;">
    <!-- Navbar brand -->
    <mdb-navbar-brand><mdb-icon icon="kiwi-bird" class="mr-1" />
      kiwi Budget
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav>
        <mdb-nav-item href="/dashboard" active>Home</mdb-nav-item>
        <mdb-nav-item href="/">Link</mdb-nav-item>
      </mdb-navbar-nav>
      <div class="form-inline">
        <add-record />
      </div>
      <mdb-dropdown tag="li" class="nav-item">
          <mdb-dropdown-toggle style="color: lightgrey;" icon="user" tag="a" navLink color="stylish" slot="toggle" waves-fixed>{{userName}}</mdb-dropdown-toggle>
          <mdb-dropdown-menu class="left">
            <div @click="Logout()">
              <mdb-dropdown-item>Logout</mdb-dropdown-item>
            </div>
          </mdb-dropdown-menu>
        </mdb-dropdown>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>

<script>
import { mdbIcon, mdbContainer, mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem, mdbDropdown, mdbDropdownMenu, mdbDropdownToggle, mdbInput, mdbDropdownItem, mdbFormInline } from 'mdbvue'
import addRecord from './AddRecord'
export default {
  name: 'NavbarPage',
  components: {
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem,
    mdbDropdown,
    mdbDropdownMenu,
    mdbDropdownToggle,
    mdbDropdownItem,
    mdbFormInline,
    mdbInput,
    mdbContainer,
    mdbIcon,
    addRecord
  },
  data () {
    return {
      userName: localStorage.getItem('portfolioManagerUserName')
    }
  },
  methods: {
    Logout () {
      this.$cookie.delete('portfolioManagerToken')
      localStorage.removeItem('portfolioManagerUserName')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
