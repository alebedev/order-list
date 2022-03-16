import { ReactNode } from "react";

import { useAppSelector } from "../../app/hooks";
import { selectContacts, Address } from "./contactsSlice";
import "./Contacts.scss";
import { selectUser } from "../user/userSlice";

export function Contacts() {
  const contacts = useAppSelector(selectContacts);
  const user = useAppSelector(selectUser);
  return (
    <div className="contacts">
      <Section className="contactsHeader" title={`Contact ${user.firstName}`}>
        <a href={`mailto:${contacts.email}`} className="contactLink">
          {contacts.email}
        </a>
        <a href={`tel:${contacts.phone}`} className="contactLink">
          {contacts.phone}
        </a>
      </Section>
      <Section className="shippingHeader" title="Shipping address">
        <AddressInfo address={contacts.shipping} />
      </Section>
      <Section className="invoiceHeader" title="Invoice address">
        <AddressInfo address={contacts.invoice} />
      </Section>
    </div>
  );
}

function Section({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`contactSection ${className}`}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function AddressInfo({ address }: { address: Address }) {
  return (
    <div className="contactDetails">
      {address.street},<br />
      {address.postalCode} {address.city} {address.country}
    </div>
  );
}
