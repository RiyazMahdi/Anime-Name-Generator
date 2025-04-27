import { useEffect, useRef, useState } from "react";
import "./App.css";
import { generateFullName } from "./utils/markovGenerator";
import Sakura from "./components/Sakura";

function App() {
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = new Audio("/ambient.wav");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;
    return () => {
      audio.pause();
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !audio.muted;
      setIsMuted(audio.muted);
    }
  };

  const handleGenerate = () => {
    const audio = audioRef.current;
    if (audio && audio.paused) {
      audio
        .play()
        .catch((err) => console.warn("Autoplay still blocked:", err.message));
    }
    const newName = generateFullName();
    setHistory((prev) => {
      const updated = [newName, ...prev];
      return updated.slice(0, 15); // Keep only the latest 20 names
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleToggleFavorite = (name) => {
    if (favorites.includes(name)) {
      setFavorites(favorites.filter((fav) => fav !== name));
    } else {
      setFavorites([name, ...favorites]);
    }
  };

  return (
    <>
      <Sakura />

      <div className="flex flex-col text-center bg-cover item-center bg-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black p-4">
        <h1 className="text-5xl font-anime !font-anime text-pink-600 drop-shadow-md mb-6 animate-fade-in-slow text-center">
          ✨ AI Anime Name Generator ✨
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => {
              handleGenerate();
              document.getElementById("generateBtn").classList.add("bounce");
              setTimeout(() => {
                document
                  .getElementById("generateBtn")
                  .classList.remove("bounce");
              }, 400);
            }}
            id="generateBtn"
            className="bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white py-2 px-6 rounded-lg shadow-md transition duration-300"
          >
            🎴 Generate Name
          </button>

          <button
            onClick={handleClearHistory}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white py-2 px-6 rounded-lg shadow-md transition duration-300"
          >
            🧹 Clear History
          </button>

          <button
            onClick={toggleMute}
            className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-2 px-6 rounded-lg shadow-md transition duration-300"
          >
            {isMuted ? "🔇 Unmute Music" : "🔊 Mute Music"}
          </button>
        </div>

        <div className="generated-names-container mb-8 mx-auto text-center">
          <h2 className="text-xl font-semibold mb-2 ">Generated Names</h2>
          <div className="space-y-2">
            {history.map((name, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white shadow-md rounded px-4 py-2 text-gray-800 fade-in"
              >
                <span className="generated-name">✨ {name} </span>
                <button
                  onClick={() => handleToggleFavorite(name)}
                  className={`ml-2 px-2 py-1 rounded text-sm ${
                    favorites.includes(name)
                      ? "bg-yellow-400 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                  style={{
                    background: "none",
                    border: "none",
                    outline: "none",
                  }}
                  aria-label="Toggle Favorite"
                >
                  {favorites.includes(name) ? "★" : "☆"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {favorites.length > 0 && (
          <div className="w-full max-w-md mb-8">
            <h2 className="text-xl font-semibold mb-2">⭐ Favorites</h2>
            <div className="space-y-2">
              {favorites.map((name, index) => (
                <div
                  key={index}
                  className="bg-yellow-100 text-yellow-900 px-4 py-2 rounded shadow-sm"
                >
                  <p className=" generated-name fade-in">✨ {name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <footer className="mt-12 text-center text-sm text-pink-200 opacity-80 font-anime sticky top-[100vh] ">
        Made with 💖 & sakura petals | © {new Date().getFullYear()} Riyaz Mahdi
      </footer>
    </>
  );
}

export default App;
