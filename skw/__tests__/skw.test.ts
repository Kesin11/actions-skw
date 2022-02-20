import {describe, expect, test, jest, afterEach} from '@jest/globals'
import {createTagOptions, upload, download} from '../src/skw'
import {ActionsInputs} from '../src/inputs'
import exec, { getExecOutput } from "@actions/exec"

jest.mock("@actions/exec", () => {
  return {
    exec: jest.fn(),
    getExecOutput: jest.fn(() => {
      return { exitCode: 0 }
    })
  }
})

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

describe('upload', () => {
  const skwPath = "/tmp/skw.jar"
  const baseInputs: ActionsInputs = {
    version: "1.0.0",
    command: "upload",
    bucket: "gs://test",
    key: "test",
    tags: ["latest", "beta"],
    prefix: "test_prefix",
    paths: ["test.js", "test.ts"],
  }
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Input all parameters', async () => {
    const inputs = baseInputs
    const spy = jest.spyOn(exec, "getExecOutput")

    await upload(skwPath, inputs)
    expect(spy).lastCalledWith("java", [
      "-jar",
      skwPath, inputs.command,
      "-b", inputs.bucket,
      "-k", inputs.key,
      "-t", inputs.tags[0], "-t", inputs.tags[1],
      "-p", inputs.prefix,
      inputs.paths[0], inputs.paths[1]
    ])
  })

  test('Input without prefix', async () => {
    const inputs = { ...baseInputs, prefix: undefined }
    const spy = jest.spyOn(exec, "getExecOutput")

    await upload(skwPath, inputs)
    expect(spy).lastCalledWith("java", [
      "-jar",
      skwPath, inputs.command,
      "-b", inputs.bucket,
      "-k", inputs.key,
      "-t", inputs.tags[0], "-t", inputs.tags[1],
      inputs.paths[0], inputs.paths[1]
    ])
  })
})

describe('download', () => {
  const skwPath = "/tmp/skw.jar"
  const baseInputs: ActionsInputs = {
    version: "1.0.0",
    command: "download",
    bucket: "gs://test",
    key: "test",
    tags: ["latest"],
    paths: ["downloadDir"],
  }
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Input all parameters', async () => {
    const inputs = baseInputs
    const spy = jest.spyOn(exec, "getExecOutput")

    await download(skwPath, inputs)
    expect(spy).lastCalledWith("java", [
      "-jar",
      skwPath, inputs.command,
      "-b", inputs.bucket,
      "-k", inputs.key,
      "-t", inputs.tags[0],
      inputs.paths[0]
    ])
  })

  test('Input with redundant parameters', async () => {
    const inputs = { ...baseInputs,
      tags: ["latest", "beta"],
      paths: ["downloadDir1", "downloadDir2"]
    }
    const spy = jest.spyOn(exec, "getExecOutput")

    await download(skwPath, inputs)
    expect(spy).lastCalledWith("java", [
      "-jar",
      skwPath, inputs.command,
      "-b", inputs.bucket,
      "-k", inputs.key,
      "-t", inputs.tags[0],
      inputs.paths[0]
    ])
  })
})

