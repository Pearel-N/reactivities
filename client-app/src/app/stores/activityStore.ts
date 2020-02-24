import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable activity: IActivity | undefined;
  @observable editMode = false;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadActivities = () => {
    this.loadingInitial = true;
    agent.Activities.list()
      .then(activities => {
        runInAction("loading activities", () => {
          activities.forEach(activity => {
            activity.date = activity.date.split(".")[0];
            this.activityRegistry.set(activity.id, activity);
            this.loadingInitial = false;
          });
        });
      })
      .catch(error => {
        runInAction("loading activities error", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      });
  };

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.activity = activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        runInAction("getting activity", () => {
          this.activity = activity;
          this.loadingInitial = false;
        });
      } catch (error) {
        runInAction("get activity error", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  @action createActivity = (activity: IActivity) => {
    agent.Activities.create(activity)
      .then(() => {
        runInAction("creating activity", () => {
          this.activityRegistry.set(activity.id, activity);
          this.editMode = false;
          this.submitting = false;
        });
      })
      .catch(error => {
        runInAction("create activity error", () => {
          this.submitting = false;
        });
        console.log(error);
      });
  };

  @action editActivity = (activity: IActivity) => {
    this.submitting = true;
    agent.Activities.update(activity)
      .then(() => {
        runInAction("editing activity", () => {
          this.activityRegistry.set(activity.id, activity);
          this.activity = activity;
          this.editMode = false;
          this.submitting = false;
        });
      })
      .catch(error => {
        runInAction("edit activity error", () => {
          this.submitting = false;
        });
        console.log(error);
      });
  };

  @action deleteActivity = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    agent.Activities.delete(id)
      .then(() => {
        runInAction("deleting activity", () => {
          this.activityRegistry.delete(id);
          this.submitting = false;
          this.target = "";
        });
      })
      .catch(err => {
        runInAction("delete activity error", () => {
          this.submitting = false;
          this.target = "";
        });
        console.log(err);
      });
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.activity = undefined;
  };

  @action openEditForm = (id: string) => {
    this.activity = this.activityRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedActivity = () => {
    this.activity = undefined;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action selectActivity = (id: string) => {
    this.activity = this.activityRegistry.get(id);
    this.editMode = false;
  };
}

export default createContext(new ActivityStore());
