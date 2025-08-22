import { SignUp } from "@clerk/nextjs"

const SignUpPage = () => {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-10-page">
      <SignUp/>
    </main>
  )
}
export default SignUpPage