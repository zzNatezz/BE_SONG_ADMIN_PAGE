import axios from "axios";
import React, { createContext, useEffect, useState } from "react"; 

export const AppContext = createContext();

export const Contexts = ({ children }) => {
  const getSttLocal = JSON.parse(localStorage.getItem(`isLogin`));
  const localuserName = JSON.parse(localStorage.getItem('username'));
  const [pendingSongs, setPendingSongs] = useState([]); //<-- call pending son
  const [loading, setLoading] = useState(false); //status loading

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(getSttLocal)
  const [adminName , setAdminName] = useState(localuserName);

  const [edit , setEdit] = useState(false) //<-- set editable cho title
  const [editTask, setEditTask] = useState("") ; //<-- set editTask cho title

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
  const approvedSong = async(songId) =>{
    try {
      await axios.put(`https://be-song.vercel.app/v1/songs/approved/${songId}`).then(()=>setLoading(true))
      alert('Thanh cong')
      
    } catch (error) {
      console.log(error);
    }
  }

  //reject status
  const rejectedSong = async(songId) =>{
    try {
      await axios.put(`https://be-song.vercel.app/v1/songs/rejected/${songId}`)
      setLoading(true)
      alert('Thanh cong')
    } catch (error) {
      console.log(error);
    }
  }

  // check password and username
  const handleSubmit = async (e) =>{
    e.preventDefault();
    //'https://be-song.vercel.app/v1/auth/login'
    try {
      const res = await axios.post('https://be-song.vercel.app/v1/auth/login',
      ({username , password})
      );
      if(res?.data?.admin){
        localStorage.setItem('username',JSON.stringify(res?.data?.username || 'admin'))
        localStorage.setItem('isLogin',JSON.stringify(true))
        setUserName('');
        setPassword('')
        setIsLogin(JSON.parse(localStorage.getItem('isLogin')));
        setAdminName(JSON.parse(localStorage.getItem('username')));
        alert(`Dang nhap thanh cong`)
     }
      else throw new Error(`Chỉ có admin mới được quyền truy cập`)
    } catch (err) {
        setIsLogin(localStorage.setItem('isLogin', JSON.stringify(false)))
        alert(err.message)
    }
  }

  //Logout
  const handleLogout = () =>{
     localStorage.setItem('username', JSON.stringify(''))
     localStorage.setItem('isLogin', false)
     setIsLogin(false)
    
  }

  //handle onInpt <-- handle input cho title
  const handleInput = (e) => {
    const currentName = e.target.value
    setEditTask(currentName)
  }


  //handle btn ok <-- oke cho title
  const btn_ok_title = (i) => {
    if(editTask === ""){
      alert(`Tên bài hát không thể để trống, vui lòng thử lại`)
      setEditTask(pendingSongs[i].title); 
      setEdit(false)
    }
    else{
      pendingSongs[i].title = editTask ;
      setEdit(false)
    }

  }

  //handle Cancle <-- Cancle cho title
  const btn_cancle_title = (i) =>{
    setEditTask(pendingSongs[i].title)
    setEdit(false) 
  }
  
  //const handle Edit single on map
  const editEachElement = () => {
 
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
        approvedSong, rejectedSong,
        handleLogout,
        edit, setEdit,
        btn_ok_title,
        editTask, setEditTask, handleInput,
        btn_cancle_title
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
