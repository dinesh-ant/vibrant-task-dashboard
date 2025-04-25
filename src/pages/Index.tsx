
import TodoList from "@/components/TodoList";

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
          My Task
        </h1>
        <TodoList />
      </div>
    </div>
  );
};

export default Index;

