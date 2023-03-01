import playList from './playList.js';

const time = document.querySelector('.time');
const dateNode = document.querySelector('.date');
const greeteng = document.querySelector('.greeting__text');
const name = document.querySelector('.name');
const body = document.querySelector('body');
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
const weatherIcon = document.querySelector('.weather-icon');
const weatherTemperature = document.querySelector('.weather__temperature');
const weatherDescription = document.querySelector('.weather__description');
const weatherWind = document.querySelector('.weather__wind');
const weatherHumidity = document.querySelector('.weather__humidity');
const weatherError = document.querySelector('.weather__error');
const city = document.querySelector('.city');
const quoteText = document.querySelector('.quote__text');
const quoteAuthor = document.querySelector('.quote__author');
const changeQuote = document.querySelector('.change-quote');
const playListNode = document.querySelector('.play-list');
const audioName = document.querySelector('.audio-name');
const currentTime = document.querySelector('.current-time');
const durationTime = document.querySelector('.duration-time');
const playListItems = playListNode.children;
const playBtn = document.querySelector('.play');
const playNextBtn = document.querySelector('.play-next');
const playPrevBtn = document.querySelector('.play-prev');
const progressBar = document.querySelector('.progress-bar');
const volumeBtn = document.querySelector('.volume__icon');
const volumeBar = document.querySelector('.volume-bar');
const settingsBtn = document.querySelector('.settings-icon');
const settings = document.querySelector('.settings');
const closeBtn = document.querySelector('.settings__close');
const languageSelectionEn = document.getElementById('english');
const languageSelectionRu = document.getElementById('russian');
const settingsTitle = document.querySelector('.settings__title');
const settingsLanguage = document.querySelector('.settings__language .settings__subtitle');
const settingsSource = document.querySelector('.settings__source .settings__subtitle');
const settingsTag = document.querySelector('.settings__tag .settings__subtitle');
const settingsTagInput = document.querySelector('.tag');
const settingsVisibleTitle = document.querySelector('.settings__visibility .settings__subtitle');
const settingsVisibleTime = document.querySelector('#time');
const settingsVisibleDate = document.querySelector('#date');
const settingsVisibleGreeting = document.querySelector('#greeting');
const settingsVisibleQuote = document.querySelector('#quote');
const settingsVisibleWeather = document.querySelector('#weather');
const settingsVisiblePlayer = document.querySelector('#player');
const settingsVisibleToDo = document.querySelector('#todo');
const settingsImgGit = document.querySelector('#github');
const settingsImgUnsplash = document.querySelector('#unsplash');
const settingsImgFlickr = document.querySelector('#flickr');
const greetingNode = document.querySelector('.greeting');
const quote = document.querySelector('.quote');
const weather = document.querySelector('.weather');
const player = document.querySelector('.player');
const toDo = document.querySelector('.todo');
const toDoBtn = document.querySelector('.todo__icon');
const newToDo = document.querySelector('.todo_new');
const containerToDo = document.querySelector('.todo_container');

const audio = new Audio();

let randomNumBg = getRandomNum(1, 20);
let isPlay = false;
let audioNum = 0;
let language = 'en';
let imgSource = 'github';
let imgTag = 'sea';

function showTime() {
	const date = new Date();
	const currentTime = date.toLocaleTimeString();
	
	time.textContent = currentTime;

	showDate();
	showGreeteng();
	setTimeout(showTime, 1000);
}
showTime();

function showDate() {
	const date = new Date();
	let options = { weekday: 'long', month: 'long', day: 'numeric'};
	let currentDate;
	if (language === 'ru') {
		currentDate = date.toLocaleDateString('ru-RU', options);
	} else {
		currentDate = date.toLocaleDateString('en-EN', options);
	}

	dateNode.textContent = currentDate;
}

function showGreeteng() {
	const date = new Date();
	const hours = date.getHours();
	const timeOfDay = getTimeOfDay(hours);
	let greetengText;
	if (language === 'ru') {
		if (timeOfDay === 'morning') {
			greetengText = `Доброе утро,`;
		} else if (timeOfDay === 'afternoon') {
			greetengText = `Добрый день,`;
		} else if (timeOfDay === 'evening') {
			greetengText = `Добрый вечер,`;
		}	else if (timeOfDay === 'night') {
			greetengText = `Доброй ночи,`;
		}
	} else {
		greetengText = `Good ${timeOfDay},`;
	}

	greeteng.textContent = greetengText;
}

