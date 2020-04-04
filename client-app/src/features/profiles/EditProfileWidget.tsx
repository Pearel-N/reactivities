import React from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import { combineValidators, isRequired } from "revalidate";
import { IProfile } from "../../app/models/profile";
import TextAreaInput from "../../app/common/form/TextAreaInput";
import { observer } from "mobx-react-lite";

interface IProps {
  updateProfile: (profile: IProfile) => void;
  profile: IProfile;
}

const validate = combineValidators({
  displayName: isRequired("displayName")
});

const EditProfileWidget: React.FC<IProps> = ({ updateProfile, profile }) => {
  return (
    <FinalForm
      onSubmit={updateProfile}
      initialValues={profile}
      validate={validate}
      render={({ handleSubmit, invalid, pristine, submitting }) => (
        <Form onSubmit={handleSubmit} error>
          <Field
            name="displayName"
            component={TextInput}
            placeholder="Display Name"
            value={profile!.displayName}
          />
          <Field
            name="bio"
            component={TextAreaInput}
            rows={3}
            placeholder="Bio"
            value={profile!.bio}
          />
          <Button
            disabled={invalid || pristine}
            loading={submitting}
            positive
            content="Update"
            floated="right"
          />
        </Form>
      )}
    />
  );
};

export default observer(EditProfileWidget);
