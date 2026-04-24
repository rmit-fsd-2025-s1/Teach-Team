import type { GetServerSideProps } from "next";
import { createClient } from "@/utils/supabase/server";

type Todo = { id: string | number; name: string };

export default function TodosPage({ todos }: { todos: Todo[] }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.name}</li>
      ))}
    </ul>
  );
}

export const getServerSideProps: GetServerSideProps<{ todos: Todo[] }> = async (
  ctx
) => {
  const supabase = createClient(ctx.req, ctx.res);
  const { data: todos } = await supabase.from("todos").select();

  return {
    props: {
      todos: (todos as Todo[]) ?? [],
    },
  };
};

