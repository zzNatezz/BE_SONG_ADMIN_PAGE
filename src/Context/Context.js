import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {io} from 'socket.io-client'

export const AppContext = createContext();

export const Contexts = ({ children }) => {
  const getSttLocal = JSON.parse(localStorage.getItem(`auth`));
  const localuserName = JSON.parse(localStorage.getItem("username"));
  const [pendingSongs, setPendingSongs] = useState([]); //<-- call pending son
  const [loading, setLoading] = useState(false); //status loading

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [adminName, setAdminName] = useState(localuserName);

  const [edit, setEdit] = useState(null); //<-- set editable cho title
  const [editTask, setEditTask] = useState(""); //<-- set editTask cho title

  const [editAuthor, setEditAuthor] = useState(null);
  const [editTaskAuthor, setEditTaskAuthor] = useState("");

  const [buttonIMG, setButtonIMD] = useState(null)

  const [arrForm, setArrForm] = useState()

  // changeStream in moongose http://localhost:3001
      const socket = io('https://be-song.vercel.app');
      socket.on('reload' ,  data =>{
        setLoading(!loading)
})

  //call pending song
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getData = await axios.get(
          "https://be-song.vercel.app/v1/songs/pending"
        );
        setPendingSongs(getData.data);
      } catch (error) {
        console.log(`Something went wrong`, error);
      }
    };
    fetchData();
  }, [loading]);

  //aproved status
  const approvedSong = async (songId) => {
    setLoading(true)
    try {
      await axios
        .put(`https://be-song.vercel.app/v1/songs/approved/${songId}`)
        .then(() => setLoading(false));
      alert("Thanh cong");
    } catch (error) {
      console.log(error);
    }
  };

  //reject status
  const rejectedSong = async (songId) => {
    setLoading(true)
    let isDelete = window.confirm('Bạn có thật mún xóa bài này không')
    if(isDelete){
        try {
        await axios
        .delete(`https://be-song.vercel.app/v1/songs/${songId}`)
        .then(() => setLoading(false));
        alert("Xóa Thanh cong");
      } catch (error) {
        console.log(error);
      }
    }
    
  };

  // check password and username
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://be-song.vercel.app/v1/auth/login", {
        username,
        password,
      });
      const decodeUser = jwtDecode(res?.data);
      if (decodeUser.admin === true) {
        localStorage.setItem(
          "username",
          JSON.stringify(decodeUser?.username || "admin")
        );
        localStorage.setItem("auth", JSON.stringify(res?.data));
        setUserName("");
        setPassword("");
        setIsLogin(true);
        setAdminName(JSON.parse(localStorage.getItem("username")));
        alert(`Dang nhap thanh cong`);
      } else {
        alert('Only accept admin')
         window.location.assign(`https://www.stave.icu`)
      };
    } catch (err) {
      setIsLogin(false);
      alert(err.message);
    }
  };

  //handle refesh page
  useEffect(() => {
    try {
      const toke = JSON.parse(localStorage.getItem("auth"));
      const decodeUser = jwtDecode(toke);
      if (!decodeUser) {
        setIsLogin(false);
      } else setIsLogin(true);
    } catch (error) {
      console.log(error);
      alert(`Don't try to hack me page :)`);
    }
  }, []);

  //Logout
  const handleLogout = () => {
    localStorage.setItem("username", JSON.stringify(""));
    localStorage.setItem("auth", JSON.stringify(""));
    setIsLogin(false);
  };

  //handle onInpt <-- handle input cho title and author
  const handleInput = (e) => {
    const currentName = e.target.value;
    setEditTask(currentName);
  };
  const handleInputAuthor = (e) => {
    const currentName = e.target.value;
    setEditTaskAuthor(currentName);
  };

  //handle btn ok <-- oke cho title and author and img
  const btn_ok_title = async (i) => {
    if (editTask === "") {
      alert(`Tên bài hát không thể để trống, vui lòng thử lại`);
      setEditTask(pendingSongs[i].title);
      setEdit(null);
    } else {
      pendingSongs[i].title = editTask;
      const songId = pendingSongs[i]._id;
      await axios.put(`https://be-song.vercel.app/v1/songs/title/${songId}`, {
        title: pendingSongs[i].title,
      });
      setEdit(null);
    }
  };

  const btn_ok_author = async (i) => {
    if (editTaskAuthor === "") {
      alert(`Tên bài hát không thể để trống, vui lòng thử lại`);
      setEditTaskAuthor(pendingSongs[i].author);
      setEditAuthor(null);
    } else {
      const songId = pendingSongs[i]._id;
      pendingSongs[i].author = editTaskAuthor;
      await axios.put(`https://be-song.vercel.app/v1/songs/author/${songId}`, {
        author: pendingSongs[i].author,
      });
      setEditAuthor(null);
    }
  };

  const btn_ok_img = async(item,e) =>{
    e.preventDefault()
    try {
      await axios.put(`https://be-song.vercel.app/v1/songs/img/${item._id}`,arrForm)
      .then(() => setButtonIMD(null)
      );
    } catch (error) {
      console.log(error);
    }
   }



  //handle Cancle <-- Cancle cho title and author and image
  const btn_cancle_title = (i) => {
    setEditTask(pendingSongs[i].title);
    setEdit(null);
  };

  const btn_cancle_author = (i) => {
    setEditTaskAuthor(pendingSongs[i].author);
    setEditAuthor(null);
  };

  const btn_cancle_img = async (e, item) => {
    e.preventDefault()
    const getSong = await axios.get("https://be-song.vercel.app/v1/songs/pending")
    const originalPic = getSong.data.find(i => i._id === item._id)
    item.image.url = originalPic.image.url
    setButtonIMD(null)
  }

  //const handle Edit single on map for title and author 
  const editEachElement = (index) => {
    setEdit(index);
  };
  const editEachElementAuthor = (index) => {
    setEditAuthor(index);
  };



  const uploadImg = (e, item, index) =>{
    e.preventDefault();
    const formData = new FormData();
    let processingImg = e.target.files[0];
    let previousPicture = [...item.image.url]; 
    formData.append('file', processingImg);
    
    if(e.target.files.length !== 0){
      processingImg.review = URL.createObjectURL(processingImg)
    }
    if(processingImg === undefined ){
      setButtonIMD(null)
      return processingImg = previousPicture.join('')
    }
    else{
      setButtonIMD(index)
      setArrForm(formData)
      return item.image.url = processingImg.review
    } 
    }



  const setEditImg = (e,i) => {
    e.preventDefault()
    document.getElementById(`getFile${i}`).click()
  }

  


  return (
    <AppContext.Provider
      value={{
        pendingSongs,
        setLoading,
        username,
        setUserName,
        password,
        setPassword,
        handleSubmit,
        adminName,
        isLogin,
        getSttLocal,
        approvedSong,
        rejectedSong,
        handleLogout,
        edit,
        setEdit,
        btn_ok_title,
        editTask,
        setEditTask,
        handleInput,
        btn_cancle_title,
        editEachElement,
        handleInputAuthor,
        btn_ok_author,
        editEachElementAuthor,
        btn_cancle_author,
        editAuthor,
        editTaskAuthor,
        uploadImg,buttonIMG,
       btn_cancle_img,setEditImg,btn_ok_img
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
