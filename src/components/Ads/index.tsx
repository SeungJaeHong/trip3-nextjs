import {useEffect, useState} from 'react'
import AdsConfig from '../../lib/AdsConfig'
import { useRouter } from 'next/router'
import Slot = googletag.Slot;

type Props = {
    type: string
    className?: string
}

const Ads = ({ type, className }: Props) => {
    const router = useRouter()
    const ad = AdsConfig.find((item) => item.type === type)
    //const [target, setTarget] = useState<Slot|undefined>(undefined)

    //console.log('ad component init', window.googletag?.apiReady)

    useEffect(() => {
        let slot: Slot|undefined = undefined
        //console.log('init ad useEffect', window.googletag, window.googletag?.apiReady, googletag?.apiReady);
        if (ad && window.googletag) {
            googletag.cmd.push(function () {
                slot = window.googletag
                    .pubads()
                    .getSlots()
                    .find((item) => item.getSlotId().getName() === ad.slotId)

                if (slot) {
                    console.log('refresh', ad.divId)
                    window.googletag.pubads().refresh([slot])
                } else {
                    // @ts-ignore
                    slot = window.googletag.defineSlot(ad.slotId, ad.sizes, ad.divId)?.addService(googletag.pubads())
                    console.log('show', ad.divId)
                    // @ts-ignore
                    window.googletag.display(slot)
                }

                /*if (slot) {
                    setTarget(slot)
                    console.log('show', ad.divId)
                    window.googletag.display(slot)
                    //window.googletag.display(ad.divId)
                    //window.googletag.pubads().refresh([slot])
                }*/
            })
        }

        /*return () => {
            if (slot) {
                googletag.cmd.push(function () {
                    console.log('destroy', ad?.divId)
                    // @ts-ignore
                    window.googletag.destroySlots([])
                });
            }
        }*/

    }, [router.query, ad])

    return ad ? <div id={ad.divId} className={className} /> : null
}

export default Ads
