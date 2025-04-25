import React from 'react';
import { Check, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = React.useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = React.useState("");
  const { toast } = useToast();

  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) {
      toast({
        title: "Please enter a task",
        variant: "destructive",
      });
      return;
    }
    const todo: Todo = {
      id: crypto.randomUUID(),
      text: newTodo.trim(),
      completed: false,
    };
    setTodos([...todos, todo]);
    setNewTodo("");
    toast({
      title: "Task added",
      description: todo.text,
    });
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast({
      title: "Task deleted",
      variant: "destructive",
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <form onSubmit={addTodo} className="flex gap-2">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1"
        />
        <Button 
          type="submit" 
          size="icon" 
          className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </form>

      <div className="space-y-2 text-left">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${
              todo.completed 
                ? "bg-secondary/50 line-through text-muted-foreground" 
                : "bg-card hover:bg-accent"
            }`}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleTodo(todo.id)}
              className={`shrink-0 ${todo.completed ? 'text-[#0EA5E9]' : ''}`}
            >
              <Check className={`h-4 w-4 ${todo.completed ? "opacity-100" : "opacity-0"}`} />
            </Button>
            <span className="flex-1">{todo.text}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteTodo(todo.id)}
              className="shrink-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
