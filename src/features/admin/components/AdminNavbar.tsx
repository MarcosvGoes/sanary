"use client"

import { BedDouble, BookMarked, Calendar, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNavbar() {
    const pathname = usePathname()
    return (
        <nav className="fixed bottom-0 w-full py-2 border-t-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-background z-50">
            <ul className="flex justify-around">
                <li>
                    <Link href={"/admin"} className={`flex flex-col items-center text-sm ${pathname === "/admin" ? 'text-blue-600' : ""}`}>
                        <Calendar size={18} />
                        Calendário
                    </Link>
                </li>
                <li>
                    <Link href={"/bookings"} className={`flex flex-col items-center text-sm ${pathname === "/bookings" ? 'text-blue-600' : ""}`}>
                        <BookMarked size={18} />
                        Reservas
                    </Link>
                </li>
                <li>
                    <Link href={"/admin-rooms"} className={`flex flex-col items-center text-sm ${pathname === "/admin-rooms" ? 'text-blue-600' : ""}`}>
                        <BedDouble size={18} />
                        Quartos
                    </Link>
                </li>
            </ul>
        </nav>
    )
}