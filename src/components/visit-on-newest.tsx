import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface VisitOnNewestProps {
  pathname: string;
}

export default function VisitOnNewest({ pathname }: VisitOnNewestProps) {
  const [exists, setExists] = useState<boolean>(false);

  // Determine the path based on the current pathname
  const path = pathname.startsWith("/docs") || pathname === "/" || pathname.startsWith("/blog")
    ? pathname
    : `/docs${pathname}`;

  useEffect(() => {
    const checkPathExists = async () => {
      try {
        const res = await fetch(`https://v4.bcuw.xyz${path}`);
        // Set exists to true if the response is in the 200-299 range
        setExists(res.ok); // `res.ok` is true for 200-299 response status
      } catch (error) {
        console.error("Error fetching path:", error);
        setExists(false); // Set exists to false on error
      }
    };

    checkPathExists();
  }, [path]); // Run this effect whenever `path` changes

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant='outline' className='w-fit' asChild disabled={!exists}>
            <a href={`https://v4.bcuw.xyz${path}`}>
              Visit on the latest version
            </a>
          </Button>
        </TooltipTrigger>
        {!exists && (
          <TooltipContent>
            <p>This page seems not to exist on the latest version.</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
