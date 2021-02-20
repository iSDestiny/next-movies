import {
    Box,
    Divider,
    Heading,
    HStack,
    Link,
    Text,
    useBreakpointValue,
    useColorMode,
    useToken,
    VStack
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useEffect } from 'react';

interface CastCreditsProps {
    cast: CombinedCastEntity[];
}

interface CrewCreditsProps {
    crew: CombinedCrewEntity[];
}

interface CreditsProps {
    credits: CombinedCredits;
}

interface CreditGroupProps {
    credits: CombinedCrewEntityAndCastEntity[];
    isLast: boolean;
    year?: string;
}

interface CrewCreditGroupProps {
    credits: CombinedCrewEntity[];
    heading: string;
}

const CreditGroup = ({ year, credits, isLast }: CreditGroupProps) => {
    const { colorMode } = useColorMode();
    const [gray300, gray700] = useToken('colors', ['gray.300', 'gray.700']);
    const borderColor = colorMode === 'light' ? gray300 : gray700;
    const textSize = useBreakpointValue({ base: 'xs', sm: 'sm', md: 'md' });

    return (
        <VStack
            as="ul"
            listStyleType="none"
            align="flex-start"
            borderBottom={isLast ? `1px solid ${borderColor}` : null}
            p="1rem"
            width="100%"
            spacing="1rem"
        >
            {credits.map(({ name, title, media_type, character, job, id }) => {
                return (
                    <HStack
                        as="li"
                        width="100%"
                        key={id}
                        align="flex-start"
                        spacing="1rem"
                    >
                        <Text as="span" fontSize={textSize}>
                            {isNaN(+year) ? '—' : year}
                        </Text>
                        <Text fontSize={textSize}>
                            <NextLink
                                href={
                                    media_type === 'movie'
                                        ? `/movies/${id}`
                                        : `/tv/${id}`
                                }
                                passHref
                            >
                                <Link
                                    fontSize={textSize}
                                    fontWeight="bold"
                                    _hover={{ textDecoration: 'underline' }}
                                    _focus={{
                                        textDecoration: 'underline'
                                    }}
                                >
                                    {title || name}
                                </Link>
                            </NextLink>{' '}
                            {character && (
                                <Text as="span" fontSize={textSize}>
                                    as {character}
                                </Text>
                            )}
                            {job && (
                                <Text as="span" fontSize={textSize}>
                                    — {job}
                                </Text>
                            )}
                        </Text>
                    </HStack>
                );
            })}
        </VStack>
    );
};

const CastCredits = ({ cast }: CastCreditsProps) => {
    const { colorMode } = useColorMode();
    const [gray300, gray700] = useToken('colors', ['gray.300', 'gray.700']);
    const borderColor = colorMode === 'light' ? gray300 : gray700;
    interface CastByYear {
        [key: string]: CombinedCastEntity[];
    }

    let castByYear: CastByYear = {};

    cast.forEach((castItem) => {
        const { release_date, first_air_date } = castItem;
        const year =
            new Date(release_date || first_air_date).getFullYear() + '';

        if (castByYear[year]) {
            castByYear[year].push(castItem);
        } else {
            castByYear[year] = [castItem];
        }
    });

    const sortedYearKeys = Object.keys(castByYear).sort(
        (a, b) => parseInt(b) - parseInt(a)
    );

    useEffect(() => {
        console.log(castByYear);
    }, []);

    return (
        <Box as="section" width="100%">
            <Heading size="md" mb="1rem">
                Acting
            </Heading>
            <VStack
                boxShadow={`0px 1px 8px rgba(0,0,0,${
                    colorMode === 'light' ? 0.2 : 0.8
                })`}
                width="100%"
                align="flex-start"
                spacing="0px"
                border={`1px solid ${borderColor}`}
            >
                {sortedYearKeys.map(
                    (year, index) =>
                        year && (
                            <CreditGroup
                                key={`acting-${year}`}
                                isLast={index !== sortedYearKeys.length - 1}
                                year={year}
                                credits={
                                    castByYear[
                                        year
                                    ] as CombinedCrewEntityAndCastEntity[]
                                }
                            />
                        )
                )}
            </VStack>
        </Box>
    );
};

const CrewCreditGroup = ({ credits, heading }: CrewCreditGroupProps) => {
    const { colorMode } = useColorMode();
    const [gray300, gray700] = useToken('colors', ['gray.300', 'gray.700']);
    const borderColor = colorMode === 'light' ? gray300 : gray700;

    interface CrewByYear {
        [key: string]: CombinedCrewEntity[];
    }

    let crewByYear: CrewByYear = {};

    credits.forEach((crewItem) => {
        const { release_date, first_air_date } = crewItem;
        const year =
            new Date(release_date || first_air_date).getFullYear() + '';

        if (crewByYear[year]) crewByYear[year].push(crewItem);
        else crewByYear[year] = [crewItem];
    });

    const sortedYearKeys = Object.keys(crewByYear).sort(
        (a, b) => parseInt(b) - parseInt(a)
    );

    return (
        <Box as="section" width="100%">
            <Heading size="md" mb="1rem">
                {heading}
            </Heading>
            <VStack
                boxShadow={`0px 1px 8px rgba(0,0,0,${
                    colorMode === 'light' ? 0.2 : 0.8
                })`}
                width="100%"
                align="flex-start"
                spacing="0px"
                border={`1px solid ${borderColor}`}
            >
                {sortedYearKeys.map(
                    (year, index) =>
                        year && (
                            <CreditGroup
                                key={`acting-${year}`}
                                isLast={index !== sortedYearKeys.length - 1}
                                year={year}
                                credits={
                                    crewByYear[
                                        year
                                    ] as CombinedCrewEntityAndCastEntity[]
                                }
                            />
                        )
                )}
            </VStack>
        </Box>
    );
};

const CrewCredits = ({ crew }: CrewCreditsProps) => {
    interface CrewByDepartment {
        [key: string]: CombinedCrewEntity[];
    }

    let crewByDepartment: CrewByDepartment = {};

    crew.forEach((crewItem) => {
        const { department } = crewItem;

        if (crewByDepartment[department])
            crewByDepartment[department].push(crewItem);
        else crewByDepartment[department] = [crewItem];
    });

    return (
        <>
            {Object.keys(crewByDepartment).map((department) => (
                <CrewCreditGroup
                    heading={department}
                    credits={crewByDepartment[department]}
                    key={department}
                />
            ))}
        </>
    );
};

const Credits = ({ credits: { cast, crew } }: CreditsProps) => {
    return (
        <VStack
            align="flex-start"
            width="100%"
            spacing={{ base: '1.5rem', lg: '2rem' }}
        >
            <CastCredits cast={cast} />
            <CrewCredits crew={crew} />
        </VStack>
    );
};

export default Credits;
