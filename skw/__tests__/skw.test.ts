import {describe, expect, test} from '@jest/globals'
import {createTagOptions} from '../src/skw'

describe('createTagOptions', () => {
  test('single tag', async () => {
    const actual = createTagOptions(["latest"])
    expect(actual).toEqual(["-t", "latest"])
  })

  test('multiple tags', async () => {
    const actual = createTagOptions(["latest", "beta"])
    expect(actual).toEqual(["-t", "latest", "-t", "beta"])
  })
})

