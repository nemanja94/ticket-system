import { FunctionComponent } from "react";
import "./ticketCard.css";
import { Ticket, TicketPriority } from "@/Entities/Ticket.model";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  ticket: Ticket;
};

const priorityColors: Record<TicketPriority, string> = {
  [TicketPriority.NizakPrioritet]: "bg-yellow-500",
  [TicketPriority.SrednjiPrioritet]: "bg-orange-500",
  [TicketPriority.VisokPrioritet]: "bg-red-500",
};

const TicketCard: FunctionComponent<Props> = ({ ticket }) => {
  const cardColor = priorityColors[ticket.ticketPriority] || "bg-gray-200";

  return (
    <Card className="overflow-hidden border-none h-full">
      <CardHeader className={`${cardColor} overflow-hidden p-4`}>
        <CardTitle className="text-lg">{ticket.ticketTitle}</CardTitle>
        <CardDescription className="text-zinc-700 font-medium text-sm">
          Datum: {ticket.ticketDateCreated.toString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-zinc-200 p-4 space-y-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-zinc-500">Prioritet:</p>
            <p className="font-medium">{ticket.ticketPriority}</p>
          </div>
          <div>
            <p className="text-zinc-500">Status:</p>
            <p className="font-medium">{ticket.ticketStatus}</p>
          </div>
          <div>
            <p className="text-zinc-500">Korisnik:</p>
            <p className="font-medium">{ticket.repairmanName}</p>
          </div>
          <div>
            <p className="text-zinc-500">Opis:</p>
            <p className="font-medium">{ticket.ticketDesc}</p>
          </div>
          {ticket.ticketDesc && (
            <div className="col-span-2">
              <p className="text-zinc-500">Napomena:</p>
              <p className="font-medium">{ticket.ticketDesc}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-zinc-300 p-3 flex justify-between items-center">
        <p className="text-zinc-500">ID tiketa:</p>
        <p className="font-semibold">{ticket.ticketId}</p>
      </CardFooter>
    </Card>
  );
};

export default TicketCard;
