import { useEffect } from 'react'
import AdsConfig from '../../lib/AdsConfig'
import { useRouter } from 'next/router'

type Props = {
    type: string
    className?: string
}

const Ads = ({ type, className }: Props) => {
    const router = useRouter()
    const ad = AdsConfig.find((item) => item.type === type)

    useEffect(() => {
        setTimeout(() => {
            if (ad && window.googletag !== undefined && window.googletag.apiReady) {
                googletag.cmd.push(function () {
                    window.googletag.display(ad.divId)
                    const slot = window.googletag
                        .pubads()
                        .getSlots()
                        .find((item) => item.getSlotId().getName() === ad.slotId)

                    if (slot) {
                        window.googletag.pubads().refresh([slot])
                    }
                })
            }
        }, 200)
    }, [router.query])

    return ad ? <div id={ad.divId} className={className} /> : null
}

export default Ads
