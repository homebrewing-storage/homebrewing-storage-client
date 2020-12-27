import React from 'react'
import { Alert, AlertTitle } from '@material-ui/lab';
import { spacing } from '@material-ui/system';
import Box from '@material-ui/core/Box';

export const FlashMessage = ({message}) => {
    return (
        <Box mt={2}>
        <Alert severity={message.type}>
            <AlertTitle>{message.title}</AlertTitle>
            {message.content}
        </Alert>
        </Box>
    )
}

export const flashErrorMessage = (dispatch, error) => {
    const err = error.response ? error.response.data : error;
    dispatch({
        type: 'FLASH_MESSAGE',
        payload: {
            type: 'error',
            title: err.name,
            content: err.message
        }
    })
}

