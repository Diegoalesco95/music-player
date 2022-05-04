const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

let isPlaying = false
let currentSongIndex = 0

const songFolder = './assets/audio/'
const imageFolder = './assets/images/'

const songs = [

  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design'
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design'
  },
  {
    name: 'jacinto-3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto Design'
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric / Jacinto Design'
  },
]

function setAttributes(el, attrs) {
  for (let key in attrs) {
    el.setAttribute(key, attrs[key])
  }
}

function formatTime(time) {
  let minutes = Math.floor(time / 60)
  let seconds = Math.floor(time % 60)
  if (seconds < 10) {
    seconds = `0${seconds}`
  }
  const timeFormatted = `${minutes}:${seconds}`
  if (timeFormatted) {
    return `${minutes}:${seconds}`
  }
}

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
    currentTimeEl.textContent = formatTime(currentTime)
  }
}

function setProgressBar(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = music.duration
  music.currentTime = (clickX / width) * duration
}



function setDuration(e) {
  const { duration } = e.srcElement
  durationEl.textContent = formatTime(duration)
}


function playSong() {
  music.play()
  isPlaying = true
  playBtn.classList.replace('fa-play', 'fa-pause')
  setAttributes(playBtn, { 'title': 'Pause' })
}

function pauseSong() {
  music.pause()
  isPlaying = false
  playBtn.classList.replace('fa-pause', 'fa-play')
  setAttributes(playBtn, { 'title': 'Play' })
}

function loadSong(song) {
  title.textContent = song.displayName
  artist.textContent = song.artist
  music.src = `${songFolder}/${song.name}.mp3`
  image.src = `${imageFolder}/${song.name}.jpg`
}

function prevSong() {
  if (currentSongIndex === 0) {
    currentSongIndex = songs.length - 1
  } else {
    currentSongIndex--
  }
  loadSong(songs[currentSongIndex])
  playSong()
}

function nextSong() {
  if (currentSongIndex === songs.length - 1) {
    currentSongIndex = 0
  } else {
    currentSongIndex++
  }
  loadSong(songs[currentSongIndex])
  playSong()
}

function init() {
  loadSong(songs[currentSongIndex])
  playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))
  music.addEventListener('loadedmetadata', setDuration)
  music.addEventListener('ended', nextSong)
  music.addEventListener('timeupdate', updateProgressBar)
  prevBtn.addEventListener('click', prevSong)
  nextBtn.addEventListener('click', nextSong)
  progressContainer.addEventListener('click', setProgressBar)
}

init()

