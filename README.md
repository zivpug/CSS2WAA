## CSS2WAA
(WIP)

Convert CSS Keyframes into [Web Animation API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) animation objects array.

### About

Version 1.0.0.
Released under the MIT license.

### Dependency
This package fixes CSS keyframes support in  [cssJson](https://github.com/aramk/CSSJSON) and uses it to convert the CSS keyframes to JSON, to be ported into Web Animation API format. 


### What is this
css2waa will convert a CSS keyframes (in a string) into a Web Animation API animation object. 
Web Animation API options should be added separately, since it"s a plain object that requires no conversion.

### Sample
```
import {css2waa} from "CSS2WAA";

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
  iterations: 4,
  iterationStart: 0,
  delay: 2000,
  endDelay: 0,
  direction: "alternate",
  duration: 3500,
  fill: "forwards",
  easing: "ease-out",
}

const WAAAnimationsArray = css2waa(myCssKeyframes);

document.getElementById("myDiv")
    .animate(WAAAnimationsArray, options);
```

Above code will output the following object:
```
[
  {
    "offset": 0,
    "margin-left": "100%",
    "width": "300%"
  },
  {
    "offset": 1,
    "margin-left": "0%",
    "width": "100%"
  }
]

```
### Option object sample

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
