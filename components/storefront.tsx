import { createClient } from "@/lib/server";
import StoreItem from "./store-item";
import RightPanel from "./right-panel";

export default async function Storefront() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    let listingsReq = await supabase
        .from('listings')
        .select('id, created_at, name, description, price, owner:user(first_name, last_name)')

    return (
        <div className="flex flex-row w-full h-full grow">
            <RightPanel />
            <div className="w-full flex flex-row justify-center grow">
                <div className="w-full max-w-[120rem] flex flex-wrap flex-row">
                    {listingsReq.data?.map(l => <StoreItem key={l.id} data={l} />)}
                </div>
            </div>
        </div>
    );
}