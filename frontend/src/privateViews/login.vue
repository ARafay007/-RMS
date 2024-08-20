<script setup>
  import { ref, computed } from 'vue';
  import {Button, Input, Loader} from '../components/';
  import { restaurantStore } from '../stores/restaurantData';

  const store = restaurantStore();
  const email = ref('');
  const password = ref('');

  const onSubmit = async () => {
    await store.adminLogin(email.value, password.value);
  }
</script>

<template>
  <div class='login_body_div'>
    <Loader :loading='store.isLoading' />
    <div class='content_container'>
      <p>Sign Up</p>
      <form class='fields_container' @submit.prevent='onSubmit' >
        <Input label='Email' placeholder='email' v-model='email' tabindex="1" />
        <!-- <Input label='Email' placeholder='email' @onInput='(e) => email = e.target.value' tabindex="1" /> -->
        <Input label='Password' placeholder='password' v-model="password" inputType='password' tabindex="2" />
        <Button text='Login' btnType='submit' tabindex="3" />
      </form>
    </div>
  </div>
</template>

<style>
  .login_body_div{
    height: 100dvh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content_container{
    height: 400px;
    width: 350px;
    background: rgb(216, 224, 207);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  p{
    padding-top: 30px;
    font-size: 30px;
  }
  .fields_container{
    height: 300px;
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>