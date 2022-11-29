const AdsConfig: Array<{type: string, slotId: string, divId: string, sizes: Array<string|number|number[]>}> = [
    {
        type: 'sidebar-small',
        slotId: '/85819747/sidebar_small',
        divId: 'sidebar-small-gpt',
        sizes: [[384, 240], 'fluid']
        //width: 384,
        //height: 240
    },
    {
        type: 'sidebar-large',
        slotId: '/85819747/sidebar_large',
        divId: 'sidebar-large-gpt',
        sizes: [[336, 576], 'fluid']
        //width: 336,
        //height: 576
    },
    {
        type: 'body',
        slotId: '/85819747/body',
        divId: 'body-gpt',
        sizes: [[720, 120], 'fluid']
        //width: 720,
        //height: 120
    },
    {
        type: 'footer',
        slotId: '/85819747/footer',
        divId: 'footer-gpt',
        sizes: [[1152, 144], 'fluid']
        //width: 1152,
        //height: 144
    },
    /*{
        type: 'flight-offer-list-top',
        slotId: '/85819747/flightoffers_list_top',
        divId: 'flight-offer-list-top-gpt',
        width: 720,
        height: 120
    },*/
    /*{
        type: 'mobile_big',
        slotId: '/85819747/mobile_big',
        divId: 'mobile_big-gpt',
        width: 300,
        height: 250
    },*/
    {
        type: 'mobile_320x200',
        slotId: '/85819747/mobile_320x200',
        divId: 'mobile_320x200-gpt',
        sizes: [[320, 200], 'fluid']
        //width: 320,
        //height: 200
    },
    {
        type: 'mobile_320x100',
        slotId: '/85819747/mobile_320x100',
        divId: 'mobile_320x100-gpt',
        sizes:  [[320, 100], 'fluid']
        //width: 320,
        //height: 100
    },
    {
        type: 'mobile_320x100_lower',
        slotId: '/85819747/mobile_320x100_lower',
        divId: 'mobile_320x100_lower-gpt',
        sizes:  [[320, 100], 'fluid']
    },
    {
        type: 'mobile_320x50',
        slotId: '/85819747/mobile_320x50',
        divId: 'mobile_320x50-gpt',
        sizes:  [[320, 50], 'fluid']
    },
    {
        type: 'desktop_list_middle',
        slotId: '/85819747/desktop_list_middle',
        divId: 'desktop_list_middle-gpt',
        sizes: ['fluid', [720, 120]]
    },
    {
        type: 'list_middle',
        slotId: '/85819747/list_middle',
        divId: 'list_middle-gpt',
        sizes: [[720, 120], 'fluid']
    },
    /*{
        type: 'list_top',
        slotId: '/85819747/list_top',
        divId: 'list_top-gpt',
        sizes: [[320, 100], [680, 100], 'fluid']
    },*/
]

export default AdsConfig