import { Component, For } from 'solid-js'
import { useActiveTab, useReadingList } from './store'

const App: Component = () => {
  const tab = useActiveTab()
  const [record, { addTab, removeTab }] = useReadingList()

  const unreadTabs = () => {
    if (!record()) return []

    return Object.values(record()).filter((tab) => tab.type === 'unread')
  }

  const readedTabs = () => {
    if (!record()) return []

    return Object.values(record()).filter((tab) => tab.type === 'readed')
  }

  const isTabInList = () => {
    if (!tab()) return false

    return record()[tab().url] !== undefined
  }

  const handleAddTab = async () => {
    if (isTabInList()) {
      await removeTab(tab())
    } else {
      await addTab(tab())
    }
  }

  return (
    <div>
      <button onClick={handleAddTab}>{isTabInList() ? 'Remove current Tab' : 'Add current Tab'}</button>
      <h1>UNREAD</h1>
      {unreadTabs() && (
        <For each={unreadTabs()}>{(tab) => {
          return <div>{tab.title}</div>
        }}</For>
      )}
      {readedTabs() && readedTabs().length && (
        <>
          <h1>PAGES YOU'VE READ</h1>
          <For each={readedTabs()}>{(tab) => {
            return <div>{tab.title}</div>
          }}</For>
        </>
      )}
    </div>
  )
}

export default App
