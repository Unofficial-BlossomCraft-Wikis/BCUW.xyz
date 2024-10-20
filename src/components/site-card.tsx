import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function SiteCard({ title, v }: { title: string; v: string }) {
  return (
    <Card className='h-fit'>
      <CardHeader>
        <div className='flex'>
          <CardTitle className='basis-1/2'>{title}</CardTitle>
          {v === "1" || v === "2" ? (
            <div className='basis-1/2 flex items-center justify-end'>
              <Deprecated />
            </div>
          ) : v === "4" ? (
            <div className='basis-1/2 flex items-center justify-end'>
              <Badge variant='default' className='w-fit'>
                Recommended
              </Badge>
            </div>
          ) : null}
        </div>
      </CardHeader>
      <CardContent>
        {v === "2" ? (
          <div className='relative flex items-center justify-center'>
            <img
              src='/sites/light.unofficialblossomcraftwiki.wikidot.com.png'
              alt={title}
              className='h-auto w-[100%] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 rounded-lg'
            />
            <img
              src='/sites/dark.unofficialblossomcraftwiki.wikidot.com.png'
              alt={title}
              className='absolute h-auto w-[100%] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 rounded-lg'
            />
          </div>
        ) : (
          <div className='relative flex items-center justify-center'>
            <img
              src={`/sites/light.v${v}.bcuw.xyz.png`}
              alt={title}
              className='h-auto w-[100%] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 rounded-lg'
            />
            <img
              src={`/sites/dark.v${v}.bcuw.xyz.png`}
              alt={title}
              className='absolute h-auto w-[100%] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 rounded-lg'
            />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className='flex gap-2'>
          <CardBtn v={v} />
        </div>
      </CardFooter>
    </Card>
  );
}

function CardBtn({ v }: { v: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>Visit</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => console.log("Visit")}>
          Visit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <SetDefaultBtn v={v} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Deprecated() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge variant='destructive' className='w-fit'>
            Deprecated
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            This site is no longer being maintained. it does not have the latest
            items, and you may not set it as your default.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function SetDefaultBtn({ v }: { v: string }) {
  if (v === "1" || v === "2") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <DropdownMenuItem disabled>
              Visit and make default <br /> (not recommended)
            </DropdownMenuItem>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              This version of BCUW is deprecated, you may not set it as your
              default.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <DropdownMenuItem onClick={() => console.log("Make default")} disabled>
            Visit and make default <br /> (not recommended)
          </DropdownMenuItem>
        </TooltipTrigger>
        <TooltipContent>
          {/* <p>
            Make this site your default version. This will make this site
            redirect you to this version of BCUW when you visit.
            <br />
            NOTE: some features will redirect you to the latest version.
            <br />
            You may change/remove this later.
          </p> */}
          <p>Coming soon!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
