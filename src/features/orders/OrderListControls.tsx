import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ordersSlice, selectOrders } from "./ordersSlice";
import "./OrderListControls.scss";

export function OrderListControls() {
  const { page, pagesTotal } = useAppSelector(selectOrders);
  const dispatch = useAppDispatch();

  if (!pagesTotal) {
    return null;
  }
  // TODO: Handle large number of pages
  const pages = new Array(pagesTotal);
  for (let i = 0; i < pagesTotal; i++) {
    pages.push(i);
  }

  return (
    <div className="pageControls">
      <button
        disabled={page === 0}
        onClick={() => dispatch(ordersSlice.actions.prevPage())}
      >
        Back
      </button>
      {pages.map((i) => (
        <PageLink key={i} pageIndex={i} current={i === page} />
      ))}
      <button
        disabled={page === pagesTotal - 1}
        onClick={() => dispatch(ordersSlice.actions.nextPage())}
      >
        Next
      </button>
    </div>
  );
}

function PageLink({
  pageIndex,
  current,
}: {
  pageIndex: number;
  current?: boolean;
}) {
  const dispatch = useAppDispatch();
  const title = pageIndex + 1;
  return (
    <button
      disabled={current}
      className={`pageLink ${current ? "current" : ""}`}
      onClick={() => dispatch(ordersSlice.actions.setPage(pageIndex))}
    >
      {title}
    </button>
  );
}
