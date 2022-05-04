const {css2waa} = require('./lib/CSS2WAA');

const myCssKeyframes = `@keyframes slidein {
  from {
    margin-left:100%;
    width:300%
  }

  to {
    margin-left:0%;
    width:100%;
  }
}`

const options = {
    duration: 2000,
    delay: 1000
}

const WAAAnimationsArray = css2waa(myCssKeyframes);
console.log(WAAAnimationsArray)
document.getElementById('myId').animate(WAAAnimationsArray, options);
