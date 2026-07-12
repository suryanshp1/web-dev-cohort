import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <span className="text-2xl text-orange-500">❖</span>
          <span className="text-xl font-bold tracking-tight text-zinc-100">
            TaskFlow
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-zinc-400">
          <Link href="/" className="transition-colors hover:text-zinc-100">
            Home
          </Link>
          <Link
            href="/todos"
            className="text-orange-500 transition-colors hover:text-orange-400"
          >
            Todos
          </Link>
        </nav>
      </div>
    </header>
  );
}
