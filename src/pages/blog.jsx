import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { Header, BlogList } from 'components';
import { Layout } from 'layouts';

const Blog = ({ data }) => {
  const { edges } = data.allContentfulPost;
  return (
    <Layout>
      <Helmet title={'Blog Page'} />
      <Header title="Blog Page">Gatsby Tutorial Starter</Header>
      {edges.map(({ node }) => (
        <BlogList
          key={node.id}
          cover={node.image.fluid}
          path={node.slug}
          title={node.title}
          date={node.createdAt}
          tags={node.tags}
          excerpt={node.subtitle}
        />
      ))}
    </Layout>
  );
};
export default Blog;

export const query = graphql`
  query {
    allContentfulPost {
      edges {
        node {
          slug
          title
          createdAt(fromNow: true)
          tags
          subtitle
          id
          image {
            fluid(maxWidth: 1000) {
              src
            }
          }
        }
      }
    }
  }
`;
