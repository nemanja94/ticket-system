import Logo from "@/components/navbar/Logo";
import Navbar from "@/components/navbar/Navbar";
import type {Metadata} from "next";
import Link from "next/link";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
    title: "Servis otac i sin",
    description: "Servis vozila",
};

export default function RootLayout({children}: { children: React.ReactNode; }) {
    return (
        <html lang="en">
        <body className="p-0 m-0 box-border bg-slate-900/80">
        <header className="flex w-full justify-evenly items-center">
            <Link href={"/"}>
                <Logo/>
            </Link>
            <Navbar/>
        </header>
        <main>{children}</main>
        </body>
        </html>
    );
}
