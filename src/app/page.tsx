import { api } from "@/trpc/server";
import Button from "./_components/button";

export default async function Home() {
  const session = await api.auth.getSession();

  return (
    <div className="container mx-auto flex h-screen flex-col items-center justify-center">
      <h1 className="mb-8 text-center text-6xl font-bold">SmallHire</h1>
      {session ? (
        session.user.role === "WORKER" ? (
          <div className="flex items-center gap-4">
            <Button.Link href="/my-profile" className="mt-4">
              Profilom
            </Button.Link>
            <Button.Link href="/reservation" className="mt-4">
              Foglalásaim
            </Button.Link>
            <Button>Kijelentkezés</Button>
          </div>
        ) : (
          <div>
            <Button.Link href="/worker" className="mt-4">
              Szakemberek
            </Button.Link>
            <Button.Link href="/reservation" className="mt-4">
              Foglalásaim
            </Button.Link>
            <Button.Link href="/my-profile" className="mt-4">
              Profilom
            </Button.Link>
            <Button>Kijelentkezés</Button>
          </div>
        )
      ) : (
        <div className="flex items-center gap-4">
          <Button.Link href="/register" className="mt-4">
            Regisztráció
          </Button.Link>
          <p className="mt-4 text-center">Vagy</p>
          <Button.Link href="/login" className="mt-4">
            Bejelentkezés
          </Button.Link>
        </div>
      )}
    </div>
  );
}
