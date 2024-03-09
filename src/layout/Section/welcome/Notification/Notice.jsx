import React from "react";
import "./Notice.scss";
import SongDB from "../../../../localStorage/SongDB";

function Notice() {
  return (
    <div className="notice-main-container">
      {SongDB.map((item, index) => (
        <div className="notice-container" key={index}>
          <div className="notice-content">
            <h2 className="notice-title">Song Name : {item.title}</h2>
            <h3 className="notice-author">Artist : {item.author}</h3>
            <img className="notice-img" src={item.imagine} alt="img" />
            <audio className="notice-audio" controls>
              <source src={item.song} type="audio/mpeg" />
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
