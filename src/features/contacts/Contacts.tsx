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
      <Section icon={null} title={`Contact ${user.firstName}`}>
        <a href={`mailto:${contacts.email}`} className="contactLink">
          {contacts.email}
        </a>
        <a href={`tel:${contacts.phone}`} className="contactLink">
          {contacts.phone}
        </a>
      </Section>
      <Section icon={null} title="Shipping address">
        <AddressInfo address={contacts.shipping} />
      </Section>
      <Section icon={null} title="Invoice address">
        <AddressInfo address={contacts.invoice} />
      </Section>
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: any;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="contactSection">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function AddressInfo({ address }: { address: Address }) {
  return (
    <div>
      {address.street},<br />
      {address.postalCode} {address.city} {address.country}
    </div>
  );
}
