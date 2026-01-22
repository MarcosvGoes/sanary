"use client"

import { BookMarked, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNavbar() {
    const pathname = usePathname()
    return (
        <nav className="fixed bottom-0 w-full py-2 border-t-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-background">
            <ul className="flex justify-around">
                <li>
                    <Link href={"/bookings"} className={`flex flex-col items-center text-sm ${pathname === "/bookings" ? 'text-blue-600' : ""}`}>
                        <BookMarked size={18} />
                        Reservas
                    </Link>
                </li>
                <li>
                    <Link href={"/guests"} className={`flex flex-col items-center text-sm ${pathname === "/guests" ? 'text-blue-600' : ""}`}>
                        <Users size={18} />
                        Hóspedes
                    </Link>
                </li>
            </ul>
        </nav>
    )
}