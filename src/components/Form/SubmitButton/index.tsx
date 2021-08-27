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
        return (
            <div className={buttonStyles.Loading}>
                <LoadingSpinner show={props.submitting} />
                <span className={buttonStyles.Title}>{props.title}</span>
            </div>
        )
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