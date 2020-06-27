// DOM Elements
const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('focus');

const timeSeparator = '<span>:</span>';
const showAmPM = true;

const addZero = n => (parseInt(n, 10) < 10 ? '0' : '') + n;
const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

const hour = () => new Date().getHours();

function getTimeString() {
    const today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();
    // Set AM or PM
    const amPm = hour >= 12 ? 'PM' : 'AM';
    // 12hr Format
    const hour12 = hour % 12  || 12;
    return `${hour12}${timeSeparator}${addZero(min)}${timeSeparator}${addZero(sec)} ${showAmPM ? amPm : ''}`;
}

function getFromStorage(location) {
    const store = localStorage.getItem(location);
    return store === null ? `[Enter ${capitalizeFirstLetter(location)}]` : store;
}

const shouldSetStorage = e => e.type !== 'keypress' || (e.which === 13 || e.keyCode === 13);
const shouldBlur = e => e.type === 'keypress' && (e.which === 13 || e.keyCode === 13);

const timeOfDay = x => { if(x < 12) { return 'morning'; } if (x < 18) { return 'afternoon';} return 'evening';}
const getGreeting = x => 'Good ' + capitalizeFirstLetter(timeOfDay(x));
const getBackgroundImage = x => `url('../img/${x}.jpg')`;

// Impure
const setStorage = location => e => { if (shouldSetStorage(e)) { localStorage.setItem(location, e.target.innerText); } }
const blur = obj => e => { if(shouldBlur(e)) { obj.blur(); }}

function showTime() {
    time.innerHTML = getTimeString();
    setTimeout(showTime, 1000);
}

const setNameStorage = setStorage('name');
const blurName = blur(name);
const setFocusStorage = setStorage('focus');
const blurFocus = blur(focus);

name.addEventListener('keypress', function(e) { setNameStorage(e); blurName(e); });
name.addEventListener('blur', setNameStorage);

focus.addEventListener('keypress', function(e) { setFocusStorage(e); blurFocus(e); });
focus.addEventListener('blur', setFocusStorage);

// Run
showTime();

name.textContent = getFromStorage('name');
focus.textContent = getFromStorage('focus');

document.body.style.backgroundImage = getBackgroundImage(timeOfDay(hour()));
greeting.textContent = getGreeting(hour());