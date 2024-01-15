"use client"
import Image from 'next/image'
import React, { useState } from 'react';
import { Octokit } from 'octokit';
import dotenv from 'dotenv';
import { useEffect } from 'react';
import html2canvas from 'html2canvas';
import { toPng } from 'dom-to-image';

import { Chartcomp } from '../components/Chartcomp';
import consumeCommits from '../utils/consumeCommits'

const { config } = dotenv;
config();

export default function Home() {
  const [cosmic, setData] = useState({})
  const [repo, setRepo] = useState('')
  const [img, setImg] = useState(false)
  const [src, setImgSrc] = useState("")

  var dates = []
  async function fetchCommits() {
    // TODO: misses error handling here ,the user may type invalid url
    const owner_and_repo = repo.split("https://github.com/")[1];
    const token = process.env.GITHUB_TOKEN;
    const octokit = new Octokit({
      auth: token,
    })
    setTimeout(() => {

      const node = document.getElementById('my-element');

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = node.clientWidth;
      canvas.height = node.clientHeight;
      ctx.drawImage(node, 0, 0);
      const dataURL = canvas.toDataURL(); // data:image/png;base64,...,...
      setImg(true)
      setImgSrc(dataURL)
    }, 3000);
    // const takeScreenshot = async () => {
    //   const dataURL = await toPng(document.body).then(function(dataUrl) {
    //     var img = new Image();
    //     img.src = dataUrl;
    //     document.body.appendChild(img);
    //   })
    //     .catch(function(error) {
    //       console.error('oops, something went wrong!', error);
    //     });
    //   // dataURL is the base64 encoded screenshot
    // }
    //
    // takeScreenshot();
    // html2canvas(document.body, { width: 340 }).then((canvas) => {
    //   document.body.appendChild(canvas);
    //   let img = new Image();
    //   img.src = canvas.toDataURL();
    //
    //   document.body.appendChild(img);
    // });

    const res = await octokit.request(`GET https://api.github.com/repos/${owner_and_repo}/commits`, {
      headers: {
        'X-GitHub-Api-Version': `2022-11-28`
      },
      since: '2021-01-01T00:00:00Z',
      // unitl: '2021-12-31T23:59:59Z',
      per_page: 100, // max commits per page
      page: 800, // 800th page HACK: we should use pagination instead
    }).then(res => {
      console.log("res", res)
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
        <Chartcomp data={data} repo={repo} id={'my-element'} />
      </section>
      {img ? <Image alt={"nothing"} className="p-4 m-6" src={src} height={1900} width={1900} /> : null}
    </div>
  )
}
