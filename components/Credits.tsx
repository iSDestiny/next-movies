import { Box, Heading, HStack, Link, Text, VStack } from '@chakra-ui/react';
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
    year?: string;
}

const CreditGroup = ({ year, credits }: CreditGroup) => {
    return (
        <VStack
            as="ul"
            listStyleType="none"
            align="flex-start"
            borderBottom="1px solid gray"
            p="1rem"
            width="100%"
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
                                        ? `/movie/${id}`
                                        : `/tv/${id}`
                                }
                                passHref
                            >
                                <Link
                                    fontWeight="bold"
                                    _focus={{
                                        textDecoration: 'underline!important'
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
    cast.sort((a, b) => {
        const dateA = new Date(a.release_date || a.first_air_date);
        const dateB = new Date(b.release_date || b.first_air_date);
        if (dateA < dateB) return 1;
        if (dateA > dateB) return -1;
        return 0;
    });

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

    useEffect(() => {
        console.log(castByYear);
    }, []);

    return (
        <Box as="section">
            <Heading size="md" mb="1rem">
                Acting
            </Heading>
            {
                <VStack
                    align="flex-start"
                    spacing="0px"
                    border="1px solid gray"
                >
                    {Object.keys(castByYear).map(
                        (year, index) =>
                            year && (
                                <CreditGroup
                                    key={year}
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
            }
        </Box>
    );
};

const CrewCredits = ({ crew }: CrewCreditsProps) => {};

const Credits = ({ credits }: CreditsProps) => {
    return (
        <VStack align="flex-start">
            <CastCredits cast={credits.cast} />
        </VStack>
    );
};

export default Credits;
