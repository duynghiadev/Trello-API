import { slugify } from '~/utils/formatters'

const createNew = async (reqBody) => {
  try {
    // Xử lý logic dữ liệu tùy đặc thù dự án
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    // Gọi tới tầng Model để xử lý lưu bản ghi newBoard vào trong Database
    // ...

    // Làm thêm các xử lý logic khác với các Collection khác tùy đặc thù dự án...v.v
    // Bắn email, notification về cho admin khi có 1 cái board mới được tạo...v.v

    // Trả kết quả về, trong Service luôn phải có return
    return newBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew
}
