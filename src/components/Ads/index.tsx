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
            console.log('ad called', ad)
            if (ad && window.googletag !== undefined) {
                googletag.cmd.push(function () {
                    window.googletag.display(ad.divId)
                    const slot = window.googletag
                        .pubads()
                        .getSlots()
                        .find((item) => item.getSlotId().getName() === ad.slotId)

                    console.log(ad.divId, 'AdDivId push')

                    if (slot) {
                        window.googletag.pubads().refresh([slot])
                    }
                })
            }
        }, 250)
    }, [router.query])

    return ad ? <div id={ad.divId} className={className} /> : null
}

export default Ads
