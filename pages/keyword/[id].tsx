import GeneralLayout from 'layouts/GeneralLayout';
import React from 'react';

interface KeywordProps {
    keyword: string;
    config: TMDBConfig;
}

const Keyword = ({ keyword, config }: KeywordProps) => {
    return (
        <GeneralLayout title={`"${keyword}"`}>
            <></>
        </GeneralLayout>
    );
};

export default Keyword;
