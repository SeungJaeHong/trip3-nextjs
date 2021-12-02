import styles from "./UserAvatar.module.scss"
import {User} from "../../../types"
import UserIcon from '../../../icons/UserIcon'
import {useState, useRef, useEffect} from "react"

type Props = {
    user:  User
    borderWidth: number
}

const UserAvatar = ({user, borderWidth}: Props) => {
    if (!user.avatar) {
        return <UserIcon fill={'#d1d4d6'} />
    }

    const [height, setHeight] = useState(0)
    const ref = useRef<any>()

    useEffect(() => {
        setHeight(ref.current.clientHeight)
    }, [])

    const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
        const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
        return {
            x: centerX + radius * Math.cos(angleInRadians),
            y: centerY + radius * Math.sin(angleInRadians)
        }
    }

    const calculateArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
        endAngle = endAngle - 0.001
        const start = polarToCartesian(x, y, radius, endAngle)
        const end = polarToCartesian(x, y, radius, startAngle)
        const arcSweep = endAngle - startAngle <= 180 ? '0' : '1'

        return ['M', start.x, start.y, 'A', radius, radius, 0, arcSweep, 0, end.x, end.y].join(' ')
    }

    const generateArc = (startAngle: number, endAngle: number) => {
        return calculateArc(height / 2, height / 2, height / 2 - borderWidth / 2, startAngle, endAngle)
    }

    return (
        <div className={styles.UserAvatar}>
            <img src={user.avatar} alt={user.name} className={styles.Image} ref={ref} />
            <div className={styles.ArcRank}>
                <svg>
                    <path fill="none" strokeWidth={borderWidth} d={generateArc(0, user.rank * 90)} />
                </svg>
            </div>
            <div className={styles.ArcRest}>
                <svg>
                    <path fill="none" strokeWidth={borderWidth} d={generateArc(user.rank * 90, 360)} />
                </svg>
            </div>
        </div>
    )
}

UserAvatar.defaultProps = {
    borderWidth: 3
}

export default UserAvatar