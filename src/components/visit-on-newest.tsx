import {Button} from "./ui/button";

export default function VisitOnNewest({ pathname }: { pathname: string }) {
  let path = pathname;
  if (!pathname.startsWith("/docs") && pathname !== "/" && !pathname.startsWith("/blog")) {
    path = "/docs" + pathname;
  }
  return (
      <Button variant="outline" className="w-fit">Visit on the latest version: {path}</Button>
  );
}