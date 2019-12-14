<template>
  <div class="hero" id="app1">
    <h3 class="vue-title">{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form @submit.prevent="submit">
            <div :class="{'form-group--error':$v.title.$error}" class="form-group">
              <label class="form-control-label" name="title">Title:</label>
              <input class="form__input" data-test="title" placeholder="Enter a title with no more than 20 letters"
                     type="string"
                     v-model.trim="title"/>
            </div>
            <div class="error" v-if="!$v.title.required">Title is Required</div>
            <div class="error" v-if="!$v.title.minLength">Title must have at least {{$v.title.$params.minLength.min}}
              letters.
            </div>
            <div class="error" v-if="!$v.title.maxLength">Title must be no more than {{$v.title.$params.maxLength.max}}
              letters
            </div>

            <label class="form-control-label" name="title">Author: {{author}}</label>

            <div :class="{ 'form-group--error': $v.content.$error }" class="form-group">
              <label class="form-control-label" name="content">Content:</label>
              <textarea class="form__input" data-test="content" placeholder="Enter your idea with no more than 400 letters"
                        type="string"
                        v-model.trim="content">
              </textarea>
            </div>
            <div class="error" v-if="!$v.content.required">Content is Required</div>
            <div class="error" v-if="!$v.content.minLength">Content must have at least
              {{$v.content.$params.minLength.min}} letters.
            </div>
            <div class="error" v-if="!$v.content.maxLength">Content must have no more than
              {{$v.content.$params.maxLength.max}} letters.
            </div>

            <p>
              <button :disabled="submitStatus === 'PENDING'" class="btn btn-primary btn1" type="submit">Submit
              </button>
            </p>
            <p class="typo__p" v-if="submitStatus === 'OK'">Successful!</p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">Posting...</p>
          </form>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
  </div>
</template>

<script>
    import PostService from '@/services/postservice'
    import VueForm from 'vueform'
    import Vuelidate from 'vuelidate'
    import VueSweetalert from 'vue-sweetalert'
    import {maxLength, minLength, required} from 'vuelidate/lib/validators'
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
        name: "WritePosts",
        data() {
            return {
                messagetitle: 'Post Your Idea',
                title: '',
                author: JSON.parse(localStorage.getItem('username')),
                content: '',
                likes: 0,
                view: 0,
                posts: [],
                submitStatus: null,
                errors: []
            }
        },
        validations: {    //定义合法性
            title: {
                required,
                minLength: minLength(5),
                maxLength: maxLength(20)
            },
            content: {
                required,
                minLength: minLength(5),
                maxLength: maxLength(100)
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
                        var posts = {
                            title: this.title,
                            author: this.author,
                            content: this.content
                        };
                        this.posts = posts;
                        this.submitPosts(this.posts)
                    }, 500)
                }
            },
            submitPosts: function (posts) {
                PostService.uploadPosts(posts)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        console.log(response);
                        this.$router.push('/posts')
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
