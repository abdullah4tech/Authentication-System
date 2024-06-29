<template>
  <form class="flex flex-col items-center justify-center h-screen">
    <div class="flex flex-col items-baseline mx-96">
      <label class="text-left m-2">Searching for account? </label>
      <div class="bg-white p-4 w-72 items-center rounded-lg flex gap-3">
        <input class="outline-none w-full" placeholder="Enter email address" type="email" />
        <ion-icon name="mail-outline"></ion-icon>
      </div>
    </div>
    <a
      class="flex cursor-pointer shadow-lg active:scale-95 items-center gap-2 bg-indigo-500 p-3 mt-6 text-white rounded-lg"
    >
      <p class="text-white rounded-lg">Search</p>
      <ion-icon name="search-outline"></ion-icon>
    </a>
  </form>
</template>
