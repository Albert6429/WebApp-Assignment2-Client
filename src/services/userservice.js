import Api from '@/services/api'

export default {
  fetchUsers () {
    return Api().get('/users')
  },
  followUsers (username) {
    return Api().put(`/users/${username}/followed`)
  },
  userLogin (user) {
    return Api().post('/log', user,
      { headers: {'Content-type': 'application/json'} })
  },
  userRegister (user){
    return Api().post('/reg', user,
      { headers: {'Content-type': 'application/json'} })
  }
}
