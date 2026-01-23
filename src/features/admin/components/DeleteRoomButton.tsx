"use client"
import { Button } from "@/shared/components/ui/button";
import { deleteRoom } from "../actions/deleteRoom";
import { useState } from "react";
import { Spinner } from "@/shared/components/ui/spinner";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
            console.log("Erro ao deletar quarto:", error);
            toast.error(error?.message || "Erro ao deletar quarto");
        } finally {
            setDeleting(false);
        }
    }


    return (
        <Button variant={"destructive"} disabled={deleting} onClick={handleDeleteProperty} className={`${className} cursor-pointer text-base`}>
            {deleting ? <span className="flex items-center gap-x-2"> <Spinner /> Deletando... </span> : "Deletar quarto"}
        </Button>
    )
}