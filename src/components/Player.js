import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

function Player({
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songs,
}) {
  //state
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  useEffect(() => {
    audioRef.current[isPlaying ? "play" : "pause"]();
  }, [isPlaying, currentSong, audioRef]);

  //Event handlers
  const playSongHandler = () => {
    setIsPlaying(!isPlaying);
  };

  const timeUpdateHandler = (e) => {
    //Calculate percentage
    const roundedCurrent = Math.round(e.target.currentTime);
    const roundedDuration = Math.round(e.target.duration);
    const animationPercentage = Math.round(
      (roundedCurrent / roundedDuration) * 100
    );

    setSongInfo({
      ...songInfo,
      currentTime: e.target.currentTime,
      duration: e.target.duration || 0,
      animationPercentage,
    });
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skiptrackHandler = (direction) => {
    let currentSongIndex = songs.indexOf(currentSong);
    direction === "forward"
      ? setCurrentSong(songs[currentSongIndex + 1] || songs[0])
      : setCurrentSong(songs[currentSongIndex - 1] || songs[songs.length - 1]);
  };

  const songEndHandler = () => {
    skiptrackHandler("forward");
  };

  //Add the styles
  const trackAnim = {
    transform: `translateX(${-100 + songInfo.animationPercentage}%)`,
    background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div className="track">
          <input
            onChange={dragHandler}
            type="range"
            min={0}
            max={songInfo.duration}
            value={songInfo.currentTime}
          />
          <div className="animate-track" style={trackAnim}></div>
        </div>
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
          onClick={() => skiptrackHandler("backward")}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          onClick={() => skiptrackHandler("forward")}
        />
      </div>
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default Player;
