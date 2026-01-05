
import { deliveryPlaceQueryOptions } from '@/features/modules/delivery_place/data/queryOptions';
import { deliveryVehicleQueryOptions } from '@/features/modules/delivery_vehicle/data/queryOptions';
import { stockUnitQueryOptions } from '@/features/modules/stock_unit/data/queryOptions';
import { transporterQueryOptions } from '@/features/modules/transporter/data/queryOptions';
import Freight from '@/features/modules/voucher/freight';
import { freightQueryOptions } from '@/features/modules/voucher/freight/data/queryOptions';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react';
import { Suspense } from 'react';

export const Route = createFileRoute('/_protected/transactions/freight/_layout/')({
  loader: async ({ context }) => {
    const { queryClient } = context;

    const [freight, stockUnits, deliveryPlaces, deliveryVehicles, transporter] = await Promise.all([
      queryClient.ensureQueryData(freightQueryOptions("delivery_note")),
      queryClient.ensureQueryData(stockUnitQueryOptions()),
      queryClient.ensureQueryData(deliveryPlaceQueryOptions()),
      queryClient.ensureQueryData(deliveryVehicleQueryOptions()),
      queryClient.ensureQueryData(transporterQueryOptions()),
    ]);

    return { freight, stockUnits, deliveryPlaces, deliveryVehicles, transporter };
  },
  component: () => {

    const { stockUnits, deliveryPlaces, deliveryVehicles, transporter } = Route.useLoaderData();

    const { data: freight } = useSuspenseQuery(freightQueryOptions('delivery_note'))
    // const { data: deliveryPlaces } = useSuspenseQuery(deliveryPlaceQueryOptions())
    // const { data: deliveryVehicles } = useSuspenseQuery(deliveryVehicleQueryOptions())

    return (
      <Suspense fallback={<Loader className="animate-spin" />}>
        <Freight data={freight?.data}
          stockUnits={stockUnits?.data}
          deliveryVehicles={deliveryVehicles?.data}
          deliveryPlaces={deliveryPlaces?.data}
          transporter={transporter?.data} />
      </Suspense>
    )
  },
  errorComponent: () => <div>Error loading freight data.</div>,
  pendingComponent: () => <Loader className="animate-spin" />,
})


