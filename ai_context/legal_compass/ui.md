# 💎 FINAL UI SPEC: LEGAL COMPASS (CONCEPT SYNC + EU STANDARDS)

**Philosophy:** Giao diện hiện đại (Modern), Chân thực (Authentic), và Đáng tin cậy (Authoritative).

---

## 1. HIERARCHY & LAYOUT (Chuẩn EU/Đức)
AI phải đảm bảo thông tin không bị "rác", tập trung vào nội dung pháp lý:

- **Container:** Giữ nguyên style `bg-white/90`, `backdrop-blur-md`, `rounded-[2rem]`, `shadow-2xl`. 
- **Spacing:** Áp dụng quy tắc `Space-y-8`. Khoảng cách giữa các bài viết phải đủ rộng để người dùng không cảm thấy bị "ngợp" bởi chữ.
- **Typography:** - Title bài viết: Font Bold, Size lớn (như tiêu đề 'EXPLORE' trong ảnh).
  - German Anchor: Badge màu Navy `#001A3F`, bo góc `rounded-full`, đặt ngay trên tiêu đề. Đây là "Anchor" để người dùng nhận diện khi ra thực tế tại Đức.

---

## 2. REFINED COMPONENTS (Tham khảo Dribbble/SaaS Style)

### A. Tag Filter (Pill-style)
- **Concept gốc:** Dựa trên các Pill ở chân trang.
- **Refinement:** Thêm hiệu ứng `Active State` rõ ràng. Khi chọn một Tag, nút đó phải có `shadow-md` và màu chữ đen đậm trên nền Vàng `#FFCC00`. Các tag không được chọn nên có độ mờ nhẹ để tập trung vào mục tiêu chính.

### B. Interactive Checklist (The "Actionable" Part)
- **Style:** Thay vì danh sách gạch đầu dòng truyền thống, hãy dùng các Card nhỏ bên trong nội dung mở rộng.
- **Checkbox:** Dùng màu Vàng Brand. Khi tick vào, item sẽ có hiệu ứng `opacity-50` và `line-through` nhẹ nhàng. Đây là "Gamification" giúp thủ tục pháp lý bớt khô khan.

### C. Urgency Badges (Độ khẩn cấp)
- Sử dụng màu sắc tinh tế: 
  - **Urgent:** Một chấm tròn nhỏ màu Đỏ (Soft Red) cạnh tiêu đề.
  - **Timeline:** Một icon đồng hồ nhỏ kèm text xám (Ví dụ: 🕒 Trong 14 ngày).

---

## 3. COLOR SYSTEM (Perfect Match)
AI phải sử dụng mã màu chính xác từ Screenshot:

- **Primary:** `#001A3F` (Navy - Đại diện cho sự nghiêm túc, pháp lý).
- **Accent:** `#FFCC00` (Gold - Đại diện cho năng lượng, hành động).
- **Background:** `#FFFFFF` (White - Sự minh bạch).
- **Border:** `#E5E7EB` (Gray 200 - Viền mỏng cho các box con bên trong).

---

## 4. FINAL INSTRUCTION FOR AI
> "Hãy code Component **LegalCompass** tuân thủ các quy tắc UI cao cấp sau:
>
> 1. **Visual Consistency:** Sao chép hoàn hảo độ bo góc và đổ bóng của 'Explore Box'.
> 2. **Professionalism:** Trình bày các thuật ngữ tiếng Đức (German Anchor) một cách trang trọng trong Badge Navy.
> 3. **Usability:** Checklist giấy tờ phải thân thiện với thiết bị di động (nút bấm đủ lớn).
> 4. **Modern Feel:** Sử dụng các hiệu ứng chuyển cảnh (Transition) mượt mà khi mở rộng card hoặc chuyển Tab. 
> 5. **EU Accessibility:** Đảm bảo độ tương phản màu sắc đạt chuẩn WCAG để tất cả mọi người đều có thể đọc được hướng dẫn một cách dễ dàng nhất."