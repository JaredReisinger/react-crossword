import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';

const types = {
  info: '#5352ED',
  success: '#2ED573',
  danger: '#FF4757',
  warning: '#FFA502',
};

const DEMODiv = styled.div`
  padding: 20px;
  border-radius: 3px;
  color: white;
  background: ${props => types[props.type] || 'black'};
`;

const DemoStyled = ({ children, type = 'info', ...rest }) => (
  <DEMODiv data-testid="DemoMessage" type={type} {...rest}>
    {children}
  </DEMODiv>
);

DemoStyled.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['info', 'success', 'danger', 'warning']),
};

DemoStyled.defaultProps = {
  children: undefined,
  type: 'info',
};

const Demo = props => <DemoStyled {...props} />;

export default Demo;
