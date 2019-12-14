<template>
  <div class="hero" id="app1">
    <h3 class="vue-title">{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form @submit.prevent="submit">

            <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">Posting...</p>

            <div :class="{ 'form-group--error': $v.username.$error }" class="form-group">
              <label class="form-control-label" name="username">Username</label>
              <input class="form__input" data-test="username" placeholder="Enter a username with no more than 20 letters"
                     type="string" v-model.trim="username"/>
            </div>
            <div class="error" v-if="!$v.username.required">Username is Required</div>
            <div class="error" v-show="showUsernameAlert">{{UsernameAlert}}</div>

            <div :class="{ 'form-group--error': $v.password.$error }" class="form-group">
              <label class="form-control-label" name="password">Password</label>
              <input class="form__input" data-test="password" placeholder="Enter a password with no more than 20 letters"
                     type="string" v-model.trim="password"/>
            </div>
            <div class="error" v-if="!$v.password.required">Password is Required</div>

            <div :class="{ 'form-group--error': $v.email.$error }" class="form-group">
              <label class="form-control-label" name="password">Email</label>
              <input class="form__input" data-test="email" placeholder="Enter a correct email address" type="string"
                     v-model.trim="email"/>
            </div>
            <div class="error" v-if="!$v.email.required">Email address is Required</div>
            <div class="error" v-show="showEmailAlert">{{EmailAlert}}</div>

            <p>
              <button :disabled="submitStatus === 'PENDING'" class="btn btn-primary btn1" type="submit">Submit
              </button>
            </p>

          </form>
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
        name: "Register",
        data() {
            return {
                messagetitle: 'Register',
                username: '',
                password: '',
                email: '',
                user: [],
                submitStatus: null,
                showUsernameAlert: false,
                showPasswordAlert: false,
                showEmailAlert: false,
                UsernameAlert: '',
                PasswordAlert: '',
                EmailAlert: '',
                errors: []
            }
        },
        validations: {    //定义合法性
            username: {
                required
            },
            password: {
                required
            },
            email: {
                required
            }
        },
        methods: {
            submit() {
                console.log('submit!');
                this.$v.$touch();
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'   //如果不合法
                } else {                          //如果合法
                    this.submitStatus = 'PENDING';
                    setTimeout(() => {
                        this.submitStatus = 'OK';
                        var user = {
                            username: this.username,
                            password: this.password,
                            email: this.email
                        };
                        this.user = user;
                        this.submitUser(this.user)
                    }, 500)
                }
            },
            submitUser: function (user) {
                UserService.userRegister(user)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        console.log(response.data.message);
                        if (response.data.message == 'The username already existed') {
                            this.showUsernameAlert = true;
                            this.UsernameAlert = response.data.message;
                            return false
                        } else if (response.data.message == 'Please enter a correct email address') {
                            this.showEmailAlert = true;
                            this.EmailAlert = response.data.message;
                            return false
                        } else if (response.data.message == 'Register successfully') {
                            this.$router.push('/');
                            return true
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

