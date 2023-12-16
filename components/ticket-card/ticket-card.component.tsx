import {FunctionComponent} from "react";
import "./ticketCard.css";
import {Ticket, TicketPriority} from "@/Entities/Ticket.model";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

type Props = {
    ticket: Ticket;
};

const TicketCard: FunctionComponent<Props> = ({ticket: Ticket}) => {
    return (
        <Card className="overflow-hidden border-none">
            <CardHeader
                className={`${Ticket.ticketPriority === TicketPriority.VisokPrioritet ? "bg-red-400" : Ticket.ticketPriority === TicketPriority.SrednjiPrioritet ? "bg-orange-400" : "bg-yellow-400"} overflow-hidden`}>
                <CardTitle>Tiket {Ticket.ticketId}</CardTitle>
                <CardDescription
                    // @ts-ignore
                    className="text-zinc-700 font-semibold">{Ticket.ticketDateCreated} </CardDescription>
            </CardHeader>
            <CardContent className="bg-zinc-200">
                <p className="pt-2 text-lg font-semibold">{Ticket.repairmanFirstName} {Ticket.repairmanLastName}</p>
                <p className="pt-2 text-lg font-semibold">{Ticket.ticketDesc}</p>
            </CardContent>
            <CardFooter className="bg-zinc-300 w-full flex flex-col justify-center items-center">
                <p className="pt-2 text-lg font-semibold">-{Ticket.ticektPrice}</p>
            </CardFooter>
        </Card>


    )
        ;
};

export default TicketCard;
