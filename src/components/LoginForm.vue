<script setup>
import { reactive } from 'vue'

const state = reactive({
  user_name: '',
  pwd: '',
  log_in: 'Continue',
  isVisible: 'mb-6 hidden'
})

const vali = () => {
  if(state.user_email.trim()){
    state.isVisible = 'mb-4'
    state.log_in = 'Login'
  }
}

</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen py-3 px-5 md:px-0">
    <form @submit.prevent class="w-96 max-w-lg flex flex-col p-5">
      <h1 class="text-2xl md:text-3xl text-gray-700 font-bold mb-8 text-center">Login</h1>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="grid-email"> Username </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:ring"
          id="grid-email"
          type="text"
          placeholder="Enter username"
          v-model="state.user_name"
        />
      </div>
      <div :class="state.isVisible">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="grid-password">
          Password
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:ring"
          id="grid-password"
          type="password"
          placeholder="******************"
          v-model="state.pwd"
        />
        <div class="flex items-center justify-between mt-2">
          <label class="flex items-center gap-2 text-sm">
            <input class="border-r-8" type="checkbox" />
            <p class="text-gray-700">Remember me</p>
          </label>
          <a class="text-sm font-medium text-blue-600 hover:underline" href="/account/reset"
            >Forgot password?</a
          >
        </div>
      </div>
      <button
        id="loginBtn"
        class="bg-indigo-500 text-white py-2 rounded shadow-lg hover:shadow-xl hover:bg-indigo-600 transition-all duration-300 mb-4 mt-4"
        type="submit"
        @click.stop="vali"
      >
        {{ state.log_in }}
      </button>

      <p class="flex items-center justify-center my-3">
        Dont have an account?
        <a href="/signup" class="mx-2 text-blue-600 hover:underline">Sign up</a>
      </p>

      <div class="flex items-center justify-center gap-5 mb-6">
        <div class="w-24 h-px bg-slate-200"></div>
        <p class="text-gray-700">OR</p>
        <div class="w-24 h-px bg-slate-200"></div>
      </div>

      <div class="flex flex-col gap-3 justify-center">
        <a
          class="text-center cursor-pointer text-black px-5 h-14 gap-5 rounded border border-slate-400 hover:shadow-md hover:border-slate-500 transition-all duration-300 flex items-center"
          type="button"
        >
          <ion-icon class="text-3xl" name="logo-github"></ion-icon>
          <p>Continue with GitHub</p>
        </a>
        <a
          class="text-center cursor-pointer text-black px-5 h-14 gap-5 rounded border border-slate-400 hover:shadow-md hover:border-slate-500 transition-all duration-300 flex items-center"
          type="button"
        >
          <img class="h-7" src="/src/assets/google.png" alt="Google" />
          <p>Continue with Google</p>
        </a>
        <a
          class="text-center cursor-pointer text-black px-5 h-14 gap-5 rounded border border-slate-400 hover:shadow-md hover:border-slate-500 transition-all duration-300 flex items-center"
          type="button"
        >
          <img class="h-7" src="/src/assets/microsoft.png" alt="Microsoft" />
          <p>Continue with Microsoft</p>
        </a>
      </div>
    </form>
  </div>
</template>
