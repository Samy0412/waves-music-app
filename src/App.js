import React, { useState, useRef } from "react";
import "./styles/app.scss";

//Components
import Player from "./components/Player";
import Song from "./components/Song";

//Data
import data from "./data";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
  const [songs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  //ref
  const audioRef = useRef(null);

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
      />
      <Library
        libraryStatus={libraryStatus}
        songs={songs}
        setCurrentSong={setCurrentSong}
        currentSong={currentSong}
      />
    </div>
  );
}

export default App;
