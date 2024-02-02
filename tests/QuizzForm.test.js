import { mount } from '@vue/test-utils'
import { describe, expect, test, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import parentForm from '@/components/quiz/QuizzForm.vue'
import { useRouter } from 'vue-router'
import { routesNames } from '../src/router'
import { useQuizStore } from '@/stores'

vi.mock('vue-router')
describe('parent quiz form input', async () => {
  useRouter.mockReturnValue({
    push: vi.fn(),
    replace: vi.fn()
  })

  const wrapper = mount(parentForm, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn
        })
      ]
    }
  })
  const childCom = wrapper.findComponent({ name: 'QuizzFormStart' })

  beforeEach(() => {
    setActivePinia(createPinia())
    useRouter().push.mockReset()
    useRouter().replace.mockReset()
  })

  test('button submit exist', () => {
    expect(wrapper.find('button').text()).toBe('submit')
  })
  test('change router to detail question and save store', async () => {
    const store = useQuizStore()
    childCom.find('input[id=name]').setValue('ujank')
    childCom.find('select[id=theme]').setValue('20')
    childCom.find('input[id=totalQuestion]').setValue('5')
    await wrapper.find('button').trigger('click')
    store.setNewQuestion({ name: 'ujank', theme: 20, totalQuestion: 5 })
    expect(store.name).toBe('ujank')
    expect(store.themeQuestion).toBe(20)
    expect(store.totalQuestion).toBe(5)
    expect(useRouter().replace).toHaveBeenCalledWith({
      name: routesNames.DETAIL
    })
  })
})

describe('child quiz form input', async () => {
  const wrapper = mount(parentForm, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn
        })
      ]
    }
  })
  const childCom = wrapper.findComponent({ name: 'QuizzFormStart' })
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const inputList = [
    {
      name: 'field theme empty',
      case: [
        {
          element: 'input[id=name]',
          value: 'ujank'
        },
        {
          element: 'select[id=theme]',
          value: ''
        },
        {
          element: 'input[id=totalQuestion]',
          value: '5'
        }
      ],
      test: 'select[id=theme]~div[class=input-errors]'
    },
    {
      name: 'field name empty',
      case: [
        {
          element: 'input[id=name]',
          value: ''
        },
        {
          element: 'select[id=theme]',
          value: '20'
        },
        {
          element: 'input[id=totalQuestion]',
          value: '5'
        }
      ],
      test: 'input[id=name]~div[class=input-errors]'
    },

    {
      name: 'field total question empty',
      case: [
        {
          element: 'input[id=name]',
          value: 'ujank'
        },
        {
          element: 'select[id=theme]',
          value: '20'
        },
        {
          element: 'input[id=totalQuestion]',
          value: ''
        }
      ],
      test: 'input[id=totalQuestion]~div[class=input-errors]'
    }
  ]

  for (let i of inputList) {
    test(i.name, async () => {
      for (let j of i.case) {
        childCom.find(j.element).setValue(j.value)
      }
      await wrapper.find('button').trigger('click')
      expect(childCom.find(i.test).exists()).toBe(true)
    })
  }
})
