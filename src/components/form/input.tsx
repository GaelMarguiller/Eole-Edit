import React from 'react';
import { Button, Form } from 'react-bootstrap';
import uploadFile from '../../actions/uploadActions';

interface FileInputState {
    uploadField: {
        selectedFile?: File | null,
        error: string
    }
}

export default class FileInput extends React.Component<object, FileInputState> {
    constructor(props: object) {
        super(props);
        this.state = {
            uploadField: {
                selectedFile: null,
                error: '',
            },
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(selectorFile: FileList | null) {
        if (selectorFile) {
            this.setState({
                uploadField: {
                    selectedFile: selectorFile[0],
                    error: '',
                },
            });
        }
    }

    handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { uploadField } = this.state;
        if (uploadField.selectedFile) {
            const datum = new FormData();
            datum.append('file', uploadField.selectedFile);
            await uploadFile(datum);
        }
        return this.setState({
            uploadField: {
                selectedFile: null,
                error: 'Veuillez ajouter un fichier ou un fichier du bon format',
            },
        });
    };

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Upload file:</Form.Label>
                    <Form.Control type="file" placeholder="Upload file:" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}
