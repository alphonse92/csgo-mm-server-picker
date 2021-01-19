/* eslint-disable no-console */
(async function () {
  const ping = require("ping");


  // console.log("sends a lot of pings")

  // const promises = [];
  // for (let i = 0; i < 500; i++) {
  //   promises.push(ping.promise.probe('172.217.2.110'));
  // }

  // Promise.all(promises)
  //   .then(results => {
  //     const success = []
  //     const failed = []
  //     for (const result of results) {
  //       const { alive } = result;
  //       if (alive) success.push(result)
  //       else failed.push(result)

  //     }
  //     console.log(`sucess: ${success.length} failed: ${failed.length}`)
  //     console.log(results[0])
  //     console.log(results[results.length-1])
  //   })

  async function asyncawait() {
    console.log("sends a lot of pings")
    const results = [];
    for (let i = 0; i < 500; i++) {
      const result = await ping.promise.probe('172.217.2.110');
      results.push(result);
    }
    console.log(results[0]);
    console.log(results[results.length - 1]);
  }

  asyncawait();

})()