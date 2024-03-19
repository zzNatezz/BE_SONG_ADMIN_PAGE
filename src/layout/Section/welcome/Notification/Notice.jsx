import React, { useContext } from "react";
import "./Notice.scss";
import { AppContext } from "../../../../Context/Context";

function Notice() {
  const {
    pendingSongs,
    approvedSong,
    rejectedSong,
    edit,
    editAuthor,
    btn_ok_title,
    btn_ok_author,
    handleInput,
    handleInputAuthor,
    editTask,
    editTaskAuthor,
    btn_cancle_title,
    btn_cancle_author,
    editEachElement,
    editEachElementAuthor,
  } = useContext(AppContext);
  return (
    <div className="notice-main-container">
      {pendingSongs.map((item, index) => (
        <div className="notice-container" key={index}>
          <div className="notice-content">
            <div className="notice-title-container">
              <h2 className="notice-title">
                Song :
                {edit === index ? (
                  <input
                    className="notice-title-input"
                    onChange={(e) => handleInput(e)}
                    value={editTask}
                  />
                ) : (
                  <span className="notice-title">{item.title}</span>
                )}
              </h2>
              <button
                onClick={() => editEachElement(index)}
                className="btn-edit-1"
              >
                Edit
              </button>
            </div>
            <div
              className={
                edit === index ? "notice-layout-button" : "hide-button"
              }
            >
              <button onClick={() => btn_ok_title(index)} className="btn-ok">
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
              <h3 className="notice-author">
                Artist :
                {editAuthor === index ? (
                  <input
                    className="notice-author-input"
                    onChange={(e) => handleInputAuthor(e)}
                    value={editTaskAuthor}
                  />
                ) : (
                  <span>{item.author}</span>
                )}
              </h3>
              <button
                onClick={() => editEachElementAuthor(index)}
                className="btn-edit-02"
              >
                
                Edit
              </button>
            </div>
            <div
              className={
                editAuthor === index ? "notice-layout-button" : "hide-button"
              }
            >
              <button
                onClick={() => btn_ok_author(index)}
                className="btn-ok"
              >
                
                OK
              </button>
              <button
                onClick={() => btn_cancle_author(index)}
                className="btn-cancle"
              >
                
                Cancle
              </button>
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
