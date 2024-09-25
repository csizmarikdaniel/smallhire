"use client";
import { useState } from "react";
import Button from "../button";
import Input from "../form-components/input";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

const ReservationActions = ({
  id,
  status,
  role,
}: {
  id: string;
  status: string;
  role: string;
}) => {
  return (
    <div className="">
      {role == "CUSTOMER" && <CustomerActions status={status} id={id} />}
      {role == "WORKER" && <WorkerActions status={status} id={id} />}
    </div>
  );
};

const CustomerActions = ({ status, id }: { status: string; id: string }) => {
  const router = useRouter();
  const cancel = api.reservation.cancel.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  const acceptOffer = api.reservation.acceptOffer.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  const rejectOffer = api.reservation.rejectOffer.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <div className="flex gap-4">
      {status == "RESERVED" && (
        <>
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
        </>
      )}
      {status == "CANCELLED" && <p>A foglalás lemondva</p>}
      {status == "REJECTED" && <p>A foglalást a szakember elutasította</p>}
      {status == "CREATEDOFFER" && (
        <>
          <p>
            A szakember árajánlatot adott. Kérem válassza ki hogy elfogadja vagy
            nem!
          </p>
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
        </>
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
    <div className="flex gap-4">
      {status == "RESERVED" && (
        <>
          <p>Új foglalás érkezett. Kérem válaszoljon a foglalásra!</p>
          {!accepted ? (
            <>
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
            </>
          ) : (
            <>
              <Input
                label="Ár"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.valueAsNumber)}
              />
              <Button
                onClick={() => {
                  if (price <= 0) {
                    alert("Az ár nem lehet nulla vagy negatív szám");
                  }
                  createOffer.mutate({ price: price, reservationId: id });
                }}
              >
                Mentés
              </Button>
              <Button onClick={() => setAccepted(false)}>Mégse</Button>
            </>
          )}
        </>
      )}
      {status == "CANCELLED" && <p>A foglalást lemondta a megrendelő</p>}
      {status == "REJECTED" && <p>A foglalást a szakember elutasította</p>}
      {status == "CREATEDOFFER" && <p>Ajánlat elküldve</p>}
      {status == "ACCEPTEDOFFER" && (
        <>
          <p>Ajánlat elfogadva</p>
          <Button
            onClick={() => {
              completeReservation.mutate({ reservationId: id });
            }}
          >
            Munka befejezve
          </Button>
        </>
      )}
      {status == "REJECTEDOFFER" && <p>Ajánlat elutasítva</p>}
      {status == "COMPLETED" && <p>A munka teljesítve</p>}
    </div>
  );
};

export default ReservationActions;
