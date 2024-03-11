import { Checkbox, FormControlLabel } from "@mui/material";
import propTypes from "prop-types";

/**
 * used in popoverFilter and popSort Components
 * @param {} param0
 * @returns
 */
export const CheckBoxGenerator = ({ name, state, handle }) => {
  return (
    <FormControlLabel
      control={<Checkbox name={name} checked={state[name]} onChange={handle} />}
      label={name[0].toUpperCase() + name.slice(1)}
    />
  );
};
CheckBoxGenerator.propTypes = {
  name: propTypes.string,
  state: propTypes.object,
  handle: propTypes.func,
};
