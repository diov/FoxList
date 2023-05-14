import { resolve } from 'node:path'
import { writeFileSync } from 'node:fs'
import type { Plugin } from 'vite'
import manifest from './manifest'

export interface Options {
  version: string
  watch?: string[]
}

function plugin(opt: Options): Plugin {
  let distPath: string
  let watchFiles = []

  return {
    name: 'foxlist',
    async configResolved(config) {
      distPath = resolve(config.root, config.build.outDir)

      if (opt.watch) {
        watchFiles = opt.watch.map((file) => resolve(config.root, file))
      }
    },
    closeBundle() {
      writeFileSync(resolve(distPath, 'manifest.json'), JSON.stringify(manifest))
    },
    buildStart() {
      watchFiles.forEach((file) => this.addWatchFile(file))
    },
  }
}

export default plugin
