import React from 'react';
import PropTypes from 'prop-types';
import style from './Typography.module.sass'
const Typography = ({ variant="body", children,component }) => {
  // Define the CSS classes based on the variant
  let className = 'typography';

  switch (variant) {
    case 'h1':
      className += ' h1';
      break;
    case 'h2':
      className += ' h2';
      break;
    case 'h3':
      className += ' h3';
      break;
    case 'h4':
      className += ' h4';
      break;
    case 'h5':
      className += ' h5';
      break;
    case 'h6':
      className += ' h6';
      break;
    case 'subtitle1':
      className += ' subtitle1';
      break;
    case 'subtitle2':
      className += ' subtitle2';
      break;
    default:
      className += ' body';
  }
  const ComponentType = component || 'div';
 console.log(`${style.typography} ${style.h5}`)
  return <ComponentType className={`${style.typography} ${style.body}`}>{children}</ComponentType>;
};

Typography.propTypes = {
  variant: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
  ]),
  children: PropTypes.node.isRequired,
};

export default Typography;
