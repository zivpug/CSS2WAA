const {css2waa, waa2css} = require('./lib/');

/** CSS keyframes to WAA Object **/
const myCssKeyframes = `@keyframes slidein {
  from {
    margin-left:100%;
    width:300%
  }

  50% {
    margin-left:50%;
    width:200%
  }

  to {
    margin-left:0%;
    width:100%;
  }
}`

// const WAAOptions = {
//     duration: 2000,
//     delay: 1000
// }

const myWAAAnimation = css2waa(myCssKeyframes);
console.log(myWAAAnimation);

/** Use like this:
 document.getElementById('myId').animate(myWAAAnimation, WAAOptions);
 **/


/** WAA object to CSS keyframes **/

const myWaaAnimation = [
    {
        "offset": 0,
        "margin-left": "100%",
        "width": "300%"
    },
    {
        "offset": 0.5,
        "margin-left": "50%",
        "width": "200%"
    },
    {
        "offset": 1,
        "margin-left": "0%",
        "width": "100%"
    }
]

const myCssKeyframesString = waa2css(myWaaAnimation);
/**
 use in your css - "`@keyframes myKeyframes{${myCssKeyframesString}}`"
 * **/

console.log(myCssKeyframesString);
