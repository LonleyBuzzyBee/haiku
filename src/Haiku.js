const storeState = (poem) => {
  let currentState = poem;
  return (stateChangeFunction) => {
    const newState = stateChangeFunction(currentState);
    currentState = { ...newState };
    return newState;
  };
};
const syllablesCount = (line, syllables = 0) => {
  const vowelArray = ["a", "e", "i", "o", "u"];
  let wordArray = line.toLowerCase().split(" ");
  wordArray.forEach(word => {
    let charArray = word.split('');
      for(let i = 0; i < charArray.length; i++){
        let char = charArray[i];
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
  return syllables;    
};

const isHaiku = (poem, haikuBool = true) => {
  while (haikuBool == true) { 
    if (syllablesCount(poem.line1) == 5) {
      if (syllablesCount(poem.line2) == 7) {
        if (syllablesCount(poem.line3) == 5) {
          return haikuBool = true;
        }
      }
    }
    else {
      return haikuBool = false;
    }
  }
};
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
    const confirm = (isHaiku(poem));
    $("#confirm-value").text(confirm);
  });
});