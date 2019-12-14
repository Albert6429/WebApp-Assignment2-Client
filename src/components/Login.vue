<template>
  <div class="hero" id="app1">
    <h3 class="vue-title">{{messagetitle}}</h3>
    <h2 class="vue-title2">You need to login first</h2>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">

          <form @submit.prevent="submit">

            <p class="typo__p" v-if="submitStatus === 'ERROR'">Please enter the correct account information.</p>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">Posting...</p>

            <div :class="{ 'form-group--error': $v.username.$error }" class="form-group">
              <label class="form-control-label" name="username">Username</label>
              <input class="form__input" data-test="username" type="string" v-model.trim="username"/>
            </div>
            <div class="error" v-if="!$v.username.required">Username is Required</div>
            <div class="error" v-show="showUsernameAlert">{{UsernameAlert}}</div>

            <div :class="{ 'form-group--error': $v.password.$error }" class="form-group">
              <label class="form-control-label" name="password">Password</label>
              <input class="form__input" data-test="password" type="string" v-model.trim="password"/>
            </div>
            <div class="error" v-if="!$v.password.required">Password is Required</div>
            <div class="error" v-show="showPasswordAlert">{{PasswordAlert}}</div>

            <p>
              <button :disabled="submitStatus === 'PENDING'" class="btn btn-primary btn1" type="submit">Submit
              </button>
            </p>

          </form>
          <a href="#/register">
            <button class="btn btn-primary btn1">Register
            </button>
          </a>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
  </div>
</template>

<script>
    import UserService from '@/services/userservice'
    import VueForm from 'vueform'
    import Vuelidate from 'vuelidate'
    import VueSweetalert from 'vue-sweetalert'
    import {required} from 'vuelidate/lib/validators'
    import Vue from 'vue'

    Vue.use(VueForm, {
        inputClasses: {
            valid: 'form-control-success',
            invalid: 'form-control-danger'
        }
    });

    Vue.use(Vuelidate);
    Vue.use(VueSweetalert);

    export default {
        name: "Login",
        data() {
            return {
                messagetitle: 'Login',
                username: '',
                password: '',
                user: [],
                submitStatus: null,
                showUsernameAlert: false,
                showPasswordAlert: false,
                UsernameAlert: '',
                PasswordAlert: '',
                errors: []
            }
        },
        validations: {    //定义合法性
            username: {
                required,
            },
            password: {
                required,
            }
        },
        methods: {
            submit() {
                console.log('submit!');
                this.$v.$touch();
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'   //如果不合法
                } else {                          //如果合法
                    // do your submit logic here
                    this.submitStatus = 'PENDING';
                    setTimeout(() => {
                        this.submitStatus = 'OK';
                        var user = {
                            username: this.username,
                            password: this.password,
                        };
                        this.user = user;
                        this.submitUser(this.user)
                    }, 500)
                }
            },
            submitUser: function (user) {
                UserService.userLogin(user)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        console.log(response.data.message);
                        if (response.data.message == 'The username does not exist') {
                            this.showUsernameAlert = true;
                            this.UsernameAlert = response.data.message
                        } else if (response.data.message == 'The password is wrong') {
                            this.showPasswordAlert = true;
                            this.PasswordAlert = response.data.message
                        } else if (response.data.message == 'Login successfully') {
                            localStorage.setItem('username', JSON.stringify(this.username)); // JSON.stringify 将JSON转为字符串存到变量里
                            this.$router.push('/')
                        }
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
  #app1 {
    width: 95%;
    margin: 0 auto;
  }

  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }

  .vue-title2 {
    margin-top: 30px;
    text-align: center;
    font-size: 25pt;
    margin-bottom: 10px;
  }

  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }

  .donate-form .form-control-label.text-left {
    text-align: left;
  }

  label {
    display: inline-block;
    width: 540px;
    text-align: left;
    font-size: x-large;
  }

  .typo__p {
    width: 540px;
    font-size: x-large;
  }

  .btn1 {
    border: 1px solid silver;
    border-radius: 50px;
    width: 300px;
    font-size: x-large;
  }

  p {
    margin-top: 20px;
  }

  input {
    border: 1px solid silver;
    border-radius: 50px;
    background: white;
    padding: 5px 10px;
    width: 540px;
  }

  textarea {
    border: 1px solid silver;
    border-radius: 10px;
    background: white;
    padding: 5px 10px;
    width: 540px;
    height: 200px;
  }

  .dirty {
    border-color: #5A5;
    background: #EFE;
  }

  .dirty:focus {
    outline-color: #8E8;
  }

  .error {
    border-color: red;
    background: #fb0004;
    color: whitesmoke;
  }

  .error:focus {
    outline-color: #ffa519;
  }
</style>


