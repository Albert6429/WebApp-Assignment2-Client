<template>
  <div class="hero">
    <h3 class="vue-title">{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="users" :options="options">
        <a @click="follow(props.row.username)" class="fa fa-thumbs-up fa-2x" slot="follow" slot-scope="props"></a>
      </v-client-table>
    </div>
  </div>
</template>

<script>
    import UserService from '@/services/userservice'
    import Vue from 'vue'
    import VueTables from 'vue-tables-2'

    Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true});

    export default {
        name: 'UserList',
        data() {
            return {
                messagetitle: ' User List ',
                users: [],
                props: ['_id', 'username'],
                ifUser: false,
                errors: [],
                columns: ['username', 'email', 'followed', 'follow'],
                options: {
                    perPage: 10,
                    filterable: ['username', 'email', 'followed'],
                    sortable: ['followed'],
                    headings: {
                        username: 'Username',
                        email: 'Email',
                        followed: 'Followed'
                    }
                }

            }
        },
        // Fetches Users when the component is created.
        created() {
            this.loadUsers()
        },
        methods: {
            loadUsers: function () {
                UserService.fetchUsers()
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.users = response.data;
                        console.log(this.users)

                    })
                    .catch(error => {
                        this.errors.push(error);
                        console.log(error)
                    })
            },
            follow: function (username) {
                UserService.followUsers(username)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.loadUsers();
                        console.log(response)
                    })
                    .catch(error => {
                        this.errors.push(error);
                        console.log(error)
                    })
            }
        }
    }
</script>

<style scoped>
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }

  #app1 {
    width: 60%;
    margin: 0 auto;
  }
</style>

