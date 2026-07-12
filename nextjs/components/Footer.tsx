import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-8 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} TaskFlow. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-zinc-500">
          <Link href="#" className="transition-colors hover:text-zinc-300">
            Privacy Policy
          </Link>
          <Link href="#" className="transition-colors hover:text-zinc-300">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
