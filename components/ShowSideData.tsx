import {
    Box,
    Text,
    Heading,
    VStack,
    Wrap,
    WrapItem,
    Tag
} from '@chakra-ui/react';

interface SideDataItem {
    heading: string;
    data: string | number;
    isDollar?: boolean;
    headingSize: string;
}

interface ShowSideDataProps {
    status: string;
    origLanguage: string;
    budget: number;
    revenue: number;
    keywords: GenresEntityOrKeywordsEntity[];
    headingSize: string;
}

const SideDataItem = ({
    heading,
    headingSize,
    data,
    isDollar
}: SideDataItem) => {
    const displayData = () => {
        if (isDollar) return `$${data.toLocaleString()}`;
        return data;
    };
    return (
        <Box>
            <Heading as="h4" size={headingSize}>
                {heading}
            </Heading>
            <Text>{data ? displayData() : '-'}</Text>
        </Box>
    );
};

const ShowSideData = ({
    status,
    origLanguage,
    budget,
    revenue,
    keywords,
    headingSize
}: ShowSideDataProps) => {
    return (
        <>
            <SideDataItem
                heading="Status"
                data={status}
                headingSize={headingSize}
            />
            <SideDataItem
                heading="Original Language"
                data={origLanguage}
                headingSize={headingSize}
            />
            <SideDataItem
                heading="Budget"
                data={budget}
                isDollar
                headingSize={headingSize}
            />
            <SideDataItem
                heading="Revenue"
                data={revenue}
                isDollar
                headingSize={headingSize}
            />
            <Box>
                <Heading as="h4" size={headingSize} mb="0.5rem">
                    Keywords
                </Heading>
                <Wrap>
                    {keywords.length > 0
                        ? keywords.map(({ name, id }) => (
                              <WrapItem key={id}>
                                  <Tag size="md">{name}</Tag>
                              </WrapItem>
                          ))
                        : '-'}
                </Wrap>
            </Box>
        </>
    );
};

export default ShowSideData;
