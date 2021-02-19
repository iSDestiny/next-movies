import {
    Box,
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

    return (
        <VStack spacing="1rem" width="30%" as="aside" align="flex-start">
            <Image
                className="border-round"
                src={`${secure_base_url}${profile_sizes[profileSize]}${profile_path}`}
                alt={`${name} profile`}
                width={300}
                height={450}
            />
            <VStack spacing="1rem" as="main" align="flex-start">
                <Heading size="md">Personal Info</Heading>
                {personalInfo.map(
                    ({ heading, body }) =>
                        body && (
                            <Box as="section" key={heading}>
                                <Heading as="h3" size="sm">
                                    {heading}
                                </Heading>
                                <Text size="sm">{body}</Text>
                            </Box>
                        )
                )}
                <Box as="section">
                    <Heading as="h3" size="sm">
                        Also Known As
                    </Heading>
                    {also_known_as.map((name, index) => (
                        <Text size="sm" key={`${name}-${index}`}>
                            {name}
                        </Text>
                    ))}
                </Box>
            </VStack>
        </VStack>
    );
};

export default PersonSideData;
