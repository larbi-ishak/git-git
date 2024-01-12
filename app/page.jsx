"use client"
import React, { useState } from 'react';
import { Octokit } from 'octokit';
import dotenv from 'dotenv';

import { Chartcomp } from '../components/Chartcomp';
import consumeCommits from '../utils/consumeCommits'

const { config } = dotenv;
config();


export default function Home() {
  const [cosmic, setData] = useState({})
  const [repo, setRepo] = useState('')


  var dates = []
  async function fetchCommits() {
    // TODO: misses error handling here ,the user may type invalid url
    const owner_and_repo = repo.split("https://github.com/")[1];
    const token = process.env.GITHUB_TOKEN;
    const octokit = new Octokit({
      auth: token,
    })

    const res = await octokit.request(`GET https://api.github.com/repos/${owner_and_repo}/commits`, {
      headers: {
        'X-GitHub-Api-Version': `2022-11-28`
      }
    }).then(res => {

      res.data.forEach((other) => {
        let date = new Date(other?.commit?.author?.date)
        dates.push(date)
      })

    }).then(async () => {
      //calling the consume commits fonction from the utils file
      let res = await consumeCommits(dates)
      setData(res)
    })

  }

  //converting the cosmic object into keys
  const keys = Object.keys(cosmic)
  let labels = []
  let counts = []

  //retrieving the number of commits'counts' and months 'labels' 
  keys && keys.forEach((key, index) => {
    counts.push(cosmic[key].count)
    labels.push(index + 1)
  })

  //set the data object for the charjs library
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
      <h1>Home page</h1>
      <input type="text" placeholder='github repo url' value={repo} onChange={(e) => setRepo(e.target.value)} />

      <br />
      <button onClick={fetchCommits} >Fetch commits</button>

      <section className="mx-6">
        <Chartcomp data={data} repo={repo} />
      </section>
    </div>
  )
}
