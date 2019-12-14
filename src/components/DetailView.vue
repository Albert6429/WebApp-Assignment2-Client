<template>
  <div id="text">
    <h3 class="vue-title">{{post.title}}</h3>
    <div>
      <div>{{post.author}}</div>
      <div id="body">
        <p>{{post.content}}</p>
      </div>
      <div id="div-right">Like: {{post.likes}} View: {{post.view}}</div>
      <br>
      <div @click="deletePosts(id)" class="fa fa-trash-o fa-2x" data-test="deletebtn" id="div-right2" v-show="ifAuthor">
        Click here, you can delete your own post
      </div>

    </div>
  </div>
</template>

<script>
    import PostService from '@/services/postservice'
    import Vue from 'vue'
    import VueTables from 'vue-tables-2'

    Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true});
    export default {
        name: "DetailView",
        data() {
            return {
                post: [],
                id: '',
                ifAuthor: false,
                errors: [],

            }
        },
        // Fetches Posts when the component is created.
        created() {
            this.loadOnePost(this.$router.params);
            this.id = this.$router.params
        },
        methods: {
            loadOnePost: function (id) {
                PostService.fetchOnePost(id)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.post = response.data.data;
                        console.log(this.post);

                        let username = JSON.parse(localStorage.getItem('username'));
                        console.log("username is " + username);
                        if (this.post.author === username) {
                            this.ifAuthor = true
                        }
                    })
                    .catch(error => {
                        this.errors.push(error);
                        console.log(error)
                    })
            },
            deletePosts: function (id) {
                this.$swal({
                    title: 'Are you totaly sure?',
                    text: 'You can\'t Undo this action',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'OK Delete it',
                    cancelButtonText: 'Cancel',
                    showCloseButton: true,
                    showLoaderOnConfirm: true
                }).then((result) => {
                    console.log('SWAL Result : ' + result);
                    console.log(id);
                    if (result === true) {
                        PostService.deletePost(id)
                            .then(response => {
                                // JSON responses are automatically parsed.
                                this.message = response.data;
                                console.log(this.message);
                                // Vue.nextTick(() => this.$refs.vuetable.refresh())
                                this.$swal('Deleted', 'You successfully deleted this Post ', 'success');
                                this.$router.push('/posts')
                            })
                            .catch(error => {
                                this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error');
                                this.errors.push(error);
                                console.log(error)
                            })
                    } else {
                        this.$swal('Cancelled', 'Your Post still Counts!', 'info')
                    }
                })
            }
        }
    }
</script>

<style scoped>
  #text {
    margin: 0 auto;
    border: 1px solid #000;
    width: 1000px;
    height: 100%;
    background-color: white;
    padding-top: 30px;
    padding-bottom: 30px;
  }

  #body {
    margin: 0 auto;
    width: 700px;
  }

  #div-right {
    float: right;
    padding-right: 150px;
  }

  #div-right2 {
    float: right;
    padding-right: 150px;
    font-size: 16px;
    color: red;
  }
</style>
