import { ReactNode, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchOrdersAction, Order, selectOrders } from "./ordersSlice";
import { selectUser } from "../user/userSlice";
import "./Orders.scss";

// TODO: Position help
export function Orders() {
  const user = useAppSelector(selectUser);
  return (
    <div>
      <h2>{user.firstName}'s orders</h2>
      <div>(i) Help</div>
      <OrderList />
    </div>
  );
}

function OrderList() {
  const data = useAppSelector(selectOrders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrdersAction(data.page));
    // Only on first mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("o", data);

  if (data.status === "loading") {
    return <div>Loading...</div>;
  } else if (data.status === "failed") {
    return <div>Oops... Something went wrong</div>;
  }
  return (
    <div>
      <OrderListHeader />
      {(data.value ?? []).map((order) => (
        <OrderListItem key={order.id} order={order} />
      ))}
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
    <div className="orderLine">
      <LineItem>{order.num}</LineItem>
      <LineItem>{formatDate(order.createdAt)}</LineItem>
      <LineItem>{order.store.name}</LineItem>
      <LineItem>
        {order.payment.method} {order.payment.displayName}
      </LineItem>
      <LineItem>{order.payment.status}</LineItem>
      <LineItem>
        {order.payment.amount.value} {order.payment.amount.currency}
      </LineItem>

      <div className={`orderType ${order.type.toLowerCase()}`}>
        {order.type}
      </div>
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

function LineItem({ children }: { children: ReactNode }) {
  return <div className="orderItem">{children}</div>;
}

function OrderListControls() {
  return <div>TODO: Order list controls</div>;
}
