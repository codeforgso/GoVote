import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import { Col, Row } from 'react-bootstrap';

class Content extends Component {
  static _getUniqueCategory(array) {
    const allCategories = array.map(itm => itm.category);
    const uniqueCategories = allCategories.filter((item, i, ar) => ar.indexOf(item) === i);
    return uniqueCategories;
  }

  static _formatJurisdictionResources(localResources) {
    const categories = Content._getUniqueCategory(localResources);
    let resourcesHtml = '';
    categories.forEach((category) => {
      resourcesHtml += `<li>${category}</li>`;
      resourcesHtml += '<ul>';
      localResources.forEach((resource) => {
        if (resource.category === category) {
          resourcesHtml += `<li><a href=${resource.url}>${resource.name}</a><p>${resource.description}</p></li>`;
        }
      });
      resourcesHtml += '</ul>';
    });
    return renderHTML(resourcesHtml);
  }

  render() {
    const data = this.props.data;
    const urlTemplate = data.common.local.resources[0].url;
    const commonJ = data.config.common_jurisdiction;
    const localJ = data.config.local_jurisdiction;
    const url = urlTemplate.replace(/{{common_jurisdiction}}/g, commonJ).replace(/{{local_jurisdiction}}/g, localJ);
    return (
      <div className="content-body">
        <Row>
          <Col xs={1} sm={2} md={3}></Col>
          <Col xs={10} sm={8} md={6}>
            <h1>{data.config.page_name}</h1>

            {/* Common Description */}
            {renderHTML(data.common.description)}

            <h2>Local Information</h2>
            {/* Local Description */}
            {renderHTML(data.jurisdiction.description)}

            <h2>Resources</h2>
            <h3>National, State, and General Resources</h3>
            {/* Common Resources */}
            <ul>
              {data.common.common.resources.map((resource) => {
                const tag = <li key={resource.url}><a href={resource.url}>{resource.name}</a><p>{resource.description}</p></li>;
                return tag;
              })}
            </ul>
            <h3>Local and Regional Resources</h3>
            {/* Local Resources */}
            <ul>
              {Content._formatJurisdictionResources(data.jurisdiction.local.resources)}
            </ul>

            <h4>Local Resources from 211</h4>
            {/* Common Local Resources */}
            <ul>
              {data.common.local.resources.map((resource) => {
                const tag = <li key={url}><a href={url}>{resource.name}</a><p>{resource.description}</p></li>;
                return tag;
              })}
            </ul>
          </Col>
          <Col xs={1} sm={2} md={3}></Col>
        </Row>
      </div>
    );
  }
}

Content.propTypes = {
  data: React.PropTypes.object,
};

module.exports = Content;
