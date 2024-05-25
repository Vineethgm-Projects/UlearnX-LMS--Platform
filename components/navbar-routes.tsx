"use client"

import { UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"
import {  LogOut } from "lucide-react"
import Link from "next/link"
import { SearchInput } from "./search-input"

export const NavbarRoutes = () => {
    const pathname = usePathname();

    const isTeacherPage = pathname?.startsWith("/teacher");

    const isPlayerPage = pathname?.includes("/courses");

    const isSearchPage = pathname ==="/search";




    return(
        <>
        {isSearchPage && (
            <div className=" hidden md:block">
                <SearchInput />
            </div>
        )}
        <div className="flex gap-x-2 ml-auto ">
{isTeacherPage || isPlayerPage ? (
    <Link href="/">
    <Button size="sm" variant="ghost">
        <LogOut className="h-4 w-4 mr-2"/>
            See you
    </Button>
    </Link>
) : (
    <Link href="/teacher/courses">
        <Button size="sm" variant="ghost">
            Monk mode
        </Button>
        </Link>
)}
            <UserButton 
            afterSignOutUrl="/"/>
        </div>
        </>
        

    )
}