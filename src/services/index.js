// khi các file khác import vào folder mà không chỉ rõ file nào, nếu trong folder đó có chưa file index thì 
// tự động nó sẽ truy cập vào file index.js đây là một hành vi mặc định của Node.js.
// trong file index này ta sẽ thực hiện import các fiel khác
// mục đích sử dụng như này để khi import vào các file khác ta chỉ cẩn import 1 folder là có thể lấy hết các export chứa trong folder đó

export { default as adminService } from './adminService';
// export { default as userService } from './userService'