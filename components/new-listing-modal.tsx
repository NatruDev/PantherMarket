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
import { useActionState, useRef, useState } from "react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"

import { newListingForm } from "@/lib/actions";
import { redirect } from "next/navigation";
import FileUpload from "./file-upload";
import { cn } from "@/lib/utils";
import { UploadedFileItem } from "./file-item";

export default function NewListing() {
    const [formError, formAction, isPending] = useActionState(newListingForm, '');
    const [open, setOpen] = useState(false);
    const [desc, setDesc] = useState('');

    const descChange = (event: any) => {
        setDesc(event.target.value);
    };

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [fileProgresses, setFileProgresses] = useState<Record<string, number>>(
        {}
    );

    const handleFileSelect = (files: FileList | null) => {
        if (!files) return;

        const newFiles = Array.from(files);
        setUploadedFiles((prev) => [...prev, ...newFiles]);

        newFiles.forEach((file) => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                }
                setFileProgresses((prev) => ({
                    ...prev,
                    [file.name]: Math.min(progress, 100),
                }));
            }, 300);
        });
    };

    const handleBoxClick = () => {
        fileInputRef.current?.click();
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        handleFileSelect(e.dataTransfer.files);
    };

    const removeFile = (filename: string) => {
        setUploadedFiles((prev) => prev.filter((file) => file.name !== filename));
        setFileProgresses((prev) => {
            const newProgresses = { ...prev };
            delete newProgresses[filename];
            return newProgresses;
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button>New Listing</Button>} />
            <DialogContent className="sm:max-w-sm">
                <DialogHeader className="text-center">
                    <DialogTitle className="text-xl">New Listing</DialogTitle>
                </DialogHeader>
                <form action={formAction}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="title">Title</FieldLabel>
                            <Input id="title" name="title" type="text" autoComplete="off" required />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="block-end-textarea-desc">Description</FieldLabel>
                            <InputGroup>
                                <InputGroupTextarea
                                    id="block-end-textarea-desc"
                                    placeholder="Description..."
                                    maxLength={300}
                                    onChange={descChange}
                                    required
                                />
                                <InputGroupAddon align="block-end">
                                    <InputGroupText>{desc.length}/300</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                            <FieldDescription>
                                A short description of your item
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="price">Asking price</FieldLabel>
                            <InputGroup>
                                <InputGroupAddon>
                                    <InputGroupText>$</InputGroupText>
                                </InputGroupAddon>
                                <InputGroupInput id="price" placeholder="0.00" />
                                <InputGroupAddon align="inline-end">
                                    <InputGroupText>USD</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </Field>
                        <Field>
                            <FileUpload
                                fileInputRef={fileInputRef}
                                handleBoxClick={handleBoxClick}
                                handleDragOver={handleDragOver}
                                handleDrop={handleDrop}
                                handleFileSelect={handleFileSelect}
                            />
                            <div className={cn('mt-4 space-y-3 px-6 pb-5')}>
                                {uploadedFiles.map((file, index) => (
                                    <UploadedFileItem
                                        file={file}
                                        key={file.name + index}
                                        onRemove={removeFile}
                                        progress={fileProgresses[file.name] || 0}
                                    />
                                ))}
                            </div>
                        </Field>
                        <Field>
                            <Button disabled={isPending} type="submit">{isPending ? '...' : 'Submit'}</Button>
                        </Field>
                        {formError != '' && <FieldError>{formError}</FieldError>}
                    </FieldGroup>
                </form>
            </DialogContent>
        </Dialog>
    )
}