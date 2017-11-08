<template>
  <div class='generator'>
    <v-button :onClick='random' words="generate random"/></v-button>
    <v-button :onClick='palette' words="generate palette"></v-button>
    <p v-if="showTheme">Theme style: <span v-if="darkTheme">Dark</span> <span v-else>Light</span></p>
    <div class='row'>
        <div v-for='color in 6' :key='color.id' v-bind:style='{ backgroundColor: colors[color]}' class='box'>
        </div>
    </div>
    <div v-if="showCode" class='code'>
        <textarea spellcheck="false" id="code" v-model="themeCode">
        </textarea>
        <button v-clipboard:copy="themeCode">copy code</button>
    </div>
  </div>
</template>

<script>
import chroma from 'chroma-js';
import Button from './Button';

export default {
  name: 'Generator',
  components: {
    'v-button': Button,
  },
  data() {
    return {
      colors: [],
      showCode: false,
      showTheme: false,
      darkTheme: false,
      themeCode: {},
    };
  },
  methods: {
    getRandomColor() {
      // Random color
      return chroma.random().hex();
    },
    generateColorPair() {
      // Generate a color pair dark or light with enough
      // contrast to be readable
      // https://github.com/gka/chroma.js/issues/45
      const MIN_CONTRAST_RATIO = 7;
      const WHITE = chroma('white');
      const BLACK = chroma('black');

      let bg = null;
      let text = null;
      do {
        bg = chroma.random();
        const contrastWithWhite = chroma.contrast(bg, WHITE);
        const contrastWithBlack = chroma.contrast(bg, BLACK);
        if (contrastWithWhite >= MIN_CONTRAST_RATIO) {
          this.showTheme = true;
          this.darkTheme = true;
          text = WHITE;
        } else if (contrastWithBlack >= MIN_CONTRAST_RATIO) {
          this.showTheme = true;
          this.darkTheme = false;
          text = BLACK;
        }
      } while (text === null);
      const contrast = parseFloat(chroma.contrast(bg, text).toFixed(1));
      return {
        bg: bg.hex(),
        text: text.hex(),
        contrast,
      };
    },
    buildCode(colors) {
      // Build theme code for copying
      const theme = this.themeCode;
      theme.sidebarBg = colors[1];
      theme.sidebarTextHoverBg = colors[6];
      theme.sidebarHeaderBg = colors[6];
      theme.sidebarHeaderTextColor = colors[7];
      theme.sidebarTextActiveBorder = colors[1];
      theme.sidebarText = colors[7];
      theme.sidebarUnreadText = colors[3];
      theme.sidebarTextActiveColor = colors[2];
      theme.onlineIndicator = colors[0];
      theme.awayIndicator = colors[5];
      theme.mentionBj = colors[1];
      theme.mentionColor = colors[3];
      theme.centerChannelBg = colors[6];
      theme.centerChannelColor = colors[7];
      theme.newMessageSeparator = colors[4];
      theme.linkColor = colors[2];
      theme.buttonBg = colors[1];
      theme.buttonColor = colors[7];
      theme.errorTextColor = colors[3];
      theme.mentionHighlightBg = colors[4];
      theme.mentionHighlightLink = colors[5];
    },
    random() {
      // Generate random theme
      this.colors = [];
      this.themeCode = {};
      const seed = this.generateColorPair();
      for (let i = 0; i < 6; i += 1) {
        this.colors.push(this.getRandomColor());
      }
      this.colors.push(seed.bg);
      this.colors.push(seed.text);
      this.buildCode(this.colors);
      this.themeCode = JSON.stringify(this.themeCode);
      this.showCode = true;
    },
    palette() {
      // Generate palette theme
      this.colors = [];
      this.themeCode = {};
      const seed = this.generateColorPair();
      const rand = this.getRandomColor();
      const scale = chroma.scale([seed.bg, rand]).mode('lch').colors(6);
      this.colors = [...scale];
      this.colors.push(seed.bg);
      this.colors.push(seed.text);
      this.buildCode(this.colors);
      this.themeCode = JSON.stringify(this.themeCode);
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
p {
  text-align: center;
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
  text-align: center;
}
code {
  max-width: 960px;
  width: 100%;
  word-wrap: break-word;
}
textarea {
  width: 100%;
  resize: none;
  height: 100px;
  color: #ffffff;
  background-color: transparent;
  font-family: monospace;
  border: none;
  outline: none;
}
</style>
