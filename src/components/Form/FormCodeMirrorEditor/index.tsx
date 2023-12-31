import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import stylesInput from '../FormInput/FormInput.module.scss'
import styles from './FormCodeMirrorEditor.module.scss'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import 'easymde/dist/easymde.min.css'
import { useDebounce } from 'use-debounce'
import { parseFlightBody } from '../../../services/flight.service'
import { parseNewsBody } from '../../../services/news.service'
import ImageSelectSidebar from '../../ImageSelectSidebar'
import { Editor } from 'codemirror'
import Button from '../../Button'

// @ts-ignore
const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), { ssr: false })

type Props = {
    id: string
    name: string
    value: string
    label?: string
    placeholder?: string
    type: 'flight' | 'news'
    onChange: (value: any) => void
    error: string
    disabled: boolean
    className?: string
    required: boolean
}

const FormCodeMirrorEditor = ({ id, name, value, label, type, error, onChange, className, required }: Props) => {
    const [editorValue, setEditorValue] = React.useState<string>(value)
    const [editor, setEditor] = React.useState<Editor | undefined>(undefined)
    const editorRef = useRef(null)
    const [showEditor, setShowEditor] = useState<boolean>(false)
    const [debouncedValue] = useDebounce(editorValue, 500)
    const [previewValue, setPreviewValue] = React.useState<string>('')
    const [showSidebar, setShowSidebar] = useState<boolean>(false)

    const onEditorChange = useCallback((value: string) => {
        setEditorValue(value)
    }, [])

    useEffect(() => {
        if (debouncedValue) {
            if (type === 'news') {
                parseNewsBody(debouncedValue).then((res) => {
                    setPreviewValue(res.data)
                })
            } else {
                parseFlightBody(debouncedValue).then((res) => {
                    setPreviewValue(res.data)
                })
            }
        }
    }, [debouncedValue, type])

    const saveChanges = () => {
        onChange(editorValue)
        setShowEditor(false)
    }

    const onImageSelect = (imageId: number) => {
        if (editor) {
            const doc = editor.getDoc()
            const cursor = doc.getCursor()

            doc.replaceRange('\n\n' + '[[' + imageId + ']]' + '\n', cursor)
            doc.setCursor({
                line: cursor.line + 3,
                ch: 0,
            })
            editor.focus()
            setShowSidebar(false)
        }
    }

    const getToolbar = () => {
        let toolbar = [
            'bold',
            'italic',
            '|',
            'unordered-list',
            'ordered-list',
            '|',
            'heading-1',
            'heading-2',
            'heading-3',
            '|',
            /*{
                name: 'table',
                action: (editor: EasyMDE) => {
                    const cm = editor.codemirror
                    const doc = cm.getDoc()
                    const cursor = doc.getCursor()
                    doc.replaceRange('\nEsimene | Teine\n---|---\nEsimene | Teine\n\n', cursor)
                    doc.setCursor({
                        line: cursor.line + 4,
                        ch: 7,
                    })
                    editor.codemirror.focus()
                },
                className: 'fa fa-table',
                title: 'Table',
            },*/
            {
                name: 'calendar',
                action: (editor: EasyMDE) => {
                    const cm = editor.codemirror
                    const doc = cm.getDoc()
                    const cursor = doc.getCursor()
                    doc.replaceRange(
                        '\n[[\n\nJaanuar:\n\n- Date link\n\n- Date link\n\nVeebruar:\n\n- Date link\n\n- Date link\n\n]]\n\n',
                        cursor
                    )
                    doc.setCursor({
                        line: cursor.line + 3,
                        ch: 7,
                    })
                    editor.codemirror.focus()
                },
                className: 'fa fa-calendar',
                title: 'Calendar',
            },
            {
                name: 'link',
                action: (editor: EasyMDE) => {
                    const cm = editor.codemirror
                    let text = cm.getSelection()
                    const doc = cm.getDoc()
                    const link = window.prompt('Link', 'http://')
                    if (link) {
                        doc.replaceSelection('[' + text + '](' + link + ')')
                        editor.codemirror.focus()
                    }
                },
                className: 'fa fa-link',
                title: 'Link',
            },
            {
                name: 'image',
                action: (editor: EasyMDE) => {
                    setShowSidebar(true)
                },
                className: 'fa fa-image',
                title: 'Image',
            },
        ]

        if (type === 'news') {
            return toolbar.filter((item: any) => {
                return item.name !== 'calendar'
            })
        }

        return toolbar
    }

    const autofocusNoSpellcheckerOptions = useMemo(() => {
        return {
            autofocus: !value,
            spellChecker: false,
            lineNumbers: false,
            theme: 'neo',
            toolbar: getToolbar(),
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div
                className={clsx(stylesInput.FormInput, styles.FormCodeMirrorEditor, className, {
                    [stylesInput.Invalid]: error.length > 0,
                })}
            >
                {label !== undefined && <label htmlFor={id ?? name}>{label}{required ? <span>*</span> : null}</label>}

                <textarea
                    value={value}
                    name={name}
                    spellCheck={false}
                    rows={8}
                    onClick={() => setShowEditor(true)}
                    readOnly={true}
                />

                {error?.length > 0 && <div className={stylesInput.ErrorText}>{error}</div>}
            </div>
            {showEditor && (
                <>
                    <div className={styles.Editor}>
                        <div className={styles.SaveButton}>
                            <Button title={'Salvesta'} onClick={saveChanges} />
                        </div>
                        <div className={styles.EditorContainer}>
                            <div className={styles.Code} ref={editorRef}>
                                <SimpleMdeReact
                                    // @ts-ignore
                                    getCodemirrorInstance={(editorInst) => setEditor(editorInst)}
                                    // @ts-ignore
                                    options={autofocusNoSpellcheckerOptions}
                                    value={editorValue}
                                    onChange={onEditorChange}
                                />
                            </div>
                            <div className={styles.Preview} dangerouslySetInnerHTML={{ __html: previewValue }} />
                        </div>
                    </div>
                    <ImageSelectSidebar
                        open={showSidebar}
                        onClose={() => setShowSidebar(false)}
                        onImageSelect={onImageSelect}
                    />
                </>
            )}
        </>
    )
}

FormCodeMirrorEditor.defaultProps = {
    value: '',
    label: undefined,
    spellCheck: false,
    error: '',
    type: 'flight',
    required: false
}

export default FormCodeMirrorEditor
