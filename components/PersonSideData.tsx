import {
    Box,
    Flex,
    Grid,
    GridItem,
    Heading,
    Text,
    useBreakpointValue,
    VStack
} from '@chakra-ui/react';
import Image from 'next/image';

interface PersonSideDataProps {
    personData: PersonDetails;
    config: TMDBConfig;
}

const calculateAge = (birthday: Date, deathday?: Date) => {
    const endDate = deathday ? deathday.getTime() : Date.now();
    var ageDifMs = endDate - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const PersonSideData = ({ personData, config }: PersonSideDataProps) => {
    const { secure_base_url, profile_sizes } = config.images;
    const {
        name,
        also_known_as,
        birthday,
        deathday,
        combined_credits,
        gender,
        homepage,
        known_for_department,
        place_of_birth,
        profile_path
    } = personData;
    const known_credits =
        combined_credits[known_for_department === 'Acting' ? 'cast' : 'crew']
            .length;
    const personalInfo = [
        { heading: 'Known For', body: known_for_department },
        { heading: 'Known Credits', body: known_credits },
        { heading: 'Gender', body: gender === 2 ? 'Male' : 'Female' },
        {
            heading: 'Birthday',
            body: deathday
                ? birthday
                : `${birthday} (${calculateAge(new Date(birthday))} years old)`
        },
        {
            heading: 'Day of Death',
            body:
                deathday &&
                `${deathday} (${calculateAge(
                    new Date(birthday),
                    new Date(deathday)
                )} years old)`
        },
        { heading: 'Place of Birth', body: place_of_birth }
    ];

    const profileSize = useBreakpointValue({ base: 1, md: 2, lg: 3 });
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const textSize = { base: 'sm', md: 'md' };
    const dimensions = useBreakpointValue([
        [150, 225],
        [200, 300],
        [250, 375],
        [300, 450]
    ]);

    return (
        <VStack
            spacing="1rem"
            width={{ base: '100%', lg: '22%' }}
            as="aside"
            align="flex-start"
        >
            <Flex
                alignSelf={{ base: 'center', lg: 'flex-start' }}
                direction="column"
            >
                {dimensions && (
                    <Image
                        className="border-round"
                        src={`${secure_base_url}${profile_sizes[profileSize]}${profile_path}`}
                        alt={`${name} profile`}
                        width={dimensions[0]}
                        height={dimensions[1]}
                    />
                )}
                {isMobile && (
                    <Heading textAlign="center" mt="0.5rem" as="h1" size="lg">
                        {name}
                    </Heading>
                )}
            </Flex>
            <Box width="100%">
                <Heading size="md">Personal Info</Heading>
                <Grid
                    gap="1rem"
                    width="100%"
                    mt="0.5rem"
                    as="main"
                    templateColumns={{ base: 'repeat(2, 1fr)', lg: '1fr' }}
                    templateRows={{ base: 'repeat(4, 1fr)', lg: null }}
                >
                    {personalInfo.map(
                        ({ heading, body }) =>
                            body && (
                                <GridItem as="section" key={heading}>
                                    <Heading as="h3" size="sm">
                                        {heading}
                                    </Heading>
                                    <Text fontSize={textSize}>{body}</Text>
                                </GridItem>
                            )
                    )}
                    <GridItem
                        as="section"
                        rowStart={{ base: 1, lg: 'auto' }}
                        rowEnd={{ base: 5, lg: 'auto' }}
                        colStart={{ base: 2, lg: 'auto' }}
                        colEnd={{ base: 2, lg: 'auto' }}
                    >
                        <Heading as="h3" size="sm">
                            Also Known As
                        </Heading>
                        <VStack
                            as="ul"
                            align="flex-start"
                            listStyleType="none"
                            spacing="0.2rem"
                        >
                            {also_known_as.map((name, index) => (
                                <Text
                                    as="li"
                                    fontSize={textSize}
                                    key={`${name}-${index}`}
                                >
                                    {name}
                                </Text>
                            ))}
                        </VStack>
                    </GridItem>
                </Grid>
            </Box>
        </VStack>
    );
};

export default PersonSideData;
