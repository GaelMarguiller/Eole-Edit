import React from 'react';
import { Container } from 'react-bootstrap';
import FileInput from '../components/form/input';
import Header from '../components/header';

function Home() {
    return (
        <Container className="w-50 mx-auto justify-content-center">
            <Header />
            <FileInput />
        </Container>
    );
}

export default Home;
