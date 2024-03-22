import { TextField } from '@material-ui/core';

const FilterInputComponent = (type) => (
  function ({ item, applyValue }) {
    return (
      <TextField
        type={type}
        value={item.value || ''}
        onChange={(e) => {
          if (e.target.value !== '') {
            applyValue({ ...item, value: e.target.value });
          }
        }}
        InputProps={{
          style: { marginTop: '16px' },
        }}
      />
    );
  }
);

export default FilterInputComponent;
