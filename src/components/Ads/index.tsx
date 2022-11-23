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
        console.log('init ad', window.googletag, window.googletag.apiReady);
        if (ad && window.googletag !== undefined && window.googletag.apiReady) {
            googletag.cmd.push(function () {
                console.log('show', ad.divId);
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
    }, [router.query, window.googletag, window.googletag.apiReady])

    return ad ? <div id={ad.divId} className={className} /> : null
}

export default Ads
