import { flushPromises, shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import apiLoader from '@/components/util/ApiLoader.vue'

describe('Condition rendering in fetch process', () => {
  test('Fetch failed show retry slot', async () => {
    const wrapper = shallowMount(apiLoader, {
      slots: {
        error: `<template v-slot:error="props">
            <div>
              <span>trigger this please</span>
            </div>
            <button @click="props.retry">retry</button>
          </template>`
      },
      propsData: {
        isError: true,
        apiMethod: async () => {
          const response = {
            data: {
              name: 'john'
            },
            errors: true
          }
          return response
        }
      }
    })
    expect(wrapper.emitted()).toHaveProperty('loadingStarted')
    await flushPromises()
    expect(wrapper.emitted()).toHaveProperty('loadingEnded')
    await wrapper.find('button').trigger('click')
    await flushPromises()
    expect(wrapper.emitted().loadingEnded).toHaveLength(2)
  })
  test('Fetch success show response slot', async () => {
    const response = {
      data: {
        name: 'john'
      }
    }
    const wrapper = shallowMount(apiLoader, {
      slots: {
        default: `<template v-slot:default="props">
            <div id="response">{{props.response.data.name}}</div>
          </template>`
      },
      propsData: {
        isError: false,
        apiMethod: async () => {
          return response
        }
      }
    })
    expect(wrapper.emitted()).toHaveProperty('loadingStarted')
    await flushPromises()
    expect(wrapper.emitted()).toHaveProperty('loadingEnded')
    expect(wrapper.emitted().loadingEnded[0][0].response.data.name).toBe(response.data.name)
    expect(wrapper.find('#response').text()).toBe(response.data.name)
  })
  test('Fetch loading show loading slot', async () => {
    const response = {
      data: {
        name: 'john'
      }
    }
    const wrapper = shallowMount(apiLoader, {
      slots: {
        loadingOverlay: `<template v-slot:loadingOverlay>
            <div id="loadingOverlay">fetch is underway in overlay</div>
        </template>`,
        loading: `<template v-slot:loading>
            <div id="loading">fetch is underway</div>
        </template>`
      },
      propsData: {
        loadingMessage: 'fetch is underway',
        hasOverlay: true,
        isError: false,
        apiMethod: async () => {
          await setTimeout(() => '', 500)
          return response
        }
      }
    })
    expect(wrapper.emitted()).toHaveProperty('loadingStarted')
    await setTimeout(() => '', 200)
    expect(wrapper.find('#loading').text()).toBe('fetch is underway')
    expect(wrapper.find('#loadingOverlay').text()).toBe('fetch is underway in overlay')
  })
})
