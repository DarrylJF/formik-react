import './App.css'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import { TextField, Button } from '@material-ui/core'

// const MultiLine = ({ label, rows, placeholder, ...props }) => {
//     const [field] = useField(props)
//     return <TextField {...field} label={label} multiline={true} rows={rows} />
// }

const MyTextField = ({ placeholder, variant, label, rows, ...props }) => {
    console.log('PROPS', props)
    const [field, meta] = useField(props)
    console.log('FIELD-META', field, meta)
    const errorText = meta.error && meta.touched ? meta.error : ''
    return (
        <TextField
            {...field}
            helperText={errorText}
            placeholder={placeholder}
            error={!!errorText}
            multiline
            variant={variant}
            label={label}
            rows={rows}
        />
    )
}

const validationSchema = Yup.object({
    firstName: Yup.string().required().max(10),
    lastName: Yup.string().required().max(10),
    message: Yup.string().required().max(50),
})

const App = () => {
    const encode = data => {
        return Object.keys(data)
            .map(
                key =>
                    encodeURIComponent(key) +
                    '=' +
                    encodeURIComponent(data[key])
            )
            .join('&')
    }

    // const handleSubmit = (values, actions) => {
    //     // event.preventDefault()
    //     console.log('VALUES', values)
    //     console.log('ACTIONS', actions)
    //     fetch('/', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //         body: encode({
    //             'form-name': 'formik-demo',
    //             ...values,
    //         }),
    //     })
    //         .then(() => {
    //             alert('Form successfully submitted')
    //             actions.resetForm()
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    //         .finally(() => actions.setSubmitting(false))
    // }

    return (
        <div className="App">
            <h1>Formik React</h1>
            <Formik
                validationSchema={validationSchema}
                initialValues={{ firstName: '', lastName: '', message: '' }}
                // onSubmit={(data, { setSubmitting, resetForm }) => {
                //     setSubmitting(true)
                //     // make async call
                //     console.log('SUBMIT:', data)
                //     setSubmitting(false)
                //     resetForm(true)
                // }}
                onSubmit={(values, actions) => {
                    fetch('/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: encode({
                            'form-name': 'formik-demo',
                            ...values,
                        }),
                    })
                        .then(() => {
                            alert('Form successfully submitted')
                            actions.resetForm()
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        .finally(() => actions.setSubmitting(false))
                }}
            >
                {props => {
                    console.log('FORMIK PROPS', props)
                    const { isSubmitting } = props
                    return (
                        <Form name={'formik-demo'} data-netlify={true}>
                            <MyTextField
                                name={'firstName'}
                                type={'input'}
                                placeholder={'First Name'}
                            />
                            <div style={{ marginTop: '1rem' }}>
                                <MyTextField
                                    name={'lastName'}
                                    type={'input'}
                                    placeholder={'Last Name'}
                                />
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <MyTextField
                                    name={'message'}
                                    multiline
                                    rows={6}
                                    type={'input'}
                                    label={'Message:'}
                                    placeholder={'Type message here...'}
                                    variant={'outlined'}
                                />
                            </div>
                            <div>
                                <Button
                                    style={{ marginTop: '1rem' }}
                                    disabled={isSubmitting}
                                    variant={'contained'}
                                    color={'primary'}
                                    type={'submit'}
                                >
                                    Submit
                                </Button>
                            </div>
                            <pre>{JSON.stringify(props, null, 2)}</pre>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default App
