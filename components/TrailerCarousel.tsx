import { Box } from '@chakra-ui/react';
import {
    CarouselProvider,
    Slider,
    Slide,
    ButtonBack,
    ButtonNext
} from 'pure-react-carousel';
import ModalVideo from 'react-modal-video';
import Image from 'next/image';
import ReactPlayer from 'react-player/youtube';
import { useState } from 'react';
import VideoModal from './VideoModal';

interface TrailerCarouselProps {
    results: Trending['results'];
    config: TMDBConfig;
    trailers: Video[];
}

const TrailerCarousel = ({
    results,
    config,
    trailers
}: TrailerCarouselProps) => {
    const { base_url, poster_sizes, backdrop_sizes } = config.images;
    const [trailerModes, setTrailerModes] = useState<boolean[]>(
        [...Array(trailers.length).keys()].map(() => false)
    );

    const setTrailerMode = (index: number, status: boolean) => {
        setTrailerModes((prev) => {
            const newTrailer = [...prev];
            newTrailer[index] = status;
            return newTrailer;
        });
    };

    return (
        <div>
            {results.map(
                ({ backdrop_path, original_name, poster_path, id }, index) => {
                    const { results } = trailers[index];
                    if (results.length > 0)
                        return (
                            <div key={id}>
                                <Box
                                    onClick={() => setTrailerMode(index, true)}
                                >
                                    <Image
                                        src={`${base_url}${poster_sizes[2]}${poster_path}`}
                                        alt={`${original_name} poster`}
                                        width={200}
                                        height={400}
                                    />
                                    <Image
                                        src={`${base_url}${backdrop_sizes[0]}${backdrop_path}`}
                                        alt={`${original_name} backdrop`}
                                        width={780}
                                        height={400}
                                    />
                                    {results[0].key}
                                </Box>
                                <VideoModal
                                    url={`https://youtu.be/${results[0].key}`}
                                    name={results[0].name}
                                    isOpen={trailerModes[index]}
                                    onClose={() => setTrailerMode(index, false)}
                                />
                            </div>
                        );
                    return null;
                }
            )}
        </div>
    );
};

export default TrailerCarousel;
