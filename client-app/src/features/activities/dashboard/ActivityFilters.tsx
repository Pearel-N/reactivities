import React, { Fragment, useContext } from "react";
import { Menu, Header } from "semantic-ui-react";
import { Calendar } from "react-widgets";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

const ActivityFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.activityStore;
  return (
    <Fragment>
      <Menu vertical size={"large"} style={{ width: "100%", marginTop: 50 }}>
        <Header icon={"filter"} attached color={"teal"} content={"Filters"} />
        <Menu.Item
          active={predicate.size === 0}
          onClick={() => setPredicate("all", "true")}
          color={"blue"}
          name={"all"}
          content={"All Activities"}
        />
        <Menu.Item
          active={predicate.has("isGoing")}
          color={"blue"}
          name={"username"}
          content={"I'm Going"}
          onClick={() => setPredicate("isGoing", "true")}
        />
        <Menu.Item
          active={predicate.has("isHost")}
          color={"blue"}
          name={"host"}
          content={"I'm hosting"}
          onClick={() => setPredicate("isHost", "true")}
        />
      </Menu>
      <Header
        icon={"calendar"}
        attached
        color={"teal"}
        content={"Select Date"}
      />
      <Calendar
        onChange={date => setPredicate("startDate", date!)}
        value={predicate.get("startDate") || new Date()}
      />
    </Fragment>
  );
};

export default observer(ActivityFilters);
