<script setup>
import axios from 'axios';
import { ref, reactive } from 'vue';

const state = reactive({
  fullname: '',
  username: '',
  email: '',
  pwd: ''
});

const show_pass = ref(false);
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const validateForm = () => {
  if (!state.fullname || !state.username || !state.email || !state.pwd) {
    alert('All fields are required.');
    return false;
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(state.email)) {
    alert('Invalid email format.');
    return false;
  }
  if (state.pwd.length < 8) {
    alert('Password should be at least 8 characters long.');
    return false;
  }
  return true;
}

const sendData = async () => {
  if (!validateForm()) return;

  loading.value = true;
  try {
    const response = await axios.post('http://localhost:3000/users', state, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    successMessage.value = 'User created successfully: ' + response.data.fullname;
  } catch (error) {
    errorMessage.value = 'Error: ' + error.message;
  } finally {
    loading.value = false;
    setTimeout(() => {
      successMessage.value = '';
      errorMessage.value = '';
    }, 3000); // Clear messages after 3 seconds
  }
}
</script>

<template>
  <div class="flex items-center justify-center flex-col">
    <transition name="fade">
      <div v-if="successMessage" class="bg-green-600 space-x-2 text-white text-xs p-3 rounded-lg mt-2 flex items-center fixed top-0 left-1/2 transform -translate-x-1/2">
        <div>
          <i class="ri-verified-badge-fill text-sm"></i>
        </div>
        <p>{{ successMessage }}</p>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="errorMessage" class="bg-red-600 w-68 space-x-2 text-white text-xs p-3 rounded-lg mt-2 flex items-center fixed top-0 left-1/2 transform -translate-x-1/2">
        <i class="ri-close-circle-fill text-sm"></i>
        <p>{{ errorMessage }}</p>
      </div>
    </transition>

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
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
