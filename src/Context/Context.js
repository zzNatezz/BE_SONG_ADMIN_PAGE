import axios from "axios";
import React, { createContext, useEffect, useState } from "react"; 
import { usePrevious } from "@uidotdev/usehooks";

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
  const [edit , setEdit] = useState(false) //<-- set editable
  const [editTask, setEditTask] = useState('')
  const previousValue = usePrevious(editTask)

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
      ); console.log(res?.data?.username);
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

  //handle onInpt
  const handleInput = (i,e) => {
     pendingSongs[i].title = e.target.value;
      setEditTask(pendingSongs[i].title)
  }


  //handle btn ok
  // const handling_oke_button = (i) => {
  //   editTask === "" ? setEdit(false) : pendingSongs[i].title = editTask && setEdit(false)
  // }
  const handling_oke_button = (i) => {
    if(editTask === ""){

      alert(`Title can't be empty`)
      console.log(previousValue);
      setEdit(false)
    }
    else{
      pendingSongs[i].title = editTask ;
      setEdit(false)
    }
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
        handling_oke_button,
        editTask, setEditTask,handleInput
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
