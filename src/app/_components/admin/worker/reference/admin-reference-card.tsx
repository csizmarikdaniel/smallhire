"use client";

import Button from "@/app/_components/button";
import TextArea from "@/app/_components/form-components/textarea";
import AddReferenceImage from "@/app/_components/profile/worker/reference/add-reference-image";
import RemoveReferenceImage from "@/app/_components/profile/worker/reference/remove-reference-image";
import { api } from "@/trpc/react";
import { getImageUrl } from "@/utils/get-image-url";
import FsLightbox from "fslightbox-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import AdminDeleteConfirm from "../../admin-delete-confirm";

type AdminReferenceCardProps = {
  id: string;
  onupload: (formData: FormData) => Promise<void>;
};

const AdminReferenceCard = ({ id, onupload }: AdminReferenceCardProps) => {
  const { data, refetch } = api.admin.worker.reference.get.useQuery({
    referenceId: id,
  });
  const { mutate } = api.admin.worker.reference.edit.useMutation({
    onSuccess: async () => {
      await refetch();
      setIsEditing(false);
    },
    onError: (error) => {
      if (
        error.message.startsWith("[") &&
        JSON.parse(error.message) instanceof Array
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
        setError(JSON.parse(error.message)[0].message);
      } else {
        setError(error.message);
      }
    },
  });
  const { mutate: deleteMutate } =
    api.admin.worker.reference.delete.useMutation({
      onSuccess: () => window.location.reload(),
    });
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(data?.description ?? "");
  const [error, setError] = useState<string | undefined>();
  const [toggler, setToggler] = useState(false);
  const [imagenumber, setImagenumber] = useState(0);
  const [open, setOpen] = useState(false);

  const onEdit = async () => {
    mutate({
      referenceId: id,
      description: description,
    });
  };

  const onDelete = async () => {
    deleteMutate({
      referenceId: id,
    });
  };

  useEffect(() => {
    setDescription(data?.description ?? "");
  }, [data]);

  return (
    <div className="flex flex-col rounded-lg bg-white p-5 shadow-lg">
      <div className="flex justify-between gap-3">
        {isEditing ? (
          <div className="flex-grow">
            <TextArea
              value={description}
              label="Leírás"
              onChange={(e) => setDescription(e.target.value)}
              error={error}
              className="w-full flex-grow"
            />
          </div>
        ) : (
          <div className="">
            <p className="font-bold">Leírás:</p>
            <p>{data?.description}</p>
          </div>
        )}
        <div className="flex max-w-[50%] gap-3">
          <FsLightbox
            toggler={toggler}
            sources={data?.image.map((image) => getImageUrl(image.url))}
            slide={imagenumber + 1}
          />
          {data?.image.map((image) => (
            <div key={image.id} className="relative">
              <Image
                src={getImageUrl(image.url)}
                alt={data?.description}
                width={100}
                height={100}
                onClick={() => {
                  setToggler(!toggler);
                  setImagenumber(data.image.indexOf(image) || 0);
                }}
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
            <Button onClick={() => setOpen(true)}>Törlés</Button>
            {open && data && (
              <AdminDeleteConfirm
                name={data.description}
                onDelete={onDelete}
                open={open}
                setOpen={setOpen}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminReferenceCard;
