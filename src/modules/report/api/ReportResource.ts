import { HttpMethods, type IHttpResourceOption } from '@/composable/fetch/useFetchHttp'

type KeyResource = 'listReport' | 'createReport'

const resources: Record<KeyResource, IHttpResourceOption> = {
  listReport: <IHttpResourceOption>{
    path: '/api/list-reports',
    method: HttpMethods.Get,
  },
  createReport: <IHttpResourceOption>{
    path: '/api/generate-report',
    method: HttpMethods.Post,
  },
}

export { resources }
