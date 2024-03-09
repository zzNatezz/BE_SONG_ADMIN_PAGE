import axios from "axios";
import React, { createContext, useState } from "react";


export const AppContext = createContext();

export const Contexts = ({children}) => {
    const allPendingSong = axios.get('https://be-song.vercel.app/v1/songs')
    
    const [listPendingSong, uploadPendingSong] = useState(allPendingSong);
    const [loading, setLoading] = useState(false)

    const isPending = async () =>{
        const song =  await axios.get('https://be-song.vercel.app/v1/songs')
        const allSong = song.data.allSong;
        const pendingSong = allSong.filter(item => item.status === 'pending')
        console.log(pendingSong);
    }

    return (
        <AppContext.Provider
        value={{
            isPending
        }}
        >
            {children}
        </AppContext.Provider>
    )
}