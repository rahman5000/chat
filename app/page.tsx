import { Messages } from "@/components/Messages";
import { Users } from "@/components/Users";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/*<Messages />*/}
      <Users />
    </div>
  );
}
