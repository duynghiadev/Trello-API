import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService'

const createNew = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu sang tầng service
    const createdCard = await cardService.createNew(req.body)

    // Có kết quả thì trả về phía client
    res.status(StatusCodes.CREATED).json(createdCard)
  } catch (error) {
    next(error)
  }
}

export const cardController = {
  createNew
}
