import Button from "../button";
import Input from "../form-components/input";

const AdminLoginForm = () => {
  return (
    <form>
      <Input type="text" name="email" label="Email" />
      <Input type="password" name="password" label="Jelszó" />
      <Button type="submit">Bejelentkezés</Button>
    </form>
  );
};

export default AdminLoginForm;
