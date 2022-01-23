import { Person } from '@mui/icons-material';
import { Avatar, Typography } from '@mui/material';
import { getTimeCreated } from '../helpers/Time';

export interface IPersona {
  fullName: string;
  content: string;
  date: Date;
}
const Persona = (props: IPersona) => {
  const { fullName, content, date } = props;
  return (
    <div>
      <div className="flex flex-row gap-2 w-full">
        <div>
          <Avatar>
            <Person />
          </Avatar>
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-1 w-full">
            <div className="w-full">
              <div className="flex flex-row w-full justify-between">
                <div>
                  <Typography fontWeight="bold" variant="subtitle1">
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
              <Typography variant="body1">{content}</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Persona;
