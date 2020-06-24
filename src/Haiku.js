const storeState = (poem) => {
  let currentState = poem;
  return (stateChangeFunction) => {
    const newState = stateChangeFunction(currentState);
    currentState = { ...newState };
    return newState;
  };
};

// const consonantArray = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"];

const syllablesCount = (line) => {
  const vowelArray = ["a", "e", "i", "o", "u"];
  let wordArray = line.split(" "); //split on spaces
  let syllables = 0;
  wordArray.forEach(word => {
    let charArray = word.split('');
    charArray.forEach(char => {
      let i = word.indexOf(char);
      // if char is a vowel && the letter before it is not also a vowel && if char is not a final silent "e"
      if ((vowelArray.includes(char) && (!(vowelArray.includes(word[i-1]))) && (!((char == "e") && (word.length == i+1))))) 
      {
        syllables = + 1;
      }
    });
  });   
  console.log(syllables);
  return syllables;    
};

// const isHaiku (poem) => {
//   //for each line, run syllablesCount
//   //for line1, if syllables = 1
// }



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
    const syllables = syllablesCount(poem.line1);
    console.log(poem.line1);
    console.log(poem.line2);
    console.log(poem.line3);
    console.log("syllables" + syllables);
  });
  // $("#haiku").click(function () {
  // });
});