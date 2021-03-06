import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Button,
    Heading,
    useColorMode,
    useToken,
    VStack
} from '@chakra-ui/react';
import { Filters } from 'hooks/useDiscover';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
const SortOptions = dynamic(import('./SortOptions'));
const FilterOptions = dynamic(import('./FilterOptions'));

interface OptionsProps {
    type: 'movie' | 'tv';
    genres: GenresEntityOrKeywordsEntity[];
    languages: Language[];
    certifications?: CertificationDetails[];
    setSort: (newSort: string) => void;
    setFilters: (newFilters: Filters) => void;
}

const Options = (props: OptionsProps) => {
    const { setSort, setFilters } = props;

    const { colorMode } = useColorMode();
    const [newFilters, setNewFilters] = useState<Filters>({
        runtimeGreater: 0,
        runtimeLess: 400,
        ratingGreater: 0,
        ratingLess: 10,
        voteCountGreater: 0
    });
    const [newSort, setNewSort] = useState('popularity.desc');
    const [gray300, gray700] = useToken('colors', ['gray.300', 'gray.700']);
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
                    {({ isExpanded }) => (
                        <>
                            <h3>
                                <AccordionButton>
                                    <Heading
                                        size="md"
                                        flex={1}
                                        textAlign="left"
                                    >
                                        Sort
                                    </Heading>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h3>
                            <AccordionPanel>
                                <AnimatePresence>
                                    {isExpanded && (
                                        <SortOptions
                                            sort={newSort}
                                            setSort={setNewSort}
                                        />
                                    )}
                                </AnimatePresence>
                            </AccordionPanel>
                        </>
                    )}
                </AccordionItem>
                <AccordionItem border="none" p="0.5rem 0.2rem">
                    {({ isExpanded }) => (
                        <>
                            <h3>
                                <AccordionButton>
                                    <Heading
                                        size="md"
                                        flex={1}
                                        textAlign="left"
                                    >
                                        Filters
                                    </Heading>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h3>
                            <AccordionPanel>
                                <AnimatePresence>
                                    {isExpanded && (
                                        <FilterOptions
                                            {...props}
                                            filters={newFilters}
                                            setFilters={setNewFilters}
                                        />
                                    )}
                                </AnimatePresence>
                            </AccordionPanel>
                        </>
                    )}
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
