import React, { useContext } from "react";
import "./Notice.scss";
import { AppContext } from "../../../../Context/Context";

function Notice() {
  const { pendingSongs, approvedSong, rejectedSong, edit, setEdit, handling_oke_button, handleInput} =
    useContext(AppContext);
  return (
    <div className="notice-main-container">
      {pendingSongs.map((item, index) => (
        <div className="notice-container" key={index}>
          <div className="notice-content">
            <div className="notice-title-container">
              <h2 className="notice-title">
                Song :
                <span
                  contentEditable={edit === false ? false : true}
                  className={
                    edit === false ? "notice-title" : "notice-editable"
                  }
                  onInput={e => handleInput(index,e)}
                >
                  {item.title}
                </span>
              </h2>
              <button onClick={() => setEdit(true)} className="btn-edit-1">
                  Edit
              </button>
            </div>
            <div
              className={
                edit === false ? "hide-button" : "notice-layout-button"
              }
            >
              <button
               onClick={() => handling_oke_button(index)}
               className="btn-ok"> OK </button>
              <button 
              onClick={() => setEdit(false)} className="btn-cancle">
                Cancle
              </button>
            </div>

            <div className="notice-author-container">
              <h3 className="notice-author">Artist : {item.author}</h3>
              <button className="btn-edit-02"> Edit </button>
            </div>
            <div className="notice-layout-button">
              <button className="btn-ok"> OK </button>
              <button className="btn-cancle"> Cancle </button>
            </div>

            <img className="notice-img" src={item.image.url} alt="img" />
            <audio className="notice-audio" controls>
              <source src={item.song.url} type="audio/mpeg" />
            </audio>
          </div>
          <div className="notice-button">
            <button onClick={() => approvedSong(item._id)}> Approve </button>
            <button onClick={() => rejectedSong(item._id)}> Reject </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notice;