function getTimeOfDay(hours) {
	if (hours < 6) {
		return 'night';
	} else if (hours < 12) {
		return 'morning';
	} else if (hours < 18) {
		return 'afternoon';
	} else {
		return 'evening';
	}
}

function setName() {
	name.blur();
	if (language === 'ru') {
		name.placeholder = '[Введите имя]';
	} else {
		name.placeholder = '[Enter name]';
	}
}
name.addEventListener('change', setName);

function setLocalStorage() {
	localStorage.setItem('name', name.value);
	localStorage.setItem('city', city.value);
	localStorage.setItem('language', language);
	localStorage.setItem('imgSource', imgSource);
	if (imgTag) {
		localStorage.setItem('imgTag', imgTag);
	}
	localStorage.setItem('visibleTime', settingsVisibleTime.checked);
	localStorage.setItem('visibleDate', settingsVisibleDate.checked);
	localStorage.setItem('visibleGreeting', settingsVisibleGreeting.checked);
	localStorage.setItem('visibleQuote', settingsVisibleQuote.checked);
	localStorage.setItem('visibleWeather', settingsVisibleWeather.checked);
	localStorage.setItem('visiblePlayer', settingsVisiblePlayer.checked);
	localStorage.setItem('visibleToDo', settingsVisibleToDo.checked);

	localStorage.setItem('coutToDo', containerToDo.childElementCount);
	for (let i = 0; i < containerToDo.childElementCount; i++) {
		let item = containerToDo.children[i];
		localStorage.setItem(`itemToDo${i}`, item.children[1].value);
		localStorage.setItem(`checkToDo${i}`, item.children[0].checked);
	}
}
window.addEventListener('beforeunload', setLocalStorage);

function letLocalStorage() {
	if (localStorage.getItem('language') === 'ru') {
		language = localStorage.getItem('language');
		languageSelectionRu.checked = true;
		selectLanguage();
	}
	if (localStorage.getItem('name')) {
		name.value = localStorage.getItem('name');
	}
	if (localStorage.getItem('city')) {
		city.value = localStorage.getItem('city');
	} else if (language === 'ru') {
		city.value = 'Минск';
	} else {
		city.value = 'Minsk';
	}
	if (localStorage.getItem('imgSource')) {
		imgSource = localStorage.getItem('imgSource');
		if (imgSource === 'github') {
			settingsImgGit.checked = true;
		} else if (imgSource === 'unsplash') {
			settingsImgUnsplash.checked = true;
		} else if (imgSource === 'flickr') {
			settingsImgFlickr.checked = true;
		}
		disabledTag();
	}
	if (localStorage.getItem('imgTag')) {
		settingsTagInput.value = localStorage.getItem('imgTag');
		setBg();
	}
	if (localStorage.getItem('visibleTime') === 'false') {
		settingsVisibleTime.checked = false;
		time.classList.add('time_hidden');
	}
	if (localStorage.getItem('visibleDate') === 'false') {
		settingsVisibleDate.checked = false;
		dateNode.classList.add('date_hidden');
	}
	if (localStorage.getItem('visibleGreeting') === 'false') {
		settingsVisibleGreeting.checked = false;
		greetingNode.classList.add('greeting_hidden');
	}
	if (localStorage.getItem('visibleQuote') === 'false') {
		settingsVisibleQuote.checked = false;
		quote.classList.add('quote_hidden');
		changeQuote.classList.add('change-quote_hidden');
	}
	if (localStorage.getItem('visibleWeather') === 'false') {
		settingsVisibleWeather.checked = false;
		weather.classList.add('weather_hidden');
	}
	if (localStorage.getItem('visiblePlayer') === 'false') {
		settingsVisiblePlayer.checked = false;
		player.classList.add('player_hidden');
	}
	if (localStorage.getItem('visibleToDo') === 'false') {
		settingsVisibleToDo.checked = false;
		toDo.classList.add('todo_hidden');
		toDoBtn.classList.add('todo__icon_hidden');
	}

	if (localStorage.getItem('coutToDo') !== '0') {
		for (let i = 0; i < +localStorage.getItem('coutToDo'); i++) {
			let checked = (localStorage.getItem(`checkToDo${i}`) === 'true') ? true : false;
			restoreToDo(localStorage.getItem(`itemToDo${i}`), checked);
		}
	}
}
window.addEventListener('load', letLocalStorage);

function getRandomNum(min, max) {
	return Math.floor(min + Math.random() * (max + 1 - min));
}

function setBg() {
	const date = new Date();
	const hours = date.getHours();
	const timeOfDay = getTimeOfDay(hours);
	const img = new Image();
	
	if (imgSource === 'github') {
		const bgNum = randomNumBg.toString().padStart(2, '0');
		img.src = `https://raw.githubusercontent.com/NastassiaArkharava/Momentum-images/main/images/${timeOfDay}/${bgNum}.webp`;

		img.onload = () => {
			body.style.backgroundImage = `url("${img.src}")`;
		}
	} else if (imgSource === 'unsplash') {
		getLinkToImage(timeOfDay, imgTag);
	} else {
		getLinkToImage(timeOfDay, imgTag);
	}
}
setBg();

async function getLinkToImage(timeOfDay, imgTag) {
	if (imgSource === 'unsplash') {
		const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${imgTag || timeOfDay}&client_id=pH73vVxNfh_bmuxtR6ZKltmIKtZlC-8o-UlLq4_T1AY`;
		const res = await fetch(url);
		const data = await res.json();
		const img = new Image();
		img.src = data.urls.regular;
		img.onload = () => {
			body.style.backgroundImage = `url("${img.src}")`;
		}
	} else {
		const bgNum = getRandomNum(0, 98);
		const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=efb3e8d92b56765c1846c335263f899f&tags=${imgTag || timeOfDay}&extras=url_l&format=json&nojsoncallback=1`;
		const res = await fetch(url);
		const data = await res.json();
		const img = new Image();
		img.src = data.photos.photo[bgNum].url_l;
		img.onload = () => {
			body.style.backgroundImage = `url("${img.src}")`;
		}
	}
}

function getSlideNext() {
	if (randomNumBg === 20) {
		randomNumBg = 1;
	} else {
		randomNumBg++;
	}
	setBg();
}
slideNext.addEventListener('click', getSlideNext);

function getSlidePrev() {
	if (randomNumBg === 1) {
		randomNumBg = 20;
	} else {
		randomNumBg--;
	}
	setBg();
}
slidePrev.addEventListener('click', getSlidePrev);

async function getWeather() {
	if (language === 'ru') {
		if (city.value === 'Minsk') {
			city.value = 'Минск';
		}
		city.placeholder = '[Введите город]';
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=a5a2e4be09d47f97e29574100ab4f027&units=metric`;
		const res = await fetch(url);
		const data = await res.json();
	
		if (data.weather === undefined) {
			weatherError.textContent = 'нет такого города';
			weatherIcon.className = 'weather-icon owf';
			weatherTemperature.textContent = '';
			weatherDescription.textContent = '';
			weatherWind.textContent = '';
			weatherHumidity.textContent = '';
		} else {
			weatherError.textContent = '';
			weatherIcon.className = 'weather-icon owf';
			weatherIcon.classList.add(`owf-${data.weather[0].id}`);
			weatherTemperature.textContent = `${data.main.temp.toFixed(0)}°C`;
			weatherDescription.textContent = data.weather[0].description;
			weatherWind.textContent = `Скорость ветра: ${data.wind.speed.toFixed(0)} м/с`;
			weatherHumidity.textContent = `Влажность: ${data.main.humidity}%`;
		}
	} else {
		if (city.value === 'Минск') {
			city.value = 'Minsk';
		}
		city.placeholder = '[Enter city]';
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=a5a2e4be09d47f97e29574100ab4f027&units=metric`;
		const res = await fetch(url);
		const data = await res.json();
	
		if (data.weather === undefined) {
			weatherError.textContent = 'there is no such city';
			weatherIcon.className = 'weather-icon owf';
			weatherTemperature.textContent = '';
			weatherDescription.textContent = '';
			weatherWind.textContent = '';
			weatherHumidity.textContent = '';
		} else {
			weatherError.textContent = '';
			weatherIcon.className = 'weather-icon owf';
			weatherIcon.classList.add(`owf-${data.weather[0].id}`);
			weatherTemperature.textContent = `${data.main.temp.toFixed(0)}°C`;
			weatherDescription.textContent = data.weather[0].description;
			weatherWind.textContent = `Wind speed: ${data.wind.speed.toFixed(0)} m/s`;
			weatherHumidity.textContent = `Humidity: ${data.main.humidity}%`;
		}
	}
}
window.addEventListener('load', getWeather);

