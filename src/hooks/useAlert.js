import { useState } from 'react'

// Custom hook to manage alert state
const useAlert = () => {
    const [alert, setAlert] = useState({ show: false, text: '', type: 'danger' })

    // Function to display an alert with custom text and type
    const showAlert = ({ text, type = 'danger' }) => setAlert({
        show: true,
        text,
        type
    })

    // Function to hide the alert
    const hideAlert = () => setAlert({
        show: false,
        text: '',
        type: 'danger'
    })

  return { alert, showAlert, hideAlert }
}

export default useAlert