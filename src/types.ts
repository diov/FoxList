export type TabState = 'unread' | 'readed'

export type TabInfo = {
  url: string
  title: string
  favIconUrl: string
  timestamp?: number
  state: TabState
}
