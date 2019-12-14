<template>
  <div id="bg">
    <div id="app">
      <b-navbar toggleable="md" variant="dark" type="dark">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <img src="./assets/logo.png" class="img-circle" style="padding: 5px" height="40px" width="40px">
        <b-navbar-brand to="/">Creative Land</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item to="/#"><i class="fa fa-home" style="padding: 5px"> Home</i></b-nav-item>
            <b-nav-item to="/posts"><i class="fa fa-list" style="padding: 5px"> Posts List</i></b-nav-item>
            <b-nav-item data-test=postbtn to="/writeposts"><i class="fa fa-list" style="padding: 5px"> Post Your Idea</i></b-nav-item>
            <b-nav-item to="/userlist"><i class="fa fa-list" style="padding: 5px"> Users List</i></b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item @click="logout"><i class="fa fa-sign-out" style="padding: 5px"> Logout </i></b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <router-view/>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'App',
        methods: {
            logout: function () {
                this.$swal({
                    title: 'Are you totaly sure?',
                    text: 'You can\'t Undo this action',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'OK Log out',
                    cancelButtonText: 'Cancel',
                    showCloseButton: true,
                    showLoaderOnConfirm: true
                }).then((result) => {
                    console.log('SWAL Result : ' + result)

                    if (result === true) {
                        localStorage.clear()
                        this.$swal('Logged out', 'You successfully log out ', 'success')
                        this.$router.push('/login')
                            .catch(error => {
                                this.$swal('ERROR', 'Something went wrong trying to Log out ' + error, 'error')
                                this.errors.push(error)
                                console.log(error)
                            })
                    } else {
                        this.$swal('Cancelled', 'You are still logged in', 'info')
                    }
                })
            }
        }
    }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-top: 0px;
  }

  #bg {
    background: url("./assets/homebg.jpg") repeat center top;
    width: 100%;
    height: 1050px;
  }

  .VueTables__sortable {
    cursor: pointer;
  }
</style>
