import { Button } from "@/components/ui/button";
import { email, mobilePhone } from "@/utils/contacts";
import Link from "next/link";

export default function Contact() {
    return (
        <main className="min-h-screen py-32 md:py-40 lg:py-60 max-w-[1200px] mx-auto">
            <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-10">ESTAMOS AQUI PARA VOCÊ</h1>
            <p className="text-base md:text-lg lg:text-xl font-medium text-center mt-4">
                    Levamos a experiência dos nossos hóspedes a sério. Se você tiver qualquer dúvida, solicitação ou sugestão, entre em contato conosco. Teremos o maior prazer em atendê-lo o mais rápido possível.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:max-w-[500px] md:gap-5 lg:gap-10 mx-auto gap-2 mt-10">
                <Link target="_blank" className="flex items-center gap-x-2" href={`mailto:${email}`}><Button className="w-full py-5"><i className="uil uil-envelope-edit" />E-mail</Button></Link>
                <Link target="_blank" className="flex items-center gap-x-2" href={`https://wa.me/+55${mobilePhone}`}><Button className="w-full py-5 bg-[#31D24E]"><i className="uil uil-whatsapp" />WhatsApp</Button></Link>
            </div>
        </main>
    )
}