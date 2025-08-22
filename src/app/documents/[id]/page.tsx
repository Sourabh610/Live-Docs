
// import CollaborativeRooms from "@/src/components/CollaborativeRooms";
import CollaborativeRooms from "@/components/CollaborativeRooms";
import { getDocument } from "@/lib/actions/room.actions";
import { getClerkUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Documents = async ({ params: { id } }: SearchParamProps) => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const email = clerkUser?.emailAddresses?.[0]?.emailAddress;
  const userId = clerkUser?.id;

  const room = await getDocument({
    roomId: id,
    userId: email, // 👈 check if your backend expects email or Clerk id
  });

  if (!room) redirect("/");

  const userIds = Object.keys(room.usersAccesses);

  const users = (await getClerkUsers({ userIds })) || [];

  const usersData = users.map((user: User) => ({
    ...user,
    userType: room.usersAccesses[user.email]?.includes("room:write")
      ? "editor"
      : "viewer",
  }));

  // fallback to avoid crashes
  const accessKey = room.usersAccesses[email] ? email : userId;
  const currentUserType = room.usersAccesses[accessKey]?.includes("room:write")
    ? "editor"
    : "viewer";

  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRooms
        roomId={id}
        roomMetadata={room.metadata}
        users={usersData}
        currentUserType={currentUserType}
      />
    </main>
  );
};

export default Documents;






























// export const Documents = async ({params:{id}}:SearchParamProps) => {
//   const clerkUser = await currentUser();
//   if(!clerkUser) redirect('/sign-in');


//   const room = await getDocument({
//     roomId: id,
//     userId: clerkUser?.emailAddresses?.[0]?.emailAddress,
//   });

//   if(!room) redirect('/');
  
//   const userIds = Object.keys(room.usersAccesses);
//   const users = (await getClerkUsers({ userIds })) || [];

// const usersData = users.map((user: User) => ({
//   ...user,
//   userType: room.usersAccesses[user.email]?.includes("room:write")
//     ? "editor"
//     : "viewer",
// }));

//   const currentUserType = room.usersAccesses[
//     clerkUser.emailAddresses[0].emailAddress
//   ].includes('room:write')
//     ? 'editor'
//     : 'viewer';

//   return (
//     <main className="flex w-full flex-col items-center">
//       <CollaborativeRooms
//         roomId={id}
//         roomMetadata={room.metadata}
//         users={usersData}
//         currentUserType={currentUserType}
//       />
//     </main>
//   );
// };
// export default Documents;



// const Document = async ({ params: { id } }: SearchParamProps) => {
//   const clerkUser = await currentUser();
//   if (!clerkUser) redirect("/sign-in");

//   const room = await getDocument({
//     roomId: id,
//     userId: clerkUser.emailAddresses[0].emailAddress,
//   });

//   if (!room) redirect("/");

//   const userIds = Object.keys(room.usersAccesses);

//   const users = await getClerkUsers({ userIds });

//   const usersData = users.map((user: User) => ({
//     ...user,
//     userType: room.usersAccesses[user.email]?.includes("room:write")
//       ? "editor"
//       : "viewer",
//   }));

//   const currentUserType = room.usersAccesses[
//     clerkUser.emailAddresses[0].emailAddress
//   ].includes("room:write")
//     ? "editor"
//     : "viewer";

//   return (
//     <main className="flex w-full flex-col items-center">
//       <CollaborativeRooms
//         roomId={id}
//         roomMetadata={room.metadata}
//         users={usersData}
//         currentUserType={currentUserType}
//       />
//     </main>
//   );
// };

// export default Document;