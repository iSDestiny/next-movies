import GeneralLayout from 'layouts/GeneralLayout';

interface GenreProps {
    genre: string;
    config: TMDBConfig;
}

const Genre = ({ genre, config }: GenreProps) => {
    return (
        <GeneralLayout title={genre}>
            <></>
        </GeneralLayout>
    );
};

export default Genre;
