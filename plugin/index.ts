import { resolve } from 'node:path'
import { writeFileSync } from 'node:fs'
import type { Plugin } from 'vite'
import manifest from './manifest'

export interface Options {
  version: string
}

function plugin(opt: Options): Plugin {
  let distPath: string

  return {
    name: 'foxlist',
    async configResolved(config) {
      distPath = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      writeFileSync(resolve(distPath, 'manifest.json'), JSON.stringify(manifest))
    }
  }
}

export default plugin
