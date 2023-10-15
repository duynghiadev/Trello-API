import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  /**
   * - Note: Mặc định chúng ta không cần phải custom message ở phía BE làm gì vì để cho Front-end tự validate và
   * custom message ở phía FE cho đẹp.
   * - Back end chỉ cần validate đảm bảo dữ liệu chuẩn xác, và trả về message mặc định từ thư viện là được.
   * - Quan trọng: việc validate dữ liệu bắt buộc phải có ở phía Back-end vì đây là điểm cuối để lưu trữ dữ liệu
   * vào database.
   * - Và thông thường trong thực tế, điều tốt nhất cho hệ thống là hãy luôn validate dữ liệu ở cả Back-end và
   * Front-end nhé.
   */
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required (duynghiadev)',
      'string.empty': 'Title is not allowed to be empty (duynghiadev)',
      'string.min': 'Title length must be at least 3 characters long (duynghiadev)',
      'string.max': 'Title length must be less than or equal to 5 characters long (duynghiadev)',
      'string.trim': 'Title must not have leading or trailing whitespace (duynghiadev)'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    // Chỉ định abortEarly: false để trường hợp có nhiều lỗi validation thì trả về tất cả lỗi (video 52)
    await correctCondition.validateAsync(req.body, {
      abortEarly: false
    })
    // Validate dữ liệu xong xuôi hợp lệ thì cho request đi tiếp sang Controller
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const boardValidation = {
  createNew
}
