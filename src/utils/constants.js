// Những domain được phép truy cập tới tài nguyên của Server
export const WHITELIST_DOMAINS = [
  'http://localhost:5173'
  // Ví dụ sau này sẽ deploy lên domain chính thức thì phải thêm domain vào back-end sau khi chúng ta deploy, thì back-end mới cho truy cập domain
]

export const BOARD_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
}
