import {ActionsInputs} from './inputs'
import {exec} from '@actions/exec'

export function createTagOptions(tags: string[]): string[] {
  return tags.flatMap(tag => ['-t', `${tag}`])
}

export function createPrefixOptions(prefix?: string): string[] {
  return prefix ? ['-p', 'prefix'] : []
}

export async function upload(
  skwPath: string,
  inputs: ActionsInputs
): Promise<void> {
  exec('java', [
    '-jar',
    skwPath,
    'upload',
    '-b',
    inputs.bucket,
    '-k',
    inputs.key,
    ...createTagOptions(inputs.tags),
    ...createPrefixOptions(inputs.prefix),
    ...inputs.paths
  ])
}

export async function download(
  skwPath: string,
  inputs: ActionsInputs
): Promise<void> {
  exec('java', [
    '-jar',
    skwPath,
    'download',
    '-b',
    inputs.bucket,
    '-k',
    inputs.key,
    '-t',
    inputs.tags[0],
    inputs.paths[0]
  ])
}
