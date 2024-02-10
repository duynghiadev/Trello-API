import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    // Xử lý logic dữ liệu tùy đặc thù dự án
    const newCard = {
      ...reqBody
    }
    // Gọi tới tầng Model để xử lý lưu bản ghi newCard vào trong Database
    const createdCard = await cardModel.createNew(newCard)
    console.log(createdCard)

    // Lấy bản ghi card sau khi gọi (tùy mục đích dự án mà có cần bước này hay không)
    const getNewCard = await cardModel.findOneById(createdCard.insertedId)
    console.log(getNewCard)

    if (getNewCard) {
      // Cập nhật mảng columnOrderIds trong collection boards
      await columnModel.pushCardOrderIds(getNewCard)
    }

    // Làm thêm các xử lý logic khác với các Collection khác tùy đặc thù dự án...v.v
    // Bắn email, notification về cho admin khi có 1 cái card mới được tạo...v.v

    // Trả kết quả về, trong Service luôn phải có return
    return getNewCard
  } catch (error) {
    throw error
  }
}

export const cardService = {
  createNew
}
