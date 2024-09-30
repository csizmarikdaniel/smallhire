import { api } from "@/trpc/server";
import Button from "../_components/button";

const FileTestPage = () => {
  const onupload = async (formData: FormData) => {
    "use server";
    await api.file.upload(formData);
  };

  return (
    <div>
      <form action={onupload}>
        <input type="file" name="file" />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default FileTestPage;
