import * as tc from '@actions/tool-cache'
import {addPath, debug} from '@actions/core'

const TOOL_NAME = 'skw'

export async function install(version: string): Promise<string> {
  const _version = `v${version}`

  let cachedPath = tc.find(TOOL_NAME, _version)
  if (!cachedPath) {
    const jarPath = await tc.downloadTool(
      `https://github.com/Kesin11/SkyWarehouse/releases/download/${_version}/skw.jar`
    )
    cachedPath = await tc.cacheFile(jarPath, 'skw.jar', TOOL_NAME, _version)
    debug(cachedPath)
  }

  addPath(cachedPath)
  return cachedPath
}
