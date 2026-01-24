"use client"
import { Button } from "@/shared/components/ui/button";
import { deleteRoom } from "../actions/deleteRoom";
import { useState } from "react";
import { Spinner } from "@/shared/components/ui/spinner";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";

export default function DeleteRoomButton({ roomId, className }: { roomId: string, className?: string }) {
    const [deleting, setDeleting] = useState(false)
    const router = useRouter()

    async function handleDeleteProperty() {
        setDeleting(true)
        try {
            await deleteRoom(roomId)
            router.refresh()
            toast.success("Quarto deletado com sucesso")
        } catch (error: any) {
            toast.error(error?.message || "Erro ao deletar quarto");
        } finally {
            setDeleting(false);
        }
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"destructive"} className={`${className} cursor-pointer text-base`}>
                    {deleting ? <span className="flex items-center gap-x-2"> <Spinner /> Deletando... </span> : "Deletar quarto"}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Deletar imóvel
                    </DialogTitle>
                    <DialogDescription>
                        Esta ação é irreversível e será necessário recadastrar o imóvel
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-x-2 mt-4">
                    <DialogClose asChild>
                        <Button variant={"outline"}>
                            Fechar
                        </Button>
                    </DialogClose>
                    <Button variant={"destructive"} disabled={deleting} onClick={handleDeleteProperty} className={`${className} cursor-pointer text-base m-0`}>
                        {deleting ? <span className="flex items-center gap-x-2"> <Spinner /> Deletando... </span> : "Deletar quarto"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}