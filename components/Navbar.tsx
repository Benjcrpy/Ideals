import { auth, signIn, signOut } from '@/auth'
import { BadgePlus, LogOut } from 'lucide-react';
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { GithubIcon } from 'lucide-react';
import Logo from "@/public/Logo.png"
import Image from 'next/image';

const Navbar = async () => {
    const session = await auth();

  return (
    <header className='py-3 px-5 bg-white shadow-sm font-work-sans'>
        <nav className='flex items-center justify-between '>
            <Link href="/">
                <Image src={Logo} alt="logo" width={125} height={125}/>
            </Link>


            <div className="flex items-center gap-5">
                {session && session?.user ? (
                    <>
                        <Link href="/startup/create">
                            <span className='max-sm:hidden'>Create</span>
                            <BadgePlus className="size-6 sm:hidden"/>
                        </Link>

                        <form action={async () => {
                            "use server"

                            await signOut({ redirectTo: "/"})
                        }}>
                            <button type='submit'>
                                <span className='max-sm:hidden'>Logout</span>
                                <LogOut className='size-6 sm:hidden text-red-500 mt-2'/>
                            </button>
                        </form>

                        <Link href={`/user/${session?.id}`}>
                            <Avatar className='size-10'>
                                <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""}/>
                                <AvatarFallback>
                                    AV
                                </AvatarFallback>
                            </Avatar>
                        </Link>
                    </>
                ) : (
                    <form action={async() => {
                        "use server"
                        
                        await signIn('github')
                    }}>
                        <button type="submit" className='rounded-lg bg-cyan-500 hover:bg-slate-900 text-slate-900 hover:text-slate-400 py-2 px-2 '>
                            <span className='max-sm:hidden flex'>Login with <GithubIcon size={20} className='ml-3'/></span>
                            <GithubIcon className="size-6 sm:hidden"/>
                        </button>
                    </form>
                )}
            </div>
        </nav>
    </header>
  )
}

export default Navbar
