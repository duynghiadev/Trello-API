// Những domain được phép truy cập tới tài nguyên của Server
export const WHITELIST_DOMAINS = [
  // 'http://localhost:5173' // Không cần localhost nữa vì ở file config/cors đã luôn luôn cho phép môi trường dev (env.BUILD_MODE === 'dev')
  // Thay vì thêm đường dẫn lostcalhost:5173, thì mình sẽ deploy front-end lên could (trong project này mình dùng vercel), sau đó vercel sẽ generate ra cho chúng ta 1 link. Cuối cùng chúng ta lấy link đó vào thay cho localhost:5173 -> Ví dụ: https://trello-web.vercel.app
  // Ví dụ sau này sẽ deploy lên domain chính thức thì phải thêm domain vào back-end sau khi chúng ta deploy, thì back-end mới cho truy cập domain
]

export const BOARD_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
}
