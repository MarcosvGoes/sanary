"use client";

import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { Calendar } from "@/shared/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { toast } from "sonner";
import { blockRoomDates } from "../actions/blockDate";
import { useRouter } from "next/navigation";
import { ptBR } from "date-fns/locale";

type RoomOption = {
  id: string;
  title: string;
};

export default function CalendarBlock({ rooms }: { rooms: RoomOption[] }) {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleBlock() {
    if (!roomId) {
      toast.error("Selecione um quarto");
      return;
    }

    if (!range?.from || !range?.to) {
      toast.error("Selecione o período");
      return;
    }

    setLoading(true);

    try {
      await blockRoomDates({
        roomId,
        checkIn: range.from,
        checkOut: range.to,
        notes,
      });

      toast.success("Período bloqueado com sucesso");
      setNotes("");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message ?? "Erro ao bloquear datas");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto grid gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <Select onValueChange={setRoomId}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione o quarto" />
        </SelectTrigger>
        <SelectContent>
          {rooms.map((room) => (
            <SelectItem key={room.id} value={room.id}>
              {room.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Calendar
        mode="range"
        locale={ptBR}
        selected={range}
        onSelect={setRange}
        disabled={(date) => date < new Date()}
        className="mx-auto w-full max-w-lg border rounded-md shadow-md cursor-pointer"
      />

      <Textarea
        placeholder="Motivo do bloqueio (opcional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="resize-none"
      />

      <Button onClick={handleBlock} disabled={loading} className="w-full">
        {loading ? "Bloqueando..." : "Bloquear período"}
      </Button>
    </div>
  );
}