function setCity() {
	getWeather();
	city.blur();
}
city.addEventListener('change', setCity);

async function getQuotes() {
	if (language === 'ru') {
		const quotes = 'dataru.json';
		const res = await fetch(quotes);
		const data = await res.json();
	
		const randomNum = getRandomNum(0, data.length - 1);
		quoteText.textContent = `${data[randomNum].text}`;
		quoteAuthor.textContent = `${data[randomNum].author}`;
	} else {
		const quotes = 'data.json';
		const res = await fetch(quotes);
		const data = await res.json();
	
		const randomNum = getRandomNum(0, data.length - 1);
		quoteText.textContent = `${data[randomNum].text}`;
		quoteAuthor.textContent = `${data[randomNum].author}`;
	}
}
getQuotes();
changeQuote.addEventListener('click', getQuotes);

function addPlayList() {
	playList.forEach(item => {
		const li = document.createElement('li');
		li.classList.add('play-list__item');
		const icon = document.createElement('div');
		icon.classList.add('icon');
		icon.classList.add('play');
		icon.classList.add('play-list__icon');
		li.append(icon);
		const text = document.createElement('div');
		text.classList.add('play-list__title');
		text.textContent = item.title;
		li.append(text);
		playListNode.append(li);
	})
}
addPlayList();
const playListIcons = playListNode.querySelectorAll('.play-list__icon');

function setAudioInfo() {
	audio.src = playList[audioNum].src;
	audioName.textContent = playList[audioNum].title;
	playListItems[audioNum].classList.add('play-list__item_active');
}
setAudioInfo();

function playAudio() {
	if (isPlay === false) {
		isPlay = true;
		audio.play();
		playBtn.classList.toggle('pause');
		if (playBtn.classList.contains('pause')) {
			playListNode.children[audioNum].children[0].classList.add('pause');
		} else {
			playListNode.children[audioNum].children[0].classList.remove('pause');
		}
	} else {
		isPlay = false;
		audio.pause();
		playBtn.classList.toggle('pause');
		if (playBtn.classList.contains('pause')) {
			playListNode.children[audioNum].children[0].classList.add('pause');
		} else {
			playListNode.children[audioNum].children[0].classList.remove('pause');
		}
	}
}
playBtn.addEventListener('click', playAudio);
audio.addEventListener('ended', playNext);

function playNext() {
	playListItems[audioNum].classList.remove('play-list__item_active');
	playListNode.children[audioNum].children[0].classList.remove('pause');
	if (audioNum < playListItems.length - 1){
		audioNum++;
	} else {
		audioNum = 0;
	}
	setAudioInfo();
	if (isPlay === false) {
		isPlay = true;
	} else {
		isPlay = false;
	}
	playBtn.classList.toggle('pause');
	playAudio();
}
playNextBtn.addEventListener('click', playNext);

function playPrev() {
	playListItems[audioNum].classList.remove('play-list__item_active');
	playListNode.children[audioNum].children[0].classList.remove('pause');
	if (audioNum > 0){
		audioNum--;
	} else {
		audioNum = playListItems.length - 1;
	}
	setAudioInfo();
	if (isPlay === false) {
		isPlay = true;
	} else {
		isPlay = false;
	}
	playBtn.classList.toggle('pause');
	playAudio();
}
playPrevBtn.addEventListener('click', playPrev);

function updateProgressValue() {
    progressBar.max = audio.duration;
    progressBar.value = audio.currentTime;
    currentTime.innerHTML = (formatTime(Math.floor(audio.currentTime)));
		if (!audio.duration) {
			durationTime.innerHTML = '00:00';
		} else {
			durationTime.innerHTML = (formatTime(Math.floor(audio.duration)));
		}
};
setInterval(updateProgressValue, 500);

function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){ 
        sec  = `0${sec}`;
    };
    return `${min}:${sec}`;
};

function changeProgressBar() {
    audio.currentTime = progressBar.value;
};
progressBar.addEventListener('change', changeProgressBar);

function volumeOn() {
	volumeBtn.classList.toggle('mute');
	audio.muted = !audio.muted;
}
volumeBtn.addEventListener('click', volumeOn);

function changeVolumeBar() {
	audio.volume = volumeBar.value / 10;
}
volumeBar.addEventListener('change', changeVolumeBar);

