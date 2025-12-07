"use client"
import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { getDisplayPrompt } from "./actions/serverActions";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [displayPrompt, setDisplayPrompt] = useState<string | null>(null);



  return (
    <BackgroundLines>
      <div className="flex items-center h-[100vh] justify-center py-[15px]">
        <div className="w-full max-w-[500px] flex flex-col gap-[10px] z-[10]">
          <h1 className="text-[30px] text-center">Paste your project topic below</h1>
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

          {displayPrompt && <>
            <div className="w-full border bg-muted p-[10px] rounded-[12px] max-h-[200px] overflow-hidden relative">
              {displayPrompt}</div>
            <Button onClick={async () => {
              await navigator.clipboard.writeText(displayPrompt);
              toast.success("Coppied")
            }}>Copy <CopyIcon /></Button>
          </>
          }

        </div>
      </div>
    </BackgroundLines >
  )
}