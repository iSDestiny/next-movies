import { Box, Grid, GridItem, SimpleGrid, Text } from '@chakra-ui/react';
import CardSkeleton from './CardSkeleton';
import ShowCard from './ShowCard';

interface CardGridProps {
    items: MovieAndTVShow[];
    isLoading: boolean;
    config: TMDBConfig;
}

const CardGrid = ({ items, isLoading, config }: CardGridProps) => {
    const isNotEmpty = items?.length > 0;
    const results = isNotEmpty ? (
        <>
            {items?.map(
                ({
                    id,
                    title,
                    name,
                    release_date,
                    first_air_date,
                    poster_path,
                    overview,
                    vote_average
                }) => (
                    <GridItem key={id}>
                        <ShowCard
                            href={title ? `/movies/${id}` : `/tv/${id}`}
                            config={config}
                            title={title || name}
                            date={release_date || first_air_date}
                            posterPath={poster_path}
                            overview={overview}
                            rating={vote_average}
                        />
                    </GridItem>
                )
            )}
        </>
    ) : (
        <GridItem colSpan={2}>
            <Text size="md" w="100%" textAlign="center">
                No results
            </Text>
        </GridItem>
    );

    return (
        <Grid
            templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
            gap={5}
            mb="1.5rem"
        >
            {!isLoading
                ? results
                : [...Array(20).keys()].map((num) => (
                      <GridItem key={num}>
                          <CardSkeleton />
                      </GridItem>
                  ))}
        </Grid>
    );
};

export default CardGrid;
