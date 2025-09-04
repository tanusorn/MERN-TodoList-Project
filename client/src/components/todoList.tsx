import type { Todo } from "../types/todo";
import TodoItem from "./todoItem";
import { FiInbox } from "react-icons/fi";

//ใช้ Promise เพราะฟังก์ชันนี้ทำงาน async (ไปอัปเดตที่ backend ผ่าน API)
//void = ฟังก์ชันไม่ได้คืนค่าอะไรกลับมา (เช่น ไม่ได้ return number หรือ string)
type Props = {
  todos: Todo[];
  onToggle: (id: string, complete: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (id: string, text: string) => Promise<void>;
};

//รับprops
export default function TodoList({ todos, onToggle, onDelete, onEdit }: Props) {
  //todos.length === 0
  if (!TodoList.length)
    return (
      <div className="border border-dashed border-slate-300 rounded-xl p-8 text-center text-slate-500">
        <FiInbox className="mx-auto mb-2 text-3xl" />
        No tasks yet. Add one!
      </div>
    );
  //กรณีมีงาน → map เป็น TodoItem
  //ใช้ .map() วน array ของ todos
  return (
    <div className="bg-white rounded-xl ">
      <ul className="space-y-2">
        {todos.map((t) => (
          <TodoItem
            key={t._id}
            todo={t}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </div>
  );
}
