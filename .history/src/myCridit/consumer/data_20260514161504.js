export const consumerData = {
  profile: {
    id: "c1",
    name: "Mohamed El Mansouri",
    cin: "BJ998877",
    phone: "+212 600 112 233",
    email: "mohamed.m@email.com",
    address: "Rue 14, Hay Riad, Rabat",
    avatar: "M",
    memberSince: "January 2026"
  },
  credits: [
    {
      id: "cr1",
      product: "Smart TV Samsung 55\"",
      date: "2026-03-15",
      totalAmount: 5500,
      paidAmount: 2000,
      remainingAmount: 3500,
      sellerName: "Electra Shop",
      status: "partial" // partial, unpaid, paid
    },
    {
      id: "cr2",
      product: "Laptop HP Pavilion",
      date: "2026-04-10",
      totalAmount: 7500,
      paidAmount: 7500,
      remainingAmount: 0,
      sellerName: "Tech Hub",
      status: "paid"
    },
    {
      id: "cr3",
      product: "Smartphone iPhone 15",
      date: "2026-05-01",
      totalAmount: 11000,
      paidAmount: 0,
      remainingAmount: 11000,
      sellerName: "Mobile World",
      status: "unpaid"
    },
    {
      id: "cr4",
      product: "Refrigerator LG 400L",
      date: "2026-02-20",
      totalAmount: 9000,
      paidAmount: 4500,
      remainingAmount: 4500,
      sellerName: "Home Appliances",
      status: "partial"
    }
  ],
  payments: [
    {
      id: "p1",
      creditId: "cr1",
      amount: 1000,
      date: "2026-03-20",
      method: "Cash",
      note: "Monthly installment",
      status: "Completed"
    },
    {
      id: "p2",
      creditId: "cr1",
      amount: 1000,
      date: "2026-04-20",
      method: "Transfer",
      note: "Online payment",
      status: "Completed"
    },
    {
      id: "p3",
      creditId: "cr2",
      amount: 7500,
      date: "2026-04-15",
      method: "Cash",
      note: "Full payment",
      status: "Completed"
    },
    {
      id: "p4",
      creditId: "cr4",
      amount: 4500,
      date: "2026-03-01",
      method: "Transfer",
      note: "First half",
      status: "Completed"
    }
  ],
  settings: {
    notifications: {
      email: true,
      push: false,
      sms: true
    },
    darkMode: false,
    language: "English"
  }
};
