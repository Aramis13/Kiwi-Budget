<template>
<div>
  <mdb-navbar expand="large" dark color="stylish" class="navbar-light lighten-5" style="opacity:0.85;">
    <!-- Navbar brand -->
    <mdb-navbar-brand>
      Portfolio Manager
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav>
        <mdb-nav-item href="/" active>Home</mdb-nav-item>
        <mdb-nav-item href="/dashboard">Link</mdb-nav-item>
        <mdb-nav-item class="disabled" href="#">Disabled</mdb-nav-item>
      </mdb-navbar-nav>
      <mdb-form-inline>
        <mdb-input type="text" placeholder="Search" aria-label="Search"/>
      </mdb-form-inline>
      <mdb-dropdown tag="li" class="nav-item">
          <mdb-dropdown-toggle style="color: lightgrey;" icon="user" tag="a" navLink color="stylish" slot="toggle" waves-fixed>{{userName}}</mdb-dropdown-toggle>
          <mdb-dropdown-menu class="left">
            <mdb-dropdown-item>Action</mdb-dropdown-item>
            <mdb-dropdown-item>Another action</mdb-dropdown-item>
            <mdb-dropdown-item>Something else here</mdb-dropdown-item>
          </mdb-dropdown-menu>
        </mdb-dropdown>
    </mdb-navbar-toggler>
  </mdb-navbar>
  <Chart />
</div>
</template>

<script>
import { mdbContainer, mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem, mdbDropdown, mdbDropdownMenu, mdbDropdownToggle, mdbInput, mdbDropdownItem, mdbFormInline } from 'mdbvue'
import Chart from './Chart'

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
    Chart
  },
  props: {
    userName: ''
  }
}
</script>
