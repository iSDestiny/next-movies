import {
    Box,
    Flex,
    Heading,
    Link,
    Tag,
    Text,
    useBreakpointValue,
    useColorMode,
    useToken,
    Wrap,
    WrapItem
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface PersonCardProps {
    href: string;
    config: TMDBConfig;
    name: string;
    profilePath: string;
    knownFor: KnownForEntity[];
    department: string;
}

const PersonCard = ({
    href,
    config,
    name,
    profilePath,
    knownFor,
    department
}: PersonCardProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const headingSize = useBreakpointValue({ base: 'xs', lg: 'sm' });
    const tagSize = useBreakpointValue({ base: 'sm', md: 'md' });
    const { secure_base_url, profile_sizes } = config.images;
    const { colorMode } = useColorMode();
    const [gray300, gray700] = useToken('colors', ['gray.300', 'gray.700']);
    const cardBorderColor = colorMode === 'light' ? gray300 : gray700;
    const cardAccentColor = colorMode === 'light' ? 'gray.600' : 'gray.400';
    const focusColor = colorMode === 'light' ? 'gray.100' : 'gray.700';
    const profileSrc = profilePath
        ? `${secure_base_url}${profile_sizes[1]}${profilePath}`
        : '/images/profile-placeholder.png';

    return (
        <NextLink href={href} passHref>
            <Link
                _focus={{ outline: 'none' }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            >
                <Flex
                    bgColor={isFocused ? focusColor : 'transparent'}
                    border={`1px solid ${cardBorderColor}`}
                    width="100%"
                    height="100%"
                    overflow="hidden"
                    borderRadius="8px"
                    _hover={{ bgColor: focusColor }}
                    boxShadow={`2px 3px 6px rgba(0,0,0,${
                        colorMode === 'light' ? 0.2 : 0.8
                    })}`}
                >
                    <Box
                        width={{ base: '90px', lg: '110px' }}
                        height="100%"
                        position="relative"
                    >
                        <Image
                            src={profileSrc}
                            layout="fill"
                            alt={`${name} profile`}
                        />
                    </Box>
                    <Flex
                        direction="column"
                        width={{
                            base: 'calc(100% - 90px)',
                            lg: 'calc(100% - 110px)'
                        }}
                        p={{ base: '0.5rem', lg: '1rem' }}
                    >
                        <Box as="header" mb="1rem">
                            <Heading as="h3" size={headingSize} noOfLines={2}>
                                {name}
                            </Heading>
                            <Text
                                fontSize={{ base: '0.8rem', lg: '1rem' }}
                                color={cardAccentColor}
                            >
                                {department}
                            </Text>
                        </Box>
                        <Wrap>
                            {knownFor.map(({ id, media_type, title, name }) => (
                                <WrapItem key={id}>
                                    <Tag size={tagSize}>{title || name}</Tag>
                                </WrapItem>
                            ))}
                        </Wrap>
                    </Flex>
                </Flex>
            </Link>
        </NextLink>
    );
};

export default PersonCard;
