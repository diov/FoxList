import { Manifest } from 'webextension-polyfill'

const manifest: Manifest.WebExtensionManifest = {
  manifest_version: 3,
  name: '__MSG_extName__',
  description: '__MSG_extDesc__',
  version: '0.0.1',
  author: 'Dio.Ye',
  default_locale: 'en',
  permissions: ['storage', 'tabs'],
  icons: {
    16: 'icons/icon16.png',
    32: 'icons/icon32.png',
    48: 'icons/icon48.png',
    128: 'icons/icon128.png'
  },
  sidebar_action: {
    default_title: '__MSG_extName__',
    default_panel: 'sidebar.html',
    default_icon: {
      16: 'icons/icon16.png',
      32: 'icons/icon32.png',
      48: 'icons/icon48.png',
      128: 'icons/icon128.png'
    },
  },
  commands: {
    _execute_sidebar_action: {
      suggested_key: {
        default: 'Alt+Shift+F'
      },
      description: '__MSG_commandOpenSidebar__'
    }
  },
  browser_specific_settings: {
    gecko: {
      id: 'foxlist@dio.wtf'
    }
  }
}

export default manifest
