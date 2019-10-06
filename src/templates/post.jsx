import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Layout, Container, Content } from 'layouts';
import { TagsBlock, Header, SEO } from 'components';
import '../styles/prism';

const SuggestionBar = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  background: ${props => props.theme.colors.white.light};
  box-shadow: ${props => props.theme.shadow.suggestion};
`;
const PostSuggestion = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 3rem 0 3rem;
`;

const Post = ({ data, pageContext }) => {
  const { next, prev } = pageContext;
  const {
    title,
    tags,
    author,
    slug,
    createdAt,
    image,
    content,
    subtitle,
  } = data.contentfulPost;
  const html = content.childContentfulRichText.html;

  return (
    <Layout>
      <SEO
        title={title}
        description={subtitle || ' '}
        banner={image.fluid.src}
        pathname={slug}
        article
      />
      <Header title={title} date={createdAt} cover={image.fluid} />
      <Container>
        <Content input={html} />
        <TagsBlock list={tags || []} />
      </Container>
      <SuggestionBar>
        <PostSuggestion>
          {prev && (
            <Link to={prev.slug}>
              Previous
              <h3>{prev.title}</h3>
            </Link>
          )}
        </PostSuggestion>
        <PostSuggestion>
          {next && (
            <Link to={next.slug}>
              Next
              <h3>{next.title}</h3>
            </Link>
          )}
        </PostSuggestion>
      </SuggestionBar>
    </Layout>
  );
};

export default Post;

export const query = graphql`
  query($pathSlug: String!) {
    contentfulPost(slug: { eq: $pathSlug }) {
      title
      tags
      author
      slug
      subtitle
      createdAt(fromNow: true)
      image {
        fluid(maxWidth: 1920, quality: 90) {
          src
        }
      }
      content {
        childContentfulRichText {
          html
        }
      }
    }
  }
`;
