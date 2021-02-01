import { Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Flex
            width="100%"
            justify="center"
            align="center"
            direction="column"
            bgColor="gray.900"
            color="white"
            p="2rem"
        >
            <Text>Created By Jason Bugallon</Text>
            <Text>
                Data fetched from{' '}
                <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://www.themoviedb.org/"
                    aria-label="TMDb"
                    color="teal.500"
                >
                    TMDb
                </Link>
            </Text>
            <Text>{`Next Movies © ${new Date().getFullYear()}`}</Text>
        </Flex>
    );
};

export default Footer;
