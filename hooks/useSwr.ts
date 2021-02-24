import { useEffect, useRef } from 'react';
import _useSwr from 'swr';
import {
    ConfigInterface,
    keyInterface,
    fetcherFn,
    responseInterface
} from 'swr/dist/types';

const useSwr = <Data, Error>(
    key: keyInterface,
    fn?: fetcherFn<Data>,
    config?: ConfigInterface<Data, Error>
): responseInterface<Data, Error> => {
    const hasMounted = useRef(false);

    useEffect(() => {
        hasMounted.current = true;
    }, []);

    return _useSwr<Data, Error>(key, fn, {
        ...config,
        initialData: hasMounted.current ? undefined : config?.initialData
    });
};

export default useSwr;
