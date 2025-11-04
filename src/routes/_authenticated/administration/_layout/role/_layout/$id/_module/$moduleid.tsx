import FeaturePermissionList from '@/features/modules/role/components/permission/feature_permission-list'
import { getData } from '@/utils/dataClient'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react'
import { Suspense } from 'react'
import z from 'zod'

const BASE_KEY = "AppModuleFeatures"
export const appModuleFeatureRoleQueryOptions = (id?: number, moduleid?: number) => {

  return queryOptions({
    queryKey: id && moduleid ? [BASE_KEY, id, moduleid] : [BASE_KEY],
    queryFn: async () => {
      if (!id || !moduleid) {
        throw new Error("Both roleId and moduleId are required for this query.")
      }
      return await getData(`/role/${id}/module-features/${moduleid}`)
    },
    enabled: !!id && !!moduleid,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  })
}


const paramsSchema = z.object({
  id: z.union([z.literal("new"), z.coerce.number().refine((n) => !Number.isNaN(n), { message: "Invalid number", }),]),
  moduleid: z.union([z.literal("new"), z.coerce.number().refine((n) => !Number.isNaN(n), { message: "Invalid number", }),]),
})
export const Route = createFileRoute(
  '/_authenticated/administration/_layout/role/_layout/$id/_module/$moduleid',
)({
  params: {
    parse: (params) => paramsSchema.parse(params),
    stringify: ({ id, moduleid }) => ({ id: `${id}`, moduleid: `${moduleid}` }),
  },
  loader: ({ context, params: { id, moduleid } }) => {
    // console.log("🚀 Loader params:", id, moduleid, params, typeof params)
    if (id === "new") return null
    if (moduleid === "new") return null
    return context.queryClient.ensureQueryData(appModuleFeatureRoleQueryOptions(id, moduleid))
  },
  component: () => {
    const { id, moduleid } = Route.useParams()
    if (id === "new") return <FeaturePermissionList />
    if (moduleid === "new") return <FeaturePermissionList />

    const { data: feature } = useSuspenseQuery(appModuleFeatureRoleQueryOptions(id, moduleid))
    return <Suspense fallback={<Loader className="animate-spin text-green-600" />}>
      <FeaturePermissionList data={feature?.data} roleId={id} moduleId={moduleid} />
    </Suspense>
  },
  errorComponent: () => <div> <span className='bg-red-400  '>By ID:</span> Error loading feature data[]. </div>
  ,
  pendingComponent: () => <Loader className="animate-spin" />,
})


