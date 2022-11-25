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

    console.log('ad component init', window.googletag?.apiReady)

    useEffect(() => {
        let slot: any = undefined
        setTimeout(() => {
            console.log('init ad useEffect', window.googletag, window.googletag?.apiReady, googletag?.apiReady);
            if (ad && window.googletag) {
                googletag.cmd.push(function () {
                    window.googletag.defineSlot(ad.slotId,[[ad.width,ad.height],'fluid'],ad.divId)?.addService(googletag.pubads())
                    console.log('show', ad.divId)
                    window.googletag.display(ad.divId)
                    slot = window.googletag
                        .pubads()
                        .getSlots()
                        .find((item) => item.getSlotId().getName() === ad.slotId)

                    if (slot) {

                        //console.log(slot)

                        //window.googletag.display(ad.divId)
                        //window.googletag.pubads().refresh([slot])
                    }
                })
            }
        }, 200)

        return () => {
            if (slot) {
                window.googletag.destroySlots([slot])
            }
        }

    }, [router.query, ad, window.googletag])

    return ad ? <div id={ad.divId} className={className} /> : null
}

export default Ads
