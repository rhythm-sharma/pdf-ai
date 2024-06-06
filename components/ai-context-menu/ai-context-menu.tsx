"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

interface AiContextMenuProps {
  generateAIText: any;
  children?: React.ReactNode;
  openAIApiStatus: string;
  aiInputText: string;
  setAiInputText: any;
  generateAiImage: any;
  dallEApiStatus: string;
  setDallEApiStatus: any;
  imagePrompt: string;
  setImagePrompt: any;
}

export default function AiContextMenu({
  children,
  generateAIText,
  openAIApiStatus,
  aiInputText,
  setAiInputText,
  generateAiImage,
  dallEApiStatus,
  setDallEApiStatus,
  imagePrompt,
  setImagePrompt,
}: AiContextMenuProps) {
  const onSubmitTextGeneration = (e: any) => {
    e.preventDefault();
    generateAIText(aiInputText);
  };

  const onSubmitImageGeneration = (e: any) => {
    e.preventDefault();
    generateAiImage(imagePrompt);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <div className="m-3">
          <form onSubmit={onSubmitTextGeneration}>
            <div className="w-[500px]">
              <p className="flex gap-3 mb-3 items-center">
                <Icons.wandSparkles className="w-[16px] h-[16px]" />
                <span className="font-semibold">AI Text Assistant</span>
              </p>
              <div className="flex gap-1">
                <Input
                  value={aiInputText}
                  onChange={(e) => setAiInputText(e.target.value)}
                  placeholder="Ask AI to edit or generate text"
                />
                {openAIApiStatus === "loading" ? (
                  <Button disabled>
                    <ReloadIcon className="h-4 w-4 animate-spin" />
                  </Button>
                ) : (
                  <Button size="icon" type="submit">
                    <Icons.highlighter className="w-[16px] h-[16px]" />
                  </Button>
                )}
              </div>
            </div>
          </form>
          <ContextMenuSeparator className="my-4" />
          <form onSubmit={onSubmitImageGeneration} className="mt-4">
            <div className="w-[500px]">
              <p className="flex gap-3 mb-3 items-center">
                <Icons.media className="w-[16px] h-[16px]" />
                <span className="font-semibold">AI Image Assistant</span>
              </p>
              <div className="flex gap-1">
                <Input
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder="Ask AI for image"
                />
                {dallEApiStatus === "loading" ? (
                  <Button disabled>
                    <ReloadIcon className="h-4 w-4 animate-spin" />
                  </Button>
                ) : (
                  <Button size="icon" type="submit">
                    <Icons.paintbrush className="w-[16px] h-[16px]" />
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </ContextMenuContent>
    </ContextMenu>
  );
}
