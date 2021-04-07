import React from "react";

function LibrarySong({ song, setCurrentSong, currentSong }) {
  const songSelectHandler = () => {
    //Add active state
    setCurrentSong(song);
  };
  return (
    <div
      className={`library-song ${song.id === currentSong.id ? "selected" : ""}`}
      onClick={songSelectHandler}
    >
      <img src={song.cover} alt={song.name}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}

export default LibrarySong;
