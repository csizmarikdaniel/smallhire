import { api } from "@/trpc/server";
import Button from "./_components/button";
import { redirect } from "next/navigation";
import NotificationList from "./_components/notification-list";

export default async function Home() {
  const session = await api.auth.getSession();

  return (
    <div className="container mx-auto flex h-screen flex-col items-center justify-center">
      <h1 className="mb-8 text-center text-6xl font-bold">SmallHire</h1>
      <>
        {session ? (
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              {session.user.role === "WORKER" ? (
                <>
                  <Button.Link href="/my-profile">Profilom</Button.Link>
                  <Button.Link href="/reservation">Foglalásaim</Button.Link>
                  <form
                    action={async () => {
                      "use server";
                      await api.auth.user.logout();
                      redirect("/");
                    }}
                  >
                    <Button type="submit">Kijelentkezés</Button>
                  </form>
                </>
              ) : (
                <>
                  <Button.Link href="/worker">Szakemberek</Button.Link>
                  <Button.Link href="/reservation">Foglalásaim</Button.Link>
                  <Button.Link href="/my-profile">Profilom</Button.Link>
                  <form
                    action={async () => {
                      "use server";
                      await api.auth.user.logout();
                      redirect("/");
                    }}
                  >
                    <Button type="submit">Kijelentkezés</Button>
                  </form>
                </>
              )}
            </div>
            <h2 className="mt-10 text-center text-4xl font-semibold">
              Értesítések
            </h2>
            <NotificationList />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button.Link href="/register">Regisztráció</Button.Link>
            <p className="text-center">Vagy</p>
            <Button.Link href="/login">Bejelentkezés</Button.Link>
          </div>
        )}
      </>
    </div>
  );
}
