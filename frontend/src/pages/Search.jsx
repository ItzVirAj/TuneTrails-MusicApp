/* eslint-disable no-unused-vars */
// pages/Search.jsx
import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);

  const handleSearch = async () => {
    try {
        const res = await axios.get(
            `${import.meta.env.VITE_SERVER}/song/search/${query}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // adjust as per your project
              },
            }
          );
      setSongs(res.data.songs);
    } catch (err) {
      console.error("Search error", err);
    }
  };

  return (
    <div className="p-4 text-white">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="w-full px-4 py-2 rounded bg-[#1e1e1e] text-white"
          placeholder="Search for a song..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-green-500 rounded"
        >
          Search
        </button>
      </div>

      <div>
        {songs.map((song) => (
          <div key={song._id} className="mb-2 p-2 border-b border-gray-700">
            <p className="font-bold">{song.name}</p>
            <p className="text-sm text-gray-400">{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
