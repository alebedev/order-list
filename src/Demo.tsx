import { UserHeader } from "./features/user/UserHeader";
import { Contacts } from "./features/contacts/Contacts";
import { Orders } from "./features/orders/Orders";

import "./fonts.scss";
import "./Demo.scss";

export default function Demo() {
  return (
    <div className="demo">
      <UserHeader />
      <Contacts />
      <Orders />
    </div>
  );
}
