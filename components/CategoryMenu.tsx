import {
    Box,
    HStack,
    Text,
    Tag,
    VStack,
    Heading,
    useToken,
    useColorMode,
    Flex,
    useBreakpointValue
} from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

export interface Category {
    heading: string;
    mediaType: string;
    data: SearchResults;
    loading: boolean;
}

interface CategoryMenuProps {
    query: string;
    categories: Category[];
    selected: number;
    setSelected: Dispatch<SetStateAction<number>>;
}

export const MobileCategoryMenu = ({
    query,
    categories,
    selected,
    setSelected
}: CategoryMenuProps) => {
    const { colorMode } = useColorMode();
    const sideBarColor = colorMode === 'light' ? 'gray.100' : 'gray.700';
    const [gray300, gray700] = useToken('colors', ['gray.300', 'gray.700']);
    const tagSize = useBreakpointValue({ base: 'sm' });

    return (
        <Flex display={{ base: 'column', lg: 'none' }} width="100%">
            <Heading
                size="sm"
                p="1rem"
                color="white"
                bgColor="teal.500"
            >{`"${query}"`}</Heading>
            <HStack
                align="flex-start"
                overflowX="auto"
                spacing={0}
                as="ul"
                listStyleType="none"
                borderBottom={`1px solid ${
                    colorMode === 'light' ? gray300 : gray700
                }`}
            >
                {categories.map(({ heading, data }, index) => (
                    <Box as="li" width="100%" key={index} m="0px">
                        <HStack
                            width="100%"
                            as="button"
                            _focus={{
                                bgColor: sideBarColor,
                                outline: 'none'
                            }}
                            _hover={{
                                bgColor: sideBarColor
                            }}
                            bgColor={
                                selected === index ? sideBarColor : 'inherit'
                            }
                            cursor="pointer"
                            justify="space-between"
                            align="center"
                            p="0.5rem"
                            onClick={() => setSelected(index)}
                        >
                            <Text
                                fontWeight={
                                    selected === index ? 'bold' : 'normal'
                                }
                                fontSize={{ base: '0.8rem', sm: '1rem' }}
                            >
                                {heading}
                            </Text>
                            <Tag colorScheme="teal" size={tagSize}>
                                {query ? data?.total_results : 0}
                            </Tag>
                        </HStack>
                    </Box>
                ))}
            </HStack>
        </Flex>
    );
};

const CategoryMenu = ({
    query,
    categories,
    selected,
    setSelected
}: CategoryMenuProps) => {
    const { colorMode } = useColorMode();
    const sideBarColor = colorMode === 'light' ? 'gray.100' : 'gray.700';
    const [gray300, gray700] = useToken('colors', ['gray.300', 'gray.700']);

    return (
        <>
            <VStack
                display={{ base: 'none', lg: 'flex' }}
                width="20%"
                as="aside"
                borderRadius="8px"
                overflow="hidden"
                border={`1px solid ${
                    colorMode === 'light' ? gray300 : gray700
                }`}
            >
                <Heading
                    width="100%"
                    size="md"
                    color="white"
                    bgColor="teal.500"
                    p="1.2rem"
                >
                    {`"${query}"`}
                </Heading>
                <VStack
                    as="ul"
                    listStyleType="none"
                    width="100%"
                    my="1rem"
                    spacing={0}
                >
                    {categories.map(({ heading, data }, index) => (
                        <Box as="li" width="100%" key={index} m="0px">
                            <HStack
                                width="100%"
                                as="button"
                                _focus={{
                                    bgColor: sideBarColor,
                                    outline: 'none'
                                }}
                                _hover={{
                                    bgColor: sideBarColor
                                }}
                                bgColor={
                                    selected === index
                                        ? sideBarColor
                                        : 'inherit'
                                }
                                cursor="pointer"
                                justify="space-between"
                                align="center"
                                p="0.5rem 1.5rem"
                                onClick={() => setSelected(index)}
                            >
                                <Text
                                    fontWeight={
                                        selected === index ? 'bold' : 'normal'
                                    }
                                >
                                    {heading}
                                </Text>
                                <Tag colorScheme="teal">
                                    {query ? data?.total_results : 0}
                                </Tag>
                            </HStack>
                        </Box>
                    ))}
                </VStack>
            </VStack>
        </>
    );
};

export default CategoryMenu;
