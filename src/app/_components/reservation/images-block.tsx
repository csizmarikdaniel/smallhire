"use client";

import { getImageUrl } from "@/utils/get-image-url";
import RemoveReservationImage from "./remove-reservation-image";
import AddReservationImage from "./add-reservation-image";
import Image from "next/image";
import FsLightbox from "fslightbox-react";
import { useState } from "react";

const ImagesBlock = ({
  images,
  onupload,
}: {
  images:
    | {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        referenceId: string | null;
        userId: string | null;
        reservationId: string | null;
        url: string;
      }[]
    | undefined;
  onupload: (formdata: FormData) => Promise<void>;
}) => {
  const [toggler, setToggler] = useState(false);
  return (
    <div className="relative mt-5 flex flex-wrap justify-center gap-5">
      {images?.map((image) => (
        <div className="relative" key={image.id}>
          <Image
            src={getImageUrl(image.url)}
            alt="description"
            width={200}
            height={200}
            onClick={() => setToggler(!toggler)}
          />
          <RemoveReservationImage imageId={image.id} />
        </div>
      ))}
      <AddReservationImage onupload={onupload} />
      <FsLightbox
        toggler={toggler}
        sources={images?.map((image) => getImageUrl(image.url))}
      />
    </div>
  );
};

export default ImagesBlock;
