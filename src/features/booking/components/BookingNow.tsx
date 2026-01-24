"use client"

import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, FieldPath, useFieldArray } from "react-hook-form";
import { AnimatePresence, motion } from "motion/react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  ArrowLeft,
  ArrowRight,
  Baby,
  Ban,
  Loader2,
  Trash,
  UserPlus,
  UserRoundPlus,
  UserRoundMinus,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { BookingSchema, bookingSchema } from "../schema/bookingSchema";
import { useZodForm } from "@/shared/hooks/useZodForm";
import { formatCPF, maskCPF } from "@/shared/utils/cpfValidator";
import { fetchAddressByCep } from "@/shared/utils/fetchAddressByCep";
import { formatAndMaskPhoneNumber } from "@/shared/utils/formatAndMaskPhoneNumber";
import { brazilStates } from "@/shared/utils/state";
import { Countrys } from "@/shared/utils/countrys";

import { authClient } from "@/features/auth/auth-client";
import { createCharge } from "@/features/billing/actions/createCharge";
import { createCustomer } from "@/features/billing/actions/createCustomer";

import { getAllRooms } from "@/features/admin/actions/getAllRooms";
import { getRoomUnavailableIntervals } from "../actions/roomDateAvailable";
import { createBook } from "../actions/createBook";
import { useRouter } from "next/navigation";
import { checkCpfExists } from "@/features/profile/checkCpfExists";
import { parseDateOnly } from "@/shared/utils/date";
import { ptBR } from "date-fns/locale";

type Room = { id: string; name: string; price: number };

