import { useState } from "react";
//ไฟล์ types/todo.ts ของคุณ export เป็น type/interface
import type { Todo } from "../types/todo";
import { FiSave } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";

type Props = {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (id: string, text: string) => Promise<void>;
};
//export TodoItem
export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  //chec state on Editing right now?
  const [isEditing, setIsEditing] = useState(false);
  //draft → เก็บข้อความที่กำลังแก้ไข (ค่าเริ่มต้นคือ todo.text)
  const [draft, setDraft] = useState(todo.text);

  //for save
  const save = async () => {
    if (!draft.trim()) return;
    await onEdit(todo._id, draft.trim());
    //หลังแก้เสร็จ → setIsEditing(false) = ออกจากโหมดแก้ไข
    setIsEditing(false);
  };

  return (
    <li
      className={`flex items-center gap-3 p-3 rounded-xl border mb-2 transition ${
        todo.completed
          ? "bg-green-50 border-green-200"
          : "bg-white border-slate-200 hover:bg-slate-50"
      }`}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        className="h-5 w-5 accent-blue-600 cursor-pointer"
        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        checked={todo.completed}
        onChange={() => onToggle(todo._id, !todo.completed)}
      />

      {/* Task Text / Input Edit Mode */}
      {isEditing ? (
        <input
          className="flex-1 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          autoFocus
        />
      ) : (
        <span
          className={`flex-1 ${
            todo.completed
              ? "line-through text-slate-400"
              : "text-slate-800 font-medium"
          }`}
        >
          {todo.text}
        </span>
      )}

      {/* Actions */}
      {isEditing ? (
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer"
            title="Save"
            onClick={save}
          >
            <FiSave />
          </button>
          <button
            className="p-2 rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 transition cursor-pointer"
            title="Cancel"
            onClick={() => {
              setIsEditing(false);
              setDraft(todo.text);
            }}
          >
            <FiX />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-full hover:bg-blue-50 text-blue-600 transition cursor-pointer"
            title="Edit"
            onClick={() => setIsEditing(true)}
          >
            <FiEdit2 />
          </button>
          <button
            className="p-2 rounded-full hover:bg-red-50 text-red-600 transition cursor-pointer"
            title="Delete"
            onClick={() => onDelete(todo._id)}
          >
            <FiTrash2 />
          </button>
        </div>
      )}
    </li>
  );
}
