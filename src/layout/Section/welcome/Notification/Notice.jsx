import React, { useContext } from "react";
import "./Notice.scss";
import { AppContext } from "../../../../Context/Context";


function Notice() {
  const { pendingSongs,} = useContext(AppContext)
  return (
    <div className="notice-main-container">
      {pendingSongs.map((item, index) => (
        <div className="notice-container" key={index}>
          <div className="notice-content">
            <h2 className="notice-title">Song : {item.title}</h2>
            <h3 className="notice-author">Artist : {item.author}</h3>
            <img className="notice-img" src={item.image.url} alt="img" />
            <audio className="notice-audio" controls>
              <source src={item.song.url} type="audio/mpeg" />
            </audio>
          </div>
          <div className="notice-button">
            <button> Approve </button>
            <button> Cancle </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notice;
