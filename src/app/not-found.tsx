import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <h1 className="text-4xl font-bold font-mono mb-4">404</h1>
      <p className="text-zinc-400 mb-8 font-mono text-sm">Página não encontrada</p>
      <Link
        href="/"
        className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-mono border border-white/10 transition-colors"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
