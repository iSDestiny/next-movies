import { Box, Grid, Heading } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import useDimensions from 'react-cool-dimensions';

interface ItemProps {
    title: string;
    index: number;
    setDimensions: (width: number, height: number, index: number) => void;
}

const Item = ({ title, index, setDimensions }: ItemProps) => {
    const { observe, width, height } = useDimensions();

    useEffect(() => {
        setDimensions(width, height, index);
    }, [width, height]);

    return (
        <Box
            width="100%"
            height="100%"
            border="1px solid black"
            p="2rem"
            ref={observe}
        >
            <Heading>{title}</Heading>
            <Heading>{`${width} x ${height}`}</Heading>
        </Box>
    );
};

interface ItemI {
    title: string;
    id: number;
}

interface ItemDimensionsI {
    width?: number;
    height?: number;
}

const Example = () => {
    const [items, setItems] = useState<ItemI[]>([
        { title: 'ex1', id: 1 },
        { title: 'ex2', id: 2 },
        { title: 'ex3', id: 3 },
        { title: 'ex4', id: 4 }
    ]);

    const [itemDimensions, setItemDimensions] = useState<ItemDimensionsI[]>(
        [...Array(items.length).keys()].map((_) => ({}))
    );

    useEffect(() => {
        itemDimensions.forEach(({ width, height }, index) =>
            console.log(`${index + 1} - ${width} x ${height}`)
        );
    }, [itemDimensions]);

    const setDimensions = useCallback(
        (width: number, height: number, index: number) => {
            setItemDimensions((prev) => {
                const newDimensions = [...prev];
                newDimensions[index] = { height, width };
                return newDimensions;
            });
        },
        [items]
    );

    return (
        <Grid templateColumns="1fr 2fr" p="1rem" gap={5}>
            {items.map(({ title, id }, index) => (
                <Item
                    title={title}
                    setDimensions={setDimensions}
                    index={index}
                    key={id}
                />
            ))}
        </Grid>
    );
};

export default Example;
