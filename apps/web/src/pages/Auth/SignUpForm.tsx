import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUpForm() {
  return (
    <form className="p-4 space-y-4">
      <Input placeholder="Name" />
      <Input placeholder="Email" />
      <Input placeholder="Password" type="password" />
      <Input placeholder="CPF" />
      <Input placeholder="Phone" />
      <Button>Create account</Button>
    </form>
  );
}
