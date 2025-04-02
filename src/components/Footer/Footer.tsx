import Image from "next/image";
import Link from "next/link";

export default function Footer() {

    const date = new Date()
    const year = date.getFullYear()

    return (
        <footer className="bg-[#14274A] shadow-[0_10px_20px_rgb(0,0,0,0.9)] w-full bottom-0">
            <main className="grid gap-10 items-center p-10 lg:gap-5 lg:grid-cols-3 lg:p-20 lg:max-w-[80%] lg:mx-auto">

                <div className="flex flex-col gap-5 items-start">
                    <Image width={120} height={120} alt="sanary logo" src="/assets/full-logo.png" className="p-5 bg-white rounded-md" />
                    <div className="grid font-normal text-md text-muted gap-3">
                        <Link target="_blank" href="https://www.google.com/maps/place/20%C2%B003'40.9%22S+40%C2%B011'21.6%22W/@-20.0613712,-40.1894942,21z/data=!4m12!1m7!3m6!1s0xb7f1212f95a771:0x7188a3039a1ee50e!2sTemplo+Restaura%C3%A7%C3%A3o+do+Lar!8m2!3d-20.0613341!4d-40.1893002!16s%2Fg%2F11xg14z1y!3m3!8m2!3d-20.061364!4d-40.189325?entry=ttu&g_ep=EgoyMDI1MDMzMC4wIKXMDSoASAFQAw%3D%3D">
                            Nova Almeida, Serra, ES <br /> 29182-534
                        </Link>
                        <Link href="https://wa.me/+5527999167402" target="_blank">
                            <i className="uil uil-whatsapp" /> <span>+55 27 98856 7724</span>
                        </Link>
                    </div>
                </div>
                <hr className="lg:hidden" />
                <div className="flex flex-col gap-5 items-start">
                    <Link target="_blank" className="flex items-center gap-x-2 text-muted font-semibold" href="/"><i className="uil uil-facebook-f text-2xl" /><span>Facebook</span></Link>
                    <Link target="_blank" className="flex items-center gap-x-2 text-muted font-semibold" href="/"><i className="uil uil-instagram text-2xl" /><span>Instagram</span></Link>
                    <Link target="_blank" className="flex items-center gap-x-2 text-muted font-semibold" href="https://www.airbnb.com.br/rooms/1231163780924981733?check_in=2025-04-17&check_out=2025-04-22&guests=1&adults=2&s=67&unique_share_id=a22e10d9-d539-409c-84f3-64d2cbccd6c1"><Image width={24} height={24} alt="icon airbnb" src="/assets/airbnb.svg" className="" /><span>Airbnb</span></Link>
                </div>
                <hr className="lg:hidden" />
                <div className="flex flex-col gap-5 items-start lg:text-lg font-semibold text-muted">
                    <Link href="/rooms">Acomodações</Link>
                    <Link href="/facilities">Facilidades</Link>
                    <Link href="/contact">Contatos</Link>
                </div>

            </main>

            <div className="text-center pb-5">
                <span className="text-muted font-semibold text-xs">© {year} Pousada Sanary. Desenvolvido por <Link href="https://marcosgoesdev.vercel.app" target="_blank">Marcos Goes</Link></span>
            </div>
        </footer>
    )
}