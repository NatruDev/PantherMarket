import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
    FieldError
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { logoutUser } from "@/lib/actions"

export default function Profile() {
    return (
        <div className="aspect-square h-full">
            <Popover>
                <PopoverTrigger render={<button className="w-full h-full"><img className="max-h-full" src="globe.svg"></img></button>} />
                <PopoverContent className="mt-3">
                    <form action={logoutUser}>
                        <FieldGroup className="gap-2.5">
                            <Field>
                                <Button variant="outline" nativeButton={false} render={<Link href={"/settings"}>Settings</Link>}></Button>
                            </Field>
                            <Field>
                                <Button type="submit">Logout</Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </PopoverContent>
            </Popover>
        </div>
    )
}