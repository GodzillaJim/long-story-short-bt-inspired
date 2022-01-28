import { Typography } from "@mui/material";

export interface IDefaultText {
  label: string;
  value: string | JSX.Element;
}
const DefaultText = (props: IDefaultText) => {
  const { label, value } = props;
  return (
    <div>
      <div className="flex flex-col gap-1">
        <div>
          <Typography variant="body2">{label}</Typography>
        </div>
        <div>
          {typeof value === "string" && (
            <Typography variant="h6">{value}</Typography>
          )}
          {typeof value !== "string" && value}
        </div>
      </div>
    </div>
  );
};

export default DefaultText;
