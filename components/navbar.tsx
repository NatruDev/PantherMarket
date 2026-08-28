import { createClient } from "@/lib/server"
import LoginWidget from "@/components/login-widget";
import Profile from "@/components/profile"

export default async function Navbar() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    return (
    <div className="flex flex-row justify-between items-center max-w-full h-14 py-2 px-8 shadow-md z-50">
        <img src="Pitt_Panthers_wordmark.svg" className="max-h-full"></img>
        <div className="flex flex-row h-full w-fit items-center">
            { data.user ? <Profile/> : <LoginWidget/> }
        </div>
    </div>
    )
}