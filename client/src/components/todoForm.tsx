import { useState } from "react";
import { FiPlus } from "react-icons/fi";

//Promise<void> = async function ที่ ไม่ return ค่า, จะไม่ทำการสร้าง Todo เอง แต่จะ เรียกใช้ฟังก์ชันที่ parent ส่งมาให้
// (เช่น parent อาจจะไปเรียก API → POST /todos แล้วอัปเดต state เอง)
type Props = { onCreate: (text: string) => Promise<void> };

//รับ onCreate มาจาก props (ถูก type-check ด้วย Props)
export default function TodoForm({ onCreate }: Props) {
  //ใช้ React Hook useState เพื่อสร้าง state text (ค่าเริ่มต้นคือ "")
  //text = ค่าที่อยู่ใน input
  //setText = ฟังก์ชันที่เอาไว้เปลี่ยนค่า text
  const [text, setText] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // ป้องกันไม่ให้ form reload หน้า
    if (!text.trim()) return; // ถ้าเป็นค่าว่างไม่ทำงานต่อ
    await onCreate(text.trim()); // เรียกฟังก์ชันที่ parent ส่งมา (async)
    setText(""); // เคลียร์ช่อง input
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 mb-6 justify-items-center items-center"
    >
      {/* Input */}
      <input
        type="text"
        className="flex-1 px-4 py-2 rounded-lg border border-slate-300 
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
               placeholder-slate-400 shadow-sm"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Button */}
      <button
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg 
               hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed shadow-sm "
        aria-label="Add task"
        disabled={!text.trim()}
      >
        <FiPlus className="text-lg" />
        <span className="hidden sm:inline font-medium ">Add</span>
      </button>
    </form>
  );
}
