import Api from '@/services/api'

export default {
  fetchPosts () {
    return Api().get('/posts')
  },
  fetchOnePost(id){
    return Api().get(`/posts/${id}`)
  },
  putPost (id, post) {
    console.log('REQUESTING ' + post._id + ' ' +
      JSON.stringify(post, null, 5))
    return Api().put(`/posts/${id}`, post,
      { headers: {'Content-type': 'application/json'} })
  },
  uploadPosts (posts) {
    return Api().post('/writeposts', posts,
      { headers: {'Content-type': 'application/json'} })
  },
  likePosts (id) {
    return Api().put(`/posts/${id}/likes`)
  },
  deletePost(id){
    return Api().delete(`/deletePost/${id}`)
  }
}
