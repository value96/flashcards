import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { axiosInstance, endpoints } from '@shared/api'
import { store } from '../store'
import { userModel } from '@entities/User'
import './interceptors'

const refreshUrl = '/api' + endpoints.authEndpoints.refreshTokenUrl

describe('response interceptor', () => {
  let instanceMock: MockAdapter
  let axiosMock: MockAdapter
  let dispatchSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    instanceMock = new MockAdapter(axiosInstance)
    axiosMock = new MockAdapter(axios)
    dispatchSpy = vi.spyOn(store, 'dispatch')
    vi.spyOn(Storage.prototype, 'setItem')
    vi.spyOn(Storage.prototype, 'removeItem')
    localStorage.clear()
  })

  afterEach(() => {
    instanceMock.restore()
    axiosMock.restore()
    vi.restoreAllMocks()
    localStorage.clear()
  })

  it('queues simultaneous requests and refreshes token only once', async () => {
    let count = 0
    instanceMock.onGet('/test').reply(() => {
      count += 1
      if (count <= 2) {
        return [401]
      }
      return [200, { ok: true }]
    })

    axiosMock.onGet(refreshUrl).reply(200, {
      refreshTokenExpiration: '1',
      accessTokenExpiration: '2',
    })

    const promises = [axiosInstance.get('/test'), axiosInstance.get('/test')]
    const results = await Promise.all(promises)

    results.forEach(r => expect(r.status).toBe(200))
    expect(localStorage.getItem('accessTokenExpiration')).toBe('2')
    expect(axiosMock.history.get.filter(h => h.url === refreshUrl).length).toBe(
      1,
    )
    expect(dispatchSpy).not.toHaveBeenCalledWith(
      userModel.actions.setAuth(false),
    )
  })

  it('rejects queued requests when refresh fails', async () => {
    instanceMock.onGet('/fail').reply(401)
    axiosMock.onGet(refreshUrl).reply(500)

    const requests = [axiosInstance.get('/fail'), axiosInstance.get('/fail')]
    const results = await Promise.allSettled(requests)

    results.forEach(r => expect(r.status).toBe('rejected'))
    expect(localStorage.getItem('accessTokenExpiration')).toBeNull()
    expect(axiosMock.history.get.filter(h => h.url === refreshUrl).length).toBe(
      1,
    )
    expect(dispatchSpy).toHaveBeenCalledWith(userModel.actions.setAuth(false))
  })

  it('handles more than two concurrent requests with a single refresh', async () => {
    let count = 0
    instanceMock.onGet('/bulk').reply(() => {
      count += 1
      if (count <= 5) {
        return [401]
      }
      return [200, { ok: true }]
    })

    axiosMock.onGet(refreshUrl).reply(200, {
      refreshTokenExpiration: '3',
      accessTokenExpiration: '4',
    })

    const requests = Array.from({ length: 5 }, () => axiosInstance.get('/bulk'))
    const results = await Promise.all(requests)

    expect(results).toHaveLength(5)
    results.forEach(r => expect(r.status).toBe(200))
    expect(localStorage.getItem('accessTokenExpiration')).toBe('4')
    expect(axiosMock.history.get.filter(h => h.url === refreshUrl).length).toBe(
      1,
    )
    expect(dispatchSpy).not.toHaveBeenCalledWith(
      userModel.actions.setAuth(false),
    )
  })
})
