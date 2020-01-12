import React, { useEffect, Fragment } from 'react';
import { stringify } from 'query-string';

import useFetch from '../../hooks/useFetch';
import Feed from '../../components/feed/Feed';
import Pagination from '../../components/pagination/Pagination';
import { getPaginator, limit } from '../../utils/utils';
import PopularTags from '../../components/popularTags/PopularTags';
import Loading from '../../components/loading/Loading';
import ErrorMassage from '../../components/errorMassage/ErrorMassage';
import FeedToggler from '../../components/feedToggler/FeedToggler';

const TagFeed = ({ location, match }) => {
  const tagName = match.params.slug;
  const { offset, currentPage } = getPaginator(location.search);
  const stringifiedParams = stringify({
    limit,
    offset,
    tag: tagName
  });
  const apiUrl = `/articles?${stringifiedParams}`;
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);
  const { url } = match;

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage, tagName]);

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
            <FeedToggler tagName={tagName}/>
            {isLoading && <Loading/>}
            {error && <ErrorMassage/>}
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
            <PopularTags/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagFeed;
