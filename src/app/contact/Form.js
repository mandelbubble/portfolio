"use client"

import { memo, useCallback, useState, useMemo, useEffect } from 'react'

import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

import styles from '@/app/styles/pages/contact.module.scss'
import { validate } from 'email-validator'

const ERROR = { 
    required : 'This field is required', 
    emailNotValid : 'Invalid email address',
}

const INPUT_DEFAULT_STATE = { value : '' , error : ERROR.required }

const Form = () => {

    const [fields, updateFields] = useState({
        name : INPUT_DEFAULT_STATE,
        email : INPUT_DEFAULT_STATE,
        subject : INPUT_DEFAULT_STATE,
        message : INPUT_DEFAULT_STATE
    })

    const [formStatus, updateFormStatus] = useState({
        displayErrors: false,
        isPending: false,
        isSubmitted: false,
        errorOnSend: false,
    })

    const getError = useCallback(
        ({ field, value }) => {
      
            const input = value.trim()
            if (!input) return ERROR.required
            if (field === 'email' && !validate(input)) return ERROR.emailNotValid
            return ''
        } , []
    )

    const onChange = useCallback(
        field => ({ target : { value }}) => {
            updateFields(fields => ({
                ...fields,
                [field] : {
                    value,
                    error: getError({field, value})
                }
            }))
        } , [getError]
    )

    const onChangeField = useMemo(
        () => ({
            name : onChange('name'),
            email : onChange('email'),
            subject : onChange('subject'),
            message : onChange('message')
        }) , [onChange]
    )

    const formIncomplete = useMemo(
        () => Object.keys(fields).find(field => fields[field].error !== '') ? true : false, [fields]
    )

    const onSubmit = useCallback(
        event => {
            event.preventDefault()

            updateFormStatus(status => ({
                ...status,
                isPending : !formIncomplete,
                displayErrors: true,
            }))
    
            event.stopPropagation()
        } , [formIncomplete]
    )
    
    useEffect(
        () => {
            if (!formStatus.isPending) return

            const sendForm = async () => {
                const res = await fetch(
                    '/api/contact', {
                        method: 'POST',
                        body: JSON.stringify({
                            name: fields.name.value,
                            email: fields.email.value,
                            subject: fields.subject.value,
                            message: fields.message.value,
                        })
                    }
                )

                const { error } = await res.json()
                const errorMessage = 'Something went wrong'

                updateFormStatus(status => ({
                    ...status,
                    isPending: false,
                    isSubmitted: res.status === 200,
                    errorOnSend: res.status !== 200 ? error || errorMessage : '',
                }))
            }

            sendForm()

        } , [formStatus.isPending, fields]
    )

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.row}>
                <Input
                    {...fields.name}
                    label="your name"
                    placeholder="Bob"
                    onChange={onChangeField.name}
                    displayStatus={formStatus.displayErrors}
                    disabled={formStatus.isSubmitted}
                />
                <Input
                    {...fields.email}
                    label="your email"
                    placeholder="bob@unicornsarereal.com"
                    onChange={onChangeField.email}
                    disabled={formStatus.isSubmitted}
                    displayStatus={formStatus.displayErrors}
                />
            </div>
            <Input
                {...fields.subject}
                label="your interest"
                placeholder="Hello world"
                onChange={onChangeField.subject}
                displayStatus={formStatus.displayErrors}
                disabled={formStatus.isSubmitted}
            />
            <Input
                {...fields.message}
                label="tell me more about it"
                placeholder="Type your message here"
                onChange={onChangeField.message}
                disabled={formStatus.isSubmitted}
                displayStatus={formStatus.displayErrors}
                isTextArea
            />
            <Button
                className={styles.cta}
                disabled={formStatus.displayErrors && formIncomplete }
                isLoading={formStatus.isPending}
                displaySuccessIcon={formStatus.isSubmitted}
                // onClick={onSubmit}
            >
                { formStatus.isSubmitted ? 'sent' : 'send' }
            </Button>
        </form>
    )
}

export default memo(Form)