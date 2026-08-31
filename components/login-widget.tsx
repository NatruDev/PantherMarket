"use client";

import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
    FieldError
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

import { loginUserForm } from "@/lib/actions"
import { useActionState, useState } from "react"

export default function LoginWidget() {
    const [errorCode, formAction, isPending] = useActionState(loginUserForm, '');
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger render={<Button id="loginButton" variant="outline">Login</Button>} />
            <PopoverContent className="mt-3">
                <form action={formAction}>
                    <FieldGroup className="gap-2.5">
                        <Field>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email"
                                name="email"
                                required
                            />
                        </Field>
                        <Field>
                            <Input id="password" type="password" placeholder="Password" name="password" required />
                            <div className="flex items-center">
                                <a
                                    href="#"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                        </Field>
                        <FieldSeparator className="mb-2.5"></FieldSeparator>
                        <Field>
                            <Button disabled={isPending} type="submit">{isPending ? '...' : 'Login'}</Button>
                        </Field>
                        { errorCode != '' && <FieldError>{errorCode}</FieldError> }
                    </FieldGroup>
                </form>
            </PopoverContent>
        </Popover>
    )
}