"use client"
import React, { useState } from 'react';
import dotenv from 'dotenv';
import { Octokit } from 'octokit';
import consumeCommits from '../components/consumeCommits'
import { Chartcomp } from '../components/Chartcomp';
const { config } = dotenv;
config();


export default function Home() {
  const [cosmic, setData] = useState({})
  
  var dates=[]
  async function doIT() {
    

   const token = process.env.GITHUB_TOKEN;
    const octokit=new Octokit({
      auth:token,
    })
    
    const res=await octokit.request('GET https://api.github.com/repos/larbi-ishak/bioPro/commits',{
      
      headers:{
        'X-GitHub-Api-Version':`2022-11-28`
      }
    }).then(res=>{
    
      res.data.forEach((other) => {
        let date=new Date(other?.commit?.author?.date)
        dates.push(date)
      })
      
    }).then(async ()=>{
      //calling the consume commits fonction from the components file
      let res=await consumeCommits(dates)
     setData(res)
    })
    
    
   
    

    // fetch(url, {
    //   method: 'GET', // Replace with the appropriate HTTP method (GET, POST, PUT, DELETE, etc.)
      
    // })
    //   .then(response => {
    //     console.log(response)
    //     // Handle the response
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok.');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     // Handle the data returned by the server
    //     console.log(data[0]?.commit?.author?.date);

    //     // append commits dates to the dates array 
    //     data.forEach((other) => {
    //       dates.push(new Date(other?.commit?.author?.date))
    //     })

    //     consumeCommits()
    //   })
    //   .catch(error => {
    //     // Handle any errors during the fetch request
    //     console.error('There was a problem with the fetch operation:', error);
    //   });

    

  }
  const keys=Object.keys(cosmic)
  let labels=[]
  let counts=[]
  keys&&keys.forEach((key,index)=>{
    counts.push(cosmic[key].count)
    labels.push(index+1)
  })
   const data = {
    labels,
    datasets: [
      {
        label: 'commits',
        data: counts,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      
    ],
  };
  return (
    <div>
      
      <button onClick={doIT} >button</button>
      <br />
      <br />
      Home page
      <Chartcomp don={data} />
      </div>
  )
}
