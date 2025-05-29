import { Timestamp } from "firebase/firestore";
import { NextPage } from "next";
import { Ticket, TicketPriority } from "@/Entities/Ticket.model";
import TicketCard from "@/components/ticket-card/ticket-card.component";
import "./ticketsPage.css";
import TicketsTabs from "@/components/tickets-tabs/tickets-tabs";

const Tickets: NextPage = () => {
  return (
    <section className="ticketSection">
      <TicketsTabs />
    </section>
  );
};

export default Tickets;
