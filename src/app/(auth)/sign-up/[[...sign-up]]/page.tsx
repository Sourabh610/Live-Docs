import { SignUp } from "@clerk/nextjs"

const SignUpPage = () => {
  return (
    // <main className="gap-10-page flex h-screen w-full flex-col items-center justify-center">
    <main className="flex h-screen w-full flex-col items-center justify-center gap-10">
      <SignUp />
    </main>
  );
}
export default SignUpPage