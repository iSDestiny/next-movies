import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    DarkMode,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Heading,
    Link,
    VStack
} from '@chakra-ui/react';
import NextLink from 'next/link';

interface MobileNavProps {
    onClose: () => void;
    isOpen: boolean;
}

const MobileNav = ({ onClose, isOpen }: MobileNavProps) => {
    return (
        <DarkMode>
            <Drawer
                placement="left"
                onClose={onClose}
                isOpen={isOpen}
                motionPreset="slideInRight"
            >
                <DrawerOverlay>
                    <DrawerContent color="white" bgColor="gray.800">
                        <DrawerHeader>Next Movies</DrawerHeader>
                        <DrawerBody>
                            <Accordion allowMultiple>
                                <AccordionItem border="none" mt="0.5rem">
                                    <h2>
                                        <AccordionButton
                                            px="0px 0.5rem"
                                            _focus={{
                                                outline: 'none',
                                                bgColor: 'gray.700'
                                            }}
                                        >
                                            <Heading
                                                as="span"
                                                size="md"
                                                flex="1"
                                                textAlign="left"
                                                fontWeight="500"
                                            >
                                                Movies
                                            </Heading>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel
                                        p="0px 0.5rem"
                                        as="ul"
                                        listStyleType="none"
                                    >
                                        <Box as="li" mb="0.5rem">
                                            <NextLink href="/movies" passHref>
                                                <Link>Browse</Link>
                                            </NextLink>
                                        </Box>
                                        <Box as="li" mb="0.5rem">
                                            <NextLink
                                                href="/movies/trending"
                                                passHref
                                            >
                                                <Link>Trending</Link>
                                            </NextLink>
                                        </Box>
                                    </AccordionPanel>
                                </AccordionItem>
                                <AccordionItem border="none">
                                    <h2>
                                        <AccordionButton
                                            px="0px 0.5rem"
                                            _focus={{
                                                outline: 'none',
                                                bgColor: 'gray.700'
                                            }}
                                        >
                                            <Heading
                                                as="span"
                                                size="md"
                                                flex="1"
                                                textAlign="left"
                                                fontWeight="500"
                                            >
                                                TV Shows
                                            </Heading>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel
                                        p="0px 0.5rem"
                                        as="ul"
                                        listStyleType="none"
                                    >
                                        <Box as="li" mb="0.5rem">
                                            <NextLink href="/tv" passHref>
                                                <Link>Browse</Link>
                                            </NextLink>
                                        </Box>
                                        <Box as="li" mb="0.5rem">
                                            <NextLink
                                                href="/tv/trending"
                                                passHref
                                            >
                                                <Link>Trending</Link>
                                            </NextLink>
                                        </Box>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </DarkMode>
    );
};

export default MobileNav;
