import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split(".").pop();
    if (fileType === "jpeg" || fileType === "jpg" || fileType == "png")
      return true;
  }
  return false;
}

export const fileSchema = z.object({
  file: z.custom<FileList>(),
});
