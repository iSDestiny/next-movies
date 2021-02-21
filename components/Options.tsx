interface OptionsProps {
    type: 'movie' | 'tv';
    genres: GenresEntityOrKeywordsEntity[];
    languages: Language[];
    certifications?: CertificationDetails[];
}

const SortOptions = () => {};

const FilterOptions = () => {};

const Options = () => {
    return <div></div>;
};

export default Options;
