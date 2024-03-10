import axios from "axios";
import React, { createContext, useEffect, useState } from "react";


export const AppContext = createContext();

export const Contexts = ({ children }) => {
    const [pendingSongs, setPendingSongs] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getData = await axios.get('https://be-song.vercel.app/v1/songs');
                const allSong = getData.data.allSong.filter((song) => song.status === 'pending');
                setPendingSongs(allSong);
                console.log(allSong);
            } 
            catch (error) 
            {
                console.log(`Something went wrong`, error)
            }
        }; fetchData();
    }, []);

    return (
        <AppContext.Provider
            value={{
                pendingSongs,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}