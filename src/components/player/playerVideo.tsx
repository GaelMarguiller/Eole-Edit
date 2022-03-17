import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { getApiFile } from '../../api/apiUrl';

interface Props{
    id: string;
}

export default function PlayerVideo(props: Props) {
    const [video, setVideo] = useState({});
    const [played, setPlayed] = useState(false);
    const refPlayVideo = React.useRef<HTMLVideoElement>(null);
    const { id } = props;

    // @ts-ignore
    useEffect(async () => {
        // eslint-disable-next-line react/destructuring-assignment
        const result = await axios(getApiFile(id));
        setVideo(result.data);
    }, []);

    function playOffVideo(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (!played) {
            setPlayed(true);
            // @ts-ignore
            refPlayVideo.current.play();
        } else if (played) {
            setPlayed(false);
            // @ts-ignore
            refPlayVideo.current.pause();
        }
    }

    return (
        <Container>
            <video ref={refPlayVideo} src={`${video}`} />
            <button onClick={(e) => playOffVideo(e)} type="button">{}</button>
        </Container>
    );
}
