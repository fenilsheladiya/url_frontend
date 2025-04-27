// export default App;
import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customShortUrl, setCustomShortUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/api/short", {
        originalUrl,
        customShortUrl,
      })
      .then((res) => {
        setShortUrl(res.data);

        setError("");
        console.log("api response", res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.data?.error) {
          setError(err.response.data.error);
        }
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex justify-center items-center p-5">
      <div className="bg-white border-4 border-purple-400 rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-purple-700 mb-6">
          ✨ URL Shortener ✨
        </h1>

        <div className="flex flex-col items-center space-y-5">
          <input
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            type="text"
            placeholder="Paste your long URL here..."
            className="w-full px-5 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent text-gray-700 text-lg"
          />
          <input
            value={customShortUrl}
            onChange={(e) => setCustomShortUrl(e.target.value)}
            type="text"
            placeholder="Optional: Enter your custom short URL name"
            className="w-full px-5 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent text-gray-700 text-lg"
          />

          <button
            onClick={handleSubmit}
            type="button"
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg rounded-xl transition duration-300"
          >
            🎯 Shorten It!
          </button>
          {error && (
            <div className="text-red-500 text-center text-md">{error}</div>
          )}
          {shortUrl && (
            <div className="mt-6 text-center">
              <p className="text-lg font-medium"> Shortened URL:</p>
              <a
                href={shortUrl?.shortUrl}
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-2"
                target="_blank"
              >
                {shortUrl?.shortUrl}
              </a>
              {shortUrl && (
                <img src={shortUrl.qrCodeImg} alt="Generated QR code" />
              )}
              {error && (
                <div className="text-red-500 text-center text-md">
                  {error === "Link expired or not found"
                    ? "🚫 This link has expired!"
                    : error}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
