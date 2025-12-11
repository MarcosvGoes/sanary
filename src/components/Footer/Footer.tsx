'use client'
import { mobilePhone } from "@/utils/contacts";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {

    const [year, setYear] = useState<number | null>(null);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="bg-[#14274A] shadow-[0_10px_20px_rgb(0,0,0,0.9)] w-full bottom-0">
            <main className="grid gap-10 items-center p-10 lg:gap-5 lg:grid-cols-3 lg:p-20 lg:max-w-[80%] lg:mx-auto">

                    <div className="grid font-normal text-md text-muted gap-3 w-full">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3747.7399081857907!2d-40.1893002!3d-20.061334100000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb7f1212f95a771%3A0x7188a3039a1ee50e!2sTemplo%20Restaura%C3%A7%C3%A3o%20do%20Lar!5e0!3m2!1spt-BR!2sbr!4v1765474864896!5m2!1spt-BR!2sbr" className="w-full h-40 rounded-xl" loading="lazy"></iframe>
                    </div>
                <hr className="lg:hidden" />
                <div className="flex flex-col gap-5 items-start">
                    <Link target="_blank" className="flex items-center gap-x-2 text-muted font-semibold" href="https://www.facebook.com/share/1Ba2pTtkVY/"><i className="uil uil-facebook-f text-2xl" /><span>Facebook</span></Link>
                    <Link target="_blank" className="flex items-center gap-x-2 text-muted font-semibold" href="https://www.instagram.com/rivierasanary/"><i className="uil uil-instagram text-2xl" /><span>Instagram</span></Link>
                    <Link target="_blank" className="flex items-center gap-x-2 text-muted font-semibold" href="https://www.airbnb.com.br/rooms/1231163780924981733?check_in=2025-04-17&check_out=2025-04-22&guests=1&adults=2&s=67&unique_share_id=a22e10d9-d539-409c-84f3-64d2cbccd6c1"><Image width={24} height={24} alt="icon airbnb" src="/assets/icones/airbnb.svg" className="" /><span>Airbnb</span></Link>
                </div>
                <hr className="lg:hidden" />
                <div className="flex flex-col gap-5 items-start lg:text-lg font-semibold text-muted">
                    <Link href="/rooms">Acomodações</Link>
                    <Link href="/facilities">Instalações</Link>
                    <Link href="/contact">Contatos</Link>
                </div>
            </main>

            <div className="text-center pb-5">
                <span className="text-muted font-semibold text-xs">© {year} Pousada Riviera Sanary. Desenvolvido por <Link href="https://marcosgoesdev.vercel.app" target="_blank">Marcos Goes</Link></span>
            </div>
        </footer>
    )
}