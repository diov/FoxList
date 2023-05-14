import { createEffect, createResource, createSignal, onCleanup } from "solid-js"
import Browser, { Tabs } from "webextension-polyfill"
import { TabInfo, TabState } from "./types"

export function useActiveTab() {
  const [tab, setTab] = createSignal<TabInfo | null>(null)

  createEffect(async () => {
    const tabs = await Browser.tabs.query({ active: true, currentWindow: true })
    const { title, url, favIconUrl } = tabs[0]
    setTab({ title, url, favIconUrl, state: 'unread' })

    const activatedListener = async ({ tabId }: { tabId: number }) => {
      const tab = await Browser.tabs.get(tabId)
      const { title, url, favIconUrl } = tab
      setTab({ title, url, favIconUrl, state: 'unread' })
    }
    Browser.tabs.onActivated.addListener(activatedListener)

    const updateListener = async (_tabId: number, _changeInfo: Tabs.OnUpdatedChangeInfoType, tab: Tabs.Tab) => {
      if (!tab.active) return

      const { title, url, favIconUrl } = tab
      setTab({ title, url, favIconUrl, state: 'unread' })
    }
    Browser.tabs.onUpdated.addListener(updateListener)

    onCleanup(() => {
      Browser.tabs.onActivated.removeListener(activatedListener)
      Browser.tabs.onUpdated.removeListener(updateListener)
    })
  })

  return tab
}

async function loadReadingList() {
  const data = await Browser.storage.sync.get()
  return data as Record<string, TabInfo>
}

async function saveReadingList(list: Record<string, TabInfo>) {
  await Browser.storage.sync.set(list)
}

async function removeReadingList(tab: TabInfo) {
  await Browser.storage.sync.remove(tab.url)
}

export function useReadingList() {
  const [record, { mutate }] = createResource(loadReadingList)

  const removeTab = async (tab: TabInfo) => {
    const newRecord = { ...record() }
    delete newRecord[tab.url]
    await removeReadingList(tab)
    mutate(newRecord)
  }

  const remarkTab = async (tab: TabInfo, state: TabState) => {
    const newRecord = { ...record() }
    const newTab = { ...tab, state, timestamp: Date.now() }
    newRecord[tab.url] = newTab
    await saveReadingList(newRecord)
    mutate(newRecord)
  }

  const openTab = async (tab: TabInfo) => {
    console.log('openTab')
    await Browser.tabs.update({ url: tab.url })
  }

  return [record, { removeTab, remarkTab, openTab }] as const
}
