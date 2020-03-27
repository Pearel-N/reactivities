import React, { useState, useContext } from "react";
import { Tab, Grid, Header, Button } from "semantic-ui-react";
import EditProfileWidget from "./EditProfileWidget";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { IProfile } from "../../app/models/profile";

const AboutProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const rootStore = useContext(RootStoreContext);
  const { updateProfile, profile, isCurrentUser } = rootStore.profileStore;

  const hadleEditProfile = (values: IProfile) => {
    updateProfile(values);
    setEditMode(false);
  };

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <Header
            floated="left"
            icon="user"
            content={`About ${isCurrentUser ? "you" : profile!.displayName}`}
          />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={editMode ? "Cancel" : "Edit Profile"}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <EditProfileWidget
              updateProfile={hadleEditProfile}
              profile={profile!}
            />
          ) : (
            <Header size="small">{profile!.bio}</Header>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(AboutProfile);
