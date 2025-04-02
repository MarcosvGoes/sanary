import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Contact() {
    return (
        <main className="min-h-screen py-32 max-w-[80%] mx-auto">
            <div>
                <h1 className="font-bold text-xl">ESTAMOS AQUI PARA VOCÊ</h1>
                <p className="font-medium text-sm mt-2">
                    Levamos a experiência dos nossos hóspedes a sério. Se você tiver qualquer dúvida, solicitação ou sugestão, entre em contato conosco. Teremos o maior prazer em atendê-lo o mais rápido possível.
                </p>
            </div>

            <div className="grid gap-2 mt-10">
                <Link className="flex items-center gap-x-2" href="mailto:edificiosanary@gmail.com"><Button className="w-full py-5"><i className="uil uil-envelope-edit" />E-mail</Button></Link>
                <Link className="flex items-center gap-x-2" href="https://wa.me/+5527999167402"><Button className="w-full py-5 bg-[#31D24E]"><i className="uil uil-whatsapp" />WhatsApp</Button></Link>
            </div>
        </main>
    )
}