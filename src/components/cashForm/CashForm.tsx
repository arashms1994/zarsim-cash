import { Stack, TextField, Typography } from "@mui/material";
import FileUploader from "../file-uploader/FileUploader";

const CashForm = () => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"} gap={"12px"}>
      <form style={{ width: "350px" }}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <label>
            <Typography variant="subtitle1" gutterBottom>
              مبلغ واریز(ريال):
            </Typography>
          </label>
          <TextField type="text" id="count" variant="outlined" />
        </Stack>

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <label>
            <Typography variant="subtitle1" gutterBottom>
              تاریخ واریز:
            </Typography>
          </label>
          <TextField
            type="text"
            id="due_date"
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
              شماره مرجع:
            </Typography>
          </label>
          <TextField
            type="text"
            id="reference_number"
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
