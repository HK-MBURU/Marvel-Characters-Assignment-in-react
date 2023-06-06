import React from 'react'
import {useParams} from 'react-router-dom'
// import axios from 'axios';
import { useState } from 'react';
import {MD5}  from "crypto-js"
// import axios from "axios"
const API_URL=process.env.REACT_APP_BASE_URL

const getHash=(ts,secretKey,publicKey)=>{
  return MD5(ts+secretKey+publicKey).toString()
}
export const Marvel = () => {
  const {id}=useParams();
  const [item,setItem]=useState()
  const fetch=async(value)=>{
    // start
    try{
      let baseUrl = `${API_URL}/v1/public/characters`;

    let ts = Date.now().toString();
    let apiKey = process.env.REACT_APP_API_KEY;
    let privateKey = process.env.REACT_APP_PRIVATE_KEY;
    let hash = getHash(ts, privateKey, apiKey);

    let url = `${baseUrl}?ts=${ts}&apikey=${apiKey}&hash=${hash}&nameStartsWith=${value}`;

        let response=await fetch(url)
        let data=await response.json()
        // console.log(data.data.results);
        setItem(data.data.results[0]);
        

    }catch(err){
        console.error(err);
        
    }

    // end
    // const res=await axios.get(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=2e1cdeec426ae323484f29024084c206&hash=d516513ba95b9407c7aca0f73b241f8a`)
    // setItem(res.data.data.results[0])
  }
  React.useEffect(()=>{
    fetch('your-value-here')
  },[])
  // fetch();
  return (
    <>
    {
      (!item)? "":(
        <div className="box-content">
          <div className="right-box">
          <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt="" />
          </div>
          <div className="left-box">
            <h1>{item.name}</h1>
            <h4>{item.description}</h4>
          </div>
        </div>
      )
    }
    </>
  )
}
