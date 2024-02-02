import axios from 'axios'
import qs from 'query-string'
import { encrypt, decrypt } from '@/helpers/CryptoHelper.js'
import { dd, randomRequestId } from '@/helpers/util'

const endpointQuiz = import.meta.env.VITE_APP_QUIZZ_ENDPOINT
const endpoint = import.meta.env.VITE_APP_QUIZZ_ENDPOINT
const tokenEndpoint = endpoint + '/dmp/v1/oauth2/token'
const middlewareEndpoint = endpoint + import.meta.env.VITE_APP_MIDDLEWARE_PATH
const clientId = import.meta.env.VITE_APP_DMP_CLIENT_ID
const clientSecret = import.meta.env.VITE_APP_DMP_CLIENT_SECRET

function apiCall({
  method,
  url,
  data,
  params,
  decryptResponse = false,
  // encryptRequest = false,
  // addDefaultHeaders = false,
  customHeaders = {}
}) {
  const requestId = randomRequestId()
  // const finalPayload = encryptRequest ? encrypt(data, store) : data

  dd(`[API][${requestId}][Req]`, method, url, 'params', params, 'data:', data)

  // const defaultHeaders = addDefaultHeaders
  //   ? {
  //       Authorization: `Bearer ${store.state.accessToken}`,
  //       ultimatewarrior: store.state.pkc,
  //       bubbareydudley: store.state.undertaker,
  //       dr: store.state.kane
  //     }
  //   : {}

  return axios({
    method,
    url,
    params: params,
    data: data,
    headers: { ...customHeaders }
  }).then((response) => {
    if (!response || !response.data || !decryptResponse) {
      dd(`[API][${requestId}][Res]`, 'data:', response.data)
      return response
    }

    // const plainData = decrypt(response.data, store)
    // dd(`[API][${requestId}][Res]`, 'encrypted:', response.data, 'plain', plainData)
    dd(`[API][${requestId}][Res]`, 'response:', response.data)

    return { ...response }
  })
}

const client = {
  getKeySHA256({ store }) {
    return apiCall({
      method: 'get',
      url: middlewareEndpoint + '/Login/getKeySHA256',
      addDefaultHeaders: true,
      decryptResponse: false,
      encryptRequest: false,
      store
    })
  },

  getAccessToken() {
    const payload = {
      client_id: clientId,
      client_secret: clientSecret,
      scope: 'dmp',
      grant_type: 'client_credentials'
    }

    const queryString = qs.stringify(payload)

    return apiCall({
      method: 'post',
      url: tokenEndpoint,
      data: queryString,
      customHeaders: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      encryptRequest: false,
      decryptResponse: false,
      addDefaultHeaders: false
    })
  },

  login({ data, store }) {
    return apiCall({
      method: 'post',
      data,
      url: middlewareEndpoint + '/Login/Login',
      decryptResponse: false,
      encryptRequest: true,
      store
    })
  },

  getNotificationLimitViewAndTotalNotifByUsername({ data, store }) {
    return apiCall({
      method: 'post',
      url: middlewareEndpoint + '/Notification/getNotificationLimitViewAndTotalNotifByUsername',
      data,
      store
    })
  },

  getWorkspaceTypes({ data, store }) {
    return apiCall({
      method: 'get',
      data,
      url: middlewareEndpoint + '/Workspace/WorkspaceType',
      decryptResponse: false,
      encryptRequest: false,
      store
    })
  },

  getQuestion({ data, store }) {
    return apiCall({
      method: 'get',
      data,
      url: endpointQuiz + data,
      decryptResponse: false,
      encryptRequest: false,
      store
    })
  },
  getAllProvince({ data, store }) {
    return apiCall({
      method: 'get',
      data,
      url: 'https://idn-area.cyclic.app/provinces?limit=99&sortBy=code',
      decryptResponse: false,
      encryptRequest: false,
      store
    })
  },
  getProvince({ data, store }) {
    return apiCall({
      method: 'get',
      data,
      url: 'https://idn-area.cyclic.app/provinces/' + data,
      decryptResponse: false,
      encryptRequest: false,
      store
    })
  },
  getKecamatan({ data, store }) {
    return apiCall({
      method: 'get',
      data,
      url: 'https://idn-area.cyclic.app/districts?regencyCode=' + data + '&limit=10&sortBy=code',
      decryptResponse: false,
      encryptRequest: false,
      store
    })
  },
  getKota({ data, store }) {
    return apiCall({
      method: 'get',
      data,
      url: 'https://idn-area.cyclic.app/regencies?provinceCode=' + data + '&limit=10&sortBy=code',
      decryptResponse: false,
      encryptRequest: false,
      store
    })
  }
}

export default { apiCall, client }
