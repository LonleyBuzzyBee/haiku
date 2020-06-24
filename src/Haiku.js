const storeState = (poem) => {
  let currentState = poem;
  return (stateChangeFunction) => {
    const newState = stateChangeFunction(currentState);
    currentState = { ...newState };
    return newState;
  };
};

const syllablesCount = (line) => {
  const vowelArray = ["a", "e", "i", "o", "u"];
  let wordArray = line.split(" "); //split on spaces
  console.log(wordArray);
  let syllables = 0;
  wordArray.forEach(word => {
    let charArray = word.split('');
    console.log(charArray);
    // charArray.forEach(char => {
      for(let i = 0; i < charArray.length; i++){
        console.log(charArray[i]);
        let char = charArray[i];
        //y is a vowel & constitutes a new syllable if and only if it is surrounded by consonants or at the end
        if (char == "y"){
          if (charArray.length == i +1) {
            if (vowelArray.includes(charArray[i-1])) {
              syllables += 0;
            }
            else {
              syllables += 1;
            }
          }
          else {
            if (vowelArray.includes(charArray[i-1]) || vowelArray.includes(charArray[i+1])) {
              syllables += 0;
            }
            else {
              syllables += 1;
            }
          }
        }
        else if (char == "e") {
          if (charArray[i-1] == "l") {
            syllables += 1;
          }
          else if (charArray.length == i+1) {
            if (charArray.length <=3 && (!vowelArray.includes(charArray[i-1]) && !vowelArray.includes(charArray[i-2]))) {
              syllables += 1;
            }
            else {
              syllables +=0;
            }
          }
          else if (!vowelArray.includes(charArray[i-1])){
            syllables += 1;
          }         
        }
        else if (vowelArray.includes(char) && !vowelArray.includes(charArray[i-1])){
          syllables += 1;
        }  
      }
  });   
  console.log(syllables);
  return syllables;    
};

const isHaiku = (line1, line2, line3, haikuBool = true) => {
  //for each line, run syllablesCount
  //for line1, if !(syllables = 5) {
  // return haikuBool = false;
  // }

  //line 1 - 5 syllables, line 2 - 7 syllables, line 3 - 5 
  while (haikuBool == true) {
    // const line1Syllables = syllablesCount(line1);
    if (line1Syllables == 5) {
      // const line2Syllables = syllablesCount(line2);
      if (line2Syllables == 7) {
        // const line3Syllables = syllablesCount(line3);
        if (line3Syllables == 5) {
          return haikuBool = true;
        }
      }
    }
    else {
      return haikuBool = false;
    }
  }
}


//last in first out
//in change state we took in the prop then we returned the value added on and then lastly state(obj gets made)




$(document).ready(function () {
  $("form").submit(function (event) {
    event.preventDefault();
    let line1 = $("input#line1").val();
    let line2 = $("input#line2").val();
    let line3 = $("input#line3").val();
    const poem = storeState({ line1: "", line2: "", line3: "" });
    poem.line1 = line1;
    poem.line2 = line2;
    poem.line3 = line3;
    $("#line1-value").text(poem.line1);
    $("#line2-value").text(poem.line2);
    $("#line3-value").text(poem.line3);
    const syllables1 = (syllablesCount(poem.line1));
    const syllables2 = (syllablesCount(poem.line2));
    const syllables3 = (syllablesCount(poem.line3));
    const confirm = (isHaiku(syllables1, syllables2, syllables3));
    console.log(poem.line1);
    console.log(poem.line2);
    console.log(poem.line3);
  
    console.log(confirm + "  "+syllables1 + " "+ syllables2 + " " + syllables3);
  });
  // $("#haiku").click(function () {
  // });
});