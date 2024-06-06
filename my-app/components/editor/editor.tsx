"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

// Importing core components
import QuillEditor, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import { buttonVariants } from "@/components/ui/button";

import "react-quill/dist/quill.snow.css";
import AiContextMenu from "../ai-context-menu/ai-context-menu";
import ExportPdfButton from "./export-pdf-button";
import { toast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

Quill.register("modules/imageResize", ImageResize);

const Editor = () => {
  const [value, setValue] = useState("");
  const [openAIApiStatus, setOpenAIApiStatus] = useState("");
  const [dallEApiStatus, setDallEApiStatus] = useState("");
  const [aiInputText, setAiInputText] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");

  const quill = useRef();

  const generateAIText = (text: string) => {
    setOpenAIApiStatus("loading");
    fetch("/api/openai", {
      method: "POST",
      body: JSON.stringify({
        message: text,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const newVal = `${value} <p>${data?.message?.content}</p>`;

        setValue(newVal);

        // this will update the innerHTML in
        // @ts-ignore:next-line
        document.querySelector(".ql-editor").innerHTML = newVal;

        setOpenAIApiStatus("");
        setAiInputText("");
      })
      .catch((error) => {
        setOpenAIApiStatus("");
        setAiInputText("");
        toast({
          title: "Something went wrong.",
          description: error,
          variant: "destructive",
        });
      });
  };

  const generateAiImage = (text: string) => {
    setDallEApiStatus("loading");
    fetch("/api/image", {
      method: "POST",
      body: JSON.stringify({
        message: text,
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        // const base64Image = await urlToBase64(data.message);

        const newVal = `${value} <img src="${data.message}"></img>`;

        console.log("newVal: ", newVal);

        setValue(newVal);

        // this will update the innerHTML in editor
        // @ts-ignore:next-line
        document.querySelector(".ql-editor").innerHTML = newVal;

        setDallEApiStatus("");
        setImagePrompt("");
      })
      .catch((error) => {
        setDallEApiStatus("");
        setImagePrompt("");
        toast({
          title: "Something went wrong.",
          description: error,
          variant: "destructive",
        });
      });
  };

  const imageHandler = useCallback(() => {
    // Create an input element of type 'file'
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // When a file is selected
    input.onchange = () => {
      // @ts-ignore:next-line
      const file = input.files[0];
      const reader = new FileReader();

      // Read the selected file as a data URL
      reader.onload = () => {
        const imageUrl = reader.result;
        // @ts-ignore:next-line
        const quillEditor = quill.current.getEditor();

        // Get the current selection range and insert the image at that index
        const range = quillEditor.getSelection(true);
        quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
        setValue(quillEditor.root.innerHTML);
      };

      reader.readAsDataURL(file);
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
      imageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize", "Toolbar"],
      },
    }),
    [imageHandler]
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];

  return (
    <div className={"container mt-10"}>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-10">
          <Link
            href="/dashboard"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <>
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              Back
            </>
          </Link>
        </div>
        <ExportPdfButton />
      </div>

      <AiContextMenu
        generateAIText={generateAIText}
        generateAiImage={generateAiImage}
        openAIApiStatus={openAIApiStatus}
        dallEApiStatus={dallEApiStatus}
        imagePrompt={imagePrompt}
        setImagePrompt={setImagePrompt}
        aiInputText={aiInputText}
        setAiInputText={setAiInputText}
        setDallEApiStatus={setDallEApiStatus}
      >
        <div className="mt-5">
          <div className="flex gap-2 mb-2">
            <Icons.wandSparkles className="w-[16px] h-[16px]" />
            <span className="text-sm">
              {openAIApiStatus === "loading" ? (
                <span className="flex">
                  Please wait AI is generating content
                  <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
                </span>
              ) : (
                "Right click in input to open AI Assistant"
              )}
            </span>
          </div>
          <QuillEditor
            id="capture"
            // @ts-ignore:next-line
            ref={(el) => (quill.current = el)}
            theme="snow"
            value={value}
            formats={formats}
            modules={modules}
            onChange={(value) => {
              setValue(value);
            }}
          />
        </div>
      </AiContextMenu>
    </div>
  );
};

export default Editor;
