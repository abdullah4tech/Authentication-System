<script setup>
import axios from 'axios';
import { ref, reactive } from 'vue';

// State management
const state = reactive({
  fullname: '',
  username: '',
  email: '',
  pwd: ''
});

const showPass = ref(false);
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

// Form validation function
const validateForm = () => {
  if (!state.fullname || !state.username || !state.email || !state.pwd) {
    errorMessage.value = 'All fields are required.';
    return false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(state.email)) {
    errorMessage.value = 'Invalid email format.';
    return false;
  }

  if (state.pwd.length < 8) {
    errorMessage.value = 'Password should be at least 8 characters long.';
    return false;
  }

  return true;
}

// Function to send data to the server
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
    // Clear success message after 2 seconds
    setTimeout(() => {
      successMessage.value = '';
    }, 2000);
  } catch (error) {
    errorMessage.value = 'Error: ' + error.message;
    // Clear error message after 5 seconds
    setTimeout(() => {
      errorMessage.value = '';
    }, 2000);
  } finally {
    loading.value = false;
  }
}

</script>

<template>
  <div class="flex items-center justify-center flex-col">
    <!-- Success Message -->
    <transition name="fade">
      <div v-if="successMessage"
        class="bg-green-600 space-x-2 text-white text-xs p-3 rounded-lg mt-2 flex items-center fixed top-0 left-[70rem] transform -translate-x-1/2">
        <i class="ri-verified-badge-fill text-sm"></i>
        <p>{{ successMessage }}</p>
      </div>
    </transition>
    
    <!-- Error Message -->
    <transition name="fade">
      <div v-if="errorMessage"
        class="bg-red-600 w-68 space-x-2 text-white text-xs p-3 rounded-lg mt-2 flex items-center fixed top-0 left-1/2 transform -translate-x-1/2">
        <i class="ri-close-circle-fill text-sm"></i>
        <p>{{ errorMessage }}</p>
      </div>
    </transition>

    <div class="flex flex-col items-center justify-center mt-16 mb-10">
      <form @submit.prevent="sendData" class="w-96 max-w-lg flex flex-col">
        <div class="flex flex-wrap -mx-3 mb-6">
          <!-- Full Name Input -->
          <div class="w-full px-3 mb-6">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-fullname">
              Full Name
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:ring"
              id="grid-fullname" type="text" placeholder="John Doe" v-model="state.fullname" />
          </div>
          
          <!-- Email Input -->
          <div class="w-full px-3 mb-6">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
              Email
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:ring"
              id="grid-email" type="email" placeholder="example@gmail.com" v-model="state.email" />
          </div>
          
          <!-- Username Input -->
          <div class="w-full px-3 mb-6">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-username">
              Username
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:ring"
              id="grid-username" type="text" placeholder="john4tech" v-model="state.username" />
          </div>
          
          <!-- Password Input -->
          <div class="w-full px-3 mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="grid-password">Password</label>
            <div class="relative">
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:ring"
                id="grid-password" :type="showPass ? 'text' : 'password'" placeholder="******************"
                v-model="state.pwd" />
              <span class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                @click="showPass = !showPass">
                <ion-icon :name="showPass ? 'eye-off' : 'eye'"></ion-icon>
              </span>
            </div>
          </div>
          
          <!-- Submit Button -->
          <button class="bg-indigo-500 text-white ml-3 w-96 py-2.5 rounded shadow-lg active:scale-95" type="submit"
            :disabled="loading">
            <span v-if="loading">Loading...</span>
            <span v-else>Sign Up</span>
          </button>
        </div>
      </form>
      
      <!-- Redirect to Login -->
      <p class="flex items-center justify-center my-3">
        Already have an account?
        <a href="/login" class="mx-2 text-blue-600 hover:underline">Login</a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
