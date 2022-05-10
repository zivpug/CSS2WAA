## CSS2WAA
(WIP)

Convert CSS Keyframes into [Web Animation API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) animation objects array.

### About

Version 0.0.9

Released under the MIT license.

### Build
```
yarn run build // will build the packge into ./lib
yarn run test // run all tests
```
** no npm package yet

### Dependency
This package fixes CSS keyframes support in  [cssJson](https://github.com/aramk/CSSJSON) and uses it to convert the CSS keyframes to JSON, to be ported into Web Animation API format. 


### What is this

**css2waa**  will convert a CSS keyframes (string) into a Web Animation API animation object. 
Web Animation API options should be added separately, since it"s a plain object that requires no conversion.

**waa2css** will convert a Web Animation API keyframes object, into a CSS keyframes (string).
Css timing and options should be added separately when calling the CSS animation. 

### Sample
```
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

const WAAOptions = {
    duration: 2000,
    delay: 1000
}

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

```

Above cs2waa() will output the following object:
```
[
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

```
Above waa2css() will produce the following string:

```
`0% { offset: 0; margin-left: 100%; width: 300%;}
     50% { offset: 0.5; margin-left: 50%; width: 200%;}
     100% { offset: 1; margin-left: 0%; width: 100%;}`
```

### Options object sample

This object will not be created by this package, but this is a quick reference how to use it. 
For more info: 

CSS animation settings:
```
.myDiv {
    animation-duration: 3s;
    animation-delay: 2s;
    animation-iteration-count: 3;
    animation-direction: alternate;
}
```

WAA options object:

```
{
    delay: 2000,
    duration: 3000,
    iterations: 3,
    direction: alternate
}
```
