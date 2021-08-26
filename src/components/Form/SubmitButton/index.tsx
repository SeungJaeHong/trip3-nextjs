import styles from "./SubmitButton.module.scss"
import buttonStyles from "../../Button/Button.module.scss"
import clsx from "clsx"

type Props = {
    title: string
    submitting: boolean
    onClick?: () => void
}

const SubmitButton = (props: Props) => {
    const renderTitle = () => {
        if (props.submitting) {
            return 'Loading'
        } else {
            return (
                <span className={buttonStyles.Title}>{props.title}</span>
            )
        }
    }

    return (
        <button className={clsx(buttonStyles.Button, {[styles.Submitting]: props.submitting})}
            onClick={props.onClick ?? undefined}
            disabled={props.submitting}
            type={'submit'}
        >
            {renderTitle()}
        </button>
    )
}

SubmitButton.defaultProps = {
    submitting: false
}

export default SubmitButton