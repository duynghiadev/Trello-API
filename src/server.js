import express from 'express'
import { CONNECT_DB, GET_DB } from './config/mongodb'

const START_SERVER = () => {
  const app = express()

  const hostname = 'localhost'
  const port = 8017

  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(
      `3. Hello Duy Nghia Dev, Back-end Server is running successfully at host: ${hostname} and port: ${port}/`
    )
  })
}

// Chỉ khi kết nối tới database thành công thì mới start server back-end lên (solution 1 ✅)
// Immediately-invoked/Anonymous Async Functions (IIFE => Immediately Invoked Function Expression). Đọc tham khảo thêm ở đây: https://developer.mozilla.org/en-US/docs/Glossary/IIFE
;(async () => {
  try {
    console.log('1. Connecting to MongoDB Cloud Atlas...')
    await CONNECT_DB()
    console.log('2. Connecting to MongoDB Cloud Atlas...')

    // Khởi động server back-end sau khi connect database thành công
    START_SERVER()
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
})()

// Chỉ khi kết nối tới database thành công thì mới start server back-end lên (solution 2 ✅)
// console.log('1. Connecting to MongoDB Cloud Atlas...')
// CONNECT_DB()
//   .then(() => console.log('2. Connecting to MongoDB Cloud Atlas...'))
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.log(error)
//     process.exit(0)
//   })
