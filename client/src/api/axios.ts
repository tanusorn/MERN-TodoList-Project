import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// helper สำหรับเรียก /api/todos ----> CRUD
//payload = ข้อมูลที่ส่งไปกับ request (body ของ HTTP request)
export const TodoAPI = {
  list: () => api.get("/api/todos"),
  create: (payload: { text: string }) => api.post("/api/todos", payload),
  update: (
    id: string,
    payload: Partial<{ text: string; completed: boolean }>
  ) => api.patch(`/api/todos/${id}`, payload),
  remove: (id: string) => api.delete(`/api/todos/${id}`),
};

export default api;
