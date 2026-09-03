"use client"

import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"

const neighborhoods = [
    "Oakland",
    "Squirrel Hill",
    "South Oakland",
    "North Oakland"
] as const
const catagories = [
    "Electronics",
    "Apparel",
    "Furniture"
]
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldTitle,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import NewListing from "./new-listing-modal"


export default function RightPanel() {
    return (
        <div className="h-full w-lg shadow-md flex flex-col gap-2 px-8 py-10 z-10">
            <h3 className="text-xl">Location</h3>
            <Combobox defaultValue={neighborhoods[0]} items={neighborhoods}>
                <ComboboxInput />
                <ComboboxContent>
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList>
                        {(item) => (
                            <ComboboxItem key={item} value={item}>
                                {item}
                            </ComboboxItem>
                        )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
            <NewListing />

            <Separator className='my-4' />

            <RadioGroup defaultValue={catagories[0]} className="max-w-sm">
                {
                    catagories.map(c => (
                        <FieldLabel key={c} htmlFor={'cat-' + c}>
                            <Field orientation="horizontal">
                                <FieldContent>
                                    <FieldTitle>{c}</FieldTitle>
                                </FieldContent>
                                <RadioGroupItem value={c} id={'cat-' + c} />
                            </Field>
                        </FieldLabel>
                    ))
                }
            </RadioGroup>
        </div>
    )
}