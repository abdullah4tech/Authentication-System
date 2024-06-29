<template>
  <div class="header-bar">
    <a href="#">Home</a>
    <a href="#">About-Us</a>
    <a href="#">Service</a>
    <a href="#">Contact-Us</a>
  </div>
</template>

<style>
.header-bar {
  background-color: #333;
  overflow: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.header-bar a {
  float: left;
  color: #f2f2f2;
  padding: 14px 14px;
  text-align: center;
  font-size: 17px;
  text-decoration: none;
  margin-right: 5px;
}

.header-bar a:hover {
  background: #ddd;
  color: #333;
}
</style>
