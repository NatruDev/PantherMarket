"use server"

import { setTimeout } from "timers/promises";
import { createClient } from "./supabase/server";

export async function newListingForm(_prev: any, formData: FormData) {
    let supabase = await createClient();
    let user = await supabase.auth.getUser();

    await setTimeout(3000);

    if (user.error) return user.error.code;

    let formTitle = formData.get("title")?.toString();
    let formDesc = formData.get("description")?.toString();
    let formPrice = formData.get("price")?.toString();

    if (!formTitle) return 'cu_no_title';
    if (!formDesc) return 'cu_no_desc';
    if (!formPrice) return 'cu_no_price';

    if (formDesc.length > 300) return 'cu_desc_too_long';

    if (!/^\d+(?:\.\d\d)?$/.test(formPrice)) return 'cu_invalid_price';

    let intPrice = Math.round(Number(formPrice)*100);

    if (intPrice < 0) return 'cu_invalid_price';

    const { error } = await supabase.from('listings').insert({
        name: formTitle,
        description: formDesc,
        price: intPrice,
        owner: user.data.user.id
    });

    return error?.code || '';
}

export async function handleSignupForm(_prev: any, formData: FormData) {
    let supabase = await createClient();

    let formEmail = formData.get("email")?.toString();
    let formPassword = formData.get("password")?.toString();

    if (!formEmail || !formPassword) return 'cu_invalid_form';

    if (!formEmail
    .toLowerCase()
    .match(
      /^[A-Za-z0-9]+@pitt\.edu$/
    )) {
        return 'cu_email_invalid'
    }

    const { data, error } = await supabase.auth.signUp({
        email: formEmail,
        password: formPassword,
    });

    return (error?.code || '').toString()
}

export async function loginUserForm(_prev: any, formData: FormData) {
    let supabase = await createClient();

    let formEmail = formData.get("email")?.toString();
    let formPassword = formData.get("password")?.toString();

    if (!formEmail || !formPassword) return 'cu_invalid_form';

    if (!formEmail
    .toLowerCase()
    .match(
      /^[A-Za-z0-9]+@pitt\.edu$/
    )) {
        return 'cu_email_invalid'
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: formEmail,
        password: formPassword
    });

    return (error?.code || '').toString()
}

export async function logoutUser() {
    let supabase = await createClient();
    await supabase.auth.signOut({ scope: 'local' });
}