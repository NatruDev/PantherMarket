import Splash from "@/components/splash-screen";
import Storefront from "@/components/storefront";
import { createClient } from "@/lib/server";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  return (
    <div className="flex flex-1 flex-col grow items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full h-full grow flex-col items-center justify-between bg-white dark:bg-black sm:items-start">
        { data.user ? 
          <Storefront />
        :
          <Splash></Splash>
        }
      </main>
    </div>
  );
}
