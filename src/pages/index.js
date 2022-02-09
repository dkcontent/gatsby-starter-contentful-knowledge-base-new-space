import React from 'react';
import is from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '../templates/layout';
import CategoryCard from '../components/category-card';
import WhiteContainer from '../components/white-container';
import { withArticles } from '../utils/filters';
import useSiteSettings from '../hooks/useSiteSettings';
import SEO from '../components/seo';
import SearchForm from '../components/search-form';

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const Hgroup = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  margin-bottom: 12px;

  font-size: 28px;
  line-height: 1.5;
  font-weight: 700;
  font-weight: 400;
`;

const Subtitle = styled.h2`
  color: #536171;
  font-size: 21px;
  line-height: 1.5;
  font-weight: 400;
`;

const SearchContainer = styled.div`
  width: 625px;
  margin: 0 auto;
  margin-bottom: 44px;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-bottom: 33px;
  }
`;

export default function Home(props) {
  const settings = useSiteSettings();
  const categories = props.data.categories.nodes.filter(withArticles);

  return (
    <Layout>
    <!-- Start VWO Async SmartCode -->
<script type='text/javascript'>
window._vwo_code = window._vwo_code || (function(){
var account_id=608516,
settings_tolerance=2000,
library_tolerance=2500,
use_existing_jquery=false,
is_spa=1,
hide_element='body',

/* DO NOT EDIT BELOW THIS LINE */
f=false,d=document,code={use_existing_jquery:function(){return use_existing_jquery;},library_tolerance:function(){return library_tolerance;},finish:function(){if(!f){f=true;var a=d.getElementById('_vis_opt_path_hides');if(a)a.parentNode.removeChild(a);}},finished:function(){return f;},load:function(a){var b=d.createElement('script');b.src=a;b.type='text/javascript';b.innerText;b.onerror=function(){_vwo_code.finish();};d.getElementsByTagName('head')[0].appendChild(b);},init:function(){
window.settings_timer=setTimeout(function () {_vwo_code.finish() },settings_tolerance);var a=d.createElement('style'),b=hide_element?hide_element+'{opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;}':'',h=d.getElementsByTagName('head')[0];a.setAttribute('id','_vis_opt_path_hides');a.setAttribute('type','text/css');if(a.styleSheet)a.styleSheet.cssText=b;else a.appendChild(d.createTextNode(b));h.appendChild(a);this.load('https://dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(d.URL)+'&f='+(+is_spa)+'&r='+Math.random());return settings_timer; }};window._vwo_settings_timer = code.init(); return code; }());
</script>
<!-- End VWO Async SmartCode -->
      <SEO title={settings.heading} description={settings.description} />

      <Container>
        <Hgroup>
          <Title>{settings.heading}</Title>
          <Subtitle>{settings.subheading}</Subtitle>
        </Hgroup>

        <SearchContainer>
          <SearchForm />
        </SearchContainer>

        <WhiteContainer>
          {categories.map((category, index) => (
            <CategoryCard
              title={category.name}
              url={`/${category.slug}/`}
              description={category.description}
              key={index}
            />
          ))}
        </WhiteContainer>
      </Container>
    </Layout>
  );
}

Home.propTypes = {
  data: is.shape({
    categories: is.shape({
      nodes: is.arrayOf(
        is.shape({
          name: is.string.isRequired,
          slug: is.string.isRequired,
          description: is.string.isRequired,
          articles: is.arrayOf(
            is.shape({
              id: is.string.isRequired,
            })
          ),
        })
      ),
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  query {
    categories: allContentfulKbAppCategory {
      nodes {
        name
        description: previewDescription
        slug
        articles: kbapparticle {
          id
        }
      }
    }
  }
`;
