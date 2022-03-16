import { Order, OrderType, PaymentMethod, PaymentStatus } from "./ordersSlice";

let nextId = 1;
function getId() {
  return nextId++ + "";
}

export async function fetchOrders(
  page: number
): Promise<{ value: Order[]; page: number; pagesTotal: number }> {
  const mockOrders: Order[] = [
    {
      id: getId(),
      num: "123456780",
      createdAt: "2022-01-01T10:10:14Z",
      type: OrderType.Online,
      store: {
        country: "UK",
        name: "Butik X",
      },
      payment: {
        method: PaymentMethod.Qliro,
        displayName: "Invoice",
        status: PaymentStatus.Paid,
        amount: {
          value: "2160",
          currency: "SEK",
        },
      },
    },
    {
      id: getId(),
      num: "123456780",
      createdAt: "2022-01-01T10:10:14Z",
      type: OrderType.Instore,
      store: {
        country: "SE",
        name: "Butik X",
      },
      payment: {
        method: PaymentMethod.Visa,
        displayName: "Card, **** 1234",
        status: PaymentStatus.InProgress,
        amount: {
          value: "3890",
          currency: "SEK",
        },
      },
    },
    {
      id: getId(),
      num: "123456780",
      createdAt: "2022-01-01T10:10:14Z",
      type: OrderType.Manual,
      store: {
        country: "NO",
        name: "Butik X",
      },
      payment: {
        method: PaymentMethod.Amex,
        displayName: "Card, **** 1234",
        status: PaymentStatus.Failed,
        amount: {
          value: "1134",
          currency: "SEK",
        },
      },
    },
    {
      id: getId(),
      num: "123456780",
      createdAt: "2022-01-01T10:10:14Z",
      type: OrderType.Online,
      flagged: true,
      store: {
        country: "SE",
        name: "Butik X",
      },
      payment: {
        method: PaymentMethod.Paypal,
        displayName: "Paypal",
        status: PaymentStatus.InProgress,
        amount: {
          value: "567",
          currency: "SEK",
        },
      },
    },
    {
      id: getId(),
      num: "123456780",
      createdAt: "2022-01-01T10:10:14Z",
      type: OrderType.Online,
      store: {
        country: "NO",
        name: "Butik X",
      },
      payment: {
        method: PaymentMethod.Trustly,
        displayName: "Trustly",
        status: PaymentStatus.Paid,
        amount: {
          value: "1234",
          currency: "SEK",
        },
      },
    },
    {
      id: getId(),
      num: "123456780",
      createdAt: "2022-01-01T10:10:14Z",
      type: OrderType.Online,
      store: {
        country: "SE",
        name: "Butik X",
      },
      payment: {
        method: PaymentMethod.Visa,
        displayName: "Card, **** 1234",
        status: PaymentStatus.InProgress,
        amount: {
          value: "3890",
          currency: "SEK",
        },
      },
    },
  ];

  const pageSize = 5;

  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    page,
    pagesTotal: Math.ceil(mockOrders.length / pageSize),
    value: mockOrders.slice(page * pageSize, (page + 1) * pageSize),
  };
}
