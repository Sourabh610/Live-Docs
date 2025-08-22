import { SignIn } from "@clerk/nextjs"

const page = () => {
  return (
    // <main className="auth-flex h-screen w-full flex-col items-center justify-center gap-10">
    <main className="flex h-screen w-full flex-col items-center justify-center gap-10-page">
      <SignIn/>
    </main>
  )
}
export default page