import React,{useState,useEffect} from "react"
import { Card } from "./Card"
// import axios from "axios"
// import { useState } from "react"
// import { useEffect } from "react"

import {MD5}  from "crypto-js"
// import axios from "axios"
const API_URL=process.env.REACT_APP_BASE_URL

const getHash=(ts,secretKey,publicKey)=>{
  return MD5(ts+secretKey+publicKey).toString()
}

export const Main = () => {
  // const [url,setUrl]=useState(url)
  const [item,setItem]=useState();
  const [search,setSearch]=useState("");
  useEffect(()=>{
    const fetchData=async(value)=>{
      // fetch
      try{
      let baseUrl = `${API_URL}/v1/public/characters`;

    let ts = Date.now().toString();
    let apiKey = process.env.REACT_APP_API_KEY;
    let privateKey = process.env.REACT_APP_PRIVATE_KEY;
    let hash = getHash(ts, privateKey, apiKey);

    let url = `${baseUrl}?ts=${ts}&apikey=${apiKey}&hash=${hash}&nameStartsWith=${value}`;


      // end
      // fetch
      // let response=await axios.get(url)
        let response=await fetch(url)
        let data=await response.json()
        // console.log(data.data.results);
        setItem(data.data.results);
        

    }catch(err){
        console.error(err);
        
    }

      // end fetch


      // const res=await axios.get(url)
      
    }
    fetchData(search);
  },[search])
  
  const handleSearch=(e)=>{
    if (e.key==="Enter") {
      setSearch(e.target.value)
      
    }
    // setUrl(url)
  }

  return (
    <>
        <div className="header">
            <div className="bg">
                <img src="./Images/bg.jpeg" alt="" />
            </div>
            <div className="search-bar">
                {/* <img src="./Images/logo.jpg" alt="logo" /> */}
                <input type="search" placeholder='Search Here'
                 className='search'
                 onChange={e=>setSearch(e.target.value)}
                 onKeyPress={handleSearch}/>
            </div>
        </div>
       <div className="content">
         
        {
          (!item)?<p>Not Found</p>:<Card data={item}/>
        }
       </div>
    </>
  )
}
