import {Timestamp} from "firebase/firestore";
import {NextPage} from "next";
import {Ticket, TicketPriority} from "@/Entities/Ticket.model";
import TicketCard from "@/components/ticket-card/ticket-card.component";
import "./ticketsPage.css";

const tickets: Ticket[] = [
    new Ticket(
        1,
        1,
        "Marko",
        "Markovic",
        1,
        "Opis vozila",
        100,
        TicketPriority.VisokPrioritet,
        Timestamp.fromDate(new Date())
    ),
    new Ticket(
        2,
        1,
        "Marko",
        "Markovic",
        1,
        "Opis vozila",
        200,
        TicketPriority.SrednjiPrioritet,
        Timestamp.fromDate(new Date())
    ),
    new Ticket(
        3,
        1,
        "Marko",
        "Markovic",
        1,
        "Opis vozila",
        300,
        TicketPriority.NizakPrioritet,
        Timestamp.fromDate(new Date())
    ),
];

const Tickets: NextPage = () => {
    return (
        // <section className="ticketSection">
        //     {tickets.map((ticket) => {
        //         // @ts-ignore
        //         ticket.ticketDateCreated = new Date(ticket.ticketDateCreated.seconds * 1000).toISOString().split("T")[0]
        //         return (
        //             <TicketCard key={ticket.ticketId} ticket={ticket}/>
        //         );
        //     })}
        // </section>
        <p>Tickets</p>
    );
};

export default Tickets;
