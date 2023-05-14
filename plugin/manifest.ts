import { Manifest } from 'webextension-polyfill'

const manifest: Manifest.WebExtensionManifest = {
  manifest_version: 3,
  name: '__MSG_extName__',
  version: '0.0.1',
  default_locale: 'en',
  permissions: ['storage', 'tabs'],
  sidebar_action: {
    default_panel: 'sidebar.html',
    default_title: '__MSG_extName__'
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
