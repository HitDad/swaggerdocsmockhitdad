# Football Match Attendance & Voting API (NestJS + Swagger)

Hệ thống RESTful Web Service phục vụ **điểm danh / bình chọn tham gia thi đấu cho Câu lạc bộ Bóng đá** (Bình chọn xem thành viên có tham gia đá bóng hay báo vắng), gồm 2 Collection: **Sessions** (Phiên điểm danh trận đấu) và **Users** (Danh sách thành viên đội bóng).

---

## 📌 2 API Collections

### 1. Collection `Sessions` (Phiên điểm danh đá bóng - 4 API theo yêu cầu)
| STT | Chức năng | Method | Endpoint | Mô tả |
| :-- | :--- | :--- | :--- | :--- |
| 1 | **Xem danh sách session** | `GET` | `/sessions` | Lấy danh sách các trận đấu đang mở điểm danh cùng số lượng tham gia / vắng mặt |
| 2 | **Tạo session mới** | `POST` | `/sessions` | Tạo một buổi đá bóng mới để các thành viên điểm danh (tiêu đề, sân bóng, ngày giờ) |
| 3 | **Xóa session** | `DELETE` | `/sessions/:id` | Xóa một buổi đá bóng theo ID |
| 4 | **Vote cho 1 session** | `POST` | `/sessions/:id/vote` | **Bình chọn tham gia đá bóng hay không**: <br>• `participate: true` (CÓ THAM GIA) <br>• `participate: false` (BÁO VẮNG) |

> **Cách test trực tiếp:** Giảng viên chỉ cần vào Swagger, chọn `POST /sessions/{id}/vote`, bấm **"Try it out" $\rightarrow$ "Execute"** (với `{}` mặc định là CÓ THAM GIA) để thấy số lượng tham gia tăng lên ngay lập tức!

### 2. Collection `Users` (Danh sách thành viên CLB)
| Method | Endpoint | Mô tả |
| :--- | :--- | :--- |
| `GET` | `/users` | Xem danh sách toàn bộ thành viên trong đội bóng |
| `POST` | `/users` | Thêm thành viên mới (Họ tên, email, vị trí thi đấu...) |
| `GET` | `/users/:id` | Xem thông tin chi tiết một thành viên |
| `PATCH` | `/users/:id` | Cập nhật thông tin thành viên |
| `DELETE` | `/users/:id` | Xóa thành viên khỏi đội bóng |

---

## 🚀 Khởi chạy tại Local

```bash
# Cài đặt gói thư viện
npm install

# Khởi chạy chế độ dev (tự reload)
npm run start:dev

# Hoặc build và chạy production
npm run build
npm run start:prod
```

Truy cập Swagger Docs trực tiếp tại:
👉 **`http://localhost:3000/api`** (Trang chủ `http://localhost:3000/` cũng tự chuyển hướng sang Swagger).

---

## 🌐 Hướng dẫn lấy Link Public nộp bài

### Cách 1: Tạo Link Public tạm thời từ máy local (Nhanh nhất - 30 giây)
Khi đang chạy server ở local, mở một tab terminal khác và chạy:
```bash
npx localtunnel --port 3000
```
Sẽ nhận được một URL dạng `https://ten-ngau-nhien.loca.lt`. Link nộp bài là:
👉 **`https://ten-ngau-nhien.loca.lt/api`**

---

### Cách 2: Deploy lên Render.com (Link ổn định 24/7)
1. Commit và push code lên GitHub của bạn:
   ```bash
   git add .
   git commit -m "feat: match attendance voting api"
   git push origin main
   ```
2. Vào [render.com](https://render.com), chọn **New +** $\rightarrow$ **Web Service** $\rightarrow$ chọn Repo GitHub của bạn.
3. Cài đặt:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
4. Bấm **Deploy**. Sau 1 - 2 phút Render sẽ cấp link web.
5. **Link nộp bài sẽ là:** **`https://<ten-app>.onrender.com/api`**
