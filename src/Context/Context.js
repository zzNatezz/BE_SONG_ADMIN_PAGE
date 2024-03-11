import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const Contexts = ({ children }) => {
  const [pendingSongs, setPendingSongs] = useState([]); //<-- call pending son
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);

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
    }; fetchData()
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

  return (
    <AppContext.Provider
      value={{
        updateApproved,
        pendingSongs,
        updateRejected,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
