/* @refresh reload */
import 'virtual:uno.css'
import { render } from 'solid-js/web'

import App from './component/App' 

render(() => <App />, document.getElementById('root') as HTMLDivElement)
