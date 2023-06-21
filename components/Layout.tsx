import React, { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import Head from "next/head";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>Movie app</title>
      </Head>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
