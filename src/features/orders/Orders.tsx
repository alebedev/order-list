import { ReactNode, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchOrdersAction,
  Order,
  PaymentMethod,
  PaymentStatus,
  selectOrders,
} from "./ordersSlice";
import { selectUser } from "../user/userSlice";
import "./Orders.scss";
import { OrderListControls } from "./OrderListControls";

const paymentIcons = {
  [PaymentMethod.Qliro]: require("../../assets/qliro.svg").default,
  [PaymentMethod.Visa]: require("../../assets/visa.png"),
  [PaymentMethod.Amex]: require("../../assets/amex.png"),
  [PaymentMethod.Paypal]: require("../../assets/paypal.png"),
  [PaymentMethod.Trustly]: require("../../assets/trustly.svg").default,
};

export function Orders() {
  const user = useAppSelector(selectUser);
  return (
    <div className="ordersSection">
      <div className="sectionHeader">
        <h2>{user.firstName}'s orders</h2>
        <HelpLink />
      </div>

      <OrderList />
    </div>
  );
}

function HelpLink() {
  return (
    <div className="helpLink">
      <a
        href="#"
        className="greenLink"
        onClick={() => {
          alert("Help click");
        }}
      >
        <span className="helpIcon">i</span>
        Help
      </a>
    </div>
  );
}

function OrderList() {
  const data = useAppSelector(selectOrders);
  const dispatch = useAppDispatch();

  // Quick and dirty data loading.  Should use middleware to avoid mismatch between page and orders
  useEffect(() => {
    dispatch(fetchOrdersAction(data.page));
  }, [dispatch, data.page]);

  let body;
  if (data.status === "loading") {
    body = <div className="listStatus">Loading...</div>;
  } else if (data.status === "failed") {
    body = <div className="listStatus">Oops... Something went wrong</div>;
  } else {
    body = (data.value ?? []).map((order) => (
      <OrderListItem key={order.id} order={order} />
    ));
  }
  return (
    <div>
      <OrderListHeader />
      {body}
      <OrderListControls />
    </div>
  );
}

function OrderListHeader() {
  return (
    <div className="orderListHeader">
      <HeaderItem>Order number</HeaderItem>
      <HeaderItem>Created</HeaderItem>
      <HeaderItem>Store</HeaderItem>
      <HeaderItem>Payment method</HeaderItem>
      <HeaderItem>Payment status</HeaderItem>
      <HeaderItem>Amount</HeaderItem>
    </div>
  );
}

function OrderListItem({ order }: { order: Order }) {
  return (
    <div className="orderLine" data-testid="order">
      <LineItem>
        <a
          href="#"
          className="orderNum greenLink"
          onClick={() => {
            alert(`Order id=${order.id} click`);
          }}
        >
          {order.num}
        </a>
      </LineItem>
      <LineItem>{formatDate(order.createdAt)}</LineItem>
      <LineItem>
        <span className={`orderStore ${order.store.country.toLowerCase()}`}>
          {order.store.name}
        </span>
      </LineItem>
      <LineItem className="paymentMethod">
        <img src={paymentIcons[order.payment.method]} />
        {order.payment.displayName}
      </LineItem>
      <LineItem>
        <PaymentStatusDisplay status={order.payment.status} />
      </LineItem>
      <LineItem>
        {order.payment.amount.value} {order.payment.amount.currency}
      </LineItem>

      <div className={`orderType ${order.type.toLowerCase()}`}>
        {order.type}
      </div>

      {!!order.flagged && <div className="orderFlag"></div>}
    </div>
  );
}

function formatDate(isoDate: string) {
  const formatter = new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
  });
  return formatter.format(Date.parse(isoDate));
}

function HeaderItem({ children }: { children: ReactNode }) {
  return <div className="orderItem">{children}</div>;
}

function LineItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`orderItem ${className}`}>{children}</div>;
}

function PaymentStatusDisplay({ status }: { status: PaymentStatus }) {
  return (
    <span className={`paymentStatus ${status.toLowerCase()}`}>{status}</span>
  );
}
