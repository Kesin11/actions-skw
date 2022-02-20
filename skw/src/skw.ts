import {ActionsInputs} from './inputs'
import {getExecOutput} from '@actions/exec'

export function createTagOptions(tags: string[]): string[] {
  return tags.flatMap(tag => ['-t', `${tag}`])
}

export function createPrefixOptions(prefix?: string): string[] {
  return prefix ? ['-p', prefix] : []
}

export async function upload(
  skwPath: string,
  inputs: ActionsInputs
): Promise<void> {
  const result = await getExecOutput('java', [
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
  if (result.exitCode !== 0) throw new Error(result.stderr)
}

export async function download(
  skwPath: string,
  inputs: ActionsInputs
): Promise<void> {
  const result = await getExecOutput('java', [
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
  if (result.exitCode !== 0) throw new Error(result.stderr)
}
