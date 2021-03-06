import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Heading,
    Input,
    VStack,
    Wrap,
    WrapItem
} from '@chakra-ui/react';
import MotionBox from 'components/MotionBox';
import { Filters } from 'hooks/useDiscover';
import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import DatePicker from 'react-datepicker';
import ReactSlider from 'react-slider';

interface FilterProps {
    type: 'movie' | 'tv';
    genres: GenresEntityOrKeywordsEntity[];
    languages: Language[];
    certifications?: CertificationDetails[];
    setFilters: Dispatch<SetStateAction<Filters>>;
    filters: Filters;
}

const FilterOptionsSection: FunctionComponent<{ heading: string }> = ({
    heading,
    children
}) => {
    return (
        <VStack align="flex-start" spacing="0.5rem" w="100%">
            <Heading as="h3" size="sm" fontWeight="normal">
                {heading}
            </Heading>
            {children}
        </VStack>
    );
};

const FilterOptionsAccordionSection: FunctionComponent<{ heading: string }> = ({
    heading,
    children
}) => {
    return (
        <Accordion
            allowMultiple
            p="0px"
            w="100%"
            border="0px solid transparent"
        >
            <AccordionItem py="0px" w="100%">
                <Box as="h2" pb="0.5rem">
                    <AccordionButton p="0px">
                        <Heading
                            as="span"
                            size="sm"
                            fontWeight="normal"
                            textAlign="left"
                            flex={1}
                        >
                            {heading}
                        </Heading>
                        <AccordionIcon />
                    </AccordionButton>
                </Box>

                <AccordionPanel p="0px">{children}</AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};

const convertYYYYMMDDToDate = (date: string) => {
    if (!date) return null;
    const [year, month, day] = date.split('-');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};

const FilterOptions = ({
    type,
    genres,
    languages,
    certifications,
    filters,
    setFilters
}: FilterProps) => {
    const {
        releaseDateGreater,
        releaseDateLess,
        voteCountGreater,
        ratingGreater,
        ratingLess,
        runtimeGreater,
        runtimeLess
    } = filters;

    const [fromDate, setFromDate] = useState<Date>(
        releaseDateGreater ? convertYYYYMMDDToDate(releaseDateGreater) : null
    );
    const [toDate, setToDate] = useState<Date>(
        releaseDateGreater ? convertYYYYMMDDToDate(releaseDateLess) : null
    );

    const convertDateToYYYYMMDD = (date: Date) => {
        if (!date) return null;
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

    const includeGenreHandler = (id: string) => {
        setFilters((prev) => {
            const newFilters = { ...prev };
            const includeGenres = newFilters.includeGenres as string[];
            const excludeGenres = newFilters.excludeGenres as string[];
            if (includeGenres) {
                if (includeGenres.find((genreId) => genreId === id))
                    newFilters.includeGenres = includeGenres.filter(
                        (genreId) => genreId !== id
                    );
                else {
                    (newFilters.includeGenres as string[]).push(id);
                    newFilters.excludeGenres = excludeGenres?.filter(
                        (genreId) => genreId !== id
                    );
                }
            } else {
                newFilters.includeGenres = [id];
                newFilters.excludeGenres = excludeGenres?.filter(
                    (genreId) => genreId !== id
                );
            }
            return newFilters;
        });
    };

    const excludeGenreHandler = (id: string) => {
        setFilters((prev) => {
            const newFilters = { ...prev };
            const excludeGenres = newFilters.excludeGenres as string[];
            const includeGenres = newFilters.includeGenres as string[];
            if (excludeGenres) {
                if (excludeGenres.find((genreId) => genreId === id))
                    newFilters.excludeGenres = excludeGenres.filter(
                        (genreId) => genreId !== id
                    );
                else {
                    (newFilters.excludeGenres as string[]).push(id);
                    newFilters.includeGenres = includeGenres?.filter(
                        (genreId) => genreId !== id
                    );
                }
            } else {
                newFilters.excludeGenres = [id];

                newFilters.includeGenres = includeGenres?.filter(
                    (genreId) => genreId !== id
                );
            }
            return newFilters;
        });
    };

    const ratingChangeHandler = ([start, end]: number[]) => {
        setFilters((prev) => {
            const newFilters = { ...prev };
            newFilters.ratingGreater = start;
            newFilters.ratingLess = end;
            return newFilters;
        });
    };

    const minVotesChangeHandler = (minVotes: number) => {
        setFilters((prev) => {
            const newFilters = { ...prev };
            newFilters.voteCountGreater = minVotes;
            return newFilters;
        });
    };

    const runtimeChangeHandler = ([start, end]: number[]) => {
        setFilters((prev) => {
            const newFilters = { ...prev };
            newFilters.runtimeGreater = start;
            newFilters.runtimeLess = end;
            return newFilters;
        });
    };

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
        <MotionBox as={VStack} align="flex-start" spacing="1rem">
            <FilterOptionsSection heading="Release Dates">
                <DatePicker
                    selected={fromDate}
                    onChange={changeFromDateHandler}
                    selectsStart
                    startDate={fromDate}
                    customInput={
                        <Input
                            variant="outline"
                            label="from-release-date"
                            width="100%"
                        />
                    }
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
                    customInput={
                        <Input
                            variant="outline"
                            label="to-release-date"
                            width="100%"
                        />
                    }
                    placeholderText="To"
                />
            </FilterOptionsSection>
            <FilterOptionsAccordionSection heading="Include Genres">
                <Wrap>
                    {genres.map(({ id, name }) => (
                        <WrapItem key={id}>
                            <Button
                                variant={
                                    (filters.includeGenres as string[])?.find(
                                        (genreId) => genreId === id + ''
                                    )
                                        ? 'solid'
                                        : 'outline'
                                }
                                size="sm"
                                colorScheme="teal"
                                onClick={() => includeGenreHandler(id + '')}
                            >
                                {name}
                            </Button>
                        </WrapItem>
                    ))}
                </Wrap>
            </FilterOptionsAccordionSection>
            <FilterOptionsAccordionSection heading="Exclude Genres">
                <Wrap>
                    {genres.map(({ id, name }) => (
                        <WrapItem key={id}>
                            <Button
                                variant={
                                    (filters.excludeGenres as string[])?.find(
                                        (genreId) => genreId === id + ''
                                    )
                                        ? 'solid'
                                        : 'outline'
                                }
                                size="sm"
                                colorScheme="teal"
                                onClick={() => excludeGenreHandler(id + '')}
                            >
                                {name}
                            </Button>
                        </WrapItem>
                    ))}
                </Wrap>
            </FilterOptionsAccordionSection>
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
            <FilterOptionsSection heading="User Rating">
                <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    defaultValue={[0, 10]}
                    value={[ratingGreater, ratingLess]}
                    onAfterChange={(value) =>
                        ratingChangeHandler(value as number[])
                    }
                    min={0}
                    max={10}
                    ariaLabel={['Lower thumb', 'Upper thumb']}
                    ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                    renderThumb={(props, state) => (
                        <div {...props}>{state.valueNow}</div>
                    )}
                    pearling
                />
            </FilterOptionsSection>
            <FilterOptionsSection heading="Minimum User Votes">
                <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    onAfterChange={(value) =>
                        minVotesChangeHandler(value as number)
                    }
                    value={voteCountGreater}
                    step={50}
                    min={0}
                    max={500}
                    ariaLabel={['Lower thumb', 'Upper thumb']}
                    ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                    renderThumb={(props, state) => (
                        <div {...props}>{state.valueNow}</div>
                    )}
                />
            </FilterOptionsSection>
            <FilterOptionsSection heading="Runtime (in minutes)">
                <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    defaultValue={[0, 400]}
                    value={[runtimeGreater, runtimeLess]}
                    onAfterChange={(value) =>
                        runtimeChangeHandler(value as number[])
                    }
                    step={20}
                    min={0}
                    max={400}
                    ariaLabel={['Lower thumb', 'Upper thumb']}
                    ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                    renderThumb={(props, state) => (
                        <div {...props}>{state.valueNow}</div>
                    )}
                    pearling
                />
            </FilterOptionsSection>
        </MotionBox>
    );
};

export default FilterOptions;
