import { Component } from 'solid-js'
import { TabInfo } from '../types'

interface Props {
  tab: TabInfo
  handleTabClicked: () => void
  handleRemark: () => void
  handleRemove: () => void
}

const TabView: Component<Props> = (props) => {
  const rootDomain = (url: string) => {
    const parsedUrl = new URL(url)
    const hostParts = parsedUrl.hostname.split('.')
    const rootDomain = hostParts.slice(-2).join('.')
    return rootDomain
  }

  const periodAgo = (time: number) => {
    const rtf1 = new Intl.RelativeTimeFormat('en', { style: 'long' })
    const secondsAgo = Math.floor((Date.now() - time) / 1000)

    if (secondsAgo < 60) {
      return rtf1.format(-secondsAgo, 'second')
    } else if (secondsAgo < 60 * 60) {
      return rtf1.format(-Math.floor(secondsAgo / 60), 'minute')
    } else if (secondsAgo < 60 * 60 * 24) {
      return rtf1.format(-Math.floor(secondsAgo / 60 / 60), 'hour')
    } else if (secondsAgo < 60 * 60 * 24 * 30) {
      return rtf1.format(-Math.floor(secondsAgo / 60 / 60 / 24), 'day')
    }
  }

  return (
    <div class='flex w-100% items-center p-4 hover:bg-gray-200 group' onClick={props.handleTabClicked}>
      <img class='w-5 h-5 mr-3' src={props.tab.favIconUrl} />
      <div class='flex-(~ col grow-1) gap-1 w-0 min-w-0'>
        <div class='text-(truncate)'>{props.tab.title}</div>
        <div class='text-(truncate) text-(left gray-500)' dir='rtl'>
          {`${rootDomain(props.tab.url)} - ${periodAgo(props.tab.timestamp)}`}
        </div>
      </div>
      <div class='group-hover:(flex animate-fade-in animate-count-1 animate-1s) display-none gap-1 items-center h-100% ml-2'>
        <div
          class='flex-center p-1.5 wa hover:(bg-gray-300 border-rd-50%)'
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            props.handleRemark()
          }} >
          <i class={`${props.tab.state === 'unread'
            ? 'i-material-symbols-check-circle-outline'
            : 'i-material-symbols-check-circle'} text-(5.5 gray)`} />
        </div>
        <div
          class='flex-center p-1.5 wa hover:(bg-gray-300 border-rd-50%)'
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            props.handleRemove()
          }}>
          <i class='i-material-symbols-close text-(5.5 gray)' />
        </div>
      </div>
    </div>
  )
}

export default TabView
