<template>
  <div class='generator'>
    <button @click='random()'>
        generate random
    </button>
    <button @click='palette'>
        generate palette
    </button>
    <p v-if="showTheme">Theme style: <span v-if="darkTheme">Dark</span> <span v-else>Light</span></p>
    <div class='row'>
        <div v-for='color in 6' :key='color.id' v-bind:style='{ backgroundColor: colors[color]}' class='box'>
        </div>
    </div>
    <div v-if="showCode" class='code'>
        <code id="code">
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
      showTheme: false,
      darkTheme: false,
      themeCode: {
        sidebarBg: '',
        sidebarText: '',
        sidebarUnreadText: '',
        sidebarTextHoverBg: '',
        sidebarTextActiveBorder: '',
        sidebarTextActiveColor: '',
        sidebarHeaderBg: '',
        sidebarHeaderTextColor: '',
        onlineIndicator: '',
        awayIndicator: '',
        mentionBj: '',
        mentionColor: '',
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
    generateColorPair() {
      // Generate a color pair dark or light with enough contrast
      // to be readable
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
      const theme = this.themeCode;
      theme.sidebarBg = colors[6];
      theme.sidebarTextActiveBorder = colors[1];
      theme.sidebarTextHoverBg = colors[6];
      theme.sidebarHeaderBg = colors[6];
      theme.sidebarHeaderTextColor = colors[7];
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
    themeChange() {
      // console.log('changed');
    },
    random() {
      this.colors = [];
      const seed = this.generateColorPair();
      for (let i = 0; i < 6; i += 1) {
        this.colors.push(this.getRandom());
      }
      this.colors.push(seed.bg);
      this.colors.push(seed.text);
      this.buildCode(this.colors);
      this.showCode = true;
    },
    palette() {
      this.colors = [];
      const seed = this.generateColorPair();
      const rand = this.getRandom();
      const scale = chroma.scale([seed.bg, rand]).mode('lch').colors(6);
      this.colors = [...scale];
      this.colors.push(seed.bg);
      this.colors.push(seed.text);
      this.buildCode(this.colors);
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
.ckbx-style-5 label {
  margin: auto;
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
}
code {
    max-width: 960px;
    width: 100%;
    word-wrap: break-word;
}
</style>
