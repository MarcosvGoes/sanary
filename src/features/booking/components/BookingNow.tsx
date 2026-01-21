"use client"

import { Controller, useFieldArray } from "react-hook-form"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { toast } from "sonner"
import { BookingSchema, bookingSchema, userFields } from "../schema/bookingSchema"
import { ArrowRight, Ban, Trash, UserPlus } from "lucide-react"
import { formatCPF } from "@/shared/utils/cpfValidator"
import { Textarea } from "@/shared/components/ui/textarea"
import { useZodForm } from "@/shared/hooks/useZodForm"
import { createBook } from "../actions/createBook"
import { useState } from "react"
import { AnimatePresence, motion } from "motion/react";
import { brazilStates } from "@/shared/utils/state"


export default function BookingNow(session: any) {
    const [step, setStep] = useState(0);

    const form = useZodForm(bookingSchema, {
        defaultValues: {
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
                name: "",
                email: "",
                phoneNumber: "",
                cpf: "",
                documentNumber: "",
                documentType: "",
                ufEmitter: "",
                cep: "",
                street: "",
                number: "",
                complement: "",
                neighborhood: "",
                city: "",
                state: "",
                profession: "",
                civilStatus: "",
                stateOfBirth: "",
                cityOfBirth: "",
                birthDate: "",
            },
        },
    })


    const stepFields: Record<number, Array<keyof BookingSchema>> = {
        0: [
            "checkIn",
            "checkOut",
            "guests",
            "notes",
        ],
        1: [],
        2: [],
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


    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "guests",
    })

    async function onSubmit(data: BookingSchema) {
        try {
            const processedData = {
                ...data,
                guests: data.guests
                    .filter(guest => guest.birthDate)
                    .map(guest => ({
                        ...guest,
                        birthDate: new Date(guest.birthDate as string),
                    })),
            }
            await createBook(processedData)

            toast.success("Reserva criada com sucesso!")

            form.reset()
        } catch (err) {
            console.error(err)
            toast.error("Erro ao criar reserva")
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
                                <FieldGroup className="grid grid-cols-2 gap-4">
                                    <Controller
                                        name="checkIn"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field className="gap-2" data-invalid={fieldState.invalid}>
                                                <FieldLabel>Check-in</FieldLabel>
                                                <Input type="date" className="rounded-full" {...field} />
                                                <FieldError errors={[fieldState.error]} />
                                            </Field>
                                        )}
                                    />

                                    <Controller
                                        name="checkOut"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field className="gap-2" data-invalid={fieldState.invalid}>
                                                <FieldLabel>Check-out</FieldLabel>
                                                <Input type="date" className="rounded-full" {...field} />
                                                <FieldError errors={[fieldState.error]} />
                                            </Field>
                                        )}
                                    />
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

                                <Button type="button" className="w-full clear-start cursor-pointer flex items-center gap-x-2 rounded-full" onClick={nextStep}>
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
                                                    className="rounded-full h-12"
                                                    placeholder="Digite o nome completo"
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
                                                    className="rounded-full h-12"
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
                                                    {...field}
                                                    className="rounded-full h-12"
                                                    placeholder="(00) 00000-0000"
                                                />
                                                <FieldError errors={[fieldState.error]} />
                                            </Field>
                                        )}
                                    />

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
                                                        className="rounded-l-full h-12 w-full"
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
                                                        <SelectTrigger className="rounded-r-full !h-12 w-full">
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
                                        name="user.documentType"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field
                                                data-invalid={fieldState.invalid}
                                            >
                                                <label className="absolute text-[10px] ml-2 px-1 bg-white -top-[7px] rounded-full max-w-fit">
                                                    Tipo
                                                </label>

                                                <Select value={field.value} onValueChange={field.onChange}>
                                                    <SelectTrigger className="rounded-r-full !h-12 w-full">
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

                                </FieldGroup>


                                <div className="gap-4 grid-cols-2 grid">
                                    <Button
                                        className="rounded-full h-10"
                                        type="button"
                                        variant={"outline"}
                                        onClick={prevStep}
                                    >
                                        Cancelar
                                    </Button>

                                    <Button type="button" className="w-full clear-start cursor-pointer flex items-center gap-x-2 rounded-full"
                                        onClick={nextStep}
                                    >
                                        Continuar <ArrowRight />
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
                                <FieldGroup className="gap-6">
                                    {[
                                        ["name", "Nome completo"],
                                        ["email", "Email"],
                                        ["phoneNumber", "Telefone"],
                                        ["cpf", "CPF"],
                                        ["documentNumber", "Documento"],
                                        ["documentType", "Tipo de documento"],
                                        ["ufEmitter", "UF emissor"],
                                        ["cep", "CEP"],
                                        ["street", "Rua"],
                                        ["number", "Número"],
                                        ["complement", "Complemento"],
                                        ["neighborhood", "Bairro"],
                                        ["city", "Cidade"],
                                        ["state", "Estado"],
                                        ["birthDate", "Data de nascimento", "date"],
                                    ].map(([name, label, type]) => (
                                        <Controller
                                            key={name}
                                            name={name as string}
                                            control={form.control}
                                            render={({ field, fieldState }) => (
                                                <Field data-invalid={fieldState.invalid} className="relative">
                                                    <FieldLabel
                                                        className="max-w-fit absolute bg-white left-6 -top-2 inline-flex px-2 text-xs text-muted-foreground pointer-events-none">
                                                        {label}
                                                    </FieldLabel>
                                                    <Input
                                                        className="rounded-full h-12"
                                                        {...field}
                                                        type={type ?? "text"}
                                                        value={field.value ?? ""}
                                                        aria-invalid={fieldState.invalid}
                                                    />
                                                    {fieldState.error && (
                                                        <FieldError errors={[fieldState.error]} />
                                                    )}
                                                </Field>
                                            )}
                                        />
                                    ))}
                                </FieldGroup>

                                <div className="gap-4 grid-cols-2 grid">
                                    <Button
                                        className="rounded-full h-10"
                                        type="button"
                                        variant={"outline"}
                                        onClick={prevStep}
                                    >
                                        Cancelar
                                    </Button>

                                    <Button type="button" className="w-full clear-start cursor-pointer flex items-center gap-x-2 rounded-full"
                                        onClick={nextStep}
                                    >
                                        Reservar
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </CardContent>
        </Card>
    )
}
