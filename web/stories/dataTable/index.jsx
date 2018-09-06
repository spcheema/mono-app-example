import React from 'react';
import {
  storiesOf,
} from '@storybook/react';

import {
  getResourceNestedMappedList,
  variantsStringAttribute,
} from 'core/selectors';

import {
  Table,
  Icon,
} from 'antd';
import Placeholder from '../../src/components/Placeholder';


import Connect from '../../src/components/Connect/index';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const columns = [{
  title: 'Id',
  dataIndex: 'id',
  key: 'id',
}, {
  title: 'Product name',
  dataIndex: 'attributes.name',
  key: 'name',
}, {
  // Custom attribute
  title: 'Variants',
  dataIndex: 'ca.variants',
  key: 'variants',
}];


const getColumns = (isLoading) => {
  if (isLoading) {
    return columns.map((item) => {
      const { render, ...rest } = item;
      return rest;
    });
  } return columns.map(item => Object.assign(
    item, { render: () => <Placeholder indicator={antIcon} /> },
  ));
};

storiesOf('data-table', module)
  .add('default-table', () => (
    <Connect
      mapStateToProps={state => ({
        dataSource: getResourceNestedMappedList(
          'products',
          'forTable',
          state,
          false,
          resource => ({
            variants: variantsStringAttribute({
              resource,
            }),
          }),
        )(state),
      })}
    >
      { props => (
        <Table
          rowKey="id"
          dataSource={props.dataSource}
          columns={getColumns(true)}
        />)}
    </Connect>
  ))
  .add('placeholder-table', () => (
    <Connect
      mapStateToProps={state => ({
        dataSource: getResourceNestedMappedList(
          'products',
          'forTable',
          state,
          false,
          resource => ({
            variants: variantsStringAttribute({
              resource,
            }),
          }),
        )(state),
      })}
    >
      { props => (
        <div>
          <Table
            rowKey="id"
            dataSource={props.dataSource}
            columns={getColumns(false)}
          />
        </div>)}
    </Connect>
  ));