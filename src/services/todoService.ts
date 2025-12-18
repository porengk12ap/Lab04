import fs from "fs";
import path from "path";
import { Todo } from "../models/todo"; // 

// เปลี่ยนชื่อไฟล์เป็น todos.json 
const dataPath = path.join(process.cwd(), "src", "data", "todos.json");

// แก้เป็น loadTodos และใช้ Type Todo [cite: 166]
export function loadTodos(): Todo[] {
  const text = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(text) as Todo[];
}

// แก้เป็น saveTodos [cite: 167]
export function saveTodos(todos: Todo[]): void {
  fs.writeFileSync(dataPath, JSON.stringify(todos, null, 2), "utf-8");
}

// แก้เป็น addTodo รับแค่ title ตามโจทย์ [cite: 168, 169]
export function addTodo(todos: Todo[], title: string): Todo[] {
  // คำนวณ ID ใหม่ [cite: 119]
  const nextId = todos.length === 0 ? 1 : Math.max(...todos.map((t) => t.id)) + 1;

  // สร้าง Todo ใหม่ (กำหนด done เป็น false โดยอัตโนมัติ) [cite: 151]
  const newTodo: Todo = { 
    id: nextId, 
    title, 
    done: false 
  };
  
  return [...todos, newTodo];
}