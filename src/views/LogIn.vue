
<template>
    <div class="login-page">
    <div class="form" >
      <!-- REGISTER -->
        <form class="register-form" v-show="display" autocomplete="on">
        <input autocomplete="username" v-model="registration.username" type="text" placeholder="Username" required/>
        <input autocomplete="firstname" v-model="registration.firstName" type="text" placeholder="First Name" required/>
        <input autocomplete="lastname" v-model="registration.lastName" type="text" placeholder="Last Name" required/>
        <input autocomplete="age" v-model="registration.age" type="number" placeholder="Age" min="0" max="99">

        <input autocomplete="new-password" :class="{invalid: $v.registration.password.$error}" 
        v-model="registration.password" type="password" placeholder="Password" 
        @input="$v.registration.password.$touch()"/>

        <input autocomplete="new-password" :class="{invalid: $v.registration.password2.$error}" 
        v-model="registration.password2" type="password" placeholder="Confirm Password" 
        @input="$v.registration.password2.$touch()"/>

        <input autocomplete="new-password" :class="{invalid: $v.registration.email.$error}" 
        v-model="registration.email" type="text" placeholder="Email"  
        @input="$v.registration.email.$touch()"/>
        <p v-if="$v.registration.email.$error">Please provide a valid email address!</p>
        <!-- <div>{{$v}}</div> -->
        <label>
          <input type="checkbox" v-model="registration.terms">
            I agree to the terms and conditions
        </label>
        <button :disabled="!registration.terms" @click.prevent="registerMe">register</button>
        <p class="message">Already registered? <a @click.prevent="display = !display">Sign In</a></p>
        </form>
        <!-- LOGIN -->
        <form class="login-form" v-show="!display" autocomplete="on">
        <input autocomplete="email" :class="{invalid: $v.login.email.$error}" v-model="login.email" type="email" placeholder="email"  @input="$v.login.email.$touch()"/>
        <p v-if="$v.login.email.$error">Please provide a valid email address!</p>
        <input  autocomplete="current-password" v-model="login.password" type="password" placeholder="password" />
        <button @click.prevent="logIn">login</button>
        <p class="message">Not registered?<a @click.prevent="display = !display"> Create an account</a></p>
        </form>
    </div>
    </div>
</template>
<script>
import { required, email, sameAs, minLength} from 'vuelidate/lib/validators'

export default {
    data() {
      return {
        display: false,

        registration: {
          username: '',
          firstName: '',
          lastName: '',
          age: null,
          password: null,
          password2: null,
          email: '',
          terms: false
        },
        login:{  
          email: '',
          password: null
        }
      }
    },
    validations: {
      registration: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(6)
        },
        password2: {
          sameAsPassword: sameAs('password')
        }
        
      },
      login: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(6)
        }
      }
    },
    methods:{ 
        registerMe(){
          this.$store.dispatch('register', this.registration);
          this.display = false;
        },
        logIn(){
          this.$store.dispatch('login', {
            email: this.login.email,
            password: this.login.password
          });
          this.$emit('loggedIn');
          if(this.$route.name !== 'home'){
            this.$router.push('/');
          }
        }
      }
}
</script>
<style lang="css" scoped>

.invalid {
  border: 1px solid red !important;
  background-color: #ffc9aa !important;
}

.login-page {
  width: 300px;
  margin: auto;
}
.form {
  position: absolute;
  right: 0em;
  top: 3.9em;
  z-index: 1;
  background: #FFFFFF;
  max-width: 300px;
  margin: 0 auto 100px; 
  padding: 30px;
  text-align: center;
   box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.4 ); /* 0 5px 5px 0 rgba(0, 0, 0, 0.24); */
  border-radius: 4px;
}
.form input {
  outline: 0;
  background: #f8f8f8;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 5px;
  border-color: #e7e7e7;
  font-size: 14px;
}
.form button {
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
  border-radius: 5px;
}
.form button:hover,.form button:active,.form button:focus {
  background: #43A047;
}
.form button:disabled {
  background: #a04743;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4CAF50;
  text-decoration: none;
  cursor: pointer;
}
.form .register-form {
  display: block;
}
.container {
  position: absolute;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before, .container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #EF3B3A;
}
 body {
  background: #76b852;
  background: -webkit-linear-gradient(right, #76b852, #8DC26F);
  background: -moz-linear-gradient(right, #76b852, #8DC26F);
  background: -o-linear-gradient(right, #76b852, #8DC26F);
  background: linear-gradient(to left, #76b852, #8DC26F);
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;      
} 
</style>