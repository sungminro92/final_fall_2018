// ===========================*** WINDOW ONLOAD ***===========================
window.onload = function() {
    console.log("it's working");
    numberShow(5);
    // backToSearchButton.style.display = "none";
};

// ===========================*** WORD API ***===========================
const searchButton = document.getElementById("search-button");
const input = document.getElementById("input-word");
const wordResultContainer = document.getElementById("word-result-container");
const backToSearchButton = document.getElementById("back-to-search");

if (searchButton) {
    searchButton.addEventListener("click", getWords);
}
if (input) {
    input.addEventListener("keyup", keyPress);
}
// backToSearchButton.addEventListener("click", backToSearch);

function keyPress(event) {
    if (event.keyCode === 13) {
        if (event.value !== undefined ) {
          input.value = event.value;
        }
        getWords();
    }
}

// musixmatch
// apikey = a9ea0e0ca0049d1f0195562840890071
//search anything
// http://api.musixmatch.com/ws/1.1/track.search?q=light&apikey=a9ea0e0ca0049d1f0195562840890071
// save 1) track_id, 2)track_name, 3)track_rating 4) has_lyrics 5)artist_name

// get lyrics
// http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=15953433&apikey=a9ea0e0ca0049d1f0195562840890071
// lyrics_body
// search
function remove() {
    this.parentNode.remove();
}

// wordsapi
// add header
// Key = kxITJ4PvNOmshjYMJaTYuaqwFxqap1GhFBQjsnDVXq3lC4b1Nq
const errorMessage = document.getElementById('error-message');
const clickedWordsContainer = document.getElementById('clicked-words-container');
function getWords() {
    let inputValue = input.value;
    console.log(inputValue);
    wordResultContainer.innerHTML = "";
    errorMessage.innerHTML = "";
    const wordURL = "https://wordsapiv1.p.rapidapi.com/words/";
    fetch(wordURL + inputValue, {
        headers: {"X-Mashape-Key": "kxITJ4PvNOmshjYMJaTYuaqwFxqap1GhFBQjsnDVXq3lC4b1Nq"}
    })
    .then((resp) => resp.json())
    .then(function(data) {
       const synonymsResult = data.results // original data
           .map(result => result.synonyms)
           .filter(synonym => synonym)
           .flatMap(synonym => synonym);
            console.log(synonymsResult);

            for(let i=0; i<synonymsResult.length; i++) {
                let wordValue = synonymsResult[i];
                let wordDiv = document.createElement('div');
                wordDiv.innerHTML = wordValue;
                wordDiv.setAttribute("class", "words");
                wordDiv.addEventListener('click', function() {
                  input.value = wordValue;
                  clikedWords(wordValue);
                  getWords();
                });
                wordResultContainer.appendChild(wordDiv);
                // wordP.innerHTML = this.value;
                // wordContainer.setAttribute('onClick', "getWords(this.value)");
                // wordContainer.appendChild(wordP);
                // wordResultContainer.appendChild(wordContainer);
            }
    })
    .catch(function() {
        errorMessage.innerHTML="try another word !";
        errorMessage.style.color = "red";
        errorMessage.setAttribute("class", "font");
        console.log("Cannot access " + wordURL + " response. Blocked by browser?");
    })
}

function clikedWords(word) {
    let clickedWordDiv = document.createElement('div');
    let x = document.createElement('a');
    x.innerHTML ="  x";
    x.style.color = "red";
    x.style.padding = "2px 3px 2px 3px";
    clickedWordDiv.innerHTML = word;
    clickedWordDiv.appendChild(x);
    clickedWordsContainer.appendChild(clickedWordDiv);
    clickedWordDiv.setAttribute("class", "words");
    clickedWordDiv.style.flexDirection = "column";
    x.addEventListener('click', remove, false);
}


// function disableElement() {
//     if(input.value.length < 1) {
//         search.disabled = true;
//     }
// }

// function that will hide the search area
// function hideSearchContainer() {
//     input.style.display = "none";
//     searchButton.style.display = "none";
//     backToSearchButton.style.display = "block";
// }
//
// function backToSearch() {
//     wordResultContainer.innerHTML = "";
//     input.style.display = "block";
//     searchButton.style.display = "block";
//     backToSearchButton.style.display = "none";
//
// }
// add it to 'click' event on search button

// function that will bring out search again.
// create new button to HTML = "back to search"

// function that will bring out all song result
// function that will hide song result



// COLOR name to code
function colourNameToHex(colour) {
    let colours = {"aliceblue":"f0f8ff","antiquewhite":"faebd7","aqua":"00ffff","aquamarine":"7fffd4","azure":"f0ffff",
        "beige":"f5f5dc","bisque":"ffe4c4","black":"000000","blanchedalmond":"ffebcd","blue":"0000ff","blueviolet":"8a2be2","brown":"a52a2a","burlywood":"deb887",
        "cadetblue":"5f9ea0","chartreuse":"7fff00","chocolate":"d2691e","coral":"ff7f50","cornflowerblue":"6495ed","cornsilk":"fff8dc","crimson":"dc143c","cyan":"00ffff",
        "darkblue":"00008b","darkcyan":"008b8b","darkgoldenrod":"b8860b","darkgray":"a9a9a9","darkgreen":"006400","darkkhaki":"bdb76b","darkmagenta":"8b008b","darkolivegreen":"556b2f",
        "darkorange":"ff8c00","darkorchid":"9932cc","darkred":"8b0000","darksalmon":"e9967a","darkseagreen":"8fbc8f","darkslateblue":"483d8b","darkslategray":"2f4f4f","darkturquoise":"00ced1",
        "darkviolet":"9400d3","deeppink":"ff1493","deepskyblue":"00bfff","dimgray":"696969","dodgerblue":"1e90ff",
        "firebrick":"b22222","floralwhite":"fffaf0","forestgreen":"228b22","fuchsia":"ff00ff",
        "gainsboro":"dcdcdc","ghostwhite":"f8f8ff","gold":"ffd700","goldenrod":"daa520","gray":"808080","green":"008000","greenyellow":"adff2f",
        "honeydew":"f0fff0","hotpink":"ff69b4",
        "indianred ":"cd5c5c","indigo":"4b0082","ivory":"fffff0","khaki":"f0e68c",
        "lavender":"e6e6fa","lavenderblush":"fff0f5","lawngreen":"7cfc00","lemonchiffon":"fffacd","lightblue":"add8e6","lightcoral":"f08080","lightcyan":"e0ffff","lightgoldenrodyellow":"fafad2",
        "lightgrey":"d3d3d3","lightgreen":"90ee90","lightpink":"ffb6c1","lightsalmon":"ffa07a","lightseagreen":"20b2aa","lightskyblue":"87cefa","lightslategray":"778899","lightsteelblue":"b0c4de",
        "lightyellow":"ffffe0","lime":"00ff00","limegreen":"32cd32","linen":"faf0e6",
        "magenta":"ff00ff","maroon":"800000","mediumaquamarine":"66cdaa","mediumblue":"0000cd","mediumorchid":"ba55d3","mediumpurple":"9370d8","mediumseagreen":"3cb371","mediumslateblue":"7b68ee",
        "mediumspringgreen":"00fa9a","mediumturquoise":"48d1cc","mediumvioletred":"c71585","midnightblue":"191970","mintcream":"f5fffa","mistyrose":"ffe4e1","moccasin":"ffe4b5",
        "navajowhite":"ffdead","navy":"000080",
        "oldlace":"fdf5e6","olive":"808000","olivedrab":"6b8e23","orange":"ffa500","orangered":"ff4500","orchid":"da70d6",
        "palegoldenrod":"eee8aa","palegreen":"98fb98","paleturquoise":"afeeee","palevioletred":"d87093","papayawhip":"ffefd5","peachpuff":"ffdab9","peru":"cd853f","pink":"ffc0cb","plum":"dda0dd","powderblue":"b0e0e6","purple":"800080",
        "rebeccapurple":"663399","red":"ff0000","rosybrown":"bc8f8f","royalblue":"4169e1",
        "saddlebrown":"8b4513","salmon":"fa8072","sandybrown":"f4a460","seagreen":"2e8b57","seashell":"fff5ee","sienna":"a0522d","silver":"c0c0c0","skyblue":"87ceeb","slateblue":"6a5acd","slategray":"708090","snow":"fffafa","springgreen":"00ff7f","steelblue":"4682b4",
        "tan":"d2b48c","teal":"008080","thistle":"d8bfd8","tomato":"ff6347","turquoise":"40e0d0",
        "violet":"ee82ee",
        "wheat":"f5deb3","white":"ffffff","whitesmoke":"f5f5f5",
        "yellow":"ffff00","yellowgreen":"9acd32"};

    if (typeof colours[colour.toLowerCase()] != 'undefined')
       return(colours[colour.toLowerCase()]);
}
// ===========================*** COLOR API ***===========================
const colorInput = document.getElementById("color-input"); // whatever that's being in input
const colorSearchButton = document.getElementById("color-search-button"); // color search button
if (colorInput) {
  let hexColorValue = colourNameToHex(colorInput.value); // hexCode for input color value;
}


