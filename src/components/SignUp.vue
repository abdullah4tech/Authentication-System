<script setup>
import axios from 'axios';
import { ref, reactive } from 'vue'

const state = reactive({
  fullname: '',
  username: '',
  email: '',
  pwd: ''
})

const show_pass = ref(false)
const loading = ref(false)

const sendData = async () => {
  loading.value = true;
  try {
    const response = await axios.post('http://localhost:3000/users', state, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    alert('User created successfully: ' + JSON.stringify(response.data));
  } catch (error) {
    alert('Error: ' + error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center mt-16 mb-10">
    <form @submit.prevent="sendData" class="w-96 max-w-lg flex flex-col">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3 mb-6">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-fullname"
          >
            Full Name
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:ring"
            id="grid-fullname"
            type="text"
            placeholder="John Doe"
            v-model="state.fullname"
          />
        </div>
        <div class="w-full px-3 mb-6">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-email"
          >
            Email
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:ring"
            id="grid-email"
            type="email"
            placeholder="example@gmail.com"
            v-model="state.email"
          />
        </div>
        <div class="w-full px-3 mb-6">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-username"
          >
            Username
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:ring"
            id="grid-username"
            type="text"
            placeholder="john4tech"
            v-model="state.username"
          />
        </div>
        <div class="w-full px-3 mb-4">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-password"
          >
            Password
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:ring"
            id="grid-password"
            :type="show_pass ? 'text' : 'password'"
            placeholder="******************"
            v-model="state.pwd"
          />
          <p class="text-gray-600 text-xs italic">
            Password should be 8 characters <span class="text-red-600">*</span>
          </p>
        </div>
        <div class="w-full px-4">
          <label class="flex gap-2">
            <input type="checkbox" v-model="show_pass" />
            <p>Show password</p>
          </label>
        </div>
      </div>
      <button
        class="bg-indigo-500 text-white py-2.5 rounded shadow-lg active:scale-95"
        type="submit"
        :disabled="loading"
      >
        <span v-if="loading">Loading...</span>
        <span v-else>Sign Up</span>
      </button>
    </form>
  </div>
</template>