playListIcons.forEach(item => {
	item.addEventListener('click', (e) => {
		const newAudioNum = [...item.parentElement.parentElement.children].indexOf(e.target.parentElement);
		if (newAudioNum !== audioNum) {
			playListItems[audioNum].classList.remove('play-list__item_active');
			playListNode.children[audioNum].children[0].classList.remove('pause');
			audioNum = newAudioNum;
			setAudioInfo();
			if (isPlay === true) {
				isPlay = false;
				playBtn.classList.toggle('pause');
			}
		}
		playAudio();
	})
})

function showSettings() {
	settings.classList.toggle('settings_active');
}
settingsBtn.addEventListener('click', showSettings);
closeBtn.addEventListener('click', showSettings);

function selectLanguage() {
	if (languageSelectionEn.checked) {
		language = 'en';
	} else {
		language = 'ru';
	}
	showDate();
	showGreeteng();
	setName();
	getWeather();
	getQuotes();
	translateSettings();
}
languageSelectionEn.addEventListener('change', selectLanguage);
languageSelectionRu.addEventListener('change', selectLanguage);

function translateSettings() {
	if (language === 'ru') {
		settingsTitle.textContent = 'Настройки';
		settingsLanguage.textContent = 'Язык';
		settingsSource.textContent = 'Ресурс картинок';
		settingsTag.textContent = 'Тема картинок';
		settingsTagInput.placeholder = '[Введите тему]';
		settingsVisibleTitle.textContent = 'Видимые блоки';
		settingsVisibleTime.nextElementSibling.textContent = 'время';
		settingsVisibleDate.nextElementSibling.textContent = 'дата';
		settingsVisibleGreeting.nextElementSibling.textContent = 'приветствие';
		settingsVisibleQuote.nextElementSibling.textContent = 'цитата';
		settingsVisibleWeather.nextElementSibling.textContent = 'погода';
		settingsVisiblePlayer.nextElementSibling.textContent = 'плеер';
		settingsVisibleToDo.nextElementSibling.textContent = 'дела';
		newToDo.placeholder = '[Новые задачи]';
	} else {
		settingsTitle.textContent = 'Settings';
		settingsLanguage.textContent = 'Language';
		settingsSource.textContent = 'Images source';
		settingsTag.textContent = 'Images tag';
		settingsTagInput.placeholder = '[Enter tag]';
		settingsVisibleTitle.textContent = 'Visible blocks';
		settingsVisibleTime.nextElementSibling.textContent = 'time';
		settingsVisibleDate.nextElementSibling.textContent = 'date';
		settingsVisibleGreeting.nextElementSibling.textContent = 'greeting';
		settingsVisibleQuote.nextElementSibling.textContent = 'quote';
		settingsVisibleWeather.nextElementSibling.textContent = 'weather';
		settingsVisiblePlayer.nextElementSibling.textContent = 'player';
		settingsVisibleToDo.nextElementSibling.textContent = 'ToDo';
		newToDo.placeholder = '[New ToDo]';
	}
}
translateSettings();

function changeImgSource() {
	imgSource = (settingsImgGit.checked) ? 'github' :
		(settingsImgUnsplash.checked) ? 'unsplash' : 'flickr';
	disabledTag();
	setBg();
}
settingsImgGit.addEventListener('change', changeImgSource);
settingsImgUnsplash.addEventListener('change', changeImgSource);
settingsImgFlickr.addEventListener('change', changeImgSource);

function disabledTag() {
	settingsTagInput.disabled = (imgSource === 'github') ? true : false;
	if (settingsTagInput.disabled) {
		settingsTagInput.classList.add('tag_unactive');
	} else {
		settingsTagInput.classList.remove('tag_unactive');
	}
}
disabledTag();

function setTag() {
	imgTag = settingsTagInput.value;
	settingsTagInput.blur();
	setBg();
}
settingsTagInput.addEventListener('change', setTag);

