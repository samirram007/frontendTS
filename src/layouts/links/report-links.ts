export const reportLinks = [
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
                title: 'Stock In Hand (Batch Wise)',
                href: '/reports/stock_summary/stock-in-hand-batch-wise',
                visible: false,
                isActive: false,
                disabled: false,
            },

        ]

    },
    {
        title: 'Freight Reports',
        visible: false,
        menus: [
            {
                title: 'Freight (Godown Wise)',
                href: '/reports/freight/freight-godown-wise',
                visible: true,
                isActive: false,
                disabled: false,
            },
            {
                title: 'Freight (Transporter Wise)',
                href: '/reports/freight/freight-transporter-wise',
                visible: true,
                isActive: false,
                disabled: false,
            },
            {
                title: 'Freight (Vehicle Wise)',
                href: '/reports/freight/freight-vehicle-wise',
                visible: true,
                isActive: false,
                disabled: false,
            },
            {
                title: 'Freight (Billing Preference)',
                href: '/reports/freight/freight-billing-preference',
                visible: true,
                isActive: false,
                disabled: false,
            },

        ]

    }
]