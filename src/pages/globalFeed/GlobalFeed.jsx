import React, { useEffect, Fragment } from 'react';
import { stringify } from 'query-string';

import useFetch from '../../hooks/useFetch';
import Feed from '../../components/feed/Feed';
import Pagination from '../../components/pagination/Pagination';
import { getPaginator, limit } from '../../utils/utils';

const GlobalFeed = ({ location, match }) => {
  const { offset, currentPage } = getPaginator(location.search);
  const stringifiedParams = stringify({
    limit,
    offset
  });
  const apiUrl = `/articles?${stringifiedParams}`;
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);
  const { url } = match;

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage]);

  return (
    <div className='home-page'>
      <div className='banner'>
        <div className='container'>
          <h1>Medium clone</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-9'>
            {isLoading && <div>Loading...</div>}
            {error && <div>Some error happend</div>}
            {!isLoading && response && (
              <Fragment>
                <Feed articles={response.articles}/>
                <Pagination
                  total={response.articlesCount}
                  limit={limit} url={url}
                  currentPage={currentPage}
                />
              </Fragment>
            )}
          </div>
          <div className='col-md-3'>
            Popular tags
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalFeed;
