import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from '@emotion/styled';
import { Header, PostList } from 'components';
import { Layout } from 'layouts';

const PostWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 4rem 4rem 1rem 4rem;
  @media (max-width: 1000px) {
    margin: 4rem 2rem 1rem 2rem;
  }
  @media (max-width: 700px) {
    margin: 4rem 1rem 1rem 1rem;
  }
`;

const Index = ({ data }) => {
  const { edges } = data.allContentfulPost;
  return (
    <Layout>
      <Helmet title={'Home Page'} />
      <Header title="Home Page">Gatsby Tutorial Starter</Header>
      <PostWrapper>
        {edges.map(({ node }) => {
          const { id, subtitle, image, slug, title, createdAt } = node;
          return (
            <PostList
              key={id}
              cover={image.fluid}
              path={slug}
              title={title}
              date={createdAt}
              excerpt={subtitle}
            />
          );
        })}
      </PostWrapper>
    </Layout>
  );
};

export default Index;

export const query = graphql`
  query {
    allContentfulPost {
      edges {
        node {
          slug
          title
          tags
          subtitle
          image {
            fluid(quality: 90, maxWidth: 1000) {
              src
            }
          }
          id
          createdAt(fromNow: true)
        }
      }
    }
  }
`;
