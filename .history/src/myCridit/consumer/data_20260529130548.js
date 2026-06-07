export const consumerData = {
  profile: {
    id: "c1",
    name: "Mohamed El Mansouri",
    cin: "BJ998877",
    phone: "+212 600 112 233",
    email: "mohamed.m@email.com",
    address: "Rue 14, Hay Riad, Rabat",
    avatar: "M",
    memberSince: "January 2026",
    trustScore: 92, // Score out of 100
    trustLevel: "Gold", // Gold, Silver, Bronze
    financialHealth: "Healthy", // Healthy, Warning, Critical
    nextPaymentDate: "2026-06-01",
    monthlyBudgetLimit: 5000
  },
  credits: [
    {
      id: "cr1",
      product: "Smart TV Samsung 55\"",
      date: "2026-03-15",
      totalAmount: 5500,
      paidAmount: 4000,
      remainingAmount: 1500,
      sellerName: "Electra Shop",
      status: "partial",
      lastPaymentDate: "2026-04-20",
      installments: 5,
      paidInstallments: 3
    },
    {
      id: "cr2",
      product: "Laptop HP Pavilion",
      date: "2026-04-10",
      totalAmount: 7500,
      paidAmount: 7500,
      remainingAmount: 0,
      sellerName: "Tech Hub",
      status: "paid",
      lastPaymentDate: "2026-05-01",
      installments: 3,
      paidInstallments: 3
    },
    {
      id: "cr3",
      product: "Smartphone iPhone 15",
      date: "2026-05-01",
      totalAmount: 11000,
      paidAmount: 0,
      remainingAmount: 11000,
      sellerName: "Mobile World",
      status: "unpaid",
      lastPaymentDate: null,
      installments: 10,
      paidInstallments: 0
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
      status: "Completed",
      confirmationId: "TRX-99210"
    },
    {
      id: "p2",
      creditId: "cr1",
      amount: 1000,
      date: "2026-04-20",
      method: "Transfer",
      note: "Online payment",
      status: "Completed",
      confirmationId: "TRX-99341"
    },
    {
      id: "p3",
      creditId: "cr2",
      amount: 7500,
      date: "2026-04-15",
      method: "Cash",
      note: "Full payment",
      status: "Completed",
      confirmationId: "TRX-99155"
    }
  ],
  notifications: [
    {
      id: "n1",
      type: "payment",
      title: "Payment Confirmed",
      message: "We received your 1000 DH payment for Smart TV. Your balance is now 1500 DH.",
      date: "2026-05-10",
      isRead: false
    },
    {
      id: "n2",
      type: "reminder",
      title: "Upcoming Due Date",
      message: "Friendly reminder: Your next installment for iPhone 15 is due in 5 days.",
      date: "2026-05-25",
      isRead: false
    },
    {
      id: "n3",
      type: "success",
      title: "Debt Cleared!",
      message: "Congratulations! You have fully paid for your Laptop HP Pavilion.",
      date: "2026-05-01",
      isRead: true
    }
  ],
  activityFeed: [
    {
      id: "a1",
      action: "Payment Received",
      amount: 1000,
      target: "Smart TV Samsung",
      date: "2026-04-20",
      icon: "💰"
    },
    {
      id: "a2",
      action: "Goal Reached",
      amount: 0,
      target: "Laptop Fully Paid",
      date: "2026-05-01",
      icon: "🎉"
    },
    {
      id: "a3",
      action: "New Credit Added",
      amount: 11000,
      target: "Smartphone iPhone 15",
      date: "2026-05-01",
      icon: "🛒"
    }
  ],
  monthlySummary: {
    month: "May 2026",
    totalPaidThisMonth: 8500,
    remainingInstallmentsThisMonth: 1,
    savingGoalProgress: 75
  }
};
