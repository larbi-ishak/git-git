
const consumeCommits = (dates) => {
  //creating a promise
    return new Promise((resolve,reject)=>{
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
    resolve(months)
    })
   
  }

  export default consumeCommits