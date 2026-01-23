"use client"

import { Controller, FieldPath, useFieldArray } from "react-hook-form"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { toast } from "sonner"
import { BookingSchema, bookingSchema } from "../schema/bookingSchema"
import { ArrowLeft, ArrowRight, Baby, Ban, Loader2, Trash, User, UserPlus, UserRoundMinus, UserRoundPlus } from "lucide-react"
import { formatCPF, maskCPF } from "@/shared/utils/cpfValidator"
import { Textarea } from "@/shared/components/ui/textarea"
import { useZodForm } from "@/shared/hooks/useZodForm"
import { createBook } from "../actions/createBook"
import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react";
import { brazilStates } from "@/shared/utils/state"
import { fetchAddressByCep } from "@/shared/utils/fetchAddressByCep"
import { formatAndMaskPhoneNumber } from "@/shared/utils/formatAndMaskPhoneNumber"
import { authClient } from "@/features/auth/auth-client"
import { Countrys } from "@/shared/utils/countrys"
import { createCharge } from "@/features/billing/actions/createCharge"
import { createCustomer } from "@/features/billing/actions/createCustomer"
import { getAllRooms } from "@/features/admin/actions/getAllRooms"
import { getRoomUnavailableIntervals } from "../actions/roomDateAvailable"
import { format } from 'date-fns';
import { Calendar } from "@/shared/components/ui/calendar"
import { DateRange } from "react-day-picker"

export default function BookingNow({ session }: { session: any }) {
    const [step, setStep] = useState(0);
    const [onSubmiting, setOnSubmitting] = useState(false)
    const [charge, setCharge] = useState<any>(null);
    const [loadingRooms, setLoadingRooms] = useState(true)
    const [rooms, setRooms] = useState<{ id: string; name: string; price: number }[]>([])
    const [disabledIntervals, setDisabledIntervals] = useState<{ from: string, to: string }[]>([]);
    const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined);

    function getTodayISO() {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return today.toISOString().split("T")[0]
    }

    useEffect(() => {
        async function fetchRooms() {
            try {
                const roomsData = await getAllRooms()

                const formattedRooms = roomsData.map(room => ({
                    id: room.id,
                    name: room.title,
                    price: room.price,
                }))

                setRooms(formattedRooms)
            } catch (err) {
                console.error(err)
                toast.error("Erro ao carregar quartos")
            } finally {
                setLoadingRooms(false)
            }
        }
        fetchRooms()
    }, [])

    const disabledDays = useMemo(() => {
        const beforeToday = { before: new Date() };
        const ranges = disabledIntervals.map((r) => ({ from: new Date(r.from), to: new Date(r.to) }));
        return [beforeToday, ...ranges];
    }, [disabledIntervals]);

    function handleSelectRange(range: DateRange | undefined) {
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
    }

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
    })

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
                console.error("Erro ao buscar datas indisponíveis:", err);
                setDisabledIntervals([]);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [form.watch("roomId")]);

    const checkIn = form.watch("checkIn")
    const selectedRoom = rooms.find(r => r.id === form.watch("roomId"));
    const today = getTodayISO()
    const checkOut = form.getValues("checkOut")

    let numberOfDays = 0;
    if (checkIn && checkOut) {
        const inDate = new Date(checkIn);
        const outDate = new Date(checkOut);
        // diferença em ms
        const diffTime = outDate.getTime() - inDate.getTime();
        numberOfDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // converte para dias
    }

    const totalValue = (selectedRoom?.price ?? 0) * numberOfDays;

    function getMinCheckoutDate() {
        if (!checkIn) return ""

        const date = new Date(checkIn)
        date.setDate(date.getDate() + 1)
        return date.toISOString().split("T")[0]
    }

    useEffect(() => {
        const checkOut = form.getValues("checkOut")

        if (!checkIn || !checkOut) return

        const checkInDate = new Date(checkIn)
        const checkOutDate = new Date(checkOut)

        if (checkOutDate <= checkInDate) {
            form.setValue("checkOut", "")
        }
    }, [checkIn, form])

    type AgeCount = {
        adult: number
        elderly: number
        child: number
        baby: number
    }

    const stepFields: Record<number, FieldPath<BookingSchema>[]> = {
        0: [
            "checkIn",
            "checkOut",
            "guests",
            "notes",
        ],
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


    async function nextStep() {
        let fields = stepFields[step] || [];

        const isValid = await form.trigger(fields);

        if (!isValid) {
            toast.error("Preencha todos os campos obrigatórios antes de continuar.");
            return;
        }

        setStep((prev) => Math.min(prev + 1, 4));
    }

    function prevStep() {
        setStep((prev) => Math.max(prev - 1, 0));
    }

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0,
            scale: 0.98,
        }),
        center: { x: 0, opacity: 1, scale: 1 },
        exit: (direction: number) => ({
            x: direction > 0 ? -50 : 50,
            opacity: 0,
            scale: 0.98,
        }),
    };

    const ageConfig = {
        adult: {
            label: "Adultos",
            icon: User,
        },
        elderly: {
            label: "Idosos",
            icon: UserRoundPlus,
        },
        child: {
            label: "Crianças",
            icon: UserRoundMinus,
        },
        baby: {
            label: "Bebês",
            icon: Baby,
        },
    }

    const guests = form.watch("guests") ?? []

    const ageCount: AgeCount = guests.reduce(
        (acc: any, guest: any) => {
            acc[guest.type]++
            return acc
        },
        {
            adult: 0,
            elderly: 0,
            child: 0,
            baby: 0,
        }
    )

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "guests",
    })

    const watchCep = form.watch("user.cep");

    useEffect(() => {
        const formattedCep = watchCep.replace(/\D/g, "");

        if (formattedCep?.length === 8) {
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

    async function onSubmit(data: BookingSchema) {
        setOnSubmitting(true);

        try {
            const updateUserRes = await authClient.updateUser({
                name: data.user.name,
                phoneNumber: data.user.phoneNumber,
                cpf: data.user.cpf,
                documentNumber: data.user.documentNumber,
                documentType: data.user.documentType,
                ufEmitter: data.user.ufEmitter,
                cep: data.user.cep,
                street: data.user.street,
                houseNumber: data.user.houseNumber,
                complement: data.user.complement,
                neighborhood: data.user.neighborhood,
                city: data.user.city,
                state: data.user.state,
                birthDate: data.user.birthDate,
                nacionality: data.user.nacionality,
            });

            if (!updateUserRes) {
                throw new Error("Falha ao atualizar usuário");
            }

            const processedData = {
                roomId: data.roomId,
                checkIn: new Date(data.checkIn),
                checkOut: new Date(data.checkOut),
                notes: data.notes,
                guests: data.guests
                    .filter(guest => guest.birthDate)
                    .map(guest => ({
                        name: guest.name,
                        cpf: guest.cpf,
                        birthDate: new Date(guest.birthDate),
                        type: guest.type,
                    })),
            }

            const selectedRoomId = data.roomId;
            const selectedRoom = rooms.find(r => r.id === selectedRoomId);

            const dailyPrice = selectedRoom?.price ?? 0;

            const checkInDate = new Date(data.checkIn);
            const checkOutDate = new Date(data.checkOut);

            const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
            const numberOfNights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

            const totalValue = dailyPrice * numberOfNights;
            await createCustomer(session)
            const createChargeRes = await createCharge(session.user.id, totalValue);
            await createBook(processedData);
            setCharge(createChargeRes);

            nextStep();
            toast.success("Reserva criada com sucesso!");

        } catch (err: any) {
            console.error("Erro no onSubmit:", err);
            toast.error(err?.message || "Erro ao criar reserva");
        } finally {
            setOnSubmitting(false);
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto mb-10">
            <CardHeader className="px-4">
                <CardTitle>Agendar reserva</CardTitle>
                <CardDescription>
                    Informe os dados para realizar sua reserva
                </CardDescription>
            </CardHeader>

            <CardContent className="px-4">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

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
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.18 }}
                                className="space-y-6"
                            >

                                {/* Datas */}
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
                                                        // limpa seleção anterior quando trocar de quarto
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
                                            <div className="border rounded-md p-3 flex">
                                                <Calendar
                                                    className="border rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                                                    mode="range"
                                                    selected={selectedRange}
                                                    onSelect={(r) => handleSelectRange(r as DateRange | undefined)}
                                                    disabled={disabledDays}
                                                    fromDate={new Date()}
                                                />
                                                <div className="flex justify-around w-full text-sm mx-auto items-center">
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

                                {/* Hóspedes */}
                                <div className="space-y-3">
                                    <p className="font-medium">Hóspedes</p>

                                    {fields.map((guest, index) => (
                                        <div
                                            key={guest.id}
                                        >
                                            {index > 0 && <hr className="my-5 border-1" />}
                                            <div className="grid gap-3">
                                                <div className="flex items-start">
                                                    <Controller
                                                        name={`guests.${index}.name`}
                                                        control={form.control}
                                                        render={({ field, fieldState }) => (
                                                            <div className="flex-[4] relative">
                                                                <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">Nome completo</label>
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
                                                                <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">CPF</label>
                                                                <Input
                                                                    className="rounded-l-full"
                                                                    placeholder="CPF"
                                                                    value={formatCPF(field.value)}
                                                                    onChange={(e) => {
                                                                        const onlyDigits = e.target.value.replace(/\D/g, "")
                                                                        field.onChange(onlyDigits)
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
                                                                <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">Nascimento</label>
                                                                <Input
                                                                    type="date"
                                                                    className="rounded-r-full"
                                                                    {...field}
                                                                />
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

                                {/* Observações */}
                                <Controller
                                    name="notes"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Textarea
                                            placeholder="Observações (opcional)"
                                            {...field}
                                        />
                                    )}
                                />

                                <Button type="button" className="w-full cursor-pointer flex items-center gap-x-2 rounded-full" onClick={nextStep}>
                                    Continuar <ArrowRight />
                                </Button>


                            </motion.div>
                        )}

                        {step === 1 && (
                            <motion.div
                                key="step-1"
                                custom={1}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.18 }}
                                className="space-y-6"
                            >
                                <div className="mb-8">
                                    <h1 className="font-semibold">
                                        Dados do responsável
                                    </h1>
                                    <p className="text-sm text-muted-foreground">Precisamos de mais alguns dados do representante da reserva para sua segurança e dos demais hóspedes</p>
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
                                                <Input
                                                    {...field}
                                                    className="rounded-full h-12 px-5"
                                                    placeholder="Digite o nome completo"
                                                />
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
                                                        const onlyDigits = e.target.value.replace(/\D/g, "")
                                                        field.onChange(onlyDigits)
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
                                                <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">
                                                    Email
                                                </label>
                                                <Input
                                                    {...field}
                                                    type="email"
                                                    className="rounded-full h-12 px-5"
                                                    placeholder="email@exemplo.com"
                                                />
                                                <FieldError errors={[fieldState.error]} />
                                            </Field>
                                        )}
                                    />

                                    <Controller
                                        name="user.phoneNumber"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid} className="relative">
                                                <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">
                                                    Telefone
                                                </label>
                                                <Input
                                                    value={formatAndMaskPhoneNumber(field.value)}
                                                    onChange={(e) => {
                                                        const onlyDigits = e.target.value.replace(/\D/g, "")
                                                        field.onChange(onlyDigits)
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
                                                <Field className="relative w-1/2"
                                                    data-invalid={fieldState.invalid}
                                                >
                                                    <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">
                                                        Tipo de documento
                                                    </label>

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
                                                <Field className="relative w-1/2"
                                                >
                                                    <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">
                                                        Nacionalidade
                                                    </label>

                                                    <Select value={field.value} onValueChange={field.onChange}>
                                                        <SelectTrigger className="rounded-r-full !h-12 w-full px-5">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent position="popper" className="max-h-60">
                                                            <div className="max-h-40 overflow-y-auto">
                                                                {Countrys.map(pais => (
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
                                                <Field
                                                    data-invalid={fieldState.invalid}
                                                    className="relative w-2/3"
                                                >
                                                    <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">
                                                        Número do documento
                                                    </label>

                                                    <Input
                                                        {...field}
                                                        className="rounded-l-full h-12 w-full px-5"
                                                    />

                                                    <FieldError errors={[fieldState.error]} />
                                                </Field>
                                            )}
                                        />

                                        <Controller
                                            name="user.ufEmitter"
                                            control={form.control}
                                            render={({ field, fieldState }) => (
                                                <Field data-invalid={fieldState.invalid} className="relative w-1/3"
                                                >
                                                    <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">
                                                        UF
                                                    </label>

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
                                        name={`user.birthDate`}
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <div className="flex-[3] relative">
                                                <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">Data de nascimento</label>
                                                <Input
                                                    type="date"
                                                    className="rounded-full h-12"
                                                    {...field}
                                                />
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
                                                <Field
                                                    data-invalid={fieldState.invalid}
                                                    className="relative w-2/3"
                                                >
                                                    <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">
                                                        CEP
                                                    </label>

                                                    <Input
                                                        {...field}
                                                        className="rounded-l-full h-12 w-full px-5"
                                                    />

                                                    <FieldError errors={[fieldState.error]} />
                                                </Field>
                                            )}
                                        />

                                        <Controller
                                            name="user.houseNumber"
                                            control={form.control}
                                            render={({ field, fieldState }) => (
                                                <Field
                                                    data-invalid={fieldState.invalid}
                                                    className="relative w-1/3"
                                                >
                                                    <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">
                                                        Número
                                                    </label>

                                                    <Input
                                                        {...field}
                                                        className="rounded-r-full h-12 w-full px-5"
                                                    />

                                                    <FieldError errors={[fieldState.error]} />
                                                </Field>
                                            )}
                                        />
                                    </div>

                                    <Controller
                                        name="user.street"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field
                                                data-invalid={fieldState.invalid}
                                                className="relative"
                                            >
                                                <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">
                                                    Rua
                                                </label>

                                                <Input
                                                    {...field}
                                                    className="rounded-full h-12 w-full px-5"
                                                />
                                                <FieldError errors={[fieldState.error]} />
                                            </Field>
                                        )}
                                    />

                                    <Controller
                                        name="user.neighborhood"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field
                                                data-invalid={fieldState.invalid}
                                                className="relative"
                                            >
                                                <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">
                                                    Bairro
                                                </label>

                                                <Input
                                                    {...field}
                                                    className="rounded-full h-12 w-full px-5"
                                                />
                                                <FieldError errors={[fieldState.error]} />
                                            </Field>
                                        )}
                                    />

                                    <Controller
                                        name="user.city"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field
                                                data-invalid={fieldState.invalid}
                                                className="relative"
                                            >
                                                <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">
                                                    Cidade
                                                </label>

                                                <Input
                                                    {...field}
                                                    className="rounded-full h-12 w-full px-5"
                                                />
                                                <FieldError errors={[fieldState.error]} />
                                            </Field>
                                        )}
                                    />

                                    <Controller
                                        name="user.state"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field
                                                data-invalid={fieldState.invalid}
                                                className="relative"
                                            >
                                                <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">
                                                    Estado
                                                </label>

                                                <Input
                                                    {...field}
                                                    className="rounded-full h-12 w-full px-5"
                                                />
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

                                    <Button className="w-full cursor-pointer flex items-center gap-x-2 rounded-full h-10"
                                        disabled={onSubmiting}
                                    >
                                        {onSubmiting ? <span className="flex gap-x-2 items-center"><Loader2 className="w-4 h-4 animate-spin" />Reservar</span> : "Reservar"}
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step-2"
                                custom={2}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.18 }}
                                className="space-y-6"
                            >
                                {/* 
                                <Tabs defaultValue="bookingNow">
                                  <TabsList className="grid grid-cols-3 font-medium my-4 md:my-6 w-full">
                                        <TabsTrigger value="pix" className="shadow-none data-[state=active]:text-blue-500 md:text-xl lg:text-2xl cursor-pointer">
                                            <Image src={"/assets/icones/pix.svg"} alt="pix" height={16} width={16} />
                                            Pix
                                        </TabsTrigger>
                                        <TabsTrigger value="creditCard" className="shadow-none data-[state=active]:text-blue-500 md:text-xl lg:text-2xl cursor-pointer">
                                            <CreditCard />
                                            Cartão de crédito
                                        </TabsTrigger>
                                        <TabsTrigger value="boleto" className="shadow-none data-[state=active]:text-blue-500 md:text-xl lg:text-2xl cursor-pointer">
                                            <FileText />
                                            Boleto
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="pix">
                                        <Pix />
                                    </TabsContent>

                                    <TabsContent value="boleto">
                                        <Boleto />
                                    </TabsContent>

                                     <TabsContent value="creditCard">
                                        <BillCreditCard />
                                    </TabsContent>
                                </Tabs>
  */}


                                <div>
                                    <div>
                                        <h1 className="text-lg font-medium text-center">Pré-reserva realizada com sucesso</h1>
                                        <p className="text-[10px] font-medium text-muted-foreground text-center">Realize o pagamento em até 24h para garantir sua reserva</p>
                                    </div>
                                    <Card className="my-2 p-5 gap-3">
                                        <span>
                                            <p>{selectedRoom?.name ?? ""}</p>
                                        </span>

                                        <div className="flex items-center gap-x-5 text-sm">
                                            <span>
                                                <p className="font-medium text-base">Check-in</p>
                                                <p>{new Date(form.watch("checkIn")).toLocaleDateString("pt-BR", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric"
                                                })}</p>
                                            </span>
                                            <span>-</span>
                                            <span>
                                                <p className="font-medium text-base">Check-out</p>
                                                <p>{new Date(form.watch("checkOut")).toLocaleDateString("pt-BR", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric"
                                                })}</p>
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
                                                {form.watch("guests").length === 0 && (
                                                    <li className="list-none text-muted-foreground">
                                                        Nenhum hóspede adicionado
                                                    </li>
                                                )}

                                                {form.watch("guests").map((guest: any, index: any) => (
                                                    <li key={index}>
                                                        {guest.name || `Hóspede ${index + 1}`}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h1 className="font-medium text-base">Faixa etária</h1>

                                            <ul className="space-y-1">
                                                {Object.entries(ageCount).map(([type, count]) => {
                                                    if (count === 0) return null

                                                    const Icon = ageConfig[type as keyof typeof ageConfig].icon
                                                    const label = ageConfig[type as keyof typeof ageConfig].label

                                                    return (
                                                        <li key={type} className="flex items-center gap-x-2 text-sm">
                                                            <Icon size={14} />
                                                            {count}x {label}
                                                        </li>
                                                    )
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
    )
}
