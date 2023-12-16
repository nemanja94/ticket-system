import CustomersTabs from "@/components/customers-tabs/customers-tabs";
import "./customersPage.css";

export default function Customers() {
  //   const [customerFirstName, setCustomerFirstName] = useState<string>("");
  //   const [customerPhoneNumber, EsetCustomerPhoneNumber] = useState<string>("");

  return (
    <section className="customerSection">
      <CustomersTabs />
    </section>
  );
}
