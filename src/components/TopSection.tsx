import { CircularProgress, useMediaQuery } from "@mui/material";
import React from "react";

import CustomAddButton from "./CustomAddButton";
import CustomBreadcrumbContainer from "./CustomBreadcrumbContainer";

interface ITopSection {
  items: {
    name: string;
    link: string;
    isActive: boolean;
    icon: JSX.Element;
  }[];
  actionText?: string;
  onClick?: () => void;
  breadCrumbsOnly?: boolean;
  loading?: boolean;
}
const TopSection = (props: ITopSection) => {
  const matches = useMediaQuery("(max-width:600px)");
  return (
    <div>
      <div className="flex flex-row mt-2 justify-between">
        {!matches && (
          <div className="mt-1.5">
            <CustomBreadcrumbContainer items={props.items} />
          </div>
        )}
        {!props.breadCrumbsOnly && (
          <div>
            {props.loading ? (
              <CircularProgress size={20} variant="indeterminate" />
            ) : (
              <CustomAddButton
                onClick={() => props.onClick && props.onClick()}
                text={props.actionText || ""}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopSection;
