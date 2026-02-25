export const reportLinks = [
  {
    title: 'Transaction Reports',
    visible: true,
    menus: [
      {
        title: 'Day Book',
        href: '/reports/day_book',
        visible: true,
        isActive: false,
        disabled: false,
      },
      {
        title: 'Order Book',
        href: '/reports/order_book',
        visible: true,
        isActive: false,
        disabled: false,
      },
    ],
  },
  {
    title: 'Stock Reports',
    visible: true,
    menus: [
      {
        title: 'Stock In Hand (Item Summary)',
        href: '/reports/stock_summary/stock-in-hand',
        visible: true,
        isActive: false,
        disabled: false,
      },
      {
        title: 'Stock In Hand (Item Wise)',
        href: '/reports/stock_summary/stock-in-hand-item-wise',
        visible: true,
        isActive: false,
        disabled: false,
      },
      {
        title: 'Stock In Hand (Godown Wise)',
        href: '/reports/stock_summary/stock-in-hand-godown-wise',
        visible: true,
        isActive: false,
        disabled: false,
      },
      {
        title: 'Stock In Hand (Voucher Wise)',
        href: '/reports/stock_summary/stock-in-hand-voucher-wise',
        visible: true,
        isActive: false,
        disabled: false,
      },
      {
        title: 'Stock In Hand (Batch Wise)',
        href: '/reports/stock_summary/stock-in-hand-batch-wise',
        visible: false,
        isActive: false,
        disabled: false,
      },
    ],
  },
  {
    title: 'Freight Reports',
    visible: true,
    menus: [
      {
        title: 'Freight (Godown Wise)',
        href: '/reports/freight/freight-godown-wise',
        visible: false,
        isActive: false,
        disabled: false,
      },
      {
        title: 'Freight (Transporter Wise)',
        href: '/reports/freight/freight-transporter-wise',
        visible: false,
        isActive: false,
        disabled: false,
      },
      {
        title: 'Freight (Vehicle Wise)',
        href: '/reports/freight/freight-vehicle-wise',
        visible: false,
        isActive: false,
        disabled: false,
      },
      {
        title: 'Freight (Billing Preference)',
        href: '/reports/freight/freight-billing-preference',
        visible: false,
        isActive: false,
        disabled: false,
      },
      {
        title: 'Freight (Voucher Wise)',
        href: '/reports/freight/freight-voucher-wise',
        visible: true,
        isActive: false,
        disabled: false,
      },
    ],
  },
]
