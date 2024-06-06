"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import z from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

interface PDFCreateButtonProps extends ButtonProps {}

const pdfFormSchema = z.object({
  title: z.string({
    required_error: "Please enter name of Pdf.",
  }),
});

type PdformValues = z.infer<typeof pdfFormSchema>;

export function PDFCreateButton({
  className,
  variant,
  ...props
}: PDFCreateButtonProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({
    title: "",
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<PdformValues>({
    resolver: zodResolver(pdfFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: PdformValues) {
    setIsLoading(true);
    setFormData(data);

    const title = data.title;

    const pdf: any = localStorage.getItem("pdf")
      ? // @ts-ignore:next-line
        JSON.parse(localStorage.getItem("pdf"))
      : [];

    let newPdf = [...pdf];
    let currentPdfId = null;

    if (newPdf?.length > 0) {
      currentPdfId = newPdf?.length + 1;
      const currentPdf = {
        id: currentPdfId,
        title: title,
        content: "",
      };
      newPdf.push(currentPdf);
    } else {
      currentPdfId = 1;
      newPdf = [
        {
          id: currentPdfId,
          title: title,
          content: "",
        },
      ];
    }

    // store it into localstorage
    localStorage.setItem("pdf", JSON.stringify(newPdf));

    // This forces a cache invalidation.
    router.refresh();

    router.push(`/editor/${currentPdfId}`);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create PDF</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] md:w-full w-[95%]">
        <DialogHeader>
          <DialogTitle>Add PDF</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Pdf Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit">
              {isLoading ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
