import { useAppSelector } from "../../app/hooks";
import { OrdersState, selectOrders } from "./ordersSlice";
import { selectUser } from "../user/userSlice";

export function Orders() {
  const user = useAppSelector(selectUser);
  return (
    <div>
      <h2>{user.firstName}'s orders</h2>
      <div>(i) Help</div>
      <OrderList></OrderList>
    </div>
  );
}

function OrderList() {
  const orders = useAppSelector(selectOrders);
  if (orders.status === "loading") {
    return <div>Loading...</div>;
  } else if (orders.status === "failed") {
    return <div>Oops... Something went wrong</div>;
  }
  return (
    <div>
      <OrderListHeader />
      TODO: Order list
      <OrderListControls />
    </div>
  );
}

function OrderListHeader() {
  return <div>TODO: List header</div>;
}

function OrderListControls() {
  return <div>TODO: Order list controls</div>;
}
