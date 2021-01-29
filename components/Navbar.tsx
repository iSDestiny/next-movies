import {
    Box,
    DarkMode,
    Flex,
    HStack,
    IconButton,
    Link,
    Tooltip,
    useColorMode
} from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import FocusLock from 'react-focus-lock';
import { FaMoon, FaSun, FaSearch } from 'react-icons/fa';
import MenuToggle from './MenuToggle';
// import MobileNav from './MobileNav';
import MotionBox from './MotionBox';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode();
    const router = useRouter();

    return (
        <FocusLock disabled={!isMenuOpen}>
            {/* <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <MobileNav
                            isOpen={isMenuOpen}
                            setIsOpen={setIsMenuOpen}
                            key="mobile-nav"
                        />
                    </>
                )}
            </AnimatePresence> */}
            <DarkMode>
                <Box as="header" bgColor="gray.900">
                    <Flex
                        as="nav"
                        justify="space-between"
                        align="center"
                        maxW="1200px"
                        margin="auto"
                        padding="0 1rem"
                        height="65px"
                    >
                        <HStack
                            as="ul"
                            spacing="1.5rem"
                            listStyleType="none"
                            align="center"
                            justify="center"
                        >
                            <Box
                                as="li"
                                display={{ base: 'none', md: 'block' }}
                            >
                                <NextLink href="/" passHref>
                                    <Link
                                        zIndex="4"
                                        color="white"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Next Movies
                                        {/* <Image
                                        priority
                                        width="220"
                                        height="50"
                                        alt="personal brand logo"
                                        src={
                                            colorMode === 'light'
                                                ? '/static/logos/brand/j-full-logo-transparent-black.png'
                                                : '/static/logos/brand/j-full-logo-transparent-white.png'
                                        }
                                    /> */}
                                    </Link>
                                </NextLink>
                            </Box>
                            <Box
                                as="li"
                                display={{ base: 'none', md: 'block' }}
                            >
                                <NextLink href="/movies" passHref>
                                    <Link
                                        color="white"
                                        borderBottom={
                                            router.pathname === '/movies'
                                                ? '4px solid teal'
                                                : 'none'
                                        }
                                        pb="3px"
                                        _hover={{
                                            borderBottom: '4px solid teal'
                                        }}
                                    >
                                        Movies
                                    </Link>
                                </NextLink>
                            </Box>
                            <Box
                                as="li"
                                display={{ base: 'none', md: 'block' }}
                            >
                                <NextLink href="/tv" passHref>
                                    <Link
                                        color="white"
                                        borderBottom={
                                            router.pathname === '/tv'
                                                ? '4px solid teal'
                                                : 'none'
                                        }
                                        pb="3px"
                                        _hover={{
                                            borderBottom: '4px solid teal'
                                        }}
                                    >
                                        TV Shows
                                    </Link>
                                </NextLink>
                            </Box>
                        </HStack>
                        <HStack as="ul" spacing="1.5rem" listStyleType="none">
                            <HStack as="li" position="relative">
                                <Tooltip label="Toggle light/dark mode">
                                    <IconButton
                                        size="lg"
                                        zIndex="4"
                                        aria-label="dark light switch"
                                        variant="ghost"
                                        borderRadius="50%"
                                        onClick={toggleColorMode}
                                        icon={
                                            colorMode === 'light' ? (
                                                <FaMoon fontSize="1.5rem" />
                                            ) : (
                                                <FaSun fontSize="1.5rem" />
                                            )
                                        }
                                    />
                                </Tooltip>
                                <Tooltip label="Search">
                                    <IconButton
                                        size="lg"
                                        zIndex="4"
                                        aria-label="search"
                                        variant="ghost"
                                        borderRadius="50%"
                                        // onClick={toggleColorMode}
                                        icon={<FaSearch fontSize="1.5rem" />}
                                    />
                                </Tooltip>
                            </HStack>
                            <MotionBox
                                as="li"
                                zIndex="4"
                                exit="closed"
                                initial={false}
                                animate={isMenuOpen ? 'open' : 'closed'}
                                display={{ base: 'block', md: 'none' }}
                            >
                                <MenuToggle
                                    toggle={() =>
                                        setIsMenuOpen((prev) => !prev)
                                    }
                                />
                            </MotionBox>
                        </HStack>
                    </Flex>
                </Box>
            </DarkMode>
        </FocusLock>
    );
};

export default Navbar;
