"use client";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel, FieldSeparator, FieldDescription, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useActionState, useState } from "react";

import { handleSignupForm } from "@/lib/actions";
import { redirect } from "next/navigation";

export default function Signup({ full } : any) {
    const [formError, formAction, isPending] = useActionState(handleSignupForm, '');
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button className={full ? 'px-10 py-7 text-2xl rounded-full' : ''}>{full ? 'Sign up with your Pitt email' : 'Sign up'}</Button>} />
            <DialogContent className="sm:max-w-sm">
                <DialogHeader className="text-center">
                    <DialogTitle className="text-xl">Create your account</DialogTitle>
                    <DialogDescription>
                        Enter your email below to create your account
                    </DialogDescription>
                </DialogHeader>
                <form action={formAction}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input id="name" name="name" type="text" placeholder="John Doe" required />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">Pitt Email</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                name="email"
                                required
                            />
                        </Field>
                        <Field>
                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input name="password" id="password" type="password" required />
                            </Field>
                            <FieldDescription>
                                Must be at least 6 characters long.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <Button disabled={isPending} type="submit">{isPending ? '...' : 'Create Account'}</Button>
                            
                            <FieldDescription className="text-center">
                                Already have an account? <Button variant='link' className='text-muted-foreground cursor-pointer underline' onClick={() => {setOpen(false); redirect('/#login')}}>Login</Button>
                            </FieldDescription>
                        </Field>
                        { formError != '' && <FieldError>{formError}</FieldError> }
                    </FieldGroup>
                </form>
                <FieldSeparator />
                <DialogFooter>
                    <FieldDescription className="px-6 text-center">
                        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                        and <a href="#">Privacy Policy</a>.
                    </FieldDescription>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}