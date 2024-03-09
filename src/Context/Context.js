import axios from "axios";
import React, { createContext, useEffect, useState } from "react";


export const AppContext = createContext();

export const Contexts = ({children}) => {
    const [listPendingSong, setPendingSong] = useState([]);
    const [loading, setLoading] = useState(false)

    const isPending = async () =>{
        
        // const song =  await axios.get('https://be-song.vercel.app/v1/songs')
        // const allSong = song.data.allSong;
        // const pendingSong = allSong.filter(item => item.status === 'pending')
        console.log(`pendingSong`);
    }

    // useEffect( ()=> {
    //     async function fetchData (){
    //     const getAPI = axios.get('https://be-song.vercel.app/v1/songs');
    //     const allSong = getAPI.data.allSong;
    //     const pendingSong = allSong.filter(item => item.status === 'pending')
    //     setPendingSong(pendingSong);
    //     console.log(pendingSong);
    // }

    // },[])

    return (
        <AppContext.Provider
        value={{
            isPending,
            listPendingSong,
        }}
        >
            {children}
        </AppContext.Provider>
    )
}