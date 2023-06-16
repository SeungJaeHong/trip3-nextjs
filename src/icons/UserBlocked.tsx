const UserBlockedIcon = (props: any) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 14 14" {...props}>
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="5" cy="2.75" r="2.25"/>
                <circle cx="10.25" cy="10.25" r="3.25"/>
                <path d="m7.95 12.55l4.6-4.6M6 6.61A4.49 4.49 0 0 0 .5 11v1.5h4"/>
            </g>
        </svg>
    )
}

export default UserBlockedIcon