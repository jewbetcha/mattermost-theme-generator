import '../scss/main.scss';

import chroma from 'chroma-js';

document.addEventListener('DOMContentLoaded', function() {
    const random = document.querySelector('#random');
    const palette = document.querySelector('#palette');
    const colors = document.querySelectorAll('.color');
    const codeArea = document.querySelector('code');

    random.addEventListener('click', () => {
        let codes = [];
        colors.forEach(function(el) {
            let rand = chroma.random().hex();
            el.style.backgroundColor = rand;
            codes.push(rand);
        });
        let finishedCode = buildCode(codes);
        codeArea.innerHTML = JSON.stringify(finishedCode);
    });
    palette.addEventListener('click', () => {
        let codes = [];
        let rand1 = chroma.random().hex();
        let rand2 = chroma.random().hex();
        let scale = chroma.scale([rand1,rand2]).mode('lch').colors(6)
        colors.forEach(function(el, i) {
            let color = scale[i];
            el.style.backgroundColor = color;
            codes.push(color);
        });
        let finishedCode = buildCode(codes);
        codeArea.innerHTML = JSON.stringify(finishedCode);
    });

    const buildCode = (colors) => {
        themeCode['sidebarBg'] = colors[0];
        themeCode['sidebarTextHoverBg'] = colors[1];
        themeCode['sidebarTextActiveBorder'] = colors[2];
        themeCode['sidebarTextActiveBorder'] = colors[3];
        themeCode['onlineIndicator'] = colors[4];
        themeCode['awayIndicator'] = colors[5];
        themeCode['mentionBj'] = colors[0];
        themeCode['centerChannelBg'] = colors[1];
        themeCode['centerChannelColor'] = colors[2];
        themeCode['newMessageSeparator'] = colors[3];
        themeCode['linkColor'] = colors[4];
        themeCode['buttonBg'] = colors[5];
        themeCode['buttonColor'] = colors[0];
        themeCode['errorTextColor'] = colors[1];
        themeCode['mentionHighlightBg'] = colors[2];
        themeCode['mentionHighlightLink'] = colors[3];

        return themeCode;
    }
    let themeCode =   {
        "sidebarBg": "",
        "sidebarText": "#ffffff",
        "sidebarUnreadText": "#ffffff",
        "sidebarTextHoverBg": "",
        "sidebarTextActiveBorder": "",
        "sidebarTextActiveColor": "#ffffff",
        "sidebarHeaderBg": "",
        "sidebarHeaderTextColor": "#ffffff",
        "onlineIndicator": "",
        "awayIndicator": "",
        "mentionBj": "",
        "mentionColor": "#ffffff",
        "centerChannelBg": "",
        "centerChannelColor": "",
        "newMessageSeparator": "",
        "linkColor": "",
        "buttonBg": "",
        "buttonColor": "",
        "errorTextColor": "",
        "mentionHighlightBg": "",
        "mentionHighlightLink": "",
        "codeTheme": "custom"
    }
});