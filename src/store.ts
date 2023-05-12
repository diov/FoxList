import { createEffect, createResource, createSignal, onCleanup } from "solid-js"
import Browser, { Tabs } from "webextension-polyfill"
import { TabInfo, TabType } from "./types"

export function useActiveTab() {
  const [tab, setTab] = createSignal<TabInfo | null>(null)

  createEffect(async () => {
    const tabs = await Browser.tabs.query({ active: true, currentWindow: true })
    const { title, url, favIconUrl } = tabs[0]
    setTab({ title, url, favIconUrl, type: 'unread' })

    const tabListener = async ({ tabId }) => {
      const tab = await Browser.tabs.get(tabId)
      const { title, url, favIconUrl } = tab
      setTab({ title, url, favIconUrl, type: 'unread' })
    }
    Browser.tabs.onActivated.addListener(tabListener)
    onCleanup(() => { Browser.tabs.onActivated.removeListener(tabListener) })
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

export function useReadingList() {
  const [record, { mutate }] = createResource(loadReadingList)

  const addTab = async (tab: TabInfo) => {
    tab.timestamp = Date.now()
    const r = record()
    console.log(r)
    const newRecord = r ? { ...r, [tab.url]: tab } : { [tab.url]: tab }
    await saveReadingList(newRecord)
    mutate(() => newRecord)
  }

  const removeTab = async (tab: TabInfo) => {
    const newRecord = { ...record() }
    delete newRecord[tab.url]
    await saveReadingList(newRecord)
    mutate(() => newRecord)
  }

  const remarkTab = async (tab: TabInfo, type: TabType) => {
    const newRecord = { ...record() }
    const newTab = { ...tab, type }
    newRecord[tab.url] = newTab
    await saveReadingList(newRecord)
    mutate(() => newRecord)
  }

  return [record, { addTab, removeTab, remarkTab }] as const
}
