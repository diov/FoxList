import { Component, For } from 'solid-js'
import { useActiveTab, useReadingList } from '../store'
import TabView from './TabView'
import { TabInfo } from '../types'

const App: Component = () => {
  const tab = useActiveTab()
  const [record, { removeTab, remarkTab, openTab }] = useReadingList()

  const unreadTabs = () => {
    if (!record()) return []

    return Object.values(record())
      .filter((tab) => tab.state === 'unread')
      .sort((a, b) => b.timestamp - a.timestamp)
  }

  const readedTabs = () => {
    if (!record()) return []

    return Object.values(record())
      .filter((tab) => tab.state === 'readed')
      .sort((a, b) => b.timestamp - a.timestamp)
  }

  const isValidateTab = () => {
    if (!tab()) return false

    return tab().url.startsWith('http')
  }

  const isTabUnread = () => {
    if (!tab()) return false

    if (!record()[tab().url]) {
      return false
    } else {
      return record()[tab().url].state === 'unread'
    }
  }

  const handleCurrentTab = async () => {
    if (!isTabUnread()) {
      // NOTE: As we store tabs in Record, just force update to 'Unread' state
      await remarkTab(tab(), 'unread')
    } else {
      await remarkTab(tab(), 'readed')
    }
  }

  const handleTabClicked = async (tab: TabInfo) => {
    await openTab(tab)
  }

  const handleRemarkTab = async (tab: TabInfo) => {
    const newType = tab.state === 'unread' ? 'readed' : 'unread'
    await remarkTab(tab, newType)
  }

  const handleRemoveTab = async (tab: TabInfo) => {
    await removeTab(tab)
  }

  return (
    <div>
      <button
        class={`flex-center m-4 ${isValidateTab() ? 'remark-btn' : 'remark-btn:disabled'}`}
        disabled={!isValidateTab()}
        onClick={handleCurrentTab}>
        {isTabUnread() ?
          <div class='i-material-symbols-check-small text-5 mr-1' /> :
          <div class='i-material-symbols-add text-5 mr-1' />}
        {isTabUnread() ? 'Mark current tab as read' : 'Add current Tab'}
      </button>
      {unreadTabs() && unreadTabs().length && (
        <>
          <h5 class='text-3 mx-4'>UNREAD</h5>
          <For each={unreadTabs()}>{tab =>
            <TabView tab={tab}
              handleTabClicked={() => handleTabClicked(tab)}
              handleRemark={() => handleRemarkTab(tab)}
              handleRemove={() => handleRemoveTab(tab)} />
          }</For>
        </>
      )}
      {unreadTabs() && unreadTabs().length && readedTabs() && readedTabs().length && (
        <hr class='h-1px bg-gray-300 border-0' />
      )}
      {readedTabs() && readedTabs().length && (
        <>
          <h5 class='text-3 mx-4'>PAGES YOU'VE READ</h5>
          <For each={readedTabs()}>{tab =>
            <TabView
              tab={tab}
              handleTabClicked={() => handleTabClicked(tab)}
              handleRemark={() => handleRemarkTab(tab)}
              handleRemove={() => handleRemoveTab(tab)} />
          }</For>
        </>
      )}
    </div>
  )
}

export default App
