import React, { useEffect } from 'react'
import { hotjar } from 'react-hotjar'

export function Hotjar() {
    const hotjarId = process.env.NEXT_PUBLIC_HOTJAR_ID as string
    const hotjarVersion = process.env.NEXT_PUBLIC_HOTJAR_VERSION as string

    useEffect(() => {
        hotjar.initialize(Number(hotjarId), Number(hotjarVersion))
    }, [])

    return null
}
