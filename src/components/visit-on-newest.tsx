import { Button } from "./ui/button";
interface VisitOnNewestProps {
  pathname: string;
}

export default function VisitOnNewest({ pathname }: VisitOnNewestProps) {
  const path = pathname.startsWith("/docs") || pathname === "/" || pathname.startsWith("/blog")
    ? pathname
    : `/docs${pathname}`;

  return (
    <Button variant='outline' className='w-fit' asChild>
      <a href={`https://v4.bcuw.xyz${path}`}>
        Visit on the latest version
      </a>
    </Button>
  );
}
