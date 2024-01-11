"use client"
import React, { useState } from 'react';
import dotenv from 'dotenv';
const { config } = dotenv;
config();


export default function Home() {
  const [cosmic, setData] = useState(null)

  function doIT() {


    const url = 'https://api.github.com/repos/larbi-ishak/bioPro/commits';
    const token = process.env.GITHUB_TOKEN;

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('X-GitHub-Api-Version', `2022-11-28`);

    let dates = []

    fetch(url, {
      method: 'GET', // Replace with the appropriate HTTP method (GET, POST, PUT, DELETE, etc.)
      headers: headers,
    })
      .then(response => {
        // Handle the response
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then(data => {
        // Handle the data returned by the server
        console.log(data[0]?.commit?.author?.date);

        // append commits dates to the dates array 
        data.forEach((other) => {
          dates.push(new Date(other?.commit?.author?.date))
        })

        consumeCommits()
      })
      .catch(error => {
        // Handle any errors during the fetch request
        console.error('There was a problem with the fetch operation:', error);
      });

    const consumeCommits = () => {
      console.log("dates", dates)
      const total_commits = dates.length
      const first_commit = dates[dates.length - 1]
      const last_commit = dates[0]

      console.log("first commit", first_commit)
      console.log("last commit", last_commit)

      const convertUnit = 1000 * 60 * 60 * 24 // ms * second * minute * hour  a day
      const days_number_between_last_first = Math.floor((last_commit - first_commit) / convertUnit)

      console.log(days_number_between_last_first, "Days between the first and the last commit")


      const months = {
        1: {
          count: 0,
          commits: []
        },
        2: {
          count: 0,
          commits: []
        },
        3: {
          count: 0,
          commits: []
        },
        4: {
          count: 0,
          commits: []
        },
        5: {
          count: 0,
          commits: []
        },
        6: {
          count: 0,
          commits: []
        },
        7: {
          count: 0,
          commits: []
        },
        8: {
          count: 0,
          commits: []
        },
        9: {
          count: 0,
          commits: []
        },
        10: {
          count: 0,
          commits: []
        },
        11: {
          count: 0,
          commits: []
        },
        12: {
          count: 0,
          commits: []
        },
      }

      dates.map((date) => {
        let month = date.getMonth() + 1
        months[month].commits.push(date)
        months[month].count += 1
      })
      console.log(months)
      console.log((months[7].count / total_commits * 100).toFixed(2), "%")

      setData(dates)
    }

  }


  return (
    <div>
      {true && JSON.parse(cosmic)}
      <button onClick={doIT} >button</button>
      <br />
      <br />
      Home page</div>
  )
}