if (colorInput) {
  colorInput.addEventListener("keyup", keyPress);
}

// let colorInputValue = colorInput.value;
const colorURL = "https://thecolorapi.com/scheme?format=json&hex=";
// const monochrome
// const monochromeDark
// const monochromeLight
// const analogic
// const complement
// const analogicComplement
// const triad
// const quad

const colorResultContainer = document.getElementById("color-result-container");

const colorSearchClick = function(colorInput) {
  let hexColor = colourNameToHex(colorInput.value);
  if(hexColor) {
    getColors(hexColor);
  } else {
      colorResultContainer.innerHTML = "";
      const errorDiv = document.createElement("div");
      let error = document.createTextNode("you must type color name!");
      errorDiv.append(error);
       colorResultContainer.append(errorDiv);
  }
};

if (colorSearchButton) {
    colorSearchButton.addEventListener("click", function() {
      colorSearchClick(colorInput);
    });
    // colorSearch() function on search button
}

function numberShow(number) {
    let numberShowP = document.getElementById("number-show");
    if (numberShowP == null) {
        return;
    }
    numberShowP.innerHTML = (number);
    // if(colorInput.value) {
    //     colorSearch()
    // }
}

function getColors(hexValue) {
    const colorURL = "https://www.thecolorapi.com/scheme?";
    const hexCode = "hex=" + hexValue;
    const format = "&format=json";
    const mode = "&mode=analogic";
    const colorNumber = document.getElementById("color-number-input").value;
    const count = `&count=${parseInt(colorNumber)+1}`;
    fetch(colorURL + hexCode + format + mode + count)
        .then((resp) => resp.json(resp))
        .then(function(data) {
            createColorScheme(data.colors);
        });
}

function createColorScheme(data) {
    colorResultContainer.innerHTML = "";
    for(let i=1; i< data.length; i++) {
        let colorValue = data[i].hex.clean;
        console.log(colorValue);
      let colorDiv = document.createElement('div');
      colorDiv.classList.add("color-result");
      colorDiv.style.margin = "0 auto";
      colorDiv.style.backgroundColor = colorValue;
      colorDiv.onclick = `getColors(${colorValue})`;
      colorDiv.addEventListener("click", function(){
        colorInput.value = colorValue;
        getColors(colorValue);
      });
      let colorTextDiv = document.createElement('h5');
      colorTextDiv.style.colorDivbackgroundColor = "white";
      colorTextDiv.innerHTML = colorValue;
      colorDiv.append(colorTextDiv);
        colorResultContainer.append(colorDiv);
        // colorDiv.setAttribute('onclick', `getColors('${colorValue}');`);
    }
}
