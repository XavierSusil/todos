import styled from "@emotion/styled";
import { CircularProgress, Box } from "@mui/material";
import propTypes from "prop-types";
/**
 * Wrapper component that wraps the component with the loading overlay.
 * @param {boolean} isLoading "the condition on which whether to render the loading overlay or not"
 * @param {React.Component} children components that need to be wrapped
 * @returns {React.Component}  a  component which wraps the children components
 */
const SBoxCircularOverlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
`;

const CircularLoadingOverlayWrapper = ({ isLoading = false, children }) => {
  return (
    <Box position="relative">
      {isLoading && (
        <SBoxCircularOverlay>
          <CircularProgress />
        </SBoxCircularOverlay>
      )}
      {children}
    </Box>
  );
};

CircularLoadingOverlayWrapper.propTypes = {
  isLoading: propTypes.bool,
  children: propTypes.element,
};

export default CircularLoadingOverlayWrapper;
