import * as core from '@actions/core'
import {download, upload} from './skw'
import {getExecOutput} from '@actions/exec'
import {parseInputs} from './inputs'
import {install} from './install'

async function run(): Promise<void> {
  try {
    const javaExists = await checkJavaExists()
    if (!javaExists) {
      throw new Error(
        'java command is not found in runner. Please install java with actions/setup-java'
      )
    }

    const inputs = parseInputs()
    const skwPath = await install(inputs.version)

    switch (inputs.command) {
      case 'upload':
        await upload(skwPath, inputs)
        break
      case 'download':
        await download(skwPath, inputs)
        break
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

async function checkJavaExists(): Promise<boolean> {
  const result = await getExecOutput('java', ['-version'])
  return result.exitCode === 0 ? true : false
}

run()
