import React, { useContext } from "react";
import "./Notice.scss";
import { AppContext } from "../../../../Context/Context";

function Notice() {
  const {
    pendingSongs,
    approvedSong,
    rejectedSong,
    edit,
    setEdit,
    btn_ok_title ,
    handleInput,
    editTask,
    btn_cancle_title,
  } = useContext(AppContext);
  return (
    <div className="notice-main-container">
      {pendingSongs.map((item, index) => (
        <div className="notice-container" key={index}>
          <div className="notice-content">
            <div className="notice-title-container">
              <h2 className="notice-title">
                Song : {
                  edit === false ?
                  <span className="notice-title">{item.title}</span> 
                  :
                  <input
                  className="notice-title-input" 
                  onChange={(e) => handleInput(e)}
                  value={editTask} />
                }
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
                onClick={() => btn_ok_title (index, item.title)}
                className="btn-ok"
              >
                OK
              </button>
              <button
                onClick={() => btn_cancle_title(index)}
                className="btn-cancle"
              >
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
