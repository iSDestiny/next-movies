import {
    Box,
    Grid,
    GridItem,
    Heading,
    HStack,
    Icon,
    Link,
    Skeleton,
    Stack,
    Text,
    useBreakpointValue,
    useColorMode,
    useToken,
    VStack
} from '@chakra-ui/react';
import CardSkeleton from 'components/CardSkeleton';
import { FaBuilding, FaGlobeAmericas, FaLink } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';

interface SpecificFilterFallbackSkeletonProps {
    type?: string;
}

const MetaDataBarSkeleton = () => (
    <Box width="100%" color="gray.100" bgColor="teal.600">
        <Stack
            direction={{ base: 'column', md: 'row' }}
            align="center"
            spacing="1rem"
            m="auto"
            maxWidth="1400px"
            p="0.5rem 1rem"
        >
            <Skeleton>
                <HStack>
                    <Icon as={FaBuilding} fontSize="1.1rem" />
                    <Text size="md">Dummy</Text>
                </HStack>
            </Skeleton>

            <Skeleton>
                <HStack spacing="1rem">
                    <HStack>
                        <Icon as={HiLocationMarker} fontSize="1.1rem" />
                        <Text size="md">Dummy</Text>
                    </HStack>
                    <HStack>
                        <Icon as={FaGlobeAmericas} />
                        <Text size="md">Dummy</Text>
                    </HStack>
                </HStack>
            </Skeleton>
            <Skeleton>
                <Link
                    _hover={{ textDecoration: 'underline' }}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <HStack>
                        <Icon as={FaLink} />
                        <Text size="md">Dummy</Text>
                    </HStack>
                </Link>
            </Skeleton>
        </Stack>
    </Box>
);

const FallbackSkeletonHeader = ({
    type
}: SpecificFilterFallbackSkeletonProps) => {
    const { colorMode } = useColorMode();
    const [gray300, gray700] = useToken('colors', ['gray.300', 'gray.700']);
    const borderColor = colorMode === 'light' ? gray300 : gray700;
    const amountSize = useBreakpointValue({ base: 'sm', md: 'md' });
    const headingSize = useBreakpointValue({ base: 'md', md: 'lg' });

    return (
        <VStack
            width="100%"
            as="header"
            borderBottom={`1px solid ${borderColor}`}
            spacing="0px"
        >
            <Box width="100%" color="white" bgColor="teal.500">
                <HStack
                    width="100%"
                    justify="space-between"
                    p="1rem"
                    maxWidth="1400px"
                    m="auto"
                >
                    <Skeleton>
                        <Heading as="h1" size={headingSize}>
                            Dummy
                        </Heading>
                    </Skeleton>
                    <Skeleton startColor="white" endColor="white">
                        <Heading size={amountSize}>Dummy</Heading>
                    </Skeleton>
                </HStack>
            </Box>
            {(type === 'company' || type === 'network') && (
                <MetaDataBarSkeleton />
            )}
            <HStack
                width="100%"
                justify="center"
                spacing="1rem"
                p={{ base: '0.3rem', sm: '0.5rem' }}
            >
                <Skeleton width="70px" height="35px" />
                <Skeleton width="70px" height="35px" />
            </HStack>
        </VStack>
    );
};

const SpecificFilterFallbackSkeleton = ({
    type
}: SpecificFilterFallbackSkeletonProps) => {
    return (
        <Box as="main" width="100%">
            <FallbackSkeletonHeader type={type} />

            <Box width="100%" maxWidth="1400px" m="auto" p="1rem">
                <Grid
                    templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
                    gap={5}
                    mb="1.5rem"
                >
                    {[...Array(20).keys()].map((num) => (
                        <GridItem key={num}>
                            <CardSkeleton />
                        </GridItem>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default SpecificFilterFallbackSkeleton;
