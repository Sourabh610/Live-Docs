// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { ClerkProvider } from "@clerk/nextjs";
// import { dark } from "@clerk/themes";
// import Provider from "./Provider";

// import * as Sentry from "@sentry/nextjs";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "LiveDocks",
//   description: "Project made by Sourabh Kalaskar",
//   other: {
//     ...Sentry.getTraceData(),
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={`${inter.className} antialiased`}>
//         <ClerkProvider
//           appearance={{
//             baseTheme: dark,
//             variables: { colorPrimary: "#3371FF", fontSize: "16px" },
//           }}
//         >
//           <Provider>{children}</Provider>
//         </ClerkProvider>
//       </body>
//     </html>
//   );
// }


import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Provider from "./Provider";
import * as Sentry from "@sentry/nextjs";

const inter = Inter({ subsets: ["latin"] });

// ❌ remove export const metadata
export function generateMetadata(): Metadata {
  return {
    title: "LiveDocks",
    description: "Project made by Sourabh Kalaskar",
    other: {
      ...Sentry.getTraceData(),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ClerkProvider
          appearance={{
            baseTheme: dark,
            variables: { colorPrimary: "#3371FF", fontSize: "16px" },
          }}
        >
          <Provider>{children}</Provider>
        </ClerkProvider>
      </body>
    </html>
  );
}
