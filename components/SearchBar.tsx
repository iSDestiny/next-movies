import {
    Box,
    DarkMode,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    useColorMode
} from '@chakra-ui/react';
import useSearch from 'hooks/useSearch';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import MotionBox from './MotionBox';

interface SearchBarProps {
    isOpen: boolean;
}

const SearchBar = ({ isOpen }: SearchBarProps) => {
    const [query, setQuery] = useState('');
    const { results, isLoading } = useSearch(query, query.length > 0);
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

    return (
        <MotionBox
            width="100%"
            bgColor="white"
            variants={searchVariants}
            animate={isOpen ? 'open' : 'closed'}
            initial="closed"
            border="1px solid #BDC6C7"
            position="absolute"
        >
            <Flex
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
                        maxWidth="1400px"
                        focusBorderColor="rgba(0,0,0,0)"
                        border="none"
                        variant="flushed"
                        _placeholder={{ color: 'gray.400' }}
                        placeholder="search for a movie, tv show, or person"
                    />
                </InputGroup>
            </Flex>
        </MotionBox>
    );
};

export default SearchBar;
