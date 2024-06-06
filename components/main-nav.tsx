"use client";

import * as React from "react";
import Link from "next/link";
import ChatGPTIcon from "@/public/chatgpt.svg";

import Image from "next/image";

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="items-center space-x-2 flex">
        <Image src={ChatGPTIcon} height={24} width={24} alt="logo" />
        <span className="font-bold sm:inline-block">{"Pdf AI"}</span>
      </Link>
    </div>
  );
}
