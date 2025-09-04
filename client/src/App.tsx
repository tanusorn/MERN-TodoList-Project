import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router";
import Footer from "./components/fooTer";
import type { Todo } from "./types/todo";
import { TodoAPI } from "./api/axios";
import TodoForm from "./components/todoForm";
import TodoList from "./components/todoList";
import { FiCheckSquare, FiLoader } from "react-icons/fi";

// 🔹 helper function
function sortTodos(todos: Todo[]): Todo[] {
  return [...todos].sort((a, b) => {
    if (a.completed === b.completed) {
      // sort งานใหม่อยู่บนสุด
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    // false ก่อน true
    return a.completed ? 1 : -1;
  });
}

export default function App() {
  //ส่ง callback function → React จะเอาค่าเก่ามาใส่ใน parameter ตัวแรกของ callback นั้น ซึ่งเราเรียกกันว่า prev (ย่อจาก previous)
  const [todos, setTodos] = useState<Todo[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    const res = await TodoAPI.list();
    // console.log("API response:", res.data);
    //ข้อมูลจริงที่ backend ส่งมา (array ของ todos)
    setTodos(sortTodos(res.data)); // 🔹 sort ตอนแรก
  };
  //useEffect → เรียก fetchTodos()
  //ดึงข้อมูลจาก API → setTodos(data)
  useEffect(() => {
    fetchTodos().finally(() => setLoading(false));
  }, []);
  //[] → dependency array ว่าง → หมายความว่าโค้ดข้างในจะรัน ครั้งเดียว ตอน component ถูก mount

  //รับ parameter text: string = ข้อความของ Todo ที่ผู้ใช้กรอก
  //เรียก TodoAPI.create() → ซึ่งคือการยิง API POST /api/todos ส่ง payload { text } ไปให้ backend
  const create = async (text: string) => {
    const res = await TodoAPI.create({ text });
    //เรียงลำดับใหม่ไปเก่า
    setTodos((prev) => sortTodos([res.data, ...prev])); // 🔹 sort หลังเพิ่ม
  };

  //update copleted
  const toggle = async (id: string, completed: boolean) => {
    const res = await TodoAPI.update(id, { completed });
    //ทำให้ state todos ถูกอัปเดตเฉพาะตัวที่ถูกแก้ไข โดยไม่กระทบตัวอื่น
    setTodos((prev) =>
      sortTodos(prev.map((t) => (t._id === id ? res.data : t)))
    );
  };
  //update text
  const edit = async (id: string, text: string) => {
    const res = await TodoAPI.update(id, { text });
    setTodos((prev) => prev.map((t) => (t._id === id ? res.data : t)));
  };

  const remove = async (id: string) => {
    await TodoAPI.remove(id);
    //เก็บเฉพาะ todo ที่ _id ไม่ตรงกับ id ที่ลบ
    setTodos((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="py-6 sm:py-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
              <FiCheckSquare className="text-white" size={28} />
              MERN Todo TypeScript
            </h1>
            <p className="text-blue-100 mt-1 text-sm sm:text-base">
              สร้าง / แก้ไข / ติ๊กสำเร็จ / ลบ งานของคุณ
            </p>
          </div>
        </header>

        {/* Main */}
        <main className="min-h-screen container mx-auto px-4 mt-8">
          <div className="bg-white shadow rounded-xl p-6">
            {/* Summary */}
            <div className="flex items-center justify-between mb-6">
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                Total: {todos ? todos.length : 0}
              </span>
            </div>

            {/* Form */}
            <div className="justify-center flex gap-2 mb-0.5">
              <TodoForm onCreate={create} />
            </div>

            {/* List */}
            {loading ? (
              <p className="text-slate-500 flex items-center gap-2">
                <FiLoader className="animate-spin" />
                Loading...
              </p>
            ) : todos.length === 0 ? (
              <p className="text-gray-400 text-center italic">
                ยังไม่มีงานในลิสต์
              </p>
            ) : (
              <TodoList
                todos={todos}
                onToggle={toggle}
                onDelete={remove}
                onEdit={edit}
              />
            )}
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
