import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignInForm() {
  return (
    <form className="p-4 space-y-4">
      <div className="mb-4">
        <Label className="mb-2">Email</Label>
        <Input placeholder="example@email.com" />
      </div>
      <div>
        <Label className="mb-2">Password</Label>
        <Input placeholder="*******" type="password" />
      </div>
      <Button>Login</Button>
    </form>
  );
}