function hideBlocks(e) {
	if (e.target.checked) {
		if (e.target.id === 'time') {
			time.classList.remove('time_hidden');
		} else if (e.target.id === 'date') {
			dateNode.classList.remove('date_hidden');
		} else if (e.target.id === 'greeting') {
			greetingNode.classList.remove('greeting_hidden');
		} else if (e.target.id === 'quote') {
			quote.classList.remove('quote_hidden');
			changeQuote.classList.remove('change-quote_hidden');
		} else if (e.target.id === 'weather') {
			weather.classList.remove('weather_hidden');
		} else if (e.target.id === 'player') {
			player.classList.remove('player_hidden');
		} else if (e.target.id === 'todo') {
			toDo.classList.remove('todo_hidden');
			toDoBtn.classList.remove('todo__icon_hidden');
		}
	} else {
		if (e.target.id === 'time') {
			time.classList.add('time_hidden');
		} else if (e.target.id === 'date') {
			dateNode.classList.add('date_hidden');
		} else if (e.target.id === 'greeting') {
			greetingNode.classList.add('greeting_hidden');
		} else if (e.target.id === 'quote') {
			quote.classList.add('quote_hidden');
			changeQuote.classList.add('change-quote_hidden');
		} else if (e.target.id === 'weather') {
			weather.classList.add('weather_hidden');
		} else if (e.target.id === 'player') {
			player.classList.add('player_hidden');
		} else if (e.target.id === 'todo') {
			toDo.classList.add('todo_hidden');
			toDoBtn.classList.add('todo__icon_hidden');
		}
	}
}
settingsVisibleTime.addEventListener('change', e => hideBlocks(e));
settingsVisibleDate.addEventListener('change', e => hideBlocks(e));
settingsVisibleGreeting.addEventListener('change', e => hideBlocks(e));
settingsVisibleQuote.addEventListener('change', e => hideBlocks(e));
settingsVisibleWeather.addEventListener('change', e => hideBlocks(e));
settingsVisiblePlayer.addEventListener('change', e => hideBlocks(e));
settingsVisibleToDo.addEventListener('change', e => hideBlocks(e));

function showToDo() {
	toDo.classList.toggle('todo_active');
}
toDoBtn.addEventListener('click', showToDo);

function addToDo() {
	const li = document.createElement('li');
	li.classList.add('todo__item');

	const input = document.createElement('input');
	input.type = 'checkbox';
	li.append(input);

	const inputTask = document.createElement('input');
	inputTask.type = 'text';
	inputTask.classList.add('todo__text');
	inputTask.value = newToDo.value;
	inputTask.disabled = true;
	newToDo.value = '';
	li.append(inputTask);
	
	const edit = document.createElement('button');
	edit.classList.add('icon');
	edit.classList.add('todo__edit');
	li.append(edit);
	
	const delet = document.createElement('button');
	delet.classList.add('icon');
	delet.classList.add('todo__delete');
	li.append(delet);

	containerToDo.append(li);

	deleteToDo(delet);
	editToDo(edit);
	stopEditToDo(inputTask);
	doneToDo(input);
}
newToDo.addEventListener('change', addToDo);

function deleteToDo(element) {
	element.addEventListener('click', (e) => {
		element.parentElement.remove();
	});
}

function editToDo(element) {
	element.addEventListener('click', (e) => {
		if (element.previousElementSibling.disabled) {
			element.previousElementSibling.disabled = false;
			element.previousElementSibling.classList.add('todo__text_active');
			element.previousElementSibling.focus();
		} else {
			element.previousElementSibling.disabled = true;
			element.previousElementSibling.classList.remove('todo__text_active');
		}
	});
}

function stopEditToDo(element) {
	element.addEventListener('keypress', (e) => {
		if (e.which === 13) {
			element.disabled = true;
			element.classList.remove('todo__text_active');
		}
	});
}

function doneToDo(element) {
	element.addEventListener('change', (e) => {
		element.nextElementSibling.classList.toggle('todo__text_unactive');
	});
}

function restoreToDo(textToDo, checkTodo) {
	const li = document.createElement('li');
	li.classList.add('todo__item');

	const input = document.createElement('input');
	input.type = 'checkbox';
	input.checked = checkTodo;
	li.append(input);

	const inputTask = document.createElement('input');
	inputTask.type = 'text';
	inputTask.classList.add('todo__text');
	inputTask.value = textToDo;
	inputTask.disabled = true;
	li.append(inputTask);
	
	const edit = document.createElement('button');
	edit.classList.add('icon');
	edit.classList.add('todo__edit');
	li.append(edit);
	
	const delet = document.createElement('button');
	delet.classList.add('icon');
	delet.classList.add('todo__delete');
	li.append(delet);

	containerToDo.append(li);

	deleteToDo(delet);
	editToDo(edit);
	stopEditToDo(inputTask);
	doneToDo(input);
}