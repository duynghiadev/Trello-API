import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    // Xử lý logic dữ liệu tùy đặc thù dự án
    const newColumn = {
      ...reqBody
    }
    // Gọi tới tầng Model để xử lý lưu bản ghi newColumn vào trong Database
    const createdColumn = await columnModel.createNew(newColumn)
    console.log(createdColumn)

    // Lấy bản ghi column sau khi gọi (tùy mục đích dự án mà có cần bước này hay không)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)
    console.log(getNewColumn)

    // ...

    // Làm thêm các xử lý logic khác với các Collection khác tùy đặc thù dự án...v.v
    // Bắn email, notification về cho admin khi có 1 cái column mới được tạo...v.v

    // Trả kết quả về, trong Service luôn phải có return
    return getNewColumn
  } catch (error) {
    throw error
  }
}

export const columnService = {
  createNew
}
