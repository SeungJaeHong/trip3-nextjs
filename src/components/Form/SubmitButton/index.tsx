import buttonStyles from "../../Button/Button.module.scss"
import clsx from "clsx"
import LoadingSpinner from "../../LoadingSpinner"

type Props = {
    title: string
    submitting: boolean
    disabled: boolean
    type: 'submit' | 'button' | undefined
    onClick?: () => void
}

const SubmitButton = ({title, submitting, disabled, type, onClick}: Props) => {
    const renderTitle = () => {
        return (
            <div className={buttonStyles.Loading}>
                {submitting && <LoadingSpinner />}
                <span className={buttonStyles.Title}>{title}</span>
            </div>
        )
    }

    return (
        <button className={clsx(buttonStyles.Button)}
            onClick={(onClick && !disabled) ? onClick : undefined}
            disabled={submitting || disabled}
            type={type}
        >
            {renderTitle()}
        </button>
    )
}

SubmitButton.defaultProps = {
    type: 'submit',
    submitting: false,
    disabled: false
}

export default SubmitButton