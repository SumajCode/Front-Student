"use client"

import { useState, useEffect } from "react"

type OS = "windows" | "mac" | "linux" | "unknown"

export function useOperatingSystem() {
  const [os, setOs] = useState<OS>("unknown")

  useEffect(() => {
    const userAgent = window.navigator.userAgent

    if (userAgent.indexOf("Win") !== -1) {
      setOs("windows")
    } else if (userAgent.indexOf("Mac") !== -1) {
      setOs("mac")
    } else if (userAgent.indexOf("Linux") !== -1) {
      setOs("linux")
    }
  }, [])

  return { os }
}
