'use client'

import { useEffect, useState } from "react"
import Link from "next/link"

export default function Footer() {
  const [year, setYear] = useState<number>(new Date().getFullYear())

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="bg-[#14274A] text-white">
      {/* Conteúdo principal */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="rounded-xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3747.738482143798!2d-40.1892151!3d-20.061393799999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb7f1b9d2a42caf%3A0x9ec7f31d07d970a2!2sRiviera%20Sanary!5e0!3m2!1spt-BR!2sbr!4v1769188931130!5m2!1spt-BR!2sbr"
            width="100%"
            height="250"
            className="rounded-xl w-full h-60 md:h-72"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col gap-4 justify-center md:items-start items-center text-center md:text-left">
          <h3 className="font-semibold text-lg mb-2">Siga-nos</h3>
          <Link target="_blank" className="flex items-center gap-2 hover:text-green-400 transition" href="https://www.facebook.com/share/1Ba2pTtkVY/">
            <i className="uil uil-facebook-f text-xl" />
            Facebook
          </Link>
          <Link target="_blank" className="flex items-center gap-2 hover:text-pink-500 transition" href="https://www.instagram.com/rivierasanary/">
            <i className="uil uil-instagram text-xl" />
            Instagram
          </Link>
        </div>

        <div className="flex flex-col gap-4 justify-center md:items-start items-center text-center md:text-left">
          <h3 className="font-semibold text-lg mb-2">Navegação</h3>
          <Link href="/rooms" className="hover:text-green-400 transition">Acomodações</Link>
          <Link href="/contact" className="hover:text-green-400 transition">Contatos</Link>
        </div>
      </div>

      <div className="border-t border-white/20 mt-8 py-4 text-center text-xs text-white/70">
        © {year} Pousada Riviera Sanary. Desenvolvido por{" "}
        <Link href="https://marcosgoesdev.vercel.app" target="_blank" className="hover:text-green-400 transition">
          Marcos Goes
        </Link>
      </div>
    </footer>
  )
}
