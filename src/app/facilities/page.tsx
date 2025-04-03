import Image from "next/image"

export default function Facilities() {
    return (
        <main className="min-h-screen py-32 md:py-40 lg:py-60 max-w-[80%] mx-auto flex flex-col items-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10">Nossas instalações</h1>

            <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-10 rounded-sm text-xs font-medium max-w-[600px]">
                <Image height={500} width={500} src="/assets/room.png" layout="responsive" alt="room image" />
                <div className="p-3 space-y-1">
                    <p>Nossos quartos são suítes privativas, garantindo conforto e privacidade. Cada acomodação conta com ar-condicionado, cama de casal confortável e um chuveiro eletrônico para ajuste preciso da temperatura.</p>
                    <p>Além disso, todos os quartos oferecem uma bela vista para o mar, criando um ambiente relaxante. Há ainda a possibilidade de adicionar uma cama extra por quarto, ideal para famílias ou grupos.</p>
                </div>
            </div>

            <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-10 rounded-sm text-xs font-medium max-w-[600px]">
                <Image height={500} width={500} src="/assets/culinaria.webp" layout="responsive" alt="room image" />
                <div className="p-3 space-y-1">
                    <p>Comece o dia com um café da manhã cuidadosamente preparado, repleto de sabores regionais e ingredientes frescos. Nossa seleção inclui pães artesanais, queijos variados, iogurtes naturais, frutas da estação e bolos caseiros, garantindo uma refeição nutritiva e saborosa.</p>
                    <p>Tudo servido com carinho para que sua manhã seja leve e revigorante.</p>
                </div>
            </div>

            <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-10 rounded-sm text-xs font-medium max-w-[600px]">
                <Image height={500} width={500} src="/assets/litoral.webp" layout="responsive" alt="room image" />
                <div className="p-3 space-y-1">
                    <p>Nossa localização é privilegiada, cercada por praias paradisíacas. As imponentes falésias esculpidas pelo tempo oferecem um cenário deslumbrante, perfeito para contemplação e belas fotos.</p>
                    <p>Além do litoral, a região conta com rios de águas tranquilas, ideais para passeios relaxantes e contato com a natureza. Um destino perfeito para quem busca beleza natural e momentos inesquecíveis.</p>
                </div>
            </div>
        </main>
    )
}