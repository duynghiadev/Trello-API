import express from 'express'
import exitHook from 'async-exit-hook'
import { CLOSE_DB, CONNECT_DB } from '~/config/mongodb'
import { env } from './config/environment'
import { APIs_V1 } from './routes/v1'

const START_SERVER = () => {
  const app = express()

  app.use('/v1', APIs_V1)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(
      `3. Hello ${env.AUTHOR}, Back-end Server is running successfully at host: ${env.APP_HOST} and port: ${env.APP_PORT}/`
    )
  })

  // Thực hiện các tác vụ cleanup trước khi dừng server
  // Đọc thêm ở đây: https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
  exitHook(() => {
    console.log('4. Server is shutting down...')
    CLOSE_DB()
    console.log('5. Disconnecting from MongoDB Cloud Atlas...')
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
