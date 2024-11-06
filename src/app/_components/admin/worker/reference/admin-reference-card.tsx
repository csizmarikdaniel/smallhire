"use client";

import Button from "@/app/_components/button";
import Input from "@/app/_components/form-components/input";
import AddReferenceImage from "@/app/_components/profile/worker/reference/add-reference-image";
import RemoveReferenceImage from "@/app/_components/profile/worker/reference/remove-reference-image";
import { api } from "@/trpc/react";
import { getImageUrl } from "@/utils/get-image-url";
import Image from "next/image";
import { useState } from "react";

type AdminReferenceCardProps = {
  id: string;
  onupload: (formData: FormData) => Promise<void>;
};

const AdminReferenceCard = ({ id, onupload }: AdminReferenceCardProps) => {
  const { data, refetch } = api.admin.worker.reference.get.useQuery({
    referenceId: id,
  });
  const { mutate } = api.admin.worker.reference.edit.useMutation({
    onSuccess: () => refetch,
  });
  const { mutate: deleteMutate } =
    api.admin.worker.reference.delete.useMutation({
      onSuccess: () => window.location.reload(),
    });
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(data?.description);
  const [error, setError] = useState("");

  const onEdit = async () => {
    if (!description) {
      setError("Leírás nem lehet üres");
      return;
    }
    mutate({
      referenceId: id,
      description: description,
    });
    setIsEditing(false);
  };

  const onDelete = async () => {
    deleteMutate({
      referenceId: id,
    });
  };

  return (
    <div className="flex justify-between rounded-lg bg-white p-5">
      <div className="flex grow flex-col gap-3">
        {isEditing ? (
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={error}
          />
        ) : (
          <p>{data?.description}</p>
        )}
        <div className="flex gap-3">
          {data?.image.map((image) => (
            <div key={image.id} className="relative">
              <Image
                src={getImageUrl(image.url)}
                alt={data?.description}
                height={50}
                width={100}
              />
              <RemoveReferenceImage referenceId={id} imageId={image.id} />
            </div>
          ))}
          <AddReferenceImage referenceId={id} onupload={onupload} />
        </div>
      </div>
      <div className="flex items-start gap-2">
        {isEditing ? (
          <>
            <Button onClick={onEdit}>Mentés</Button>
            <Button onClick={() => setIsEditing(false)}>Mégse</Button>
          </>
        ) : (
          <>
            <Button onClick={() => setIsEditing(true)}>
              Leírás szerkesztése
            </Button>
            <Button onClick={onDelete}>Törlés</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminReferenceCard;
