import { Box } from '@chakra-ui/react';
import GeneralLayout from 'layouts/GeneralLayout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ungzip } from 'node-gzip';
import React, { useEffect } from 'react';
import addLeadingZeroToDate from 'utils/addLeadingZeroToDate';
import tmdbFetch from 'utils/tmdbFetch';
import tmdbFetchGzip from 'utils/tmdbFetchGzip';

interface TVShowProps {
    tvShowData: TVShowDetails;
    config: TMDBConfig;
    languages: Language[];
}

const TVShow = ({ tvShowData, config, languages }) => {
    useEffect(() => {
        console.log(tvShowData);
    }, []);

    return (
        <GeneralLayout title="title">
            <Box></Box>
        </GeneralLayout>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params;
    let tvShowData: TVShowDetails;
    let config: TMDBConfig;
    let languages: Language[];

    try {
        const { data: configData } = await tmdbFetch.get('/configuration');
        const { data: languageData } = await tmdbFetch.get(
            '/configuration/languages'
        );
        const { data } = await tmdbFetch.get(`/tv/${id}`, {
            params: {
                append_to_response:
                    'content_ratings,reviews,similar,images,credits,videos,recommendations,keywords'
            }
        });
        config = configData;
        tvShowData = data;
        languages = languageData;
    } catch (err) {
        console.log(err);
    }

    return {
        props: {
            tvShowData,
            config,
            languages
        }
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    let ids: number[];
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const res = await tmdbFetchGzip.get(
        `/tv_series_ids_${addLeadingZeroToDate(month)}_${addLeadingZeroToDate(
            day
        )}_${year}.json.gz`,
        {
            responseType: 'arraybuffer',
            headers: {
                'Accept-Encoding': 'gzip'
            }
        }
    );

    const uncompressed = await ungzip(res.data);
    ids = uncompressed
        .toString()
        .trim()
        .split('\n')
        .map((line) => {
            const json = JSON.parse(line);
            return json.id;
        });

    const paths = ids.map((id) => {
        if (id) return { params: { id: id + '' } };
        console.log('error' + id);
        return { params: { id: null } };
    });

    return {
        paths,
        fallback: false
    };
};

export default TVShow;
