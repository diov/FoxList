export type TabType = 'unread' | 'readed'

export type TabInfo = {
  url: string
  title: string
  favIconUrl: string
  timestamp?: number
  type: TabType
}
