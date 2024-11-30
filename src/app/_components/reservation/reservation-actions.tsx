"use client";
import { useState } from "react";
import Button from "../button";
import Input from "../form-components/input";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

type ReservationActionsProps = {
  id: string;
  status: string;
  role: string;
};

const ReservationActions = ({ id, status, role }: ReservationActionsProps) => {
  return (
    <div className="rounded-lg p-5 shadow-lg">
      {role == "CUSTOMER" && <CustomerActions status={status} id={id} />}
      {role == "WORKER" && <WorkerActions status={status} id={id} />}
    </div>
  );
};

const CustomerActions = ({ status, id }: { status: string; id: string }) => {
  const cancel = api.reservation.cancel.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
  });
  const acceptOffer = api.reservation.acceptOffer.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
  });
  const rejectOffer = api.reservation.rejectOffer.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
  });

  return (
    <div className="flex items-center justify-center gap-4">
      {status == "RESERVED" && (
        <div className="flex flex-col items-center">
          <p>
            Az időpont foglalás megtörtént. A kiválasztott szakember hamarosan
            válaszol
          </p>
          <Button
            onClick={() => {
              cancel.mutate({ reservationId: id });
            }}
          >
            Lemondás
          </Button>
        </div>
      )}
      {status == "CANCELLED" && <p>A foglalás lemondva</p>}
      {status == "REJECTED" && <p>A foglalást a szakember elutasította</p>}
      {status == "CREATEDOFFER" && (
        <div className="flex flex-col items-center">
          <p>
            A szakember árajánlatot adott. Kérem válassza ki, hogy elfogadja
            vagy nem!
          </p>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                acceptOffer.mutate({ reservationId: id });
              }}
            >
              Ajánlat elfogadása
            </Button>
            <Button
              onClick={() => {
                rejectOffer.mutate({ reservationId: id });
              }}
            >
              Ajánlat elutasítása
            </Button>
          </div>
        </div>
      )}
      {status == "ACCEPTEDOFFER" && <p>Ajánlat elfogadva</p>}
      {status == "REJECTEDOFFER" && <p>Ajánlat elutasítva</p>}
      {status == "COMPLETED" && <p>A munka teljesítve</p>}
    </div>
  );
};

const WorkerActions = ({ status, id }: { status: string; id: string }) => {
  const [accepted, setAccepted] = useState(false);
  const [price, setPrice] = useState(0);
  const router = useRouter();
  const createOffer = api.reservation.createOffer.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const completeReservation = api.reservation.complete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const reject = api.reservation.reject.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <div className="flex items-center justify-center gap-4">
      {status == "RESERVED" && (
        <div className="flex flex-col items-center gap-4">
          <p>Új foglalás érkezett. Kérem válaszoljon a foglalásra!</p>
          {!accepted ? (
            <div className="flex items-center gap-4">
              <Button onClick={() => setAccepted(true)}>
                Foglalás elfogadása
              </Button>
              <Button
                onClick={() => {
                  reject.mutate({ reservationId: id });
                }}
              >
                Foglalás elutasítása
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Input
                label="Ár"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.valueAsNumber)}
              />
              <div className="self-end">
                <Button
                  onClick={() => {
                    if (price <= 0) {
                      alert("Az ár nem lehet nulla vagy negatív szám");
                      return;
                    }
                    createOffer.mutate({ price: price, reservationId: id });
                  }}
                >
                  Mentés
                </Button>
                <Button onClick={() => setAccepted(false)}>Mégse</Button>
              </div>
            </div>
          )}
        </div>
      )}
      {status == "CANCELLED" && <p>A foglalást lemondta a megrendelő</p>}
      {status == "REJECTED" && <p>A foglalást a szakember elutasította</p>}
      {status == "CREATEDOFFER" && <p>Ajánlat elküldve</p>}
      {status == "ACCEPTEDOFFER" && (
        <div className="flex flex-col items-center gap-4">
          <p>Ajánlat elfogadva</p>
          <Button
            onClick={() => {
              completeReservation.mutate({ reservationId: id });
            }}
          >
            Munka befejezve
          </Button>
        </div>
      )}
      {status == "REJECTEDOFFER" && <p>Ajánlat elutasítva</p>}
      {status == "COMPLETED" && <p>A munka teljesítve</p>}
    </div>
  );
};

export default ReservationActions;
