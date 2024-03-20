import axios from "axios";
import React, { createContext, useEffect, useState } from "react"; 
import { jwtDecode} from 'jwt-decode'

export const AppContext = createContext();

export const Contexts = ({ children }) => {
  const getSttLocal = JSON.parse(localStorage.getItem(`auth`));
  const localuserName = JSON.parse(localStorage.getItem('username'));
  const [pendingSongs, setPendingSongs] = useState([]); //<-- call pending son
  const [loading, setLoading] = useState(false); //status loading

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [adminName , setAdminName] = useState(localuserName);

  const [edit , setEdit] = useState(null) //<-- set editable cho title
  const [editTask, setEditTask] = useState("") ; //<-- set editTask cho title

  const [editAuthor, setEditAuthor] = useState(null);
  const [editTaskAuthor, setEditTaskAuthor] = useState("")

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
    try {
      const res = await axios.post('https://be-song.vercel.app/v1/auth/login',
      ({username , password})
      );
      const decodeUser = jwtDecode(res?.data);
      if(decodeUser){
        localStorage.setItem('username',JSON.stringify(decodeUser?.username || 'admin'))
        localStorage.setItem('auth',JSON.stringify(res?.data))
        setUserName('');
        setPassword('')
        setIsLogin(true);
        setAdminName(JSON.parse(localStorage.getItem('username')));
        alert(`Dang nhap thanh cong`)
     }
      else throw new Error(`Get out of my page before I call 113 :)`)
    } catch (err) {
        setIsLogin(false)
        alert(err.message)
    }
  }

  //handle refesh page
  useEffect (() =>{
    try {
      const toke = JSON.parse(localStorage.getItem('auth'))
      const decodeUser= jwtDecode(toke)
      if(!decodeUser) {
        setIsLogin(false);
      }
      else setIsLogin(true) 
    } catch (error) {
      console.log(error);
      alert(`Don't try hack me page :)`)
    }
  }, [])

  //Logout
  const handleLogout = () =>{
     localStorage.setItem('username', JSON.stringify(''))
     localStorage.setItem('auth', JSON.stringify(''))
     setIsLogin(false)
  }

  //handle onInpt <-- handle input cho title and author
  const handleInput = (e) => {
    const currentName = e.target.value
    setEditTask(currentName)
  }
  const handleInputAuthor = (e) => {
    const currentName = e.target.value
    setEditTaskAuthor(currentName)
  }

  //handle btn ok <-- oke cho title and aiuthro
  const btn_ok_title = (i) => {
    if(editTask === ""){
      alert(`Tên bài hát không thể để trống, vui lòng thử lại`)
      setEditTask(pendingSongs[i].title); 
      setEdit(null)
    }
    else{
      pendingSongs[i].title = editTask ;
      setEdit(null)
    }
  }

  const btn_ok_author = (i) => {
    if(editTaskAuthor === ""){
      alert(`Tên bài hát không thể để trống, vui lòng thử lại`)
      setEditTaskAuthor(pendingSongs[i].author); 
      setEditAuthor(null)
    }
    else{
      pendingSongs[i].author = editTaskAuthor ;
      setEditAuthor(null)
    }

  }

  //handle Cancle <-- Cancle cho title and author
  const btn_cancle_title = (i) =>{
    setEditTask(pendingSongs[i].title)
    setEdit(null) 
  }

  const btn_cancle_author = (i) =>{
    setEditTaskAuthor(pendingSongs[i].author)
    setEditAuthor(null) 
  }
  

  //const handle Edit single on map for title and author
  const editEachElement = (index) => {
    setEdit(index)
  }   
  const editEachElementAuthor = (index) => {
    setEditAuthor(index)
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
        btn_cancle_title,
        editEachElement,
        handleInputAuthor,btn_ok_author,
        editEachElementAuthor,
        btn_cancle_author,editAuthor,editTaskAuthor
      }}
    >
      {children}
    </AppContext.Provider>
  );  
};
