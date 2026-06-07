export const consumerData = {
  profile: {
    id: "c1",
    name: "Mohamed El Mansouri",
    cin: "BJ998877",
    phone: "+212 600 112 233",
    email: "mohamed.m@email.com",
    address: "Rue 14, Hay Riad, Rabat",
    avatar: "M"
  },
  credits: [
    {
      id: "cr1",
      product: "Smart TV Samsung 55\"",
      date: "2026-03-15",
      totalAmount: 5500,
      paidAmount: 2000,
      sellerName: "Electra Shop"
    },
    {
      id: "cr2",
      product: "Laptop HP Pavilion",
      date: "2026-04-10",
      totalAmount: 7500,
      paidAmount: 1500,
      sellerName: "Tech Hub"
    },
    {
      id: "cr3",
      product: "Smartphone iPhone 15",
      date: "2026-05-01",
      totalAmount: 11000,
      paidAmount: 0,
      sellerName: "Mobile World"
    }
  ],
  payments: [
    {
      id: "p1",
      creditId: "cr1",
      amount: 1000,
      date: "2026-03-20",
      method: "Cash"
    },
    {
      id: "p2",
      creditId: "cr1",
      amount: 1000,
      date: "2026-04-20",
      method: "Transfer"
    },
    {
      id: "p3",
      creditId: "cr2",
      amount: 1500,
      date: "2026-04-15",
      method: "Cash"
    }
  ]
};
