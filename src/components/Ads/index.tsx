import { useEffect } from 'react'
import { useRouter } from 'next/router'
import AdsConfig from '../../lib/AdsConfig'

type Props = {
    type: string
    className?: string
}

const Ads = ({ type, className }: Props) => {
    const router = useRouter()
    const ad = AdsConfig.find((item) => item.type === type)

    useEffect(() => {
        setTimeout(() => {
            if (ad && window.googletag !== undefined) {
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
