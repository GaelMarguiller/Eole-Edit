import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getApiListFile } from '../../api/apiUrl';
import PlayerVideo from '../player/playerVideo';

interface IVideo {
    name: string;
    id: string;
}

export default function List() {
    const [listsVideos, setListsVideos] = useState([]);

    // @ts-ignore
    useEffect(async () => {
        const result = await axios(getApiListFile());
        setListsVideos(result.data);
    }, []);

    return (
        <div>
            <ul>
                { listsVideos.map((video: IVideo) => (
                    <PlayerVideo id={video.id} key={video.id} />
                )) }
            </ul>
        </div>
    );
}
