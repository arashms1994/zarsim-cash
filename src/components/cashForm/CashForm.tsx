import { Stack, TextField, Typography } from "@mui/material";
import FileUploader from "../file-uploader/FileUploader";

const CashForm = () => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <form style={{ width: "350px" }}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          width={"100%"}
          padding={"8px"}
        >
          <label>
            <Typography variant="subtitle1" gutterBottom>
              مبلغ واریز(ريال)
            </Typography>
          </label>
          <TextField type="text" id="count" label="مبلغ" variant="outlined" />
        </Stack>

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          width={"100%"}
          padding={"8px"}
        >
          <label>
            <Typography variant="subtitle1" gutterBottom>
              تاریخ واریز{" "}
            </Typography>
          </label>
          <TextField
            type="text"
            id="due_date"
            label="تاریخ واریز"
            variant="outlined"
          />
        </Stack>

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          width={"100%"}
          padding={"8px"}
        >
          <label>
            <Typography variant="subtitle1" gutterBottom>
              شماره مرجع{" "}
            </Typography>
          </label>
          <TextField
            type="text"
            id="reference_number"
            label="شماره مرجع"
            variant="outlined"
          />
        </Stack>

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <label>
            <Typography variant="subtitle1" gutterBottom>
              آپلود رسید واریز
            </Typography>
          </label>
          <FileUploader orderNumber="52555" subFolder="55555" />
        </Stack>
      </form>
    </Stack>
  );
};

export default CashForm;
