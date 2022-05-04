import {css2waa} from 'CSS2WAA';

const myCssKeyframes = 'keyframes slide-in-elliptic-top-fwd{0%{transform:translateY(-600px) rotateX(-30deg) scale(0);transform-origin:50% 100%;opacity:0}100%{transform:translateY(0) rotateX(0) scale(1);transform-origin:50% 1400px;opacity:1}}'
const options = {
    duration: 2000,
    delay: 1000
}

const WAAAnimationsArray = css2waa(myCssKeyframes);
console.log(WAAAnimationsArray)
document.getElementById('myId').animate(WAAAnimationsArray, options);
