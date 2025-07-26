import { TextField } from "@mui/material";

const CashForm = () => {
  return (
    <form className={"width:350px"}>
      <TextField fullWidth id="count" label="مبلغ" variant="standard" />

      <TextField
        fullWidth
        id="due_date"
        label="تاریخ واریز"
        variant="standard"
      />

      <TextField
        fullWidth
        id="reference_number"
        label="شماره مرجع"
        variant="standard"
      />
    </form>
  );
};

export default CashForm;
