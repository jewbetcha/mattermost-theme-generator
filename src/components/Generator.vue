<template>
  <div class='generator'>
    <button @click='random()'>
        generate random
    </button>
    <button @click='palette'>
        generate palette
    </button>
    <div class='row'>
        <div v-for='color in colors' :key='color.id' v-bind:style='{ backgroundColor: color}' class='box'>
        </div>
    </div>
    <div class='code'>
        <code v-if="showCode">
          {{ themeCode }}
        </code>
    </div>
  </div>
</template>

<script>
import chroma from 'chroma-js';

export default {
  name: 'Generator',
  data() {
    return {
      colors: [],
      showCode: false,
      themeCode: {
        sidebarBg: '',
        sidebarText: '#ffffff',
        sidebarUnreadText: '#ffffff',
        sidebarTextHoverBg: '',
        sidebarTextActiveBorder: '',
        sidebarTextActiveColor: '#ffffff',
        sidebarHeaderBg: '',
        sidebarHeaderTextColor: '#ffffff',
        onlineIndicator: '',
        awayIndicator: '',
        mentionBj: '',
        mentionColor: '#ffffff',
        centerChannelBg: '',
        centerChannelColor: '',
        newMessageSeparator: '',
        linkColor: '',
        buttonBg: '',
        buttonColor: '',
        errorTextColor: '',
        mentionHighlightBg: '',
        mentionHighlightLink: '',
        codeTheme: 'custom',
      },
    };
  },
  methods: {
    getRandom() {
      return chroma.random().hex();
    },
    random() {
      this.colors = [];
      for (let i = 0; i < 6; i += 1) {
        this.colors.push(this.getRandom());
      }
      this.showCode = true;
    },
    palette() {
      this.colors = [];
      const rand1 = this.getRandom();
      const rand2 = this.getRandom();
      const scale = chroma.scale([rand1, rand2]).mode('lch').colors(6);
      this.colors = [...scale];
      this.showCode = true;
    },
  },
};
</script>

<style scoped>
.generator {
  display: flex;
  flex-direction: column;
}
button {
  font-size: 20px;
  background-color: transparent;
  padding: 10px 20px;
  color: #ffffff;
  border: 2px solid white;
  cursor: pointer;
  transition: all .2s ease-in-out;
  outline: none;
  margin: 10px auto;
}
button:hover {
    background-color: #424242;
}
.row {
    display: flex;
    flex-direction: row;
    margin: 10px auto;
}

.box {
    height: 150px;
    width: 150px;
}

.code {
    max-width: 960px;
    width: 100%;
}
code {
    max-width: 960px;
    width: 100%;
    word-wrap: break-word;
}
</style>
