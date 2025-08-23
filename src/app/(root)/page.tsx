
// import { SignedIn, UserButton } from "@clerk/nextjs";
// import { currentUser } from "@clerk/nextjs/server";
// import Image from "next/image";
// import Link from "next/link";
// import { redirect } from "next/navigation";

// import { getDocuments } from "@/lib/actions/room.actions";
// import { dateConverter } from "@/lib/utils";

// import AddDocumentBtn from "@/components/AddDocumentBtn";
// import { DeleteModal } from "@/components/DeleteModal";
// import Header from "@/components/Header";
// import { Notifications } from "@/components/Notifications";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getDocuments } from "@/lib/actions/room.actions";
import { dateConverter } from "@/lib/utils";

import AddDocumentBtn from "@/components/AddDocumentBtn";
import { DeleteModal } from "@/components/DeleteModal";
import Header from "@/components/Header";
import { Notifications } from "@/components/Notifications";





const HomePage = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const roomDocuments = await getDocuments(
    clerkUser.emailAddresses[0].emailAddress
  );

  return (
    // <main className="relative flex min-h-screen w-full flex-col items-center gap-5 sm:gap-10">
    <main className="relative flex min-h-screen w-full flex-col items-center gap-5 sm:gap-10">
      {/* <Header className=" sticky left-0 top-0"> */}
      <Header className="sticky left-0 top-0">
        <div className=" flex items-center gap-2 lg:gap-4">
          <Notifications />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      {roomDocuments.data.length > 0 ? (
        <div className="mb-10 flex w-full flex-col items-center gap-10 px-5">
          <div className="flex w-full max-w-[730px] items-end justify-between">
            <h3 className=" text-[28px] font-semibold">All Documents</h3>
            <AddDocumentBtn
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>

          <ul className="flex w-full max-w-[730px] flex-col gap-5">
            {roomDocuments.data.map(({ id, metadata, createdAt }: any) => (
              <li
                key={id}
                className="flex items-center justify-between gap-4 rounded-lg bg-doc bg-cover p-5 shadow-xl"
              >
                <Link
                  href={`/documents/${id}`}
                  className="flex flex-1 items-center gap-4"
                >
                  <div className=" hidden rounded-md bg-blue-950 p-2 sm:block">
                    <Image
                      src="/assets/icons/doc.svg"
                      alt="file"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className=" space-y-1">
                    <p className=" line-clamp-1 text-lg">{metadata.title}</p>
                    <p className=" text-sm font-light text-blue-100">
                      Created about {dateConverter(createdAt)}
                    </p>
                  </div>
                </Link>
                <DeleteModal roomId={id} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className=" flex w-full max-w-[730px] flex-col items-center justify-center gap-5 rounded-lg bg-gray-900 px-10 py-8">
          <Image
            src="/assets/icons/doc.svg"
            alt="Documents"
            width={40}
            height={40}
            className=" mx-auto"
          ></Image>
          <AddDocumentBtn
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  );
};
export default HomePage;
