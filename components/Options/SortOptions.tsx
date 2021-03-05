import { Box, Heading, Select } from '@chakra-ui/react';

interface SortOptions {
    sort: string;
    setSort: (newSort: string) => void;
}

const SortOptions = ({ sort, setSort }: SortOptions) => {
    return (
        <Box>
            <Heading as="h3" size="sm" fontWeight="normal" mb="0.5rem">
                Sort Results By
            </Heading>
            <Select
                defaultValue={sort}
                variant="filled"
                onChange={(e) => setSort(e.target.value)}
            >
                <option value="popularity.desc">Popularity Descending</option>
                <option value="popularity.asc">Popularity Ascending</option>
                <option value="vote_average.desc">Rating Descending</option>
                <option value="vote_average.asc">Rating Ascending</option>
                <option value="primary_release_date.desc">
                    Release Date Descending
                </option>
                <option value="primary_release_date.asc">
                    Releaes Date Ascending
                </option>
            </Select>
        </Box>
    );
};

export default SortOptions;
