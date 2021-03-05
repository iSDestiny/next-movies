import {
    Box,
    Text,
    Heading,
    Wrap,
    Link,
    WrapItem,
    Tag
} from '@chakra-ui/react';

import NextLink from 'next/link';

interface SideDataItemProps {
    heading: string;
    data: string | number;
    isDollar?: boolean;
    headingSize: string;
}

interface SideDataItem {
    heading: string;
    data: any;
    isDollar?: boolean;
}
interface ShowSideDataProps {
    items: SideDataItem[];
    keywords: GenresEntityOrKeywordsEntity[];
    headingSize: string;
}

const SideDataItem = ({
    heading,
    headingSize,
    data,
    isDollar
}: SideDataItemProps) => {
    const displayData = () => {
        if (isDollar) return `$${data.toLocaleString()}`;
        return data;
    };
    return (
        <Box>
            <Heading as="h4" size={headingSize}>
                {heading}
            </Heading>
            {heading !== 'Networks' ? (
                <Text>{data ? displayData() : '-'}</Text>
            ) : (
                <>{data}</>
            )}
        </Box>
    );
};

const ShowSideData = ({ items, keywords, headingSize }: ShowSideDataProps) => {
    return (
        <>
            {items.map(({ heading, data, isDollar }, index) => (
                <SideDataItem
                    key={index}
                    heading={heading}
                    data={data}
                    isDollar={isDollar}
                    headingSize={headingSize}
                />
            ))}
            <Box>
                <Heading as="h2" size={headingSize} mb="0.5rem">
                    Keywords
                </Heading>
                <Wrap>
                    {keywords.length > 0
                        ? keywords.map(({ name, id }) => (
                              <WrapItem key={id}>
                                  <NextLink href={`/keyword/${id}`} passHref>
                                      <Link>
                                          <Tag size="md">{name}</Tag>
                                      </Link>
                                  </NextLink>
                              </WrapItem>
                          ))
                        : '-'}
                </Wrap>
            </Box>
        </>
    );
};

export default ShowSideData;
