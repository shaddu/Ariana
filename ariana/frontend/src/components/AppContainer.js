import React from "react";
import Questionnaire from "./Questionnaire";
import Table from "./Table";

const AppContainer = () => (
  <Questionnaire endpoint="api/questionnaire/" 
                render={data => <Table data={data} />} />
);

export default AppContainer