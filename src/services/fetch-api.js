/**
 * 封装fetch
 * 处理专题 api 请求
 */

import 'whatwg-fetch'

import config from './config'

function buildUrl(url) {
  return config.restApi(url)
}

const apiHost = process.env.api

/* global Headers: false, fetch */
function parseResponse (response) {
  return Promise.all([response.status, response.statusText, response.json()])
}

function checkStatus ([status, statusText, data]) {
  if (status >= 200 && status < 300) {
    return data
  } else {
    const error = new Error(statusText)
    error.status = status
    error.message = data
    return Promise.reject(error)
  }
}

export default{
  get (url, param = {}, headers = {}, host = apiHost) {
    const reqHeaders = new Headers()
    reqHeaders.append('Accept', 'application/json')
    var query = []
    Object.keys(param).forEach((item) => {
      query.push(`${item}=${encodeURIComponent(param[item])}`)
    })
    // fixme
    var params = query.length ? '?' + query.join('&') : ''
    url = buildUrl(url) + params
    console.log(host, params)
    var init = {
      method: 'GET',
      headers: reqHeaders,
      credentials: 'include',
      cache: 'default',
      mode: 'cors',
    }
    return fetch(url, init)
      .then(parseResponse)
      .then(checkStatus)
  },
  patch (url, param = {}, headers = {}, host = apiHost) {
    const reqHeaders = new Headers()
    reqHeaders.append('Content-Type', 'application/json')
    reqHeaders.append('Accept', 'application/json')

    url = buildUrl(url)

    var init = {
      method: 'PATCH',
      headers: reqHeaders,
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(param),
    }

    return fetch(url, init)
      .then(parseResponse)
      .then(checkStatus)
  },
  post (url, param = {}, headers = {}, host = apiHost) {
    const reqHeaders = new Headers()
    reqHeaders.append('Content-Type', 'application/json')
    reqHeaders.append('Accept', 'application/json')

    url = buildUrl(url)
    var init = {
      method: 'POST',
      headers: reqHeaders,
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(param),
    }

    return fetch(url, init)
      .then(parseResponse)
      .then(checkStatus)
  },
  put (url, param = {}, headers = {}, host = apiHost) {
    const reqHeaders = new Headers()
    reqHeaders.append('Content-Type', 'application/json')
    reqHeaders.append('Accept', 'application/json')

    url = buildUrl(url)

    var init = {
      method: 'PUT',
      headers: reqHeaders,
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(param),
    }

    return fetch(url, init)
      .then(parseResponse)
      .then(checkStatus)
  },
  delete (url, param = {}, headers = {}, host = apiHost) {
    const reqHeaders = new Headers()
    reqHeaders.append('Content-Type', 'application/json')
    reqHeaders.append('Accept', 'application/json')

    url = host + url

    var init = {
      method: 'DELETE',
      credentials: 'include',
      headers: reqHeaders,
      mode: 'cors',
    }

    return fetch(url, init)
      .then(parseResponse)
      .then(checkStatus)
  },

}
