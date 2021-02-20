import {
    Box,
    Heading,
    HStack,
    Link,
    Text,
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

interface CreditGroup {
    credits: CombinedCrewEntityAndCastEntity[];
    isLast: boolean;
    year?: string;
}

const CreditGroup = ({ year, credits, isLast }: CreditGroup) => {
    const { colorMode } = useColorMode();
    const [gray300, gray700] = useToken('colors', ['gray.300', 'gray.700']);
    const borderColor = colorMode === 'light' ? gray300 : gray700;

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
                // if (!job)
                return (
                    <HStack as="li" width="100%" key={id}>
                        <Text size="sm">{year}</Text>
                        <HStack as="p" width="100%" spacing="0.3rem">
                            <NextLink
                                href={
                                    media_type === 'movie'
                                        ? `/movies/${id}`
                                        : `/tv/${id}`
                                }
                                passHref
                            >
                                <Link
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
                                <Text as="span" size="sm">
                                    as {character}
                                </Text>
                            )}
                        </HStack>
                    </HStack>
                );
                // return (
                //     <HStack as="li">
                //         <Text size="sm">{year}</Text>
                //         <Text size="sm">
                //             <NextLink
                //                 href={
                //                     media_type === 'movie'
                //                         ? `/movie/${id}`
                //                         : `/tv/${id}`
                //                 }
                //                 passHref
                //             >
                //                 <Link>{title || name}</Link>
                //             </NextLink>{' '}
                //             -- {job}
                //         </Text>
                //     </HStack>
                // );
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

        console.log(year);
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

const CrewCredits = ({ crew }: CrewCreditsProps) => {};

const Credits = ({ credits }: CreditsProps) => {
    return (
        <VStack align="flex-start" width="100%">
            <CastCredits cast={credits.cast} />
        </VStack>
    );
};

export default Credits;
