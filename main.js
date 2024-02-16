const audio = document.querySelector('.audio'),
    main = document.querySelector('.main'),
    audioLogo = document.querySelector('.audio__logo'),
    audioName = document.querySelector('.audio__name'),
    audioSinger = document.querySelector('.audio__singer'),
    audioTrack = document.querySelector('.audio__track'),
    progressBar = document.querySelector('.audio-bar'),
    progress = document.querySelector('.audio-bar__progress'),
    progressCurrentTime = document.querySelector('.audio-bar__current-time'),
    progressDuration = document.querySelector('.audio-bar__duration'),
    btnPrev = document.querySelector('.btn--prev'),
    btnNext = document.querySelector('.btn--next'),
    btnPlay = document.querySelector('.btn--play'),
    imgPause = document.querySelector('.audio__btn__img--pause'),
    imgPlay = document.querySelector('.audio__btn__img--play'),
    volumeSlider = document.querySelector('.audio__volume__range'),
    volumeImg = document.querySelector('.audio__volume__img');

let songIndex = 0;

const tracksArr = [
    {"name": "Chica Bamboni", "singer": "Moзги", "img": "url('Mozgi.jpg')"}, 
    {"name": "Gold cup", "singer": "Басков и Милохин", "img": "url('Gold cup.jpg')"}, 
    {"name": "Hypno dancer", "singer": "Little Big", "img": "url('Hypno dancer.jpg')"}, 
    {"name": "No roots", "singer": "Alice Merton", "img": "url('No roots.jpg')"},
    {"name": "Ягода Малинка", "singer": "Хабиб", "img": "url('Malinka.jpg')"}
];




function loadSong(song) {
    let name = song.name;
    audioName.innerHTML = name;
    audioLogo.innerHTML = name;
    audioTrack.src = `${name}.mp3`;
    console.log(song.img);

    switch (name) {
        case 'Chica Bamboni':
            audioSinger.innerHTML = song.singer;
            main.style.backgroundImage = song.img;
            break;
        case 'Gold cup':
            audioSinger.innerHTML = song.singer;
            main.style.backgroundImage = song.img;
            break;
        case 'Hypno dancer':
            audioSinger.innerHTML = song.singer;
            main.style.backgroundImage = song.img;
            break;
        case 'No roots':
            audioSinger.innerHTML = song.singer;
            main.style.backgroundImage = song.img;
            break;
        case 'Ягода Малинка':
            audioSinger.innerHTML = song.singer;
            main.style.backgroundImage = song.img;
            break;
    }
}

loadSong(tracksArr[songIndex]);

btnPlay.addEventListener('click', () => {
    let isPlaying = audio.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    }
    else {
        playSong();
    }
});

btnPrev.addEventListener('click', prevSong);
btnNext.addEventListener('click', nextSong);

function playSong() {
    audio.classList.add('play');
    audioTrack.play();
    if (!imgPlay.classList.contains('hidden')) {
        imgPlay.classList.add('hidden');
        imgPause.classList.remove('hidden');
    }
    audioLogo.classList.add('active');
    audioLogo.style.margin = '1em';
}

function pauseSong() {
    audio.classList.remove('play');
    audioTrack.pause();
    if (!imgPause.classList.contains('hidden')) {
        imgPause.classList.add('hidden');
        imgPlay.classList.remove('hidden');
    }
    audioLogo.classList.remove('active');
    audioLogo.style.margin = '0';
}

function nextSong() {
    songIndex++;
    if (songIndex > tracksArr.length - 1) {
        songIndex = 0;
    }
    loadSong(tracksArr[songIndex]);
    playSong();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = tracksArr.length - 1;
    }
    loadSong(tracksArr[songIndex]);
    playSong();
}

audioTrack.addEventListener('timeupdate', updateProgress);

function updateProgress() {
    let duration = audioTrack.duration,
        currentTime = audioTrack.currentTime,
        progressPercent;
    if (isNaN(duration)) {
        progressDuration.innerHTML = '0:00';
    }
    else {
        progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        const minutes = Math.floor(audioTrack.currentTime / 60);
        const seconds = Math.floor(audioTrack.currentTime % 60);
        const durMinutes = Math.floor(duration / 60);
        const durSeconds = Math.floor(duration % 60);
        progressCurrentTime.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        progressDuration.innerHTML = `${durMinutes}:${durSeconds < 10 ? '0' : ''}${durSeconds}`;
    }
}


progressBar.addEventListener('click', setProgress);

function setProgress(e) {
    let width = this.clientWidth,
        clickX = e.offsetX,
        duration = audioTrack.duration;
    audioTrack.currentTime = (clickX / width) * duration;
}


let volumeMuted = false;

audioTrack.addEventListener('ended', nextSong);
volumeSlider.addEventListener('input', showVolume);


volumeImg.addEventListener('click', clickVolumeImg);

function clickVolumeImg() {
    if (!volumeMuted && volumeImg.src !== 'volume-no.svg') {
        audioTrack.volume = volumeSlider.value = 0;
        volumeImg.src = 'volume-no.svg';
        volumeMuted = true;
    }
    else {
        audioTrack.volume = volumeSlider.value = 0.5;
        volumeImg.src = 'volume-low.svg';
        volumeMuted = false;
    }
}

function showVolume() {
    if (volumeSlider.value == 0) {
        volumeImg.src = 'volume-no.svg';
        volumeMuted = true;
    }
    else if (volumeSlider.value >= 0.8) {
        volumeImg.src = 'volume-high.svg';
    }
    else {
        volumeImg.src = 'volume-low.svg';
    }

    audioTrack.volume = volumeSlider.value;
}

document.addEventListener('keydown', (el) => {
    handleKeyDown(el);
});

function handleKeyDown(event) {
    if (event.key === 'AudioVolumeMute') {
        clickVolumeImg();
    }
    else if (event.key === "AudioVolumeUp") {
        if (volumeSlider.valueAsNumber <= 1) {
            volumeSlider.valueAsNumber += 0.01;
            audioTrack.volume = volumeSlider.value;
            showVolume();
        }
    }
    if (event.key === "AudioVolumeDown") {
        if (volumeSlider.valueAsNumber > 0) {
            volumeSlider.valueAsNumber -= 0.01;
            audioTrack.volume = volumeSlider.value;
            showVolume();
        }
    }
}