export default function BookingNow({ session }: { session: any }) {
  const [step, setStep] = useState<number>(0);
  const [onSubmitting, setOnSubmitting] = useState<boolean>(false);
  const [charge, setCharge] = useState<any>(null);
  const [loadingRooms, setLoadingRooms] = useState<boolean>(true);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [disabledIntervals, setDisabledIntervals] = useState<{ from: string; to: string }[]>([]);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined);

  const form = useZodForm(bookingSchema, {
    defaultValues: {
      roomId: "",
      checkIn: "",
      checkOut: "",
      notes: "",
      guests: [
        {
          name: "",
          cpf: "",
          birthDate: "",
          type: "adult",
        },
      ],
      user: {
        name: session.user.name ?? "",
        email: session.user.email ?? "",
        phoneNumber: session.user.phoneNumber ?? "",
        cpf: session.user.cpf ?? "",
        documentNumber: session.user.documentNumber ?? "",
        documentType: session.user.documentType ?? "",
        ufEmitter: session.user.ufEmitter ?? "",
        nacionality: session.user.nacionality ?? "Brasil",
        cep: session.user.cep ?? "",
        street: session.user.street ?? "",
        houseNumber: session.user.houseNumber ?? "",
        complement: session.user.complement ?? "",
        neighborhood: session.user.neighborhood ?? "",
        city: session.user.city ?? "",
        state: session.user.state ?? "",
        birthDate: session.user.birthDate
          ? new Date(session.user.birthDate).toISOString().split("T")[0]
          : "",
      },
    },
  });

  useEffect(() => {
    let cancelled = false;
    async function fetchRooms() {
      try {
        setLoadingRooms(true);
        const roomsData = await getAllRooms();
        if (cancelled) return;

        const formatted: Room[] = roomsData.map((r: any) => ({
          id: r.id,
          name: r.title,
          price: r.price,
        }));

        setRooms(formatted);
      } catch (err) {
        console.error("Erro ao carregar quartos", err);
        toast.error("Erro ao carregar quartos");
      } finally {
        if (!cancelled) setLoadingRooms(false);
      }
    }

    fetchRooms();
    return () => {
      cancelled = true;
    };
  }, []);

  const disabledDays = useMemo(() => {

    const beforeToday = { before: new Date() };

    const ranges = disabledIntervals.map((r) => {
      const fromDate = parseDateOnly(r.from);
      const toDate = parseDateOnly(r.to);

      return { from: fromDate, to: toDate };
    });

    const finalDisabled = [beforeToday, ...ranges];

    return finalDisabled;
  }, [disabledIntervals]);

  useEffect(() => {
    const roomId = form.getValues("roomId");

    if (!roomId) {
      setDisabledIntervals([]);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const intervals = await getRoomUnavailableIntervals({ roomId });
        if (cancelled) return;


        setDisabledIntervals(intervals || []);

      } catch (err) {
        setDisabledIntervals([]);
      }
    })();

    return () => { cancelled = true; };
  }, [form.watch("roomId")]);

  const handleSelectRange = useCallback(
    (range: DateRange | undefined) => {
      setSelectedRange(range);

      if (!range || !range.from) {
        form.setValue("checkIn", "");
        form.setValue("checkOut", "");
        return;
      }

      const fromIso = format(range.from, "yyyy-MM-dd");
      form.setValue("checkIn", fromIso);

      if (range.to) {
        form.setValue("checkOut", format(range.to, "yyyy-MM-dd"));
      } else {
        form.setValue("checkOut", "");
      }
    },
    [form],
  );

  const checkIn = form.watch("checkIn");
  const checkOut = form.getValues("checkOut");
  const selectedRoom = rooms.find((r) => r.id === form.watch("roomId"));

  let numberOfDays = 0;
  if (checkIn && checkOut) {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diffTime = outDate.getTime() - inDate.getTime();
    numberOfDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (numberOfDays < 0) numberOfDays = 0;
  }

  const totalValue = (selectedRoom?.price ?? 0) * numberOfDays;

  useEffect(() => {
    const currentCheckOut = form.getValues("checkOut");
    if (!checkIn || !currentCheckOut) return;

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(currentCheckOut);

    if (checkOutDate <= checkInDate) {
      form.setValue("checkOut", "");
    }
  }, [checkIn, form]);

  type AgeCount = { adult: number; elderly: number; child: number; baby: number };

  const guests = form.watch("guests") ?? [];
  const ageCount: AgeCount = guests.reduce(
    (acc: any, guest: any) => {
      acc[guest.type] = (acc[guest.type] ?? 0) + 1;
      return acc;
    },
    { adult: 0, elderly: 0, child: 0, baby: 0 }
  );

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "guests",
  });

  const watchCep = form.watch("user.cep");
  useEffect(() => {
    const formattedCep = (watchCep ?? "").replace(/\D/g, "");
    if (formattedCep.length === 8) {
      (async () => {
        const data = await fetchAddressByCep(formattedCep);
        if (!data) return;
        form.setValue("user.street", data.street || "");
        form.setValue("user.neighborhood", data.neighborhood || "");
        form.setValue("user.city", data.city || "");
        form.setValue("user.state", data.state || "");
      })();
    }
  }, [watchCep, form]);

  const stepFields: Record<number, FieldPath<BookingSchema>[]> = {
    0: ["roomId", "checkIn", "checkOut", "guests", "notes"],
    1: [
      "user.name",
      "user.email",
      "user.phoneNumber",
      "user.cpf",
      "user.documentNumber",
      "user.documentType",
      "user.ufEmitter",
      "user.nacionality",
      "user.street",
      "user.neighborhood",
      "user.city",
      "user.state",
      "user.houseNumber",
    ],
  };

  const nextStep = useCallback(async () => {
    const fields = stepFields[step] || [];
    const isValid = await form.trigger(fields);
    if (!isValid) {
      toast.error("Preencha todos os campos obrigatórios antes de continuar.");
      return;
    }
    setStep((prev) => Math.min(prev + 1, 4));
  }, [form, step, stepFields]);

  const prevStep = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const router = useRouter()

  const onSubmit = useCallback(
    async (data: BookingSchema) => {
      setOnSubmitting(true);
      try {

        const { cpfExists } = await checkCpfExists(data.user.cpf);
        if (cpfExists && session.user.cpf !== data.user.cpf) {
          toast.error("CPF já cadastrado!", { duration: 4000 });
          setOnSubmitting(false);
          return;
        }

        const updateUserRes = await authClient.updateUser({ name: data.user.name, phoneNumber: data.user.phoneNumber, cpf: data.user.cpf, documentNumber: data.user.documentNumber, documentType: data.user.documentType, ufEmitter: data.user.ufEmitter, cep: data.user.cep, street: data.user.street, houseNumber: data.user.houseNumber, complement: data.user.complement, neighborhood: data.user.neighborhood, city: data.user.city, state: data.user.state, birthDate: data.user.birthDate, nacionality: data.user.nacionality, }); if (!updateUserRes) { throw new Error("Falha ao atualizar usuário"); }

        const processedData = {
          roomId: data.roomId,
          checkIn: new Date(data.checkIn),
          checkOut: new Date(data.checkOut),
          notes: data.notes,
          guests: data.guests
            .filter((g) => g.birthDate)
            .map((g) => ({
              name: g.name,
              cpf: g.cpf,
              birthDate: new Date(g.birthDate),
              type: g.type,
            })),
        };

        const selectedRoomId = data.roomId;
        const selectedRoomLocal = rooms.find((r) => r.id === selectedRoomId);
        const dailyPrice = selectedRoomLocal?.price ?? 0;

        const checkInDate = new Date(data.checkIn);
        const checkOutDate = new Date(data.checkOut);
        const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
        const numberOfNights = Math.max(1, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
        const total = dailyPrice * numberOfNights;

        await createCustomer(session);
        const book = await createBook(processedData);
        const createChargeRes = await createCharge(session.user.id, total, book.id);

        setCharge(createChargeRes);
        nextStep();
        toast.success("Reserva criada com sucesso!");
        router.refresh();
      } catch (err: any) {
        console.error("Erro no onSubmit:", err);
        toast.error(err?.message || "Erro ao criar reserva");
      } finally {
        setOnSubmitting(false);
      }
    },
    [nextStep, rooms, session]
  );

  const ageConfig = {
    adult: { label: "Adultos", icon: User },
    elderly: { label: "Idosos", icon: UserRoundPlus },
    child: { label: "Crianças", icon: UserRoundMinus },
    baby: { label: "Bebês", icon: Baby },
  } as const;

  return (
    <Card className="w-full max-w-[600px] mx-auto mb-10">
      <CardHeader className="px-4">
        <CardTitle>Agendar reserva</CardTitle>
        <CardDescription>Informe os dados para realizar sua reserva</CardDescription>
      </CardHeader>

      <CardContent className="px-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* progress */}
          <div className="py-4 flex items-center justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-1/6 h-1 rounded-full transition-colors duration-200 ${i <= step ? "bg-blue-500" : "bg-muted-foreground"
                  }`}
              />
            ))}
          </div>

          <AnimatePresence initial={false} custom={step} mode="wait">
            {step === 0 && (
              <motion.div
                key="step-0"
                custom={0}
                initial={{ x: 50, opacity: 0, scale: 0.98 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: -50, opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className="space-y-6"
              >
                {/* Dates & Room */}
                <FieldGroup>
                  <Controller
                    name="roomId"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field className="gap-2" data-invalid={fieldState.invalid}>
                        <FieldLabel>Quarto</FieldLabel>
                        <Select
                          onValueChange={(v) => {
                            field.onChange(v);
                            setSelectedRange(undefined);
                            form.setValue("checkIn", "");
                            form.setValue("checkOut", "");
                          }}
                          value={field.value}
                          disabled={loadingRooms}
                        >
                          <SelectTrigger className="rounded-full w-full !h-10">
                            <SelectValue placeholder={loadingRooms ? "Carregando quartos..." : "Selecione um quarto"} />
                          </SelectTrigger>
                          <SelectContent className="max-h-60 overflow-y-auto" position="popper">
                            {rooms.map((room) => (
                              <SelectItem key={room.id} value={room.id}>
                                {room.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />

                  <div className="w-full">
                    <Field>
                      <FieldLabel>Período (selecione check-in e check-out)</FieldLabel>
                      <div className="border rounded-md p-3 grid">
                        <Calendar
                          locale={ptBR}
                          className="border rounded-md mx-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                          mode="range"
                          selected={selectedRange}
                          onSelect={(r) => handleSelectRange(r as DateRange | undefined)}
                          disabled={disabledDays}
                          fromDate={new Date()}
                        />
                        <div className="flex justify-around w-full text-sm mx-auto items-center mt-5">
                          <div>
                            <div className="text-xs text-muted-foreground">Check-in</div>
                            <div className="font-medium">{form.getValues("checkIn") || "—"}</div>
                            <span className="font-medium">14:00 - 20:00</span>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">Check-out</div>
                            <div className="font-medium">{form.getValues("checkOut") || "—"}</div>
                            <span className="font-medium">12:00</span>
                          </div>
                        </div>
                      </div>
                    </Field>
                  </div>
                </FieldGroup>

                {/* Guests */}
                <div className="space-y-3">
                  <p className="font-medium">Hóspedes</p>

                  {fields.map((guest, index) => (
                    <div key={guest.id}>
                      {index > 0 && <hr className="my-5 border-1" />}
                      <div className="grid gap-3">
                        <div className="flex items-start">
                          <Controller
                            name={`guests.${index}.name`}
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <div className="flex-[4] relative">
                                <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">
                                  Nome completo
                                </label>
                                <Input className="rounded-l-full" placeholder="Nome completo" {...field} />
                                <FieldError className="m-0 p-0" errors={[fieldState.error]} />
                              </div>
                            )}
                          />

                          <Controller
                            name={`guests.${index}.type`}
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="flex-[1] border-l-0 shadow-none rounded-r-full">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent position="popper" className="max-h-60">
                                  <SelectItem value="adult">Adulto</SelectItem>
                                  <SelectItem value="elderly">Idoso</SelectItem>
                                  <SelectItem value="child">Criança</SelectItem>
                                  <SelectItem value="baby">Bebê</SelectItem>
                                </SelectContent>
                                <FieldError errors={[fieldState.error]} />
                              </Select>
                            )}
                          />
                        </div>

                        <div className="flex items-start">
                          <Controller
                            name={`guests.${index}.cpf`}
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <div className="flex-[4] relative">
                                <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">
                                  CPF
                                </label>
                                <Input
                                  className="rounded-l-full"
                                  placeholder="CPF"
                                  value={formatCPF(field.value)}
                                  onChange={(e) => {
                                    const onlyDigits = e.target.value.replace(/\D/g, "");
                                    field.onChange(onlyDigits);
                                  }}
                                  onBlur={field.onBlur}
                                  ref={field.ref}
                                />
                                <FieldError errors={[fieldState.error]} />
                              </div>
                            )}
                          />

                          <Controller
                            name={`guests.${index}.birthDate`}
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <div className="flex-[3] relative">
                                <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">
                                  Nascimento
                                </label>
                                <Input type="date" className="rounded-r-full" {...field} />
                                <FieldError errors={[fieldState.error]} />
                              </div>
                            )}
                          />
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        className="rounded-full flex mx-auto w-40 cursor-pointer text-red-500 mt-2"
                        onClick={() => remove(index)}
                      >
                        Remover <Trash />
                      </Button>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full rounded-full cursor-pointer"
                    disabled={fields.length >= 3}
                    onClick={() =>
                      append({
                        name: "",
                        cpf: "",
                        birthDate: undefined,
                        type: "adult",
                      })
                    }
                  >
                    {fields.length >= 3 ? (
                      <span className="flex items-center gap-2">
                        Quantidade máxima do quarto atingida <Ban />
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Adicionar hóspede <UserPlus />
                      </span>
                    )}
                  </Button>
                </div>

                {/* Notes */}
                <Controller
                  name="notes"
                  control={form.control}
                  render={({ field }) => <Textarea placeholder="Observações (opcional)" {...field} />}
                />

                <Button
                  type="button"
                  className="w-full cursor-pointer flex items-center gap-x-2 rounded-full"
                  onClick={nextStep}
                >
                  Continuar <ArrowRight />
                </Button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step-1"
                custom={1}
                initial={{ x: 50, opacity: 0, scale: 0.98 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: -50, opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className="space-y-6"
              >
                <div className="mb-8">
                  <h1 className="font-semibold">Dados do responsável</h1>
                  <p className="text-sm text-muted-foreground">
                    Precisamos de mais alguns dados do representante da reserva para sua segurança e dos demais hóspedes
                  </p>
                </div>

                <FieldGroup className="gap-6">
                  <Controller
                    name="user.name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="relative">
                        <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">
                          Nome completo
                        </label>
                        <Input {...field} className="rounded-full h-12 px-5" placeholder="Digite o nome completo" />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />

                  <Controller
                    name="user.cpf"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="relative">
                        <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">
                          CPF
                        </label>
                        <Input
                          className="rounded-full h-12"
                          placeholder="CPF"
                          value={formatCPF(field.value)}
                          onChange={(e) => {
                            const onlyDigits = e.target.value.replace(/\D/g, "");
                            field.onChange(onlyDigits);
                          }}
                          onBlur={field.onBlur}
                          ref={field.ref}
                        />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />

                  <Controller
                    name="user.email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="relative">
                        <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">Email</label>
                        <Input {...field} type="email" className="rounded-full h-12 px-5" placeholder="email@exemplo.com" />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />

                  <Controller
                    name="user.phoneNumber"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="relative">
                        <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">Telefone</label>
                        <Input
                          value={formatAndMaskPhoneNumber(field.value)}
                          onChange={(e) => {
                            const onlyDigits = e.target.value.replace(/\D/g, "");
                            field.onChange(onlyDigits);
                          }}
                          onBlur={field.onBlur}
                          ref={field.ref}
                          className="rounded-full h-12 px-5"
                          placeholder="(00) 00000-0000"
                        />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />

                  <div className="flex w-full">
                    <Controller
                      name="user.documentType"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field className="relative w-1/2" data-invalid={fieldState.invalid}>
                          <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">Tipo de documento</label>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="rounded-l-full !h-12 w-full px-5">
                              <SelectValue placeholder="RG" />
                            </SelectTrigger>
                            <SelectContent position="popper" className="max-h-60">
                              <SelectItem value="rg">RG</SelectItem>
                              <SelectItem value="cnh">CNH</SelectItem>
                              <SelectItem value="passaporte">Passaporte</SelectItem>
                              <SelectItem value="rne">RNE</SelectItem>
                            </SelectContent>
                          </Select>
                          <FieldError errors={[fieldState.error]} />
                        </Field>
                      )}
                    />

                    <Controller
                      name="user.nacionality"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field className="relative w-1/2">
                          <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">Nacionalidade</label>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="rounded-r-full !h-12 w-full px-5">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent position="popper" className="max-h-60">
                              <div className="max-h-40 overflow-y-auto">
                                {Countrys.map((pais) => (
                                  <SelectItem key={pais} value={pais}>
                                    {pais}
                                  </SelectItem>
                                ))}
                              </div>
                            </SelectContent>
                          </Select>
                          <FieldError errors={[fieldState.error]} />
                        </Field>
                      )}
                    />
                  </div>

                  <div className="flex w-full">
                    <Controller
                      name="user.documentNumber"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="relative w-2/3">
                          <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">Número do documento</label>
                          <Input {...field} className="rounded-l-full h-12 w-full px-5" />
                          <FieldError errors={[fieldState.error]} />
                        </Field>
                      )}
                    />

                    <Controller
                      name="user.ufEmitter"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="relative w-1/3">
                          <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">UF</label>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="rounded-r-full !h-12 w-full px-5">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent position="popper" className="max-h-60">
                              {brazilStates.map((uf) => (
                                <SelectItem key={uf} value={uf}>
                                  {uf}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FieldError errors={[fieldState.error]} />
                        </Field>
                      )}
                    />
                  </div>

                  <Controller
                    name="user.birthDate"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <div className="flex-[3] relative">
                        <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">Data de nascimento</label>
                        <Input type="date" className="rounded-full h-12" {...field} />
                        <FieldError errors={[fieldState.error]} />
                      </div>
                    )}
                  />

                  <div className="flex items-center gap-x-2 w-full">
                    <hr className="w-2/5" />
                    <span className="w-1/5 text-xs text-center">Endereço</span>
                    <hr className="w-2/5" />
                  </div>

                  <div className="flex w-full">
                    <Controller
                      name="user.cep"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="relative w-2/3">
                          <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">CEP</label>
                          <Input {...field} className="rounded-l-full h-12 w-full px-5" />
                          <FieldError errors={[fieldState.error]} />
                        </Field>
                      )}
                    />

                    <Controller
                      name="user.houseNumber"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="relative w-1/3">
                          <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">Número</label>
                          <Input {...field} className="rounded-r-full h-12 w-full px-5" />
                          <FieldError errors={[fieldState.error]} />
                        </Field>
                      )}
                    />
                  </div>

                  <Controller
                    name="user.street"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="relative">
                        <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">Rua</label>
                        <Input {...field} className="rounded-full h-12 w-full px-5" />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />

                  <Controller
                    name="user.neighborhood"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="relative">
                        <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">Bairro</label>
                        <Input {...field} className="rounded-full h-12 w-full px-5" />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />

                  <Controller
                    name="user.city"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="relative">
                        <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">Cidade</label>
                        <Input {...field} className="rounded-full h-12 w-full px-5" />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />

                  <Controller
                    name="user.state"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="relative">
                        <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">Estado</label>
                        <Input {...field} className="rounded-full h-12 w-full px-5" />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />
                </FieldGroup>

                <div className="gap-4 grid-cols-2 grid">
                  <Button
                    className="w-full cursor-pointer flex items-center gap-x-2 rounded-full h-10"
                    type="button"
                    variant={"outline"}
                    onClick={prevStep}
                  >
                    <ArrowLeft /> Voltar
                  </Button>

                  <Button className="w-full cursor-pointer flex items-center gap-x-2 rounded-full h-10" disabled={onSubmitting}>
                    {onSubmitting ? (
                      <span className="flex gap-x-2 items-center">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Reservar
                      </span>
                    ) : (
                      "Reservar"
                    )}
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                custom={2}
                initial={{ x: 50, opacity: 0, scale: 0.98 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: -50, opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className="space-y-6"
              >
                <div>
                  <div>
                    <h1 className="text-lg font-medium text-center">Pré-reserva realizada com sucesso</h1>
                    <p className="text-[10px] font-medium text-muted-foreground text-center">
                      Realize o pagamento em até 24h para garantir sua reserva
                    </p>
                  </div>

                  <Card className="my-2 p-5 gap-3">
                    <span className="text-xl font-semibold">
                      <p>{selectedRoom?.name ?? ""}</p>
                    </span>

                    <div className="flex items-center gap-x-5 text-sm">
                      <span>
                        <p className="font-medium text-base">Check-in</p>
                        <p>
                          {form.watch("checkIn")
                            ? new Date(form.watch("checkIn")).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })
                            : "—"}
                        </p>
                      </span>
                      <span>-</span>
                      <span>
                        <p className="font-medium text-base">Check-out</p>
                        <p>
                          {form.watch("checkOut")
                            ? new Date(form.watch("checkOut")).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })
                            : "—"}
                        </p>
                      </span>
                    </div>

                    <div>
                      <h1 className="font-medium text-base">Responsável pela reserva</h1>
                      <ul>
                        <li>{session.user.name}</li>
                        <li>{maskCPF(session.user.cpf)}</li>
                      </ul>
                    </div>

                    <div>
                      <h1 className="font-medium text-base">Hóspedes</h1>
                      <ul className="list-disc ml-5 space-y-1">
                        {form.watch("guests").length === 0 && <li className="list-none text-muted-foreground">Nenhum hóspede adicionado</li>}
                        {form.watch("guests").map((guest: any, index: any) => (
                          <li key={index}>{guest.name || `Hóspede ${index + 1}`}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h1 className="font-medium text-base">Faixa etária</h1>
                      <ul className="space-y-1">
                        {Object.entries(ageCount).map(([type, count]) => {
                          if (count === 0) return null;
                          const Icon = ageConfig[type as keyof typeof ageConfig].icon;
                          const label = ageConfig[type as keyof typeof ageConfig].label;
                          return (
                            <li key={type} className="flex items-center gap-x-2 text-sm">
                              <Icon size={14} />
                              {count}x {label}
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <hr className="border border-dashed" />
                    <h1 className="text-xl text-green-800 font-semibold">
                      R$ {totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </h1>
                    <p className="text-[10px] text-muted-foreground font-medium mt-2">
                      *Caso não realize o pagamento em até 24h, a data da reserva será disponibilizada
                    </p>

                    <div>
                      {charge?.invoiceUrl && (
                        <a href={charge.invoiceUrl} target="_blank" rel="noopener noreferrer">
                          <Button
                            type="button"
                            className="text-white cursor-pointer bg-blue-500 rounded-full w-full max-w-[300px] flex mx-auto mt-5"
                          >
                            Realizar pagamento
                          </Button>
                        </a>
                      )}
                    </div>
                  </Card>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </CardContent>
    </Card>
  );
}
