# Football Club Voting API (NestJS + Swagger)

Hệ thống RESTful Web Service phục vụ **bình chọn (Voting) cho Câu lạc bộ Bóng đá**, gồm 2 Collection: **Users** (Thành viên CLB) và **Sessions** (Phiên bình chọn).

> **Lưu ý quan trọng cho việc chấm bài:**
> - Toàn bộ API được thiết kế chuẩn **RESTful API** (Stateless, dùng chuẩn HTTP Methods: GET, POST, DELETE, PATCH, định danh tài nguyên danh từ).
> - **KHÔNG yêu cầu đăng nhập, KHÔNG verify token**: Giảng viên có thể mở Swagger UI, bấm trực tiếp nút **"Try it out"** $\rightarrow$ **"Execute"** để test và chấm điểm ngay lập tức.

---

## 📌 2 API Collections

### 1. Collection `Sessions` (Phiên bình chọn CLB - 4 API theo yêu cầu)
| STT | Chức năng | Method | Endpoint | Mô tả |
| :-- | :--- | :--- | :--- | :--- |
| 1 | **Xem danh sách session** | `GET` | `/sessions` | Lấy toàn bộ danh sách phiên bình chọn trong CLB |
| 2 | **Tạo session mới** | `POST` | `/sessions` | Tạo một phiên bình chọn mới (tiêu đề, ứng viên...) |
| 3 | **Xóa session** | `DELETE` | `/sessions/:id` | Xóa một phiên bình chọn theo ID |
| 4 | **Vote cho 1 session** | `POST` | `/sessions/:id/vote` | Tăng số lượt vote (+1) cho phiên, có thể gửi tên cầu thủ hoặc để trống |

### 2. Collection `Users` (Thành viên trong CLB)
| Method | Endpoint | Mô tả |
| :--- | :--- | :--- |
| `GET` | `/users` | Xem danh sách thành viên trong CLB bóng đá |
| `POST` | `/users` | Thêm thành viên mới (Họ tên, vị trí thi đấu, email) |
| `GET` | `/users/:id` | Xem chi tiết 1 thành viên |
| `PATCH` | `/users/:id` | Cập nhật thông tin thành viên |
| `DELETE` | `/users/:id` | Xóa thành viên |

---

## 🚀 Khởi chạy tại Local

```bash
# Cài đặt thư viện
npm install

# Chạy bản development (tự reload khi sửa code)
npm run start:dev

# Hoặc build và chạy bản production
npm run build
npm run start:prod
```

Truy cập Swagger Docs trực tiếp tại:
👉 **`http://localhost:3000/api`** (Trang chủ `http://localhost:3000/` cũng tự động chuyển hướng sang Swagger).

---

## 🌐 Hướng dẫn Deploy lấy Link Public nộp bài

### Cách 1: Deploy lên Render.com (Miễn phí & Dễ dùng nhất)
1. Tạo một repository trên GitHub và tự đẩy code lên:
   ```bash
   git init
   git add .
   git commit -m "feat: football club voting nestjs api"
   git branch -M main
   git remote add origin <URL_GITHUB_CUA_BAN>
   git push -u origin main
   ```
2. Vào [render.com](https://render.com), bấm **New +** $\rightarrow$ **Web Service** $\rightarrow$ chọn Repo vừa đẩy.
3. Cấu hình:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
4. Bấm **Deploy Web Service**.
5. Link nộp bài của bạn sẽ là: **`https://<ten-app>.onrender.com/api`**

---

### Cách 2: Lấy Link Public ngay lập tức qua Localtunnel
Nếu đang chạy server ở local và cần link public test ngay:
```bash
npx localtunnel --port 3000
```
Sẽ nhận được link dạng: `https://abc-xyz.loca.lt`. Link nộp bài là: `https://abc-xyz.loca.lt/api`.
