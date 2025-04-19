/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React from "react";
import Layout from "../components/Layout";
import { SongData } from "../context/Song";
import AlbumItem from "../components/AlbumItem";
import SongItem from "../components/SongItem";

const Home = () => {
  const { songs, albums } = SongData();
  
  // Default thumbnail image
  const defaultThumbnail = '/default-thumbnail.jpg';

  return (
    <Layout>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {albums?.map((album, i) => (
            <AlbumItem
              key={album._id || i}
              image={album.thumbnail?.url || defaultThumbnail}
              name={album.title}
              desc={album.description}
              id={album._id}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
        <div className="flex overflow-auto">
          {songs?.map((song, i) => (
            <SongItem
              key={song._id || i}
              image={song.thumbnail?.url || defaultThumbnail}
              name={song.title}
              desc={song.description}
              id={song._id}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;