import React, { useEffect, useContext, useState } from 'react';

import { Link, Redirect } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/loading/Loading';
import ErrorMassage from '../../components/errorMassage/ErrorMassage';
import TagList from '../../components/tagList/TagList';
import { CurrentUserContext } from '../../contexts/currentUser';

const Article = (props) => {
  const { slug } = props.match.params;
  const apiUrl = `/articles/${slug}`;
  const [
    {
      response: fetchArticleResponse,
      error: fetchArticleError,
      isLoading: fetchArticleIsLoading
    },
    doFetch
  ] = useFetch(apiUrl);
  const [{ response: deleteArticleResponse }, doDeleteArticle] = useFetch(apiUrl);
  const [currentUserState] = useContext(CurrentUserContext);
  const [isSuccessfullDelete, setIsSuccessfullDelete] = useState(false);

  const isAuthor = () => {
    if (!fetchArticleResponse || !currentUserState.isLoggedIn) {
      return false;
    }
    return fetchArticleResponse.article.author.username === currentUserState.currentUser.username;
  };

  const deleteArticle = () => {
    doDeleteArticle({
      method: 'delete'
    });
  };

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (!deleteArticleResponse) {
      return;
    }
    setIsSuccessfullDelete(true);
  }, [deleteArticleResponse]);

  if (isSuccessfullDelete) {
    return <Redirect to='/'/>;
  }

  return (
    <div className='article-page'>
      <div className='banner'>
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className='container'>
            <h1>{fetchArticleResponse.article.title}</h1>
            <div className='article-meta'>
              <Link to={`/profiles/${fetchArticleResponse.article.author.username}`}>
                <img src={fetchArticleResponse.article.author.image} alt=''/>
              </Link>
              <div className='info'>
                <Link to={`/profiles/${fetchArticleResponse.article.author.username}`}>
                  {fetchArticleResponse.article.author.username}
                </Link>
                <span className='date'>
                  {fetchArticleResponse.article.createdAt}
                </span>
              </div>
              {isAuthor() && (
                <span>
                  <Link className='btn btn-outline-secondary btn-sm' to={`/article/${fetchArticleResponse.article.slug}/edit`}>
                    <i className='ipn-edit'>
                      Edit Article
                    </i>
                  </Link>
                  <button className='btn btn-outline-danger btn-sm' onClick={deleteArticle}>
                    <i className='ion-trash-a'></i>
                    Delete article
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className='container page'>
        {fetchArticleIsLoading && <Loading/>}
        {fetchArticleError && <ErrorMassage/>}
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className='row article-content'>
            <div className='col-xs-12'>
              <div>
                <p>{fetchArticleResponse.article.body}</p>
              </div>
              <TagList tags={fetchArticleResponse.article.tagList}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Article;
