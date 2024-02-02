import { expect, test } from 'vitest'
import { isMobile } from '@/helpers/constantValue'
import { reformatTime, reformatDate } from '@/helpers/DateHelper'
import { normalizeString } from '../../src/helpers/StringHelper'

test('check is mobile', () => {
  expect(isMobile(720)).toBe(true)
  expect(isMobile(1280)).toBe(false)
})

test('reformat time (time only)', () => {
  expect(reformatTime('2015-03-25T12:00:05Z')).toBe('12:00')
  expect(reformatTime('2015-03-25T20:30:00Z')).toBe('20:30')
})

test('reformat date (date only)', () => {
  expect(reformatDate('2015-03-25T12:00:05Z')).toBe('Rab, 25/3/2015')
  expect(reformatDate('2020-03-07T12:00:05Z')).toBe('Sab, 7/3/2020')
})

test('encoding string opentdb', () => {
  expect(
    normalizeString("Entity:&nbsp;Bad attempt at XSS:<script>alert('new\nline?')</script><br>")
  ).toBe("Entity: Bad attempt at XSS:<script>alert('new\nline?')</script><br>")
})
