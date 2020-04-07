import React from "react";
import { useHistory } from "react-router-dom";
import { Pagination } from "@material-ui/lab";

interface PaginationProps {
  currentPage: number;
  pagecount: number;
  linkTo: string;
}

const PaginationList: React.FC<PaginationProps> = ({
  currentPage,
  pagecount,
  linkTo,
}) => {
  const history = useHistory();
  return (
    <div className="blue darken-1">
      <Pagination
        className="blue darken-1"
        page={currentPage}
        count={pagecount}
        color="primary"
        onChange={(e, page) => {
          history.push(`/${linkTo}/${page}`);
        }}
      />
    </div>
  );
};

export default PaginationList;
