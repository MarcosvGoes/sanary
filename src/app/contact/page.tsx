import { email, mobilePhone } from "@/shared/utils/contacts";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export default function Contact() {
  return (
    <main className="min-h-screen pt-32 pb-20 md:pt-40 lg:pt-52 max-w-[900px] mx-auto px-6 flex flex-col items-center">
      
      {/* Título */}
      <div className="text-center max-w-[750px]">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#14274A] drop-shadow-sm">
          Estamos aqui para você
        </h1>

        <p className="text-sm md:text-base lg:text-lg font-medium mt-5 text-neutral-700 leading-relaxed">
          Levamos a experiência dos nossos hóspedes a sério.  
          Se você tiver qualquer dúvida, solicitação ou sugestão, entre em contato conosco.
          Será um prazer atendê-lo o mais rápido possível.
        </p>
      </div>

      {/* Cartões de contato */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-6 w-full max-w-[500px] mt-14">

        {/* Email */}
        <Link
          target="_blank"
          href={`mailto:${email}`}
          className="w-full"
        >
          <Button
            className="
              cursor-pointer w-full py-6 text-lg font-semibold rounded-xl
              bg-gradient-to-br from-[#f0f4ff] to-[#d7e0ff]
              text-[#14274A]
              border border-[#c8d1f0]
              shadow-[0_2px_10px_rgba(20,39,74,0.15)]
              hover:scale-[1.02] active:scale-[0.97]
              transition-all
              flex items-center justify-center gap-3
            "
          >
            <Mail size={22} />
            Enviar e-mail
          </Button>
        </Link>

        <Link
          target="_blank"
          href={`https://wa.me/55${mobilePhone}`}
          className="w-full"
        >
          <Button
            className="
              cursor-pointer w-full py-6 text-lg font-semibold rounded-xl
              bg-[#25D366] text-white
              shadow-[0_4px_15px_rgba(37,211,102,0.35)]
              hover:brightness-110 hover:scale-[1.02] active:scale-[0.97]
              transition-all
              flex items-center justify-center gap-3
            "
          >
            <i className="uil uil-whatsapp text-white text-xl" />
            WhatsApp
          </Button>
        </Link>
      </div>

      <p className="text-xs md:text-sm text-neutral-600 mt-8">
        Retornamos normalmente dentro de minutos.
      </p>
    </main>
  );
}
