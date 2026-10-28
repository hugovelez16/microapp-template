import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-6 px-4 py-8">
      <h1 className="text-2xl font-semibold">Micro app</h1>
      <p className="text-neutral-700">
        Esta es la zona pública. Aquí van las pantallas que no requieren iniciar sesión.
      </p>
      <Link
        href="/login"
        className="flex h-12 items-center justify-center rounded-lg bg-neutral-900 text-base font-medium text-white"
      >
        Acceso del personal
      </Link>
    </main>
  );
}
