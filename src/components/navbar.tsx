import { ModeToggle as ThemeToggle } from "./theme-toggle";

export default function Navbar() {
  return (
    <div className='flex h-16 flex-row bg-secondary'>
      <div className='flex basis-1/3 flex-row items-center justify-start gap-4 pl-2 max-md:hidden'></div>
      <div className='flex basis-1/2 flex-row items-center justify-center gap-4 md:basis-1/3'>
        <img
          src='/bcuwOnlyTitleNormal.png'
          alt='BCUW Logo'
          className='h-10 w-auto max-md:h-12'
        />
      </div>
      <div className='flex flex-auto basis-1/2 flex-row items-center justify-end gap-2 pr-2 md:basis-1/3'>
        <ThemeToggle />
      </div>
    </div>
  );
}
