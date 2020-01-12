import React, { useEffect, useState, useContext } from 'react';

import { Redirect } from 'react-router-dom';
import ArticleForm from '../../components/articleForm/ArticleForm';
import useFetch from '../../hooks/useFetch';
import { CurrentUserContext } from '../../contexts/currentUser';

const EditArticle = ({ match }) => {
  const { slug } = match.params;
  const apiUrl = `/articles/${slug}`;
  const [currentUserState] = useContext(CurrentUserContext);
  const [{ response: fetchArticleResponse }, doFetchArticle] = useFetch(apiUrl);
  const [
    { response: updateArticleRespons, error: updateArticleError },
    doUpdateArticle
  ] = useFetch(apiUrl);
  const [initialValues, setInitialValues] = useState(null);
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);

  const handleSubmit = (article) => {
    doUpdateArticle({
      method: 'put',
      data: {
        article
      }
    });
  };

  useEffect(() => {
    doFetchArticle();
  }, [doFetchArticle]);

  useEffect(() => {
    if (!fetchArticleResponse) {
      return;
    }
    setInitialValues({
      title: fetchArticleResponse.article.title,
      description: fetchArticleResponse.article.description,
      body: fetchArticleResponse.article.body,
      tagList: fetchArticleResponse.article.tagList
    });
  }, [fetchArticleResponse]);

  useEffect(() => {
    if (!updateArticleRespons) {
      return;
    }
    setIsSuccessfullSubmit(true);
  }, [updateArticleRespons]);

  if (currentUserState.isLoggedIn === false) {
    return <Redirect to='/'/>;
  }

  if (isSuccessfullSubmit) {
    return <Redirect to={`/articles/${slug}`}/>;
  }

  return (
    <ArticleForm
      onSubmit={handleSubmit}
      errors={(updateArticleError && updateArticleError.errors) || {}}
      initialValues={initialValues}
    />
  );
};

export default EditArticle;
