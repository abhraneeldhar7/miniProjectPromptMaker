"use client"
import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { getDisplayPrompt } from "./actions/serverActions";
import { ChevronRight, CopyIcon, RedoIcon, Undo2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [displayPrompt, setDisplayPrompt] = useState<string | null>(null);



  return (
    <BackgroundLines className="h-full">
      <div className="flex flex-col mx-auto max-w-[450px] items-center h-[100vh] justify-center p-[15px]">
        <div className="w-full flex flex-col gap-[10px] z-[10]">
          {!displayPrompt ?
            <>
              <h1 className="text-[25px] font-[350] text-center">Paste your project topic below</h1>
              <form className="flex items-center gap-[10px]" onSubmit={async (e) => {
                e.preventDefault();
                if (!inputRef.current) return;
                const topicText = inputRef.current.value;
                if (!topicText.length) return;
                setLoading(true);
                const res = await getDisplayPrompt(topicText);
                setDisplayPrompt(res);
                setLoading(false);
              }}>
                <Input placeholder="your project topic" disabled={loading} ref={inputRef} />
                <Button loading={loading} type="submit">Generate</Button>
              </form>
            </> :
            <>
              <h1 className="text-[24px] font-[350] text-center">Copy and paste this into any AI builder</h1>
            </>
          }

          {displayPrompt && <>
            <div className="w-full border bg-muted p-[10px] rounded-[12px] h-[140px] overflow-hidden relative">
              {displayPrompt}</div>
            <Button onClick={async () => {
              await navigator.clipboard.writeText(displayPrompt);
              toast.success("Coppied")
            }}>Copy <CopyIcon />
            </Button>
            <Button variant="outline" onClick={() => {
              setDisplayPrompt(null)
            }}>Generate again <Undo2 />
            </Button>

            <Link href="https://www.trae.ai" target="_blank" className="flex gap-[20px] backdrop-blur-[2px] overflow-hidden rounded-[10px] transition-all duraiton-300 hover:bg-muted/50 mt-[20px] justify-between pr-[10px] select-none cursor-pointer">
              <div className="flex gap-[20px]">
                <Image src="https://media.licdn.com/dms/image/v2/D560BAQGDj8tODOUsMA/company-logo_200_200/B56Zgd1b5THMAI-/0/1752847204537/traeai_logo?e=2147483647&v=beta&t=N2wG8glnNTLiGMWcuCqq8WigDQVc9ycsocKCOXqwtgM" alt="" height={50} width={50} unoptimized />
                <h1 className="text-[17px] pt-[5px]">Download TRAE</h1>
              </div>
              <ChevronRight size={20} className="my-auto" />
            </Link>

            <Link href="https://cursor.com/home" target="_blank" className="flex gap-[20px] backdrop-blur-[2px] overflow-hidden rounded-[10px] transition-all duraiton-300 hover:bg-muted/50 mt-[10px] justify-between pr-[10px] select-none cursor-pointer">
              <div className="flex gap-[20px]">
                <Image src="https://cursor.com/marketing-static/icon-512x512.png" alt="" height={50} width={50} unoptimized />
                <h1 className="text-[17px] pt-[5px]">Download Cursor</h1>
              </div>
              <ChevronRight size={20} className="my-auto" />
            </Link>
            <Image src="/parthenium.jpeg" alt="" height={200} width={200} className="object-cover rounded-[10px] mt-[20px] h-[200px] w-full" unoptimized />
          </>
          }

        </div>
      </div>
    </BackgroundLines >
  )
}