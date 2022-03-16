// eslint-disable-next-line object-curly-newline
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { FC, useState } from 'react';

export interface formValueInterface{
    [index: string] : string;
}

interface Props{
    open:boolean;
    setFunc:React.Dispatch<React.SetStateAction<boolean>>;
    dialogLabel:string;
    questionsArray:{questionName:string, questionText:string, placeholder?: string}[];
    // eslint-disable-next-line no-unused-vars
    formHandler: (values: formValueInterface) => void;
}

const CreateDialog: FC<Props> = (props: Props) => {
    const [formValues, setValuesForm] = useState<formValueInterface>({});

    const formHandler = (e: React.FormEvent) => {
        e.preventDefault();
        props.formHandler(formValues);
    };

    const closeHandler = () => {
        setValuesForm({});
        props.setFunc(false);
    };

    return <Dialog fullWidth={true} maxWidth={'sm'} open={props.open} onClose={closeHandler}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
            <DialogContentText>
                {props.dialogLabel}
            </DialogContentText>
            <form onSubmit={formHandler}>
                {props.questionsArray.map((question) => <TextField autoFocus margin="dense" key={question.questionName} id={question.questionName}
                    onChange={(e) => setValuesForm((prevState) => {
                        const values:any = {
                            ...prevState,
                        };
                        values[question.questionName] = e.target.value;
                        return values;
                    })}
                    placeholder={ question.placeholder ? question.placeholder : '' }
                    label={question.questionText} fullWidth variant="standard" helperText="must have atleast 1 character"/>)}
                <Button onClick={() => props.setFunc(false)}>Cancel</Button>
                <Button type="submit">Submit</Button>
            </form>
        </DialogContent>
        <DialogActions>

        </DialogActions>
    </Dialog>;
};

export default CreateDialog;
