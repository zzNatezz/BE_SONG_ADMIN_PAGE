import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const Contexts = ({ children }) => {
  const [pendingSongs, setPendingSongs] = useState([]); //<-- call pending son
  const [loading, setLoading] = useState(false); //status loading
  const [approved, setApproved] = useState([]); //aproved song
  const [rejected, setRejected] = useState([]); //rejected song
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false)
  const [adminName , setAdminName] = useState('')
  

  const updateApproved = (item) => {
    setLoading(true);
    setApproved(item);
  };
  const updateRejected = (item) => {
    setLoading(true);
    setRejected(item);
  };

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
  useEffect(() => {
    async function fetchData() {
      try {
        await axios.put(
          `https://be-song.vercel.app/v1/songs/approved/${approved}`
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    if (loading) {
      fetchData();
    }
  }, [loading]);

  //reject status
  useEffect(() => {
    async function fetchData() {
      try {
        await axios.put(
          `https://be-song.vercel.app/v1/songs/rejected/${rejected}`
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    if (loading) {
      fetchData();
    }
  }, [loading]);

  // check password and username
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const res = await axios.post('https://be-song.vercel.app/v1/auth/login',
      ({username , password})
      );
      if(res?.data?.admin){
        setUserName('');
        setPassword('')
        setIsLogin(true);
        setAdminName(res?.data?.username);
        alert(`Dang nhap thanh cong`)
     }
      else throw new Error(`Chỉ có admin mới được quyền truy cập`)
    } catch (err) {
        setIsLogin(false)
        alert(err.message)
    }
  }
  
 
  return (
    <AppContext.Provider
      value={{
        updateApproved,
        pendingSongs,
        updateRejected,
        setLoading,
        username,
        setUserName,
        password,
        setPassword,
        handleSubmit,
        adminName
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
