import {
    Box,
    Flex,
    HStack,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Skeleton,
    Text,
    VStack
} from '@chakra-ui/react';
import useSearch from 'hooks/useSearch';
import { useRouter } from 'next/router';
import {
    ChangeEvent,
    FormEvent,
    KeyboardEvent,
    useEffect,
    useRef,
    useState
} from 'react';
import { FaFilm, FaSearch, FaTv, FaUser } from 'react-icons/fa';
import mod from 'utils/mod';
import MotionBox from '../MotionBox';
import dynamic from 'next/dynamic';
const SearchBarLoading = dynamic(import('./SearchBarLoading'));
const SearchBarResults = dynamic(import('./SearchBarResults'));

interface SearchBarProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchBar = ({ isOpen, onClose }: SearchBarProps) => {
    const ref = useRef<HTMLInputElement>();
    const [currSelection, setCurrSelection] = useState(0);
    const [query, setQuery] = useState('');
    const { data, isLoading } = useSearch(
        'multi',
        query,
        query.trim().length > 0
    );
    const router = useRouter();

    const searchVariants = {
        open: {
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 250,
                damping: 40
            }
        },
        closed: {
            x: '-100%',
            transition: {
                type: 'spring',
                stiffness: 250,
                damping: 40
            }
        }
    };
    const goToEntity = (mediaType: string, id: number) => {
        if (mediaType === 'movie') router.push(`/movies/${id}`);
        else if (mediaType === 'tv') router.push(`/tv/${id}`);
        else router.push(`/person/${id}`);
        onClose();
        setQuery('');
        setCurrSelection(0);
    };

    const handleSubmit = (e: FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (currSelection > 0 && currSelection <= data.results.length) {
            const { id, media_type } = data.results[currSelection - 1];
            goToEntity(media_type, id);
        } else if (query.trim().length > 0) {
            router.push({ pathname: '/search', query: { query } });
            onClose();
            setQuery('');
            setCurrSelection(0);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Escape') {
            onClose();
            setQuery('');
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            setCurrSelection((prev) => mod(prev + 1, 11));
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setCurrSelection((prev) => mod(prev - 1, 11));
        }
    };

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        setCurrSelection(0);
    };

    useEffect(() => {
        const { current } = ref;
        if (current && isOpen) current.focus();
    }, [isOpen]);

    return (
        <MotionBox
            width="100%"
            bgColor="white"
            variants={searchVariants}
            animate={isOpen ? 'open' : 'closed'}
            initial="closed"
            exit="closed"
            transform="translateX(-100%)"
            position="absolute"
        >
            <Box width="100%" border="1px solid #BDC6C7">
                <Flex
                    as="form"
                    onSubmit={handleSubmit}
                    align="center"
                    height="40px"
                    maxWidth="1400px"
                    m="auto"
                    width="100%"
                    color="black"
                >
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<FaSearch />}
                        />
                        <Input
                            ref={ref}
                            label="Search"
                            onChange={handleOnChange}
                            onKeyDown={handleKeyDown}
                            value={query}
                            maxWidth="1400px"
                            focusBorderColor="rgba(0,0,0,0)"
                            border="none"
                            variant="flushed"
                            _placeholder={{ color: 'gray.400' }}
                            placeholder="search for a movie, tv show, or person"
                        />
                    </InputGroup>
                </Flex>
            </Box>
            {data && data.results.length > 0 && !isLoading ? (
                <SearchBarResults
                    data={data}
                    currSelection={currSelection}
                    goToEntity={goToEntity}
                />
            ) : (
                <SearchBarLoading query={query} isLoading={isLoading} />
            )}
        </MotionBox>
    );
};

export default SearchBar;
