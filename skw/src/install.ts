import * as tc from '@actions/tool-cache'
import {addPath, debug} from '@actions/core'

const TOOL_NAME = 'skw'

export async function install(version: string): Promise<string> {
  let cachedPath = tc.find(TOOL_NAME, version)
  if (!cachedPath) {
    const jarPath = await tc.downloadTool(
      `https://github.com/Kesin11/SkyWarehouse/releases/download/${version}/skw.jar`
    )
    cachedPath = await tc.cacheFile(jarPath, 'skw.jar', TOOL_NAME, version)
    debug(cachedPath)
  }

  addPath(cachedPath)
  return cachedPath
}
