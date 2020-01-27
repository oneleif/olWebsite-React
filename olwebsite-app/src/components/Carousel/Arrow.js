import React from "react";
import PropTypes from "prop-types";

const Arrow = ({ direction, onClick, height, width }) => {
  /************************************
   * Render
   ************************************/

  const styles = { height, width };
  return (
    <div className="arrow_container" onClick={() => onClick(direction)}>
      <i className={`${direction}_arrow`} style={styles} />
    </div>
  );
};

Arrow.defaultProps = {
  width: "10px",
  height: "10px",
  direction: "left"
};

Arrow.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  direction: PropTypes.string
};

export default Arrow;
