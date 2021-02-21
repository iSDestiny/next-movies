import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Heading,
    Select,
    useColorMode,
    useToken,
    VStack
} from '@chakra-ui/react';

interface OptionsProps {
    type: 'movie' | 'tv';
    genres: GenresEntityOrKeywordsEntity[];
    languages: Language[];
    certifications?: CertificationDetails[];
}

const SortOptions = () => {
    return (
        <Box>
            <Heading size="sm" fontWeight="normal" mb="0.5rem">
                Sort Results By
            </Heading>
            <Select defaultValue="popularity.desc" variant="filled">
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
}: OptionsProps) => {};

const Options = (props: OptionsProps) => {
    const { colorMode } = useColorMode();
    const [gray300, gray700] = useToken('colors', ['gray.300', 'gray.700']);
    const sideBarColor = colorMode === 'light' ? 'gray.100' : 'gray.700';
    const borderColor = colorMode === 'light' ? gray300 : gray700;

    return (
        <VStack width={{ base: '100%', lg: '20%' }} align="flex-start">
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
                        <SortOptions />
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
        </VStack>
    );
};

export default Options;
