
import { getAllBookings } from "@/features/admin/actions/getAllBookings"
import CancelBookingButton from "@/features/admin/components/CancelBookingButton"
import { Button } from "@/shared/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import { formatCPF } from "@/shared/utils/cpfValidator"
import { formatAndMaskPhoneNumber } from "@/shared/utils/formatAndMaskPhoneNumber"
import { formatCep } from "@/shared/utils/formatCEP"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Mail } from "lucide-react"
import Image from "next/image"

type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELED" | "REFUNDED" | "BLOCKED"

const bookingStatusConfig: Record<
  BookingStatus,
  {
    label: string
    dot: string
    border: string
    text: string
  }
> = {
  PENDING: {
    label: "Pagamento pendente",
    dot: "bg-orange-500",
    border: "border-orange-300",
    text: "text-orange-600",
  },
  CONFIRMED: {
    label: "Reserva confirmada",
    dot: "bg-green-600",
    border: "border-green-300",
    text: "text-green-600",
  },
  CANCELED: {
    label: "Reserva cancelada",
    dot: "bg-red-600",
    border: "border-red-300",
    text: "text-red-600",
  },
  REFUNDED: {
    label: "Pagamento reembolsado",
    dot: "bg-blue-600",
    border: "border-blue-300",
    text: "text-blue-600",
  },
  BLOCKED: {
    label: "Reserva bloqueada",
    dot: "bg-gray-600",
    border: "border-gray-300",
    text: "text-gray-600",
  },
}

export default async function Bookings() {
  const bookings = await getAllBookings()
  return (
    <div className="max-w-7xl mx-auto px-6 md:py-10 space-y-6">
      <h1 className="text-2xl font-semibold text-center">Todas as reservas</h1>

      {bookings.map((booking) => (
        <div
          key={booking.id}
          className={`border ${booking.status === "CANCELED" ? "border-destructive" : ""} max-w-[500px] md:mx-auto rounded-xl p-5 bg-white shadow-sm space-y-4`}
        >
          <div>
            <span className="text-muted-foreground text-xs">
              ID: {booking.id}
            </span>

            <div
              className={`flex items-center gap-x-2 font-medium ${bookingStatusConfig[booking.status].text}`}
            >
              <span
                className={`
        w-2.5 h-2.5 rounded-full
        border-2 text-xs
        ${bookingStatusConfig[booking.status].dot}
        ${bookingStatusConfig[booking.status].border}
      `}
              />
              <span>{bookingStatusConfig[booking.status].label}</span>
            </div>
          </div>


          <div className="flex gap-x-6 text-sm">
            <span>
              <strong>Check-in</strong><br />
              {format(new Date(booking.checkIn), "dd/MM/yyyy", { locale: ptBR })}
            </span>

            <span>
              <strong>Check-out</strong><br />
              {format(new Date(booking.checkOut), "dd/MM/yyyy", { locale: ptBR })}
            </span>
          </div>

          <div className="border-t pt-4 text-sm space-y-1">
            <p className="font-semibold text-lg">Usuário responsável</p>

            <p>Nome: {booking.user.name}</p>

            {booking.user.email && (
              <div className="flex items-center justify-between">
                <p>Email: {booking.user.email}</p>

                <a
                  target="_blank"
                  href={`mailto:${booking.user.email}`}
                >
                  <Mail size={16} strokeWidth={3} className="mr-0.5 text-blue-600" />
                </a>
              </div>
            )}

            {booking.user.phoneNumber && (
              <div className="flex items-center justify-between">
                <p>Telefone: {formatAndMaskPhoneNumber(booking.user.phoneNumber)}</p>
                <a target="_blanl" href={`https://wa.me/${booking.user.phoneNumber}`}><Image src={"/assets/icones/whatsapp.svg"} width={20} height={20} alt={"whatsapp icon"} /></a>
              </div>
            )}


            {booking.user.birthDate && (
              <p>
                Data de nascimento:{" "}
                {format(new Date(booking.user.birthDate), "dd/MM/yyyy", {
                  locale: ptBR,
                })}
              </p>
            )}

            {booking.user.nacionality && (
              <p>Nacionalidade: {booking.user.nacionality}</p>
            )}

            <p>
              Registrado em:{" "}
              {format(new Date(booking.user.createdAt), "dd/MM/yyyy HH:mm", {
                locale: ptBR,
              })}
            </p>

            <div>
              {(booking.user.documentType ||
                booking.user.documentNumber ||
                booking.user.ufEmitter) && (
                  <>
                    <p className="font-semibold mt-2">Documentos</p>
                    <p>

                      {[
                        `${booking.user.documentType?.toUpperCase()}:`,
                        booking.user.documentNumber && `${booking.user.documentNumber}`,
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      {booking.user.ufEmitter && ` - ${booking.user.ufEmitter}`}
                    </p>

                    {booking.user.cpf && (
                      <p>CPF: {formatCPF(booking.user.cpf)}</p>
                    )}

                  </>
                )}
            </div>

            {(booking.user.cep ||
              booking.user.street ||
              booking.user.city) && (
                <>
                  <p className="font-semibold mt-2">Endereço</p>

                  <p>
                    {[
                      formatCep(booking.user.cep),
                      booking.user.street,
                      booking.user.number,
                      booking.user.houseNumber,
                      booking.user.neighborhood,
                      booking.user.city,
                      booking.user.state,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>

                  {booking.user.complement && (
                    <p>Complemento: {booking.user.complement}</p>
                  )}
                </>

              )}
          </div>

          <div className="border-t pt-4 text-sm">
            <p className="font-medium mb-2">
              Hóspedes ({booking.guests.length})
            </p>

            <ul className="space-y-2">
              {booking.guests.map((guest) => (
                <li
                  key={guest.id}
                  className="rounded-md border p-2 text-sm space-y-1"
                >
                  <p className="font-medium">
                    {guest.name}{" "}
                    <span className="text-muted-foreground font-normal">
                      (
                      {guest.type === "adult"
                        ? "Adulto"
                        : guest.type === "elderly"
                          ? "Idoso"
                          : guest.type === "child"
                            ? "Criança"
                            : "Bebê"}
                      )
                    </span>
                  </p>

                  <p>CPF: {formatCPF(guest.cpf)}</p>

                  <p>
                    Data de nascimento:{" "}
                    {format(new Date(guest.birthDate), "dd/MM/yyyy", {
                      locale: ptBR,
                    })}
                  </p>
                </li>
              ))}
            </ul>
          </div>


          {/* ======================
              PAGAMENTO
          ====================== */}
          <div className="border-t pt-4 text-sm space-y-2">
            <p className="font-medium">Pagamento</p>

            {!booking.user.paymentData ? (
              <p className="text-muted-foreground">
                Usuário sem dados de pagamento
              </p>
            ) : (
              <>
                <p>
                  Cartão: {booking.user.paymentData.brand ?? "-"} ••••
                  {booking.user.paymentData.last4DigitsCard ?? "----"}
                </p>

                {booking.user.paymentData.Payments.length === 0 ? (
                  <p className="text-muted-foreground">
                    Nenhum pagamento registrado
                  </p>
                ) : (
                  <div className="space-y-2">
                    {booking.user.paymentData.Payments.map((payment) => (
                      <div
                        key={payment.id}
                        className="border rounded-lg p-3 text-sm"
                      >
                        <p>Status: {payment.status}</p>
                        <p>Valor: R$ {payment.amount}</p>

                        {payment.invoiceUrl && (
                          <a
                            href={payment.invoiceUrl}
                            target="_blank"
                            className="text-blue-600 hover:underline"
                          >
                            Ver fatura
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          <div>
            {booking.status !== "CANCELED" ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mt-2 w-full cursor-pointer">
                    Cancelar reserva
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Deseja realmente cancelar a reserva ?
                    </DialogTitle>
                    <DialogDescription>
                      Esta ação é irreversível, após o cancelamento o usúario deverá reservar novamente.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-3">
                    <DialogClose asChild>
                      <Button className="cursor-pointer" variant={"outline"}>
                        Sair
                      </Button>
                    </DialogClose>
                    <CancelBookingButton bookingId={booking.id} />
                  </div>
                </DialogContent>
              </Dialog>
            )
              :
              <Button className="mt-2 w-full" disabled variant={"destructive"}>
                Reserva cancelada
              </Button>
            }
          </div>
        </div>
      ))}
    </div>
  )
}
