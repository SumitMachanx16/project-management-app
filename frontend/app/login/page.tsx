import AuthForm from "@/components/Authform";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <AuthForm type="login" />
    </main>
  );
}
