import {
    Box,
    DarkMode,
    Flex,
    HStack,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    useColorMode,
    Text,
    VStack,
    Skeleton,
    UnorderedList,
    ListItem
} from '@chakra-ui/react';
import useSearch from 'hooks/useSearch';
import {
    ChangeEvent,
    Component,
    FormEvent,
    KeyboardEvent,
    useEffect,
    useRef,
    useState
} from 'react';
import { FaFilm, FaSearch, FaTv, FaUser } from 'react-icons/fa';
import { useRouter } from 'next/router';
import MotionBox from './MotionBox';
import mod from 'utils/mod';

interface SearchBarProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchBar = ({ isOpen, onClose }: SearchBarProps) => {
    const [currSelection, setCurrSelection] = useState(0);
    const ref = useRef<HTMLInputElement>();
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
        console.log(data);
    }, [data]);

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
            initial={false}
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
            <VStack
                as="ul"
                listStyleType="none"
                align="center"
                width="100%"
                spacing="0px"
                borderX="1px solid #BDC6C7"
                color="black"
            >
                {data && data.results.length > 0 ? (
                    data.results
                        .slice(0, 10)
                        .map(({ media_type, name, title, id }, index) => {
                            let film: any;
                            if (media_type === 'movie') film = FaFilm;
                            else if (media_type === 'tv') film = FaTv;
                            else if (media_type === 'person') film = FaUser;

                            return (
                                <Box
                                    key={id}
                                    as="li"
                                    _hover={{
                                        bgColor: 'gray.100'
                                    }}
                                    bgColor={
                                        currSelection - 1 === index
                                            ? 'gray.100'
                                            : 'white'
                                    }
                                    cursor="pointer"
                                    onClick={() => goToEntity(media_type, id)}
                                    width="100%"
                                    borderBottom="1px solid #BDC6C7"
                                >
                                    <HStack
                                        width="100%"
                                        spacing="0.5rem"
                                        align="center"
                                        justify="flex-start"
                                        maxWidth="1400px"
                                        m="auto"
                                        px="0.7rem"
                                        key={id}
                                    >
                                        <Icon as={film} />
                                        <Text size="sm" noOfLines={1}>
                                            {name || title}
                                        </Text>
                                    </HStack>
                                </Box>
                            );
                        })
                ) : (
                    <VStack
                        as="ul"
                        listStyleType="none"
                        spacing="0.3rem"
                        width="100%"
                        display={query.trim().length > 0 ? 'flex' : 'none'}
                        align="center"
                        justify="center"
                        borderBottom="1px solid #BDC6C7"
                    >
                        <Box as="li" maxWidth="1400px" m="auto" p="0.5rem 1rem">
                            {!isLoading ? (
                                <Text size="lg" p="1rem" fontWeight="bold">
                                    No results
                                </Text>
                            ) : (
                                [...Array(10).keys()].map((num) => (
                                    <Skeleton
                                        height="16px"
                                        width="100%"
                                        key={num}
                                        startColor="gray.200"
                                        endColor="gray.400"
                                    />
                                ))
                            )}
                        </Box>
                    </VStack>
                )}
            </VStack>
        </MotionBox>
    );
};

export default SearchBar;
