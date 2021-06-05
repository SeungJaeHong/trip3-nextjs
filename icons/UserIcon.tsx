const UserIcon = (props: any) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current"
            {...props}
        >
            <path d="M15.1304 8.86957C15.1304 10.5985 13.7289 12 12 12C10.2711 12 8.86957 10.5985 8.86957 8.86957C8.86957 7.14067 10.2711 5.73913 12 5.73913C13.7289 5.73913 15.1304 7.14067 15.1304 8.86957Z"/>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37259 0 0 5.37258 0 12C0 18.6274 5.37259 24 12 24ZM11.4783 14.6267C9.68025 14.6291 7.94609 15.2936 6.60698 16.4935C5.26786 17.6933 4.41763 19.3444 4.21865 21.1313C4.53823 21.4045 4.8719 21.6608 5.21827 21.8991C5.22851 20.2449 5.89232 18.6618 7.06497 17.4949C8.23762 16.3281 9.824 15.6722 11.4783 15.6702H12.5217C14.176 15.6722 15.7624 16.3281 16.9351 17.4949C18.1077 18.6617 18.7715 20.2448 18.7818 21.899C19.1282 21.6607 19.4618 21.4044 19.7814 21.1313C19.5824 19.3443 18.7322 17.6932 17.393 16.4934C16.0539 15.2936 14.3198 14.6291 12.5217 14.6267H11.4783ZM16.1739 8.86957C16.1739 11.1748 14.3052 13.0435 12 13.0435C9.69481 13.0435 7.82609 11.1748 7.82609 8.86957C7.82609 6.56438 9.69481 4.69565 12 4.69565C14.3052 4.69565 16.1739 6.56438 16.1739 8.86957Z"
            />
        </svg>
    )
}

export default UserIcon