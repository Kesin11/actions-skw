import {getInput, getMultilineInput} from '@actions/core'

type validCommand = 'upload' | 'download'
export type ActionsInputs = {
  version: string
  command: validCommand
  bucket: string
  key: string
  tags: string[]
  prefix: string
  paths: string[]
}

export function parseInputs(): ActionsInputs {
  return {
    version: getInput('version', {required: true}),
    command: validateCommand(getInput('command', {required: true})),
    bucket: getInput('bucket', {required: true}),
    key: getInput('key', {required: true}),
    tags: getMultilineInput('tags', {required: true}),
    paths: getMultilineInput('paths', {required: true}),
    prefix: getInput('prefix')
  }
}

function validateCommand(command: string): validCommand {
  switch (command) {
    case 'upload':
    case 'download':
      break
    default:
      throw new Error(`command: ${command} is not implemented command`)
  }
  return command
}
