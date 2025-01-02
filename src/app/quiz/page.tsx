'use client';
import Quiz from "./Quiz";
import { SessionProvider } from "next-auth/react";
import React from "react";

function Page() {
  return (
    <SessionProvider>
      <div>
        <Quiz />
      </div>
    </SessionProvider>
  );
}

export default Page;
