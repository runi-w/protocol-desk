import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// localStorage-backed shim so the app persists without the Claude harness's window.storage.
if (!window.storage) { window.storage = { get: async (k)=>{const v=window.localStorage.getItem(k); return v==null?null:{value:v}}, set: async (k,v)=>{window.localStorage.setItem(k,v)} } }
createRoot(document.getElementById('root')).render(<App />)
