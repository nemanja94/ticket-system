import { FunctionComponent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Ticket, TicketPriority } from "@/Entities/Ticket.model";
import { Timestamp } from "firebase/firestore";

type Props = {
  ticket: Ticket;
};

const priorityColors: Record<TicketPriority, string> = {
  [TicketPriority.NizakPrioritet]: "bg-yellow-500/80 text-yellow-950",
  [TicketPriority.SrednjiPrioritet]: "bg-orange-500/80 text-orange-950",
  [TicketPriority.VisokPrioritet]: "bg-red-500/80 text-red-950",
};

const labelStyle = "text-zinc-500 mb-1";
const valueStyle = "font-medium";
const sectionStyle = "flex flex-col";

const formatDate = (date: string | Timestamp) => {
  if (date instanceof Timestamp) {
    return date.toDate().toLocaleDateString();
  }
  return date;
};

const TicketCard: FunctionComponent<Props> = ({ ticket }) => {
  const cardColor = priorityColors[ticket.ticketPriority] || "bg-gray-200 text-gray-950";

  return (
    <Card className="overflow-hidden border-none h-full shadow-lg hover:shadow-xl transition-shadow duration-200">
      <CardHeader className={`${cardColor} p-4`}>
        <CardTitle className="text-lg font-bold">{ticket.ticketTitle}</CardTitle>
        <CardDescription className="font-medium text-sm opacity-90">
          {formatDate(ticket.ticketDateCreated)}
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-zinc-200 p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className={sectionStyle}>
            <p className={labelStyle}>Prioritet</p>
            <p className={valueStyle}>{ticket.ticketPriority}</p>
          </div>
          <div className={sectionStyle}>
            <p className={labelStyle}>Status</p>
            <p className={valueStyle}>{ticket.ticketStatus}</p>
          </div>
          <div className={sectionStyle}>
            <p className={labelStyle}>Majstor</p>
            <p className={valueStyle}>{ticket.repairmanName}</p>
          </div>
          <div className={sectionStyle}>
            <p className={labelStyle}>Musterija</p>
            <p className={valueStyle}>{ticket.customerName}</p>
          </div>
          <div className={sectionStyle}>
            <p className={labelStyle}>Proizvodjac</p>
            <p className={valueStyle}>{ticket.vehicleManufacturer}</p>
          </div>
          <div className={sectionStyle}>
            <p className={labelStyle}>Model</p>
            <p className={valueStyle}>{ticket.vehicleModel}</p>
          </div>
          <div className={`${sectionStyle} col-span-2`}>
            <p className={labelStyle}>Br. sasije</p>
            <p className={valueStyle}>{ticket.vehicleIdNumber}</p>
          </div>
          <div className={`${sectionStyle} col-span-2`}>
            <p className={labelStyle}>Opis</p>
            <p className={valueStyle}>{ticket.ticketDesc}</p>
          </div>
          {ticket.ticketNote && (
            <div className={`${sectionStyle} col-span-2`}>
              <p className={labelStyle}>Napomena</p>
              <p className={valueStyle}>{ticket.ticketNote}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-zinc-300 p-3 flex justify-between items-center text-sm">
        <p className={labelStyle}>ID tiketa</p>
        <p className="font-semibold">{ticket.ticketId}</p>
      </CardFooter>
    </Card>
  );
};

export default TicketCard;
