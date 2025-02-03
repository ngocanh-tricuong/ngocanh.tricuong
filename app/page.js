'use client'

import Image from 'next/image'
import WavesurferPlayer from '@wavesurfer/react'
import { useState } from 'react'

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
    <path
      fillRule="evenodd"
      d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
      clipRule="evenodd"
    />
  </svg>
)

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
    <path
      fillRule="evenodd"
      d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
      clipRule="evenodd"
    />
  </svg>
)

export default function Home() {
  const [wavesurfer, setWavesurfer] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(null)

  const convertedDuration = (duration) => {
    const minutes = Math.floor(duration / 60)
    const seconds = Math.floor(duration % 60)
    return `${minutes}:${seconds}`
  }

  const onReady = (ws, duration) => {
    setWavesurfer(ws)
    setIsPlaying(false)
    setDuration(convertedDuration(duration))
  }

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause()
  }

  return (
    <div className="mx-5">
      <div className="max-w-[400px] mx-auto mb-20">
        <Image src="/valentine/photo.png" alt="music" width={1000} height={1000} />
      </div>

      <button
        className="my-3 w-16 h-16 rounded-full bg-[#1F509A] flex items-center justify-center"
        onClick={onPlayPause}
        title="Play/Pause"
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>

      <div className="relative">
        <div className="bg-black px-0.5 mr-2 absolute top-1/2 transform -translate-y-1/2 right-0 z-10">{duration}</div>
        <WavesurferPlayer
          height={80}
          waveColor="#1F509A"
          progressColor="#7695FF"
          url="/valentine/music.mp3"
          onReady={onReady}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          barWidth={3}
          barGap={2}
          minPxPerSec={10}
          barRadius={3}
          hideScrollbar={true}
          cursorColor="transparent"
          dragToSeek={true}
          autoCenter={true}
          onAudioprocess={(ws, currentTime) => {
            console.log(ws, currentTime)
          }}
        />
      </div>
    </div>
  )
}
