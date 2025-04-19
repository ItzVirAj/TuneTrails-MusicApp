// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { SongData } from "../context/Song";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { UserData } from "../context/User";
import { FaBookmark, FaPlay } from "react-icons/fa";

const Album = () => {
  const {
    fetchAlbumSong,
    albumSong = [],
    albumData,
    setIsPlaying,
    setSelectedSong,
  } = SongData();

  const params = useParams();
  const { addToPlaylist } = UserData();

  useEffect(() => {
    fetchAlbumSong(params.id);
  }, [fetchAlbumSong, params.id]);

  const handlePlayClick = (id) => {
    setSelectedSong(id);
    setIsPlaying(true);
  };

  const handleSaveToPlaylist = (id) => {
    addToPlaylist(id);
  };

  // Default thumbnail image
  const defaultThumbnail = '/images/default-album.jpg';

  return (
    <Layout>
      {albumData ? (
        <>
          {/* Album Header */}
          <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
            <img
              src={albumData.thumbnail?.url || defaultThumbnail}
              className="w-48 rounded"
              alt={albumData.title}
              onError={(e) => {
                e.target.src = defaultThumbnail;
              }}
            />

            <div className="flex flex-col">
              <p className="text-gray-400">Playlist</p>
              <h2 className="text-3xl font-bold mb-4 md:text-5xl">
                {albumData.title || 'Untitled Album'}
              </h2>
              <h4 className="text-gray-300">
                {albumData.description || 'No description available'}
              </h4>
              <p className="mt-1">
                <img
                  src={assets.spotify_logo}
                  className="inline-block w-6"
                  alt="Spotify"
                />
              </p>
            </div>
          </div>

          {/* Songs List Header */}
          <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
            <p><b className="mr-4">#</b>Title</p>
            <p>Artist</p>
            <p className="hidden sm:block">Description</p>
            <p className="text-center">Actions</p>
          </div>

          <hr className="border-[#a7a7a7]" />

          {/* Songs List */}
          {albumSong.length > 0 ? (
            albumSong.map((song, index) => (
              <div
                className="grid grid-cols-3 sm:grid-cols-4 items-center py-4 px-2 hover:bg-[#ffffff2b] cursor-pointer rounded"
                key={song._id || index}
              >
                <div className="flex items-center gap-4">
                  <span className="text-[#a7a7a7] w-4">{index + 1}</span>
                  <img
                    src={song.thumbnail?.url || defaultThumbnail}
                    className="w-10 h-10 object-cover rounded"
                    alt={song.title}
                    onError={(e) => {
                      e.target.src = defaultThumbnail;
                    }}
                  />
                  <span className="text-white truncate">{song.title || 'Untitled Song'}</span>
                </div>

                <p className="text-[15px] truncate">
                  {song.singer || 'Unknown Artist'}
                </p>

                <p className="text-[15px] hidden sm:block truncate">
                  {song.description ? `${song.description.slice(0, 20)}...` : 'No description'}
                </p>

                <div className="flex justify-center items-center gap-5">
                  <button 
                    onClick={() => handleSaveToPlaylist(song._id)}
                    className="text-gray-400 hover:text-white transition"
                    aria-label="Save to playlist"
                  >
                    <FaBookmark />
                  </button>
                  <button
                    onClick={() => handlePlayClick(song._id)}
                    className="text-gray-400 hover:text-white transition"
                    aria-label="Play song"
                  >
                    <FaPlay />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 py-10">
              No songs found in this album
            </p>
          )}
        </>
      ) : (
        <p className="text-center text-gray-400 py-20">
          Loading album data...
        </p>
      )}
    </Layout>
  );
};

export default Album;