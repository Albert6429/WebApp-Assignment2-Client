<template>
  <div class="hero">
    <h3 class="vue-title">{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="posts" :options="options">
        <a @click="like(props.row._id)" class="fa fa-thumbs-up fa-2x" slot="like" slot-scope="props"></a>
        <a @click="DetailView(props.row._id)" class="fa fa-file-text fa-2x" slot="check detail view"
           slot-scope="props"></a>
      </v-client-table>
    </div>
  </div>
</template>

<script>
    import PostService from '@/services/postservice'
    import Vue from 'vue'
    import VueTables from 'vue-tables-2'

    Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true});

    export default {
        name: 'posts',
        data() {
            return {
                messagetitle: ' Post List ',
                posts: [],
                props: ['_id'],
                errors: [],
                columns: ['title', 'author', 'likes', 'view', 'like', 'check detail view'],
                options: {
                    perPage: 10,
                    filterable: ['title', 'author', 'likes', 'view'],
                    sortable: ['likes'],
                    headings: {
                        title: 'Title',
                        author: 'Author',
                        likes: 'Likes',
                        view: 'Views'
                    }
                }

            }
        },
        // Fetches Posts when the component is created.
        created() {
            this.loadPosts()
        },
        methods: {
            loadPosts: function () {
                PostService.fetchPosts()
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.posts = response.data;
                        console.log(this.posts)
                    })
                    .catch(error => {
                        this.errors.push(error);
                        console.log(error)
                    })
            },
            like: function (id) {
                PostService.likePosts(id)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.loadPosts();
                        console.log(response)
                    })
                    .catch(error => {
                        this.errors.push(error);
                        console.log(error)
                    })
            },
            DetailView: function (id) {
                this.$router.params = id;
                this.$router.push('detailview')
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
