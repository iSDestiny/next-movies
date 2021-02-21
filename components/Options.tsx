import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Heading,
    Select,
    useColorMode,
    useToken,
    VStack
} from '@chakra-ui/react';
import { Filters } from 'hooks/useDiscover';
import { useState } from 'react';

interface OptionsProps {
    type: 'movie' | 'tv';
    genres: GenresEntityOrKeywordsEntity[];
    languages: Language[];
    certifications?: CertificationDetails[];
    setSort: (newSort: string) => void;
    setFilters: (newFilters: Filters) => void;
}

interface FilterProps {
    type: 'movie' | 'tv';
    genres: GenresEntityOrKeywordsEntity[];
    languages: Language[];
    certifications?: CertificationDetails[];
}

interface SortOptions {
    sort: string;
    setSort: (newSort: string) => void;
}

const SortOptions = ({ sort, setSort }: SortOptions) => {
    return (
        <Box>
            <Heading size="sm" fontWeight="normal" mb="0.5rem">
                Sort Results By
            </Heading>
            <Select
                defaultValue={sort}
                variant="filled"
                onChange={(e) => setSort(e.target.value)}
            >
                <option value="popularity.desc">Popularity Descending</option>
                <option value="popularity.asc">Popularity Ascending</option>
                <option value="vote_average.desc">Rating Descending</option>
                <option value="vote_average.asc">Rating Ascending</option>
                <option value="primary_release_date.desc">
                    Release Date Descending
                </option>
                <option value="primary_release_date.asc">
                    Releaes Date Ascending
                </option>
            </Select>
        </Box>
    );
};

const FilterOptions = ({
    type,
    genres,
    languages,
    certifications
}: FilterProps) => {};

const Options = (props: OptionsProps) => {
    const { setSort, setFilters } = props;

    const { colorMode } = useColorMode();
    const [newFilters, setNewFilters] = useState<Filters>({});
    const [newSort, setNewSort] = useState('popularity.desc');
    const [gray300, gray700] = useToken('colors', ['gray.300', 'gray.700']);
    const sideBarColor = colorMode === 'light' ? 'gray.100' : 'gray.700';
    const borderColor = colorMode === 'light' ? gray300 : gray700;

    const submitChanges = () => {
        setSort(newSort);
        setFilters(newFilters);
    };

    return (
        <VStack
            width={{ base: '100%', lg: '20%' }}
            align="flex-start"
            spacing="1rem"
        >
            <Accordion
                defaultIndex={[0]}
                allowMultiple
                width="100%"
                borderRadius="10px"
                boxShadow={`1px 1px 5px rgba(0,0,0,${
                    colorMode === 'light' ? 0.2 : 0.8
                })}`}
                border={`1px solid ${borderColor}`}
            >
                <AccordionItem
                    border="none"
                    p="0.5rem 0.2rem"
                    borderBottom={`1px solid ${borderColor}`}
                >
                    <h3>
                        <AccordionButton>
                            <Heading size="md" flex={1} textAlign="left">
                                Sort
                            </Heading>
                            <AccordionIcon />
                        </AccordionButton>
                    </h3>
                    <AccordionPanel>
                        <SortOptions sort={newSort} setSort={setNewSort} />
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem border="none" p="0.5rem 0.2rem">
                    <h3>
                        <AccordionButton>
                            <Heading size="md" flex={1} textAlign="left">
                                Filters
                            </Heading>
                            <AccordionIcon />
                        </AccordionButton>
                    </h3>
                </AccordionItem>
            </Accordion>
            <Button
                colorScheme="teal"
                w="100%"
                borderRadius="10px"
                onClick={submitChanges}
            >
                Submit
            </Button>
        </VStack>
    );
};

export default Options;
