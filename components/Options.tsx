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
    VStack,
    chakra,
    Wrap,
    WrapItem
} from '@chakra-ui/react';
import { Filters } from 'hooks/useDiscover';
import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import DatePicker from 'react-datepicker';

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
    setFilters: Dispatch<SetStateAction<Filters>>;
    filters: Filters;
}

interface SortOptions {
    sort: string;
    setSort: (newSort: string) => void;
}

const SortOptions = ({ sort, setSort }: SortOptions) => {
    return (
        <Box>
            <Heading as="h4" size="sm" fontWeight="normal" mb="0.5rem">
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

const FilterOptionsSection: FunctionComponent<{ heading: string }> = ({
    heading,
    children
}) => {
    return (
        <VStack align="flex-start" spacing="0.5rem" w="100%">
            <Heading as="h4" size="sm" fontWeight="normal">
                {heading}
            </Heading>
            {children}
        </VStack>
    );
};

const FilterOptions = ({
    type,
    genres,
    languages,
    certifications,
    filters,
    setFilters
}: FilterProps) => {
    const { releaseDateGreater, releaseDateLess } = filters;
    const [fromDate, setFromDate] = useState<Date>(
        releaseDateGreater ? new Date(releaseDateGreater) : null
    );
    const [toDate, setToDate] = useState<Date>(
        releaseDateGreater ? new Date(releaseDateLess) : null
    );

    const convertDateToYYYYMMDD = (date: Date) => {
        const offset = date.getTimezoneOffset();
        date = new Date(date.getTime() - offset * 60 * 1000);
        return date.toISOString().split('T')[0];
    };

    const changeFromDateHandler = (newDate: Date) => {
        setFromDate(newDate);
        setFilters((prev) => {
            const newFilters = { ...prev };
            newFilters.releaseDateGreater = convertDateToYYYYMMDD(newDate);
            return newFilters;
        });
    };

    const changeToDateHandler = (newDate: Date) => {
        setToDate(newDate);
        setFilters((prev) => {
            const newFilters = { ...prev };
            newFilters.releaseDateLess = convertDateToYYYYMMDD(newDate);
            return newFilters;
        });
    };

    const genreHandler = (id: number) => {};

    const certHandler = (certification: string) => {
        setFilters((prev) => {
            const newFilters = { ...prev };
            const certifications = newFilters.certifications as string[];
            if (certifications) {
                if (certifications.find((cert) => cert === certification))
                    newFilters.certifications = certifications.filter(
                        (cert) => cert !== certification
                    );
                else
                    (newFilters.certifications as string[]).push(certification);
            } else newFilters.certifications = [certification];
            return newFilters;
        });
    };

    return (
        <VStack align="flex-start" spacing="1rem">
            <FilterOptionsSection heading="Release Dates">
                <DatePicker
                    selected={fromDate}
                    onChange={changeFromDateHandler}
                    selectsStart
                    startDate={fromDate}
                    endDate={toDate}
                    placeholderText="From"
                />
                <DatePicker
                    selected={toDate}
                    onChange={changeToDateHandler}
                    selectsEnd
                    startDate={fromDate}
                    endDate={toDate}
                    minDate={fromDate}
                    placeholderText="To"
                />
            </FilterOptionsSection>
            <FilterOptionsSection heading="Genres">
                <Wrap>
                    {genres.map(({ id, name }) => (
                        <WrapItem key={id}>
                            <Button
                                variant="outline"
                                size="sm"
                                colorScheme="teal"
                            >
                                {name}
                            </Button>
                        </WrapItem>
                    ))}
                </Wrap>
            </FilterOptionsSection>

            {type === 'movie' && (
                <FilterOptionsSection heading="Certifications">
                    <Wrap>
                        {certifications.map(({ certification }) => (
                            <WrapItem key={certification}>
                                <Button
                                    variant={
                                        (filters.certifications as string[])?.find(
                                            (cert) => cert === certification
                                        )
                                            ? 'solid'
                                            : 'outline'
                                    }
                                    size="sm"
                                    colorScheme="teal"
                                    onClick={() => certHandler(certification)}
                                >
                                    {certification}
                                </Button>
                            </WrapItem>
                        ))}
                    </Wrap>
                </FilterOptionsSection>
            )}
        </VStack>
    );
};

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
                    <AccordionPanel>
                        <FilterOptions
                            {...props}
                            filters={newFilters}
                            setFilters={setNewFilters}
                        />
                    </AccordionPanel>
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
