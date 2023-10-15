import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu sang tầng service
    // Có kết quả thì trả về phía client
    res.status(StatusCodes.CREATED).json({
      message: 'POST from controller: API create new board'
    })
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew
}
