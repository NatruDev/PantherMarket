"use server"

import { createClient } from "./supabase/server";

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