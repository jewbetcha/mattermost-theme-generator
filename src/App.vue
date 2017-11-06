<template>
  <div id="app">
    <h2>mattermost</h2>
    <h3>theme generator</h3>
    <h4>Click the button to generate a theme</h4>
    <Generator/>
    <h4>made by <a href="https://colemanrollins.io" target="_blank">coleman</a></h4>
    <h4><a href="https://github.com/jewbetcha/mattermost-theme-generator" target="_blank">contribute</a></h4>
    <h5>special thanks to <a href="https://github.com/gka/chroma.js" target="_blank">chroma.js</a></h5>
  </div>
</template>

<script>
import Generator from './components/Generator';

export default {
  name: 'app',
  components: {
    Generator,
  },
};
</script>

<style>
@import './assets/typebase.css';

body {
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  color: #ffffff;
  background-color: #121212;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

h1,
h2,
h3 {
  color: #8EB897;
  font-family: 'Alfa Slab One', cursive;
}

h4 {
  font-weight: 300;
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 960px;
  width: 100%;
}
a {
  color: #8EB897;
}
</style>
