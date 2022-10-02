import { Person } from "@mui/icons-material";
import { Avatar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getTimeCreated } from "../helpers/Time";

const useStyles = makeStyles({
  avatar: {
    width: "30px !important",
    height: "30px !important",
  },
  name: {
    fontSize: "12px !important",
  },
  comment: {
    fontSize: "12px !important",
  },
});
export interface IPersona {
  fullName: string;
  content: string;
  date: Date;
}
const Persona = (props: IPersona) => {
  const { fullName, content, date } = props;
  const classes = useStyles();
  return (
    <div>
      <div className="flex flex-row gap-2 w-full">
        <div>
          <Avatar className={classes.avatar}>
            <Person color="secondary" />
          </Avatar>
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-1 w-full">
            <div className="w-full">
              <div className="flex flex-row w-full justify-between">
                <div>
                  <Typography className={classes.name} fontWeight="bold">
                    {fullName}
                  </Typography>
                </div>
                <div>
                  <Typography variant="caption">
                    {getTimeCreated(date)}
                  </Typography>
                </div>
              </div>
            </div>
            <div>
              <Typography className={classes.comment}>{content}</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Persona;
