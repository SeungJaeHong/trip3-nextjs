import buttonStyles from "../../Button/Button.module.scss"
import clsx from "clsx"
import LoadingSpinner from "../../LoadingSpinner"

type Props = {
    title: string
    submitting: boolean
    onClick?: () => void
}

const SubmitButton = (props: Props) => {
    const renderTitle = () => {
        if (props.submitting) {
            return <LoadingSpinner show={true} />
        } else {
            return (
                <span className={buttonStyles.Title}>{props.title}</span>
            )
        }
    }

    return (
        <button className={clsx(buttonStyles.Button)}
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